/** 物語終了（story.home / story.kuroneko）からホームへ戻ったときのみポップアップを出すための遷移先 */
export const RETURN_HOME_TO = "/?returned=1" as const;

const RETURN_HOME_KEY = "returned";
const RETURN_HOME_VALUE = "1";

export function isReturnHomeNavigation(searchParams: URLSearchParams): boolean {
  return searchParams.get(RETURN_HOME_KEY) === RETURN_HOME_VALUE;
}
