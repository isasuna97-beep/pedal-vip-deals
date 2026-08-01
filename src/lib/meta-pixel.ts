// Meta Pixel helper — ID 1720076819212350
// Fires a single Lead event (once per browser session) on the CTA click.

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

export const META_PIXEL_ID = "1720076819212350";
const LEAD_FLAG = "pedal_meta_lead_tracked";

/** Initialise the Meta Pixel base code and fire PageView. Safe to call once on app mount. */
export function initMetaPixel(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.fbq) return; // already initialised

  (function (f: Window, b: Document, e: string, v: string) {
    let n: FbqFn, t: HTMLScriptElement, s: HTMLScriptElement;
    if (f.fbq) return;
    // eslint-disable-next-line prefer-const
    n = (f.fbq = function (this: FbqFn, ...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
    }) as FbqFn;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
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
  window.fbq?.("track", "Lead");
  try {
    window.sessionStorage.setItem(LEAD_FLAG, "1");
  } catch {
    /* ignore */
  }
}
