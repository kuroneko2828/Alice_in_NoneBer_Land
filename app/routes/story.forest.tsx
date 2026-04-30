import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryForest() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスと迷いの森</div>
        <div className="story-content">
          <p>
            　アリスはお茶会を抜け出して、薄暗い森を歩きだしました。
            でも、怖さはありません。
            不思議な色のきのこや、見たことのない植物、服を着て言葉を話す動物たちがたくさんいるのです。
            アリスは心ひかれるままに、あちらこちらに足をはこんでしまいました。
          </p>
          <p>　</p>
          <p>
            　何時間たったでしょうか。
            アリスは、ふと、自分の世界のことが気になりました。
            お姉さんは心配していないか、そもそも帰れるのか...アリスは不安になって来たみちをもどろうとしました。
            でも、たくさんあるき回ったせいで、自分がどこにいるのかわからなくなっていました。
          </p>
          <p>
            「また白うさぎに出会えないかしら。あのうさぎを追ってここに来たのだから、帰り道も分かるとおもうのだけれど」
          </p>
          <p>
            　アリスは、ここに来たきっかけである白うさぎを探しますが、そんなに都合よくはいきません。
            しかし、そのかわりに頭上から声がしました。
          </p>
          <p>「白うさぎ？あのへんなやつか？」</p>
          <p>
            　上を見上げると、口が大きく広がった猫が木の枝に座っていました。
          </p>
          <p>「あなたはだあれ？あのうさぎを知っているの？」</p>
          <p>
            「オレはチェシャ猫。知っているとも言えるし、知らないとも言える。だいじなのは、うさぎがどっちに行ったのかを知っている、ということだ」
          </p>
          <p>
            　アリスは、たしかにその通りだと思いました。
            「そうね。それで、どっちに向かったの？」
          </p>
          <p>
            「おれは知っているとは言ったが、教えるとは言ってないぜ」
          </p>
          <p>
            　アリスはチェシャ猫のはぐらかすような、もやのような受け答えに頭をかかえました。
            それでも、この広い世界を手がかりもなしに探すのは大変です。
            がまんしてチェシャ猫に話しかけました。
          </p>
          <p>
            「そうしたら、どうしたら教えてくれるのかしら。ざんねんだけど、わたし何ももってないの」
          </p>
          <p>
            　チェシャ猫は、おおきな口をさらに横に広げて笑いました。
          </p>
          <p>
            「ものなんかいらないさ。あんた、お茶会でパズルをといてただろ？おれのパズルを解けたら教えてやる。それでどうだ？」
          </p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/puzzle/minesweeper"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
