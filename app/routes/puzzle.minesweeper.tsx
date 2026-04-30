import type { MetaFunction } from "@remix-run/node";
import { GameFooter } from "~/components/GameFooter";
import { MinesweeperClient } from "~/components/MinesweeperClient";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function PuzzleMinesweeper() {
  return (
    <StoryShell padBottom>
      <MinesweeperClient />
      <GameFooter />
    </StoryShell>
  );
}
