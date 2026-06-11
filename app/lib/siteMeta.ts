/** サイト共通のメタ情報 */
export const SITE_TITLE = "Alice in NoneBer Land";
export const SITE_DESCRIPTION = "解読x数字がテーマのWeb謎";

/** URL共有時のサムネイル（`public/images/og_image.png` に配置） */
export const OG_IMAGE_PATH = "images/og_image.png";

function getSiteOrigin(): string {
  return import.meta.env.VITE_SITE_ORIGIN ?? "https://kuroneko2828.github.io";
}

function getNormalizedBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? base : `${base}/`;
}

/** サイトの絶対URL（末尾スラッシュ付き） */
export function getSiteUrl(): string {
  return `${getSiteOrigin()}${getNormalizedBase()}`;
}

/** OGP / X カード用の画像URL（絶対URL） */
export function getOgImageUrl(): string {
  return `${getSiteUrl()}${OG_IMAGE_PATH}`;
}
