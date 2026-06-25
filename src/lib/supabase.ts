import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Sunucu tarafı Supabase istemcisi (service role).
  Anahtarlar yoksa null döner; uygulama yine çalışır (graceful degrade).
*/

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(url && serviceKey);
}

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!cached) {
    cached = createClient(url as string, serviceKey as string, {
      auth: { persistSession: false },
    });
  }
  return cached;
}
