/** 旧 main.js の value_table と同一（画像ファイル名先頭3文字と対応） */
export const VALUE_TABLE = [
  "BBf",
  "FTK",
  "mi2",
  "fdr",
  "Pau",
  "dyT",
  "xBu",
  "kxj",
  "7tH",
  "mZj",
  "ZGS",
  "rZE",
  "7ms",
  "wuG",
  "djY",
  "3Jt",
  "bla",
] as const;

export function codeFromSrc(src: string): string {
  const name = src.split("/").pop()?.split(".")[0] ?? "";
  return name.slice(0, 3);
}

export function checkCell(src: string | null, expectedValue: number): boolean {
  if (src == null) return false;
  return VALUE_TABLE[expectedValue] === codeFromSrc(src);
}

export function checkNestedAnswer(
  cells: (string | null)[][],
  answer: number[][]
): boolean {
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < answer[i].length; j++) {
      if (!checkCell(cells[i]?.[j] ?? null, answer[i][j])) return false;
    }
  }
  return true;
}
