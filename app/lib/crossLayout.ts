export type CrossCell = "H" | "BLK" | { src: string };

/** cross_rejected / cross_use 共通の 4x4 グリッド（#mine 版は rejected、#cross は use） */
export const CROSS_GRID: CrossCell[][] = [
  ["H", "H", "H", "H"],
  ["H", "BLK", "H", "BLK"],
  ["BLK", "H", "H", "H"],
  ["H", "BLK", "H", "H"],
];
