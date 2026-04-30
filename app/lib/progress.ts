const COOKIE = "progress";

export function getProgress(): number {
  if (typeof document === "undefined") return 0;
  const m = document.cookie.match(/(?:^|;\s*)progress=(\d+)/);
  return m ? Number(m[1]) : 0;
}

export function setProgress(n: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE}=${n}; path=/; max-age=31536000; SameSite=Lax`;
}
