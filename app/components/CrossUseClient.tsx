import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Modal } from "~/components/Modal";
import { PuzzleCheckActions, PuzzleLayout } from "~/components/PuzzleLayout";
import { CROSS_GRID } from "~/lib/crossLayout";
import { CROSS_USE_ANSWER } from "~/lib/puzzleAnswers";
import { checkNestedAnswer } from "~/lib/puzzleCodes";
import { getProgress, setProgress } from "~/lib/progress";

const KOUHO_SRC = [
  "/images/7tH3ba-e74zEbr2B.png",
  "/images/dyT3ksKEBSB8Q4pt.png",
  "/images/fdrDDa-R-WTFpdtJ.png",
  "/images/FTKTbcjU_dSd4ELT.png",
  "/images/kxjuTJf3xAAe5yTf.png",
  "/images/mi2TKWYM_FGuYfWz.png",
  "/images/mZjUp8tYWs6fHWae.png",
  "/images/PauEnBcbXDSy-3GF.png",
  "/images/xBu3tDpGjjhjR27B.png",
  "/images/BBfmTKNrc45DYPcw.png",
  "/images/3Jtg3m8pWjsdFdTz.png",
  "/images/7msaTMEKXG72mNVe.png",
  "/images/djYyKT72i5UGC-BP.png",
  "/images/rZE3atBAzwcD-fQR.png",
  "/images/wuGpVXzBtUrpp5Tx.png",
  "/images/ZGS3jepAbcwg4eNa.png",
];

const keyList = (
  <ul className="m-0 list-none space-y-1 pl-0 text-left text-sm">
    <li>
      これ以外の鍵の合計+
      <img className="in-text" src="/images/FTKTbcjU_dSd4ELT.png" alt="" />
    </li>
    <li>
      binary
      <img className="in-text" src="/images/7tH3ba-e74zEbr2B.png" alt="" />
      <img className="in-text" src="/images/BBfmTKNrc45DYPcw.png" alt="" />
      で表現できる最大値：〜E＋<b>？</b>
    </li>
    <li>
      Alice <span style={{ color: "blue" }}>B</span>lue
    </li>
    <li>
      Through the Looking-Glass,
      <br />
      and What Alice Found There
    </li>
    <li>
      <img className="in-text" src="/images/FTKTbcjU_dSd4ELT.png" alt="" />
      <img className="in-text" src="/images/xBu3tDpGjjhjR27B.png" alt="" />
      番目の素数
    </li>
    <li>短歌の文字数</li>
    <li>
      <img className="in-text" src="/images/FTKTbcjU_dSd4ELT.png" alt="" />
      桁の自然数のうち、最大の数
    </li>
  </ul>
);

export function CrossUseClient() {
  const navigate = useNavigate();
  const initial = useMemo(
    () => CROSS_USE_ANSWER.map((row) => row.map(() => null as string | null)),
    []
  );
  const [filled, setFilled] = useState<(string | null)[][]>(initial);
  const [sel, setSel] = useState<{ r: number; h: number } | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    setShowSkip(getProgress() >= 3);
  }, []);

  function placeFromKouho(src: string | null) {
    if (!sel) return;
    setFilled((prev) => {
      const next = prev.map((row) => [...row]);
      next[sel.r][sel.h] = src;
      return next;
    });
  }

  function check() {
    if (
      checkNestedAnswer(filled, CROSS_USE_ANSWER as unknown as number[][])
    ) {
      const p = getProgress();
      if (p < 3) setProgress(3);
      navigate("/story/choice");
      return;
    }
    setModal(
      `アリスは回答を白うさぎに見せました。<br>「違うよ！早く解いて！」`
    );
  }

  const rule = (
    <div id="rule" className="box26">
      <span className="box-title">ルール</span>
      <ul>
        <li>マスに数字を入れて、盤面を完成させてください。</li>
        <li>鍵は、盤面で出現する数を表しています。</li>
        <li>数字は、左から右、もしくは上から下の順に並びます。</li>
      </ul>
    </div>
  );

  return (
    <>
      <PuzzleLayout rule={rule}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
            <div className="flex justify-center overflow-x-auto lg:flex-1">
              <table id="cross" className="question mx-auto shrink-0">
                <tbody>
                  {CROSS_GRID.map((row, ri) => {
                    let hi = 0;
                    return (
                      <tr key={ri}>
                        {row.map((cell, ci) => {
                          if (cell === "BLK") {
                            return <td key={ci} className="black-box" />;
                          }
                          if (cell === "H") {
                            const idx = hi;
                            hi += 1;
                            const active =
                              sel?.r === ri && sel?.h === idx ? "clicked" : "";
                            return (
                              <td
                                key={ci}
                                className={`holder ${active}`}
                                onClick={() =>
                                  setSel((s) =>
                                    s?.r === ri && s?.h === idx
                                      ? null
                                      : { r: ri, h: idx }
                                  )
                                }
                              >
                                {filled[ri][idx] ? (
                                  <img
                                    src={filled[ri][idx]!}
                                    width={46}
                                    height={46}
                                    alt=""
                                  />
                                ) : null}
                              </td>
                            );
                          }
                          return (
                            <td key={ci}>
                              <img src={cell.src} width={30} height={30} alt="" />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="box26 min-w-0 flex-1 lg:max-w-md">
              <h5 className="box-title text-center">鍵</h5>
              {keyList}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-[#95ccff]/20 pt-6">
            <h4 className="puzzle-kouho-title m-0">候補</h4>
            <div className="w-full overflow-x-auto">
              <table id="kouho" className="mx-auto">
                <tbody>
                  <tr>
                    {KOUHO_SRC.slice(0, 8).map((src) => (
                      <td
                        key={src}
                        className="kouho_masu"
                        onClick={() => placeFromKouho(src)}
                      >
                        <img src={src} width={30} height={30} alt="" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {KOUHO_SRC.slice(8, 16).map((src) => (
                      <td
                        key={src}
                        className="kouho_masu"
                        onClick={() => placeFromKouho(src)}
                      >
                        <img src={src} width={30} height={30} alt="" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              id="clear_masu"
              className="btn puzzle-sub-btn rounded-full"
              onClick={() => placeFromKouho(null)}
            >
              数字をクリア
            </button>
          </div>
        </div>

        <PuzzleCheckActions
          onCheck={check}
          skipHref="/story/choice"
          showSkip={showSkip}
        />
      </PuzzleLayout>
      {modal ? <Modal html={modal} onClose={() => setModal(null)} /> : null}
    </>
  );
}
