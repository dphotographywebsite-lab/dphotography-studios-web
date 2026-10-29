import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const STUDIO_BUCKET = 'studio-media';
export const CMS_STORAGE_PATH = 'cms/cms-overrides.json';

const DEFAULT_SUPABASE_URL = 'https://aozvvwjaeqtngmwsgkcz.supabase.co';
const DEFAULT_PUBLISHABLE_KEY = 'sb_publishable_PgesHfB7q2ta1vBPum_oaw_2s8urUAX';

export function normalizeSupabaseUrl(rawUrl?: string): string {
  const input = (
    rawUrl ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL
  ).trim();
  if (!input) return '';
  if (input.startsWith('http://') || input.startsWith('https://')) {
    const dashMatch = input.match(/supabase\.com\/dashboard\/project\/([a-z0-9]+)/i);
    if (dashMatch?.[1]) {
      return `https://${dashMatch[1]}.supabase.co`;
    }
    return input.replace(/\/+$/, '');
  }
  if (/^[a-z0-9]{15,30}$/i.test(input)) {
    return `https://${input}.supabase.co`;
  }
  return input;
}

export function getSupabaseAdmin(customUrl?: string, customKey?: string): SupabaseClient | null {
  const url = normalizeSupabaseUrl(customUrl);
  const key = (
    customKey ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_PUBLISHABLE_KEY
  ).trim();

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let bucketChecked = false;

export async function ensureStudioBucket(supabase: SupabaseClient): Promise<boolean> {
  if (bucketChecked) return true;
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      // With publishable key, listBuckets may be restricted even if the bucket exists
      bucketChecked = true;
      return true;
    }
    const exists = buckets?.some((b) => b.name === STUDIO_BUCKET);
    if (!exists) {
      const { error: createErr } = await supabase.storage.createBucket(STUDIO_BUCKET, {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      if (createErr && !createErr.message?.toLowerCase().includes('already exists')) {
        return false;
      }
    }
    bucketChecked = true;
    return true;
  } catch {
    return true;
  }
}
