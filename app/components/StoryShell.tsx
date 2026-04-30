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
      className="min-h-screen bg-[#fcfcff] pb-32 text-gray-500"
      style={{ paddingBottom: padBottom ? 120 : undefined }}
    >
      {showHeader ? <SiteHeader /> : null}
      {children}
    </div>
  );
}
