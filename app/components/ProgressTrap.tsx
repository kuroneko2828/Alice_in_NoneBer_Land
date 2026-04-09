import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { getProgress } from "~/lib/progress";

/** progress=4 のとき kuroneko 以外へ行けない（旧 main.js と同じ） */
export function ProgressTrap() {
  const loc = useLocation();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  /** 同一の「離脱試行」で alert / navigate が二重に走らないようにする */
  const trapPendingRef = useRef(false);

  useEffect(() => {
    if (loc.pathname === "/story/kuroneko") {
      trapPendingRef.current = false;
      return;
    }
    if (getProgress() !== 4) return;
    if (trapPendingRef.current) return;
    trapPendingRef.current = true;
    alert("『逃さないよ』");
    navigateRef.current("/story/kuroneko", { replace: true });
  }, [loc.pathname]);

  return null;
}
