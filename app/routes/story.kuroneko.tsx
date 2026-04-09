import type { MetaFunction } from "@remix-run/node";
import {
  KuronekoResetButton,
  KuronekoSetProgress,
} from "~/components/KuronekoEffects";
import "~/styles/kuroneko.css";

export const meta: MetaFunction = () => [
  { title: "Alice with kuroneko" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

/**
 * 旧 story_kuroneko.html と同一の見た目（白背景・黒文字・.kuroneko のみ）。
 * グローバルの物語用スタイルは当てない。
 */
export default function StoryKuroneko() {
  return (
    <div
      className="pb-24 sm:pb-32"
      style={{ backgroundColor: "white", color: "black", minHeight: "100vh" }}
    >
      <KuronekoSetProgress />
      <div className="kuroneko" style={{ marginTop: "100px" }}>
        <p>ぼくを受け入れてありがとう。</p>
        <p>でも、ごめんね。</p>
        <p>この世界を作るのに力を使って、しばらくは何も作り出せないや。</p>
        <p>何もない空間だけど、いいよね？</p>
        <p>　</p>
        <p>　</p>
        <p>僕がいるんだから。</p>
        <p>もう離さないよ...？</p>
      </div>
      <div className="kuroneko">
        <p>もとの世界に戻りたいの？</p>
        <p>でもむだだよ。</p>
        <p>きみの声は届かないし、絶対逃さない。</p>
      </div>
      <div className="kuroneko">
        <p>...そんなにいや？</p>
      </div>
      <div className="kuroneko">
        <p>やだよ、帰らせたくない。</p>
      </div>
      <div className="kuroneko">
        <p>だってぼく、またひとりぼっちに...</p>
      </div>
      <div className="kuroneko">
        <p>......</p>
      </div>
      <div className="kuroneko">
        <p>............</p>
      </div>
      <div className="kuroneko">
        <p>.................</p>
      </div>
      <div className="kuroneko">
        <p>...わかったよ。</p>
        <p>帰らせてあげる。</p>
        <p>でも、</p>
        <br />
        <p>それなら...</p>
      </div>
      <div className="kuroneko" style={{ minHeight: 0, marginBottom: 50 }}>
        <p>全部をリセットするよ。</p>
        <p>解いてきたパズルも、きみの記憶も、みんなの記憶も。</p>
        <p>ぼくの記憶も。</p>
        <p>　</p>
        <p>そしたらまた、遊べるよね？</p>
      </div>
      <div className="mt-4 pb-8 text-center">
        <KuronekoResetButton />
      </div>
    </div>
  );
}
