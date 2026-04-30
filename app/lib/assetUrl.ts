/**
 * `public/` 直下の静的ファイル用。GitHub Pages の `base`（例: `/リポジトリ名/`）を付与する。
 */
export function assetUrl(pathFromPublicRoot: string): string {
  const path = pathFromPublicRoot.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${path}`;
}
