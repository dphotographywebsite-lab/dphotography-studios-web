import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {
  getSupabaseAdmin,
  ensureStudioBucket,
  STUDIO_BUCKET,
  CMS_STORAGE_PATH,
} from '@/lib/supabase';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-overrides.json');
const GITHUB_REPO = 'dphotographywebsite-lab/dphotography-studios-web';
const GITHUB_FILE_PATH = 'src/data/cms-overrides.json';

async function listPublicMedia(): Promise<string[]> {
  const results: string[] = [];
  const folders = ['fotos', 'brand'];
  for (const folder of folders) {
    try {
      const dirPath = path.join(process.cwd(), 'public', folder);
      const entries = await fs.readdir(dirPath);
      for (const name of entries) {
        if (/\.(jpe?g|png|webp|avif)$/i.test(name)) {
          results.push(`/${folder}/${name}`);
        }
      }
    } catch {
      // Ignore missing folder
    }
  }
  return results;
}

export async function GET(req: NextRequest) {
  let overrides: Record<string, unknown> = {};
  let supabaseConnected = false;

  const customUrl = req.nextUrl.searchParams.get('supabaseUrl') || undefined;
  const supabase = getSupabaseAdmin(customUrl);

  // 1. Intentar leer desde la tabla PostgreSQL public.studio_cms en Supabase
  if (supabase) {
    try {
      const { data: row, error: dbErr } = await supabase
        .from('studio_cms')
        .select('payload')
        .eq('id', 'main')
        .single();

      if (!dbErr && row?.payload && typeof row.payload === 'object') {
        overrides = row.payload as Record<string, unknown>;
        supabaseConnected = true;
      }
    } catch {
      // Continuar a Storage fallback
    }

    // 2. Fallback a Supabase Storage si la tabla aún estaba vacía
    if (Object.keys(overrides).length === 0) {
      try {
        const ready = await ensureStudioBucket(supabase);
        if (ready) {
          supabaseConnected = true;
          const { data: blob, error } = await supabase.storage
            .from(STUDIO_BUCKET)
            .download(CMS_STORAGE_PATH);
          if (!error && blob) {
            const text = await blob.text();
            const parsed = JSON.parse(text);
            if (parsed && typeof parsed === 'object') {
              overrides = parsed;
            }
          }
        }
      } catch {
        // Fallback a archivo local
      }
    }
  }

  // 3. Si no hay datos en Supabase aún, leer del archivo local
  if (Object.keys(overrides).length === 0) {
    try {
      const raw = await fs.readFile(CMS_FILE_PATH, 'utf-8');
      overrides = JSON.parse(raw);
    } catch {
      overrides = {};
    }
  }

  // 4. Combinar biblioteca de fotos de Supabase Storage + fotos locales
  const localMedia = await listPublicMedia();
  const cloudMedia: string[] = [];

  if (supabase) {
    try {
      const { data: files } = await supabase.storage.from(STUDIO_BUCKET).list('uploads', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (files) {
        supabaseConnected = true;
        for (const f of files) {
          if (f.name && /\.(jpe?g|png|webp|avif|gif)$/i.test(f.name)) {
            const { data: pub } = supabase.storage
              .from(STUDIO_BUCKET)
              .getPublicUrl(`uploads/${f.name}`);
            if (pub?.publicUrl) {
              cloudMedia.push(pub.publicUrl);
            }
          }
        }
      }
    } catch {
      // Ignorar error de listado
    }
  }

  return NextResponse.json({
    overrides,
    mediaLibrary: [...cloudMedia, ...localMedia],
    supabaseConnected,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { overrides, githubToken, commitToGithub, supabaseUrl, supabaseKey } = body as {
      overrides: Record<string, unknown>;
      githubToken?: string;
      commitToGithub?: boolean;
      supabaseUrl?: string;
      supabaseKey?: string;
    };

    if (!overrides || typeof overrides !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Datos de CMS inválidos.' },
        { status: 400 }
      );
    }

    const serialized = JSON.stringify(overrides, null, 2) + '\n';
    let savedLocally = false;
    let supabaseSynced = false;
    let supabaseError: string | null = null;

    // 1. Guardar en Supabase (Tabla PostgreSQL studio_cms + Bucket studio-media)
    const supabase = getSupabaseAdmin(supabaseUrl, supabaseKey);
    if (supabase) {
      try {
        const { error: dbErr } = await supabase.from('studio_cms').upsert(
          {
            id: 'main',
            payload: overrides,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

        await ensureStudioBucket(supabase);
        const { error: upErr } = await supabase.storage
          .from(STUDIO_BUCKET)
          .upload(CMS_STORAGE_PATH, Buffer.from(serialized, 'utf-8'), {
            contentType: 'application/json',
            upsert: true,
          });

        if (!dbErr || !upErr) {
          supabaseSynced = true;
        } else {
          supabaseError = dbErr?.message || upErr?.message || null;
        }
      } catch (err) {
        supabaseError = err instanceof Error ? err.message : 'Error al guardar en Supabase';
      }
    }

    // 2. Guardar localmente (si el sistema de archivos lo permite)
    try {
      await fs.writeFile(CMS_FILE_PATH, serialized, 'utf-8');
      savedLocally = true;
    } catch {
      savedLocally = false;
    }

    // 3. Sincronización opcional con GitHub
    let githubSynced = false;
    let githubError: string | null = null;
    const token = githubToken || process.env.GITHUB_TOKEN;

    if (commitToGithub && token) {
      try {
        const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
        const headers: Record<string, string> = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'DPhotography-Admin-CMS',
        };

        let existingSha: string | undefined;
        const getRes = await fetch(apiUrl, { headers, cache: 'no-store' });
        if (getRes.ok) {
          const fileMeta = (await getRes.json()) as { sha?: string };
          existingSha = fileMeta.sha;
        }

        const contentBase64 = Buffer.from(serialized, 'utf-8').toString('base64');
        const putRes = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'chore(cms): actualizar planes, galerías y contenido desde panel admin',
            content: contentBase64,
            sha: existingSha,
            branch: 'main',
          }),
        });

        if (putRes.ok) {
          githubSynced = true;
        } else {
          const errText = await putRes.text();
          githubError = `GitHub API (${putRes.status}): ${errText}`;
        }
      } catch (err) {
        githubError = err instanceof Error ? err.message : 'Error al sincronizar con GitHub';
      }
    }

    return NextResponse.json({
      ok: true,
      savedLocally,
      supabaseSynced,
      supabaseError,
      githubSynced,
      githubError,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
