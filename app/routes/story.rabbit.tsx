import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "Alice in NoneBer Land" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryRabbit() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">アリスと白うさぎ</div>
        <div className="story-content">
          <p>
            　アリスがチェシャ猫の示した道を歩くと、おどろくほど簡単に森を抜けることができました。
            そして次に広がったのは、美しい庭。
            いろとりどりのお花が植えられていて、蝶がひらひらと舞っています。
          </p>
          <p>
            　そんな中、あの白うさぎがせわしなく花に水をあげているのを見つけました。
            白うさぎはアリスに気づくと、アリスのほうにかけてきました。
          </p>
          <p>「やあ、アリス。待ちくたびれたよ！」</p>
          <p>
            　なんと、白うさぎはアリスのことを知っているようでした。
            でも、アリスはもちろん、数時間前にお姉さんの横で見たのが初めてです。
          </p>
          <p>
            「こんにちは、うさぎさん。なんでわたしのことを知っているの？」
          </p>
          <p>
            「そんなの、君がぼくを追いかけてきたからに決まってるじゃないか！」
          </p>
          <p>
            　アリスは、わけが分かりませんでしたが、ここの国の人はみんなこんな感じです。
            気にしないことにして、帰り道を聞くことにしました。
          </p>
          <p>
            「えと、わかったわ。それでわたし、帰り　
            「うんうん、分かっているさ。ぼくはそれを知っている。でも教えられない。それが決まりだからね」
          </p>
          <p>
            「でもわたし　
            「そう、君は帰らなくちゃならない。ぼくもひまじゃない。だから君はこのパズルを解くんだ」
          </p>
          <p>
            　アリスの言葉に入りこんでくるほど、早口でまくし立てる白うさぎ。
            アリスの返事をまたないまま、紙をアリスににぎらせると、また走って水やりにいってしまいました。
          </p>
          <p>　</p>
          <p>
            「もっとゆっくりすればいいのに。これを解けば帰り道を教えてくれるのかしら」
          </p>
          <p>　アリスは白うさぎから渡された紙を開きました。</p>
        </div>
      </div>
      <div className="next text-center">
        <Link
          to="/puzzle/cross-rejected"
          className="btn btn-outline-info submit-btn inline-block"
        >
          次へ
        </Link>
      </div>
    </StoryShell>
  );
}
