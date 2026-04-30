import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryTeaPartyEnd() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスとお茶会のおわり</div>
        <div className="story-content">
          <p>
            　アリスは回答を帽子屋とマーチヘアに見せました。
            彼らは目を丸くしてアリスの答えをみていましたが、やがて、顔を見合わせました。
          </p>
          <p>「おいマーチ、答え、こうだったか？」</p>
          <p>「いや、どうだったか...こんなかんじだった気もするんだけど」</p>
          <p>
            　どうやら、じぶんたちが作ったパズルの答えがわからないようです。
            そんな問題を出されたヤマネは、今度は帽子屋とマーチヘアにむかって怒りはじめます。
          </p>
          <p>
            「自分でも解けない問題を出すなんてどうかしてる！」
            「いいや、もう答えはわかったのだから問題ない！これがその答えだ！」
          </p>
          <p>
            　けんかが始まってしまったようです。
            アリスはせっかくパズルを解くことができたのに、みんなの様子にうんざりしてしまいました。
          </p>
          <p>
            　こんなけんかに巻きこまれるなんてごめんだわ、なんてアリスは思って、気づかれないようにお茶会からはなれていきます。
          </p>
          <p>　</p>
          <p>
            「それにしても、本当に知らない数字だったわ。どれがどの数だったのかしら」
          </p>
          <p>
            　自分の知ってる数字とさっき見た数字をあたまの中で思い浮かべながら、アリスは森に入っていきます。
          </p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/story/forest"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
