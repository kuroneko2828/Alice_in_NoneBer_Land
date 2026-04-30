import type { MetaFunction } from "@remix-run/node";
import { GameFooter } from "~/components/GameFooter";
import { CrossUseClient } from "~/components/CrossUseClient";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function PuzzleCross() {
  return (
    <StoryShell padBottom>
      <CrossUseClient />
      <GameFooter />
    </StoryShell>
  );
}
