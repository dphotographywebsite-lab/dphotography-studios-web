import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET() {
  let overrides: Record<string, unknown> = {};
  try {
    const raw = await fs.readFile(CMS_FILE_PATH, 'utf-8');
    overrides = JSON.parse(raw);
  } catch {
    overrides = {};
  }

  const mediaLibrary = await listPublicMedia();

  return NextResponse.json({
    overrides,
    mediaLibrary,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { overrides, githubToken, commitToGithub } = body as {
      overrides: Record<string, unknown>;
      githubToken?: string;
      commitToGithub?: boolean;
    };

    if (!overrides || typeof overrides !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Datos de CMS inválidos.' },
        { status: 400 }
      );
    }

    const serialized = JSON.stringify(overrides, null, 2) + '\n';
    let savedLocally = false;

    try {
      await fs.writeFile(CMS_FILE_PATH, serialized, 'utf-8');
      savedLocally = true;
    } catch {
      // En entornos serverless de solo lectura (ej. Vercel), continuamos con GitHub o localStorage
      savedLocally = false;
    }

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
