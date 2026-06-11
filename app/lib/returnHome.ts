/** 物語終了（story.home / story.kuroneko）からホームへ戻ったときのみポップアップを出すための遷移先 */
export const RETURN_HOME_TO = "/?returned=1" as const;

const RETURN_HOME_KEY = "returned";
const RETURN_HOME_VALUE = "1";

function getSiteUrl(): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${window.location.origin}${normalizedBase}`;
}

export function isReturnHomeNavigation(searchParams: URLSearchParams): boolean {
  return searchParams.get(RETURN_HOME_KEY) === RETURN_HOME_VALUE;
}

/** クリア報告用の X 投稿画面 URL */
export function buildXShareUrl(): string {
  const siteUrl = getSiteUrl();
  const text = `WEB謎「Alice in NoneBer Land」をクリア！
あなたは架空の数字を解読し、元の世界に帰ることができました。

プレイはこちらから
${siteUrl}

#謎解き #web謎 #解読謎`;
  const params = new URLSearchParams({ text });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
