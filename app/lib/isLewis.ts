export function isLewis(answer: string): boolean {
  const a = answer.trim();
  return (
    a === "ルイス・キャロル" ||
    a === "ルイスキャロル" ||
    a === "Lewis Carroll" ||
    a === "チャールズ・ラトウィッジ・ドジソン" ||
    a === "チャールズラトウィッジドジソン" ||
    a === "Charles Lutwidge Dodgson"
  );
}
