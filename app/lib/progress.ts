import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

const COOKIE = "progress";
const STORAGE_KEY = "alice_progress";

function getCookiePath(): string {
  if (typeof document === "undefined") return "/";
  const base = import.meta.env.BASE_URL ?? "/";
  if (base === "/") return "/";
  try {
    const pathname = new URL(base, window.location.origin).pathname;
    return pathname.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname;
  } catch {
    return "/";
  }
}

function readCookieProgress(): number {
  if (typeof document === "undefined") return 0;
  const m = document.cookie.match(/(?:^|;\s*)progress=(\d+)/);
  return m ? Number(m[1]) : 0;
}

function readStorageProgress(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  } catch {
    return null;
  }
}

function writeStorageProgress(n: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, String(n));
  } catch {
    /* プライベートモード等 */
  }
}

export function getProgress(): number {
  if (typeof document === "undefined") return 0;

  const fromCookie = readCookieProgress();
  const fromStorage = readStorageProgress();
  const n = Math.max(fromStorage ?? 0, fromCookie);

  if (fromStorage !== n) {
    writeStorageProgress(n);
  }

  return n;
}

export function setProgress(n: number): void {
  if (typeof document === "undefined") return;

  const current = getProgress();
  const next = Math.max(current, n);

  writeStorageProgress(next);

  const path = getCookiePath();
  document.cookie = `${COOKIE}=${next}; path=${path}; max-age=31536000; SameSite=Lax`;

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("alice-progress"));
  }
}

/** クライアントで進捗を購読（トップの章リンク・パズルの Skip 表示） */
export function useProgress(): number {
  const location = useLocation();
  const [value, setValue] = useState(() =>
    typeof document !== "undefined" ? getProgress() : 0
  );

  useEffect(() => {
    const sync = () => setValue(getProgress());
    sync();
    window.addEventListener("focus", sync);
    window.addEventListener("pageshow", sync);
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("alice-progress", sync);
    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("pageshow", sync);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("alice-progress", sync);
    };
  }, [location.pathname]);

  return value;
}
