// Meta Pixel helper — ID 1720076819212350
// Fires a single Lead event (once per browser session) on the CTA click.

export const META_PIXEL_ID = "1720076819212350";
const LEAD_FLAG = "pedal_meta_lead_tracked";

/** Initialise the Meta Pixel base code and fire PageView. Safe to call once on app mount. */
export function initMetaPixel(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const w = window as unknown as {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[][]; loaded?: boolean; version?: string };
    _fbq?: unknown;
  };
  if (w.fbq) return; // already initialised

  const n = ((...args: unknown[]) => {
    if (n.callMethod) n.callMethod.apply(n, args);
    else (n.queue ||= []).push(args);
  }) as ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[][]; loaded?: boolean; version?: string; push?: (...a: unknown[]) => void };

  n.queue = [];
  n.loaded = true;
  n.version = "2.0";
  n.push = n;

  w.fbq = n;
  if (!w._fbq) w._fbq = n;

  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  const s = document.getElementsByTagName("script")[0];
  s?.parentNode?.insertBefore(t, s);

  n("init", META_PIXEL_ID);
  n("track", "PageView");
}

/**
 * Fire the Meta "Lead" event exactly once per browser session.
 * Subsequent calls are ignored so the pixel never registers more than one Lead.
 */
export function trackLeadOnce(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(LEAD_FLAG) === "1") return;
  } catch {
    /* sessionStorage unavailable (private mode) — fall through */
  }
  (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
  try {
    window.sessionStorage.setItem(LEAD_FLAG, "1");
  } catch {
    /* ignore */
  }
}
