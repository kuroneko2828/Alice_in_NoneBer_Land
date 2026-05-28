import { useEffect } from "react";
import { setProgress } from "~/lib/progress";

/** トップでのみ：uuddlrlrba で progress=3（旧 main.js） */
export function KonamiListener() {
  useEffect(() => {
    const inputs: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      inputs.push(e.key);
      if (inputs.slice(-10).join("") === "uuddlrlrba") {
        setProgress(3);
        window.location.reload();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
