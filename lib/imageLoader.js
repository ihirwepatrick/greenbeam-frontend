/**
 * Custom Next.js image loader.
 * - Local paths (e.g. /logo.jpg from public folder): return as-is so the
 *   browser loads them directly (/_next/image often 404s for same-origin paths).
 * - Supabase URLs: return as-is to avoid server proxy timeouts.
 * - Other external URLs: use Next.js image API for optimization.
 */
function isSupabaseOrExternal(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const u = new URL(url, url.startsWith("//") ? "https:" : undefined);
    return (
      u.hostname.endsWith("supabase.co") ||
      u.hostname.endsWith("supabase.in")
    );
  } catch {
    return false;
  }
}

function isLocalPath(src) {
  if (!src || typeof src !== "string") return false;
  return src.startsWith("/") && !src.startsWith("//");
}

export default function imageLoader({ src, width, quality }) {
  if (isLocalPath(src)) return src;
  if (isSupabaseOrExternal(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
