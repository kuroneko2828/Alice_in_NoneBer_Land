import type { ReactNode } from "react";
import { SiteHeader } from "~/components/SiteHeader";

type Props = {
  children: ReactNode;
  showHeader?: boolean;
  /** フッター（名前入力）のための余白 */
  padBottom?: boolean;
};

export function StoryShell({
  children,
  showHeader = true,
  padBottom = false,
}: Props) {
  return (
    <div
      className={`story-shell min-h-screen bg-[#fcfcff] text-gray-500 ${
        showHeader ? "story-shell--with-header" : ""
      } ${padBottom ? "story-shell--pad-footer" : "pb-32"}`}
    >
      {showHeader ? <SiteHeader /> : null}
      {children}
    </div>
  );
}
