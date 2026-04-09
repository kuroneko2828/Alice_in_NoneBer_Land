import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { RETURN_HOME_TO } from "~/lib/returnHome";
import { setProgress } from "~/lib/progress";

/** 旧 story_kuroneko.html の set_progress(4) */
export function KuronekoSetProgress() {
  useEffect(() => {
    setProgress(4);
  }, []);
  return null;
}

/** 旧 reset_story() */
export function KuronekoResetButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="kuroneko-reset-btn"
      onClick={() => {
        setProgress(0);
        navigate(RETURN_HOME_TO);
      }}
    >
      リセット
    </button>
  );
}
