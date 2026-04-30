import { assetUrl } from "~/lib/assetUrl";

export type MineCell = "H" | "BLK" | { src: string };

/** 旧 minesweeper.html の #mine（BLK = 黒マス） */
export const MINE_LAYOUT: MineCell[][] = [
  [
    { src: assetUrl("images/mi2TKWYM_FGuYfWz.png") },
    "BLK",
    "H",
    "BLK",
    { src: assetUrl("images/PauEnBcbXDSy-3GF.png") },
    "H",
    { src: assetUrl("images/fdrDDa-R-WTFpdtJ.png") },
  ],
  [
    "H",
    "H",
    { src: assetUrl("images/mi2TKWYM_FGuYfWz.png") },
    "H",
    "H",
    "H",
    "H",
  ],
  [
    { src: assetUrl("images/FTKTbcjU_dSd4ELT.png") },
    "H",
    { src: assetUrl("images/BBfmTKNrc45DYPcw.png") },
    "H",
    "H",
    { src: assetUrl("images/kxjuTJf3xAAe5yTf.png") },
    "H",
  ],
  [
    "H",
    "H",
    "H",
    "H",
    "BLK",
    { src: assetUrl("images/dyT3ksKEBSB8Q4pt.png") },
    "H",
  ],
  ["H", "H", "H", "H", "H", "H", "H"],
  [
    { src: assetUrl("images/dyT3ksKEBSB8Q4pt.png") },
    "H",
    { src: assetUrl("images/7tH3ba-e74zEbr2B.png") },
    "H",
    { src: assetUrl("images/xBu3tDpGjjhjR27B.png") },
    "H",
    { src: assetUrl("images/fdrDDa-R-WTFpdtJ.png") },
  ],
  [
    "H",
    "H",
    "BLK",
    "H",
    { src: assetUrl("images/PauEnBcbXDSy-3GF.png") },
    "H",
    "BLK",
  ],
];
