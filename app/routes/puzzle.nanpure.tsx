import type { MetaFunction } from "@remix-run/node";
import { GameFooter } from "~/components/GameFooter";
import { NanpureClient } from "~/components/NanpureClient";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function PuzzleNanpure() {
  return (
    <StoryShell padBottom>
      <NanpureClient />
      <GameFooter />
    </StoryShell>
  );
}
