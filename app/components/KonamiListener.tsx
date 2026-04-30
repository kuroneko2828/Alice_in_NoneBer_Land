import { useEffect } from "react";

/** トップでのみ：uuddlrlrba で progress=3（旧 main.js） */
export function KonamiListener() {
  useEffect(() => {
    const inputs: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      inputs.push(e.key);
      if (inputs.slice(-10).join("") === "uuddlrlrba") {
        document.cookie = "progress=3; path=/; max-age=31536000; SameSite=Lax";
        window.location.reload();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
