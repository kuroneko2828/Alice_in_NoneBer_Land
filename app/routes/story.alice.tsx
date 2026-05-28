import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryAlice() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスとうさぎ穴</div>
        <div className="story-content">
          <p>
            　アリスはお姉さんといっしょに、草のしげった土手にすわっていました。
            お姉さんは絵のない本を読むのに集中していて、アリスにかまってくれません。
            アリスは退屈と暖かい日差しのせいでとても眠くて、頭がぼんやりしてきていました。
          </p>
          <p>
            　ところがそのとき、ピンクの目をした白うさぎが、すぐそばを走っていきました。
            おどろくことに、白うさぎからは「たいへんだ！　どうしよう！　まにあいそうもないぞ！」
            というひとりごとが聞こえてきます。
            しかも、うさぎはチョッキを着て、そのポケットから時計を取り出していたのです。
          </p>
          <p>
            　アリスは飛び上がって、夢中になって白うさぎを追いかけました。
            お姉さんのとなりで退屈しているよりも、ずっとおもしろそうだと思ったからです。
          </p>
          <p>
            　白うさぎは、大きなウサギ穴に飛びこみました。
            穴はとても大きく、深く、暗かったのですが、アリスはそんなちっぽけなことなんて考えることもなく、後に続いて穴に飛びこんでしまいました。
          </p>
          <p>　</p>
          <p>
            　穴はおそろしく深いようですが、とてもゆっくりと落ちていっているようでした。
            そのため、アリスは怖いとは思いませんでした。
            それよりも、あたりを見るのに夢中になっているようです。
            なにしろ、穴の側面は棚のようになっていて、様々なものがかざられているのです。
            食器、本、地図、絵、ジャム...そんな中に、大きな看板を見つけました。
          </p>
          <p>　</p>
          <p style={{ fontWeight: "bold", textAlign: "center" }}>
            〜Welcome to NoneBer Land〜
          </p>
          <p className="story-inset" style={{ padding: "0 50px 0 50px" }}>
            この国の住民はパズルが大好き。
            パズルでいろんなことが解決します。
          </p>
          <p className="story-inset" style={{ padding: "0 50px 0 50px" }}>
            でも気をつけて！この国の数字はあなたの国の数字とは違います。
            もし、どうしても解けないパズルだったら、パズルを出してきた人や、周りの人に助けを求めるといいかもしれません。
          </p>
          <p>　</p>
          <p>
            　アリスは看板を見て喜びました。
            パズル！アリスが大好きな遊びです。
          </p>
          <p>「でも、数字が違うってどういうことかしら」</p>
          <p>
            　アリスがそんなことを考えていると、穴もようやく終わりを迎えたようです。
            明るい光が下から広がってきて、おもわず目をつむってしまいました。
          </p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/story/tea-party"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
