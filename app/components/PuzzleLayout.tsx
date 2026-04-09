import type { ReactNode } from "react";

type Props = {
  rule: ReactNode;
  children: ReactNode;
};

/**
 * パズル画面の共通レイアウト（ルール → カード内に盤面・候補・Check）
 */
export function PuzzleLayout({ rule, children }: Props) {
  return (
    <div id="content" className="puzzle-page pb-28 px-4">
      <div className="mx-auto mb-6 max-w-2xl">{rule}</div>
      <div className="puzzle-board-card mx-auto max-w-5xl">{children}</div>
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
    <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#95ccff]/25 pt-6">
      <button
        type="button"
        className="btn btn-outline-info submit-btn large-btn rounded-full px-12 py-3 text-lg font-semibold shadow-sm"
        onClick={onCheck}
      >
        {checkLabel}
      </button>
      <a
        id="skip"
        href={skipHref}
        style={{ display: showSkip ? "inline" : "none" }}
        className="text-sm text-[#95ccff] underline decoration-[#95ccff]/40 underline-offset-2"
      >
        ( Skip )
      </a>
    </div>
  );
}
