import { Link } from "@remix-run/react";
import { useProgress } from "~/lib/progress";

const CHAPTERS = [
  {
    minProgress: 1,
    href: "/story/tea-party-end",
    puzzleLabel: "パズル1（ナンプレ）",
    storyLabel: "チェシャ猫編",
    unlockHint: "パズル1をクリアすると選べます",
  },
  {
    minProgress: 2,
    href: "/story/escape-forest",
    puzzleLabel: "パズル2（マインスイーパ）",
    storyLabel: "白うさぎ編",
    unlockHint: "パズル2をクリアすると選べます",
  },
  {
    minProgress: 3,
    href: "/story/choice",
    puzzleLabel: "パズル3（クロスワード）",
    storyLabel: "最後の選択",
    unlockHint: "パズル3をクリアすると選べます",
  },
] as const;

export function ChapterLinks() {
  const p = useProgress();

  if (p < 1) {
    return null;
  }

  return (
    <div className="chapter-resume mx-auto max-w-lg px-4">
      <div className="box26 chapter-resume-box">
        <span className="box-title">途中から再開</span>
        <p className="chapter-resume-lead">
          クリア済みのパズルの<strong>直後</strong>
          から物語を読み直せます。続きを選んでください。
        </p>
        <ul className="chapter-resume-list">
          {CHAPTERS.map((chapter) => {
            const unlocked = p >= chapter.minProgress;
            return (
              <li key={chapter.href}>
                {unlocked ? (
                  <Link to={chapter.href} className="chapter-resume-item">
                    <span className="chapter-resume-item__eyebrow">
                      {chapter.puzzleLabel}のあと
                    </span>
                    <span className="chapter-resume-item__title">
                      {chapter.storyLabel}へ進む
                    </span>
                  </Link>
                ) : (
                  <div
                    className="chapter-resume-item chapter-resume-item--locked"
                    aria-disabled="true"
                  >
                    <span className="chapter-resume-item__eyebrow">
                      {chapter.puzzleLabel}のあと
                    </span>
                    <span className="chapter-resume-item__title">
                      {chapter.storyLabel}へ進む
                    </span>
                    <span className="chapter-resume-item__hint">
                      {chapter.unlockHint}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
