import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";
import { RETURN_HOME_TO } from "~/lib/returnHome";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryHome() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスと帰宅</div>
        <div className="story-content">
          <p>
            　アリスがパパの名前を呼ぶと、だんだんと眠くなってきました。このまま元の世界に戻るのでしょうか。
            アリスは最後にくろねこに言った言葉を思い返しました。
          </p>
          <p>
            「おさそいありがとう、くろねこさん。でもいいの。わたしの世界にも十分不思議なことはあるの。お姉さんは不思議なほど頭がいいし、ダイナは不思議なくらい寝てるのに不思議なくらい美人さん。それに、こっちに来たかったら、また白うさぎさんが案内してくれるかもしれないでしょ？」
          </p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to={RETURN_HOME_TO}
          className="btn btn-outline-info submit-btn inline-block"
        >
          本を閉じる
        </Link>
      </div>
    </StoryShell>
  );
}
