// Busca o link ativo direto na REST API (evita carregar o SDK completo do
// Supabase nas páginas públicas — economiza ~150KB de JS).
const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
const SUPABASE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as string | undefined;

export const ACTIVE_LINK_CACHE_KEY = "pedal_active_link";

export async function fetchActiveLink(signal?: AbortSignal): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/whatsapp_links?select=url&is_active=eq.true&limit=1`,
      {
        headers: { apikey: SUPABASE_KEY, Accept: "application/json" },
        signal,
      },
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ url?: string }>;
    return rows?.[0]?.url ?? null;
  } catch {
    return null;
  }
}
