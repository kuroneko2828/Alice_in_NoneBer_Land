import { useEffect } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { getProgress } from "~/lib/progress";

/** progress=4 のとき kuroneko 以外へ行けない（旧 main.js と同じ） */
export function ProgressTrap() {
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname === "/story/kuroneko") return;
    if (getProgress() !== 4) return;
    alert("『逃さないよ』");
    navigate("/story/kuroneko", { replace: true });
  }, [loc.pathname, navigate]);

  return null;
}
