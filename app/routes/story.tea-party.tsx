import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryTeaParty() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスとお茶会</div>
        <div className="story-content">
          <p>
            　アリスが目をあけると、そこは森の中。
            目の前には小屋があり、その庭でお茶会が開かれていました。
            テーブルの周りには、おかしな帽子を被った青年に、ネクタイをつけた野うさぎが座っていました。
            アリスが追っていた白うさぎはいないようです。
          </p>
          <p>　でもアリスは、もうそんなことどうでもよくなりました。</p>
          <p>「穴の底にこんな世界があるなんて！」</p>
          <p>
            　アリスはその不思議な光景に引き寄せられるように近づいていきました。
          </p>
          <p>　</p>
          <p>「やや！招かれていないやつがきたぞ！」</p>
          <p>　帽子を被った青年がアリスに気がついて叫びます。</p>
          <p>
            「帽子屋、落ち着こうぜ。お嬢さん、僕はマーチヘア。お茶でもいかが？...ほら、これで招かれた人になった」
          </p>
          <p>
            　チョッキを着た野うさぎ...マーチヘアがアリスを手招きします。
            アリスが隣の帽子屋を見ると、マーチヘアの言葉でなっとくしたようにうなずいています。
          </p>
          <p>
            　アリスはよろこんで近くの席に座りました。
            しかし、その席にはもう主人がいたのです。
            アリスは椅子の上で眠っているヤマネを踏んづけてしまいました。
          </p>
          <p>「ぅぎゃっ！！」</p>
          <p>「まあ！ごめんなさい！まさか椅子の上で眠っているなんて」</p>
          <p>
            　アリスは慌てて立ち上がりましたが、ヤマネはかんかんに怒っています。
            アリスが何を言っても聞いてもらえず、帽子屋とマーチヘアはそれを見て笑っています。
          </p>
          <p>
            　どうしようもなくなって、帰ろうかと思ってきたとき、ヤマネは突然冷静になって、にやっと笑いました。
          </p>
          <p>
            「そしたら、このパズル解いてよ。あいつらに出されたけど、解けなくてふて寝してたのさ」
          </p>
          <p>
            　ずっと怒られていてうんざりしていたアリスは、とつぜん出てきたパズルという単語に興奮しました。
          </p>
          <p>「パズル！もちろんよ！さあ、早く見せてちょうだい！」</p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/puzzle/nanpure"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
