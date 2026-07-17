export function checkThrottle(
  cache: Map<string, number>,
  key: string,
  intervalMs: number,
  now: number,
): boolean {
  const last = cache.get(key);
  if (last !== undefined && now - last < intervalMs) {
    return false;
  }
  cache.set(key, now);
  return true;
}
