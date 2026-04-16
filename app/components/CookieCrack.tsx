import { useNavigate } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";

/** 破片計算・画像サンプリング解像度 */
const W = 220;
const H = 220;
/** 画像の周囲の余白（割れ目用） */
const PAD = 56;
const CANVAS_W = W + 2 * PAD;
const CANVAS_H = H + 2 * PAD;
/** 一瞬で開く割れ目の幅（ピクセル） */
const CRACK_GAP = 2.4;
const CRACK_GAP_JITTER = 1.1;
/** 割れた状態を見せてから遷移まで */
const HOLD_MS_BEFORE_NAV = 500;
/** トップに置いていた頃の見た目（h-[100px]）に合わせる表示倍率 */
const DISPLAY_SCALE = 100 / W;

type Fragment = {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  rot: number;
  bw: number;
  bh: number;
};

function generateSites(n: number, cx: number, cy: number): [number, number][] {
  const sites: [number, number][] = [[cx, cy]];
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 20 + Math.random() * 30;
    sites.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  while (sites.length < n) {
    sites.push([
      20 + Math.random() * (W - 40),
      20 + Math.random() * (H - 40),
    ]);
  }
  return sites;
}

function nearestSite(x: number, y: number, sites: [number, number][]): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < sites.length; i++) {
    const dx = x - sites[i][0];
    const dy = y - sites[i][1];
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function buildFragments(
  img: HTMLImageElement,
  sites: [number, number][]
): Fragment[] {
  const belong = new Int16Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      belong[y * W + x] = nearestSite(x, y, sites);
    }
  }

  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = W;
  srcCanvas.height = H;
  const sctx = srcCanvas.getContext("2d");
  if (!sctx) return [];
  sctx.drawImage(img, 0, 0, W, H);
  const srcData = sctx.getImageData(0, 0, W, H);

  const boxes = sites.map(() => ({
    minX: W,
    minY: H,
    maxX: 0,
    maxY: 0,
  }));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const s = belong[y * W + x];
      if (x < boxes[s].minX) boxes[s].minX = x;
      if (x > boxes[s].maxX) boxes[s].maxX = x;
      if (y < boxes[s].minY) boxes[s].minY = y;
      if (y > boxes[s].maxY) boxes[s].maxY = y;
    }
  }

  return sites
    .map((_site, si) => {
      const b = boxes[si];
      const bw = b.maxX - b.minX + 1;
      const bh = b.maxY - b.minY + 1;
      if (bw <= 0 || bh <= 0) return null;

      const fc = document.createElement("canvas");
      fc.width = bw;
      fc.height = bh;
      const fctx = fc.getContext("2d");
      if (!fctx) return null;
      const fData = fctx.createImageData(bw, bh);

      for (let y = b.minY; y <= b.maxY; y++) {
        for (let x = b.minX; x <= b.maxX; x++) {
          if (belong[y * W + x] !== si) continue;
          const si4 = (y * W + x) * 4;
          const di4 = ((y - b.minY) * bw + (x - b.minX)) * 4;
          fData.data[di4] = srcData.data[si4];
          fData.data[di4 + 1] = srcData.data[si4 + 1];
          fData.data[di4 + 2] = srcData.data[si4 + 2];
          fData.data[di4 + 3] = srcData.data[si4 + 3];
        }
      }
      fctx.putImageData(fData, 0, 0);

      const cx = (b.minX + b.maxX) / 2;
      const cy = (b.minY + b.maxY) / 2;
      const dx = cx - W / 2;
      const dy = cy - H / 2;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const gap = CRACK_GAP + Math.random() * CRACK_GAP_JITTER;
      const ox = (dx / dist) * gap;
      const oy = (dy / dist) * gap;

      return {
        canvas: fc,
        x: b.minX + ox,
        y: b.minY + oy,
        rot: (Math.random() - 0.5) * 0.06,
        bw,
        bh,
      };
    })
    .filter((f): f is Fragment => f !== null);
}

function drawFragments(
  canvas: HTMLCanvasElement,
  fragments: Fragment[]
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  for (const f of fragments) {
    ctx.save();
    ctx.translate(PAD + f.x + f.bw / 2, PAD + f.y + f.bh / 2);
    ctx.rotate(f.rot);
    ctx.drawImage(f.canvas, -f.bw / 2, -f.bh / 2);
    ctx.restore();
  }
}

type Props = {
  src: string;
  alt?: string;
  playTo?: string;
};

export function CookieCrack({
  src,
  alt = "PLAY ME",
  playTo = "/story/alice",
}: Props) {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigateDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cracked, setCracked] = useState(false);

  const clearNavigateTimer = useCallback(() => {
    if (navigateDelayRef.current != null) {
      clearTimeout(navigateDelayRef.current);
      navigateDelayRef.current = null;
    }
  }, []);

  useEffect(() => clearNavigateTimer, [clearNavigateTimer]);

  const handleStageClick = useCallback(() => {
    if (cracked) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    setCracked(true);

    const go = () => {
      img.style.opacity = "0";
      const fragments = buildFragments(
        img,
        generateSites(14, W / 2, H / 2)
      );
      drawFragments(canvas, fragments);
      navigateDelayRef.current = setTimeout(() => {
        navigateDelayRef.current = null;
        navigate(playTo);
      }, HOLD_MS_BEFORE_NAV);
    };

    if (img.complete && img.naturalWidth > 0) go();
    else img.onload = () => go();
  }, [cracked, navigate, playTo]);

  const displayW = W * DISPLAY_SCALE;
  const displayH = H * DISPLAY_SCALE;
  const canvasCssW = CANVAS_W * DISPLAY_SCALE;
  const canvasCssH = CANVAS_H * DISPLAY_SCALE;
  const canvasOffsetLeft = -canvasCssW / 2;
  const canvasOffsetTop = -canvasCssH / 2;

  return (
    <div className="relative mx-auto overflow-visible py-16">
      <div
        className="relative"
        style={{
          width: displayW,
          height: displayH,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="pointer-events-none absolute max-w-none"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: canvasOffsetLeft,
            marginTop: canvasOffsetTop,
            width: canvasCssW,
            height: canvasCssH,
          }}
          aria-hidden
        />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={W}
          height={H}
          className="absolute left-0 top-0 max-w-none select-none"
          style={{
            width: displayW,
            height: displayH,
          }}
          draggable={false}
        />
        {!cracked ? (
          <button
            type="button"
            className="absolute left-0 top-0 z-10 cursor-pointer border-0 bg-transparent p-0"
            style={{ width: displayW, height: displayH }}
            aria-label={alt}
            onClick={handleStageClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleStageClick();
              }
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
