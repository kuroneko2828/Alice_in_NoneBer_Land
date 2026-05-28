import type { ReactNode } from "react";
import { Link } from "@remix-run/react";

type Props = {
  rule: ReactNode;
  children: ReactNode;
};

/**
 * パズル画面の共通レイアウト（ルール → カード内に盤面・候補・Check）
 */
export function PuzzleLayout({ rule, children }: Props) {
  return (
    <div id="content" className="puzzle-page px-2 pb-[5.5rem] sm:px-4 sm:pb-28">
      <div className="puzzle-rule mx-auto mb-3 max-w-2xl sm:mb-6">{rule}</div>
      <div className="puzzle-board-card mx-auto w-full max-w-5xl">{children}</div>
    </div>
  );
}

type PuzzleActionsProps = {
  onCheck: () => void;
  skipHref: string;
  showSkip: boolean;
  checkLabel?: string;
};

export function PuzzleCheckActions({
  onCheck,
  skipHref,
  showSkip,
  checkLabel = "Check",
}: PuzzleActionsProps) {
  return (
    <div className="puzzle-check-actions mt-4 flex flex-col items-center gap-3 border-t border-[#95ccff]/25 pt-4 sm:mt-8 sm:pt-6">
      <button
        type="button"
        className="btn btn-outline-info submit-btn large-btn rounded-full px-12 py-3 text-lg font-semibold shadow-sm"
        onClick={onCheck}
      >
        {checkLabel}
      </button>
      {showSkip ? (
        <Link
          id="skip"
          to={skipHref}
          className="text-sm text-[#95ccff] underline decoration-[#95ccff]/40 underline-offset-2"
        >
          ( Skip )
        </Link>
      ) : null}
    </div>
  );
}
