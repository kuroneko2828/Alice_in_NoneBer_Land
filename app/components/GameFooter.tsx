import { useNavigate, useLocation } from "@remix-run/react";
import { useCallback, useState } from "react";
import { Modal } from "~/components/Modal";
import { assetUrl } from "~/lib/assetUrl";
import { isLewis } from "~/lib/isLewis";

export function GameFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState("");
  const [modalHtml, setModalHtml] = useState<string | null>(null);
  const [crossLinkOpen, setCrossLinkOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalHtml(null);
    setCrossLinkOpen(false);
  }, []);

  const redirectByAnswer = useCallback(() => {
    const path = location.pathname;
    const a = answer.trim();

    if (path === "/puzzle/nanpure") {
      if (a === "帽子屋" || a === "ヤマネ") {
        setModalHtml(
          `「どうしたんだ？まさか解けないわけじゃないだろう？」<br>「解けるよ！君の世界には同じようなパズルはあったりしない？数字が分からなくても解けるはずだよ！」`
        );
      } else if (a === "マーチヘア") {
        setModalHtml(
          `「解けないなら、自動解答してくれるサイトを使うのもありだよ！...なにを言っているんだろう」`
        );
      } else if (isLewis(a)) {
        setModalHtml(`ここにパパはいない`);
      } else {
        setModalHtml(`その人はここにいないようだ。`);
      }
      return;
    }

    if (path === "/puzzle/minesweeper") {
      if (a === "チェシャ猫") {
        setModalHtml(
          `「お茶会で見た数字と、このパズルの数字、全部同じ数字だったか？そこが手がかりになるぜ。もっとヒントが欲しいなら、チェシャ猫さまって呼ぶんだな」`
        );
      } else if (a === "チェシャ猫さま") {
        setModalHtml(
          `「このパズルにしかない数字が表している数がわかったら、今度は左上の数字が分かるはずだぜ。別の場所にある同じ数字も見て、どの数を表しているのかをしぼりこむんだ。うん？まだヒントが欲しい？チェシャ猫さまさまって呼んだらおしえてやるぜ。くつじょくか？」`
        );
      } else if (a === "チェシャ猫さまさま") {
        setModalHtml(
          `「最後のほうは、候補の数字が全て盤面に出てくるってルールも大事になるぜ。もうヒントはおしまいだ。そろそろ解いてくれよ？」`
        );
      } else if (isLewis(a)) {
        setModalHtml(`ここにパパはいない`);
      } else {
        setModalHtml(`その人はここにいないようだ。`);
      }
      return;
    }

    if (path === "/puzzle/cross-rejected") {
      if (a === "白うさぎ") {
        setModalHtml(
          `「パズル解けた？...ぼくにヒント？無理だよ。ぼくはあのねこに、きみにこれを解かせるように言われただけだもん。さあ、早く解いて！」`
        );
      } else if (a === "チェシャ猫") {
        setModalHtml(
          `「なんだい、呼び出して。そのパズル作ったのはオレじゃないぞ？わかんないなら引き返しな。振り返ることもときには大切さ」`
        );
      } else if (a === "くろねこ") {
        setCrossLinkOpen(true);
        return;
      } else if (isLewis(a)) {
        setModalHtml(`ここにパパはいない`);
      } else {
        setModalHtml(`その人はここにいないようだ。`);
      }
      return;
    }

    if (path === "/puzzle/cross") {
      if (a === "白うさぎ") {
        setModalHtml(`「だからぼくは知らないってば！じゃましないでよ！」`);
      } else if (a === "くろねこ") {
        setModalHtml(
          `『まずは、数字がどの数を表しているのかを特定しないとね。小さい方から数字を並べたときに何か規則性があったりしないかな？何かが増えたり消えたりとか...ね。もっとヒントが欲しいならねこちゃんって呼んでよ』`
        );
      } else if (a === "ねこちゃん") {
        setModalHtml(
          `『<img src="${assetUrl("images/mi2TKWYM_FGuYfWz.png")}" style="width: 1em; height: 1em;">進数と<img src="${assetUrl("images/3Jtg3m8pWjsdFdTz.png")}" style="width: 1em; height: 1em;">進数が数字を解読するヒントだよ。もっとヒントが欲しいなら、くろねこ好きって言ってよ』`
        );
      } else if (a === "くろねこ好き") {
        setModalHtml(
          `『ありがとう！！数字がわかったなら、鍵を全部数字に直すといいよ。それから、確実に分かるところから入れていくんだ！そっかぁ、ぼくのこと好きなんだぁ』`
        );
      } else if (isLewis(a)) {
        setModalHtml(`ここにパパはいない`);
      } else {
        setModalHtml(`その人はここにいないようだ。`);
      }
      return;
    }

    if (path === "/story/choice") {
      if (a === "くろねこ") {
        navigate("/story/kuroneko");
        return;
      }
      if (isLewis(a)) {
        navigate("/story/home");
        return;
      }
      setModalHtml(`その人はここにいないようだ。`);
    }
  }, [answer, location.pathname, navigate]);

  return (
    <>
      <footer id="footer" className="justify-center">
        <div className="input-group w-full max-w-2xl shadow-sm">
          <input
            type="text"
            className="form-control rounded-l-full border-2 border-[#95ccff]/45 bg-white px-4 py-2.5 text-gray-600 placeholder:text-gray-400"
            placeholder="呼びたい人の名前"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              const ne = e.nativeEvent;
              // IME 変換確定の Enter は「名前を呼ぶ」にしない（確定後の Enter のみ）
              if (ne.isComposing || ne.keyCode === 229) return;
              redirectByAnswer();
            }}
          />
          <button
            type="button"
            className="rounded-r-full border-2 border-l-0 border-[#95ccff]/45 bg-[#f5faff] px-5 py-2.5 text-[#6aa8e8] hover:bg-[#eef6ff]"
            id="answer_button"
            onClick={redirectByAnswer}
          >
            名前を呼ぶ
          </button>
        </div>
      </footer>
      {modalHtml ? <Modal html={modalHtml} onClose={closeModal} /> : null}
      {crossLinkOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="閉じる"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-[80vw] rounded-2xl border-2 border-[#95ccff] bg-white p-6 shadow-xl">
            <p className="text-gray-700">
              『ごめんごめんっ、白うさぎに送ったパズル間違えてたよ。これが本当のパズルだよ』
              <br />
              アリスが名前を呼ぶと、頭の中で声が聞こえました。そして、目の前に紙が落ちてきたのです。
            </p>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="rounded-lg border-2 border-[#95ccff] px-4 py-2 text-[#95ccff]"
                onClick={() => {
                  closeModal();
                  navigate("/puzzle/cross");
                }}
              >
                パズルを見る
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
