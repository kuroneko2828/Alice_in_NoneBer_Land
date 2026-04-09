import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryEscapeForest() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスと迷いの森からの脱出</div>
        <div className="story-content">
          <p>　アリスは回答をチェシャ猫に見せました。</p>
          <p>「おれが見こんだだけのことはある。正解さ」</p>
          <p>
            　しかし、チェシャ猫はさらに笑みを深めると、すーっと消えていったのでした。
            約束が違います。アリスはまだ、白うさぎ行った方向を教えてもらってません。
          </p>
          <p>
            　アリスはたまらなく叫びました。
            「チェシャ猫さん、話が違うわ！」
          </p>
          <p>
            「おれは教えるとは言ったが、消えないとは言ってないぜ」
          </p>
          <p>
            　チェシャ猫が消えた場所から、まだ声が聞こえます。
            　でもじっさいに、まだ教えてもらってません。
          </p>
          <p>
            　...いいえ、やっぱりアリスは教えてもらっていたのです。
            チェシャ猫の消えた場所をよく見てみると、木の枝に混ざって、猫の尻尾が浮かんでいるのでした。
            その尻尾は、ゆらゆらと揺れながら、ある道を示しています。
            この道を白うさぎは通っていったのでしょうか。
          </p>
          <p>「チェシャ猫さん、ありがとう」</p>
          <p>
            　アリスは尻尾に向かってお礼を言いましたが、返ってくるのは尻尾のゆればかりです。
          </p>
          <p>
            「きっと照れ屋さんな猫だったのね。変なことばっかり言ってたけど、助けてくれたもの」
          </p>
          <p>
            　アリスは、手を振ると白うさぎを見つけるために先へすすんで行きます。
          </p>
          <p>
            「これで数字は全部わかったわね！どんなパズルでもかかってきなさい！」
          </p>
          <p>　</p>
          <p>
            　三日月のような笑みを浮かべる猫には、やっぱり気づいていないようです。
          </p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/story/rabbit"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
