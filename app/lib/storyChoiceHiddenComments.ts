/**
 * /story/choice の入力欄用。本編の「くろねこ」「ルイス・キャロル」とは別に、
 * 物語に登場した名前を入れるとモーダルで一言返す隠し要素。
 */
const HIDDEN_COMMENTS: Record<string, string> = {
  チェシャ猫:
    "「まよっているのか？　わるいけど、その答えはあんた自身に聞くしかないぜ？」",

  白うさぎ:
    "「まだなにか用かい！？　ぼくは早く寝たいんだけど！」",

  帽子屋:
    "「おいヤマネ！　わしの帽子を食べるな！！」",
  マーチヘア:
    "(食器の割れる音と、苦しそうな寝息が聞こえてくる)",
  ヤマネ:
    "「お茶菓子がないぞ！　こんなのお茶会じゃない！」",

  アリス:
    "「わたしは、おうちに帰りたい」",
};

export function getStoryChoiceHiddenComment(answer: string): string | null {
  const a = answer.trim();
  if (!a) return null;
  return HIDDEN_COMMENTS[a] ?? null;
}
