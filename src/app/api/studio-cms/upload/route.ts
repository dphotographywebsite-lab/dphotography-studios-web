import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, ensureStudioBucket, STUDIO_BUCKET } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const customUrl = (formData.get('supabaseUrl') as string) || undefined;
    const customKey = (formData.get('supabaseKey') as string) || undefined;

    const supabase = getSupabaseAdmin(customUrl, customKey);
    if (!supabase) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Falta la URL del proyecto de Supabase (ej. https://xxxx.supabase.co). Configúrala en el panel o en .env.local.',
        },
        { status: 400 }
      );
    }

    await ensureStudioBucket(supabase);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== 'function') continue;
      const bytes = Buffer.from(await file.arrayBuffer());
      const safeName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const storagePath = `uploads/${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from(STUDIO_BUCKET)
        .upload(storagePath, bytes, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        });

      if (upErr) {
        return NextResponse.json(
          { ok: false, error: `Error al subir ${file.name}: ${upErr.message}` },
          { status: 500 }
        );
      }

      const { data: pub } = supabase.storage.from(STUDIO_BUCKET).getPublicUrl(storagePath);
      if (pub?.publicUrl) {
        uploadedUrls.push(pub.publicUrl);
      }
    }

    return NextResponse.json({
      ok: true,
      uploadedUrls,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Error al subir archivos a Supabase',
      },
      { status: 500 }
    );
  }
}
