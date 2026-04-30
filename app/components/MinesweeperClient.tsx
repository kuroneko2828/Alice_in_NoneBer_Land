import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Modal } from "~/components/Modal";
import { PuzzleCheckActions, PuzzleLayout } from "~/components/PuzzleLayout";
import { MINE_LAYOUT } from "~/lib/mineLayout";
import { MINE_ANSWER } from "~/lib/puzzleAnswers";
import { checkNestedAnswer } from "~/lib/puzzleCodes";
import { assetUrl } from "~/lib/assetUrl";
import { getProgress, setProgress } from "~/lib/progress";

const KOUHO_SRC = [
  "images/7tH3ba-e74zEbr2B.png",
  "images/dyT3ksKEBSB8Q4pt.png",
  "images/fdrDDa-R-WTFpdtJ.png",
  "images/FTKTbcjU_dSd4ELT.png",
  "images/kxjuTJf3xAAe5yTf.png",
  "images/mi2TKWYM_FGuYfWz.png",
  "images/PauEnBcbXDSy-3GF.png",
  "images/xBu3tDpGjjhjR27B.png",
  "images/BBfmTKNrc45DYPcw.png",
  "images/black_box.png",
].map(assetUrl);

export function MinesweeperClient() {
  const navigate = useNavigate();
  const initial = useMemo(
    () => MINE_ANSWER.map((row) => row.map(() => null as string | null)),
    []
  );
  const [filled, setFilled] = useState<(string | null)[][]>(initial);
  const [sel, setSel] = useState<{ r: number; h: number } | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    setShowSkip(getProgress() >= 2);
  }, []);

  function placeFromKouho(src: string | null) {
    if (!sel) return;
    setFilled((prev) => {
      const next = prev.map((row) => [...row]);
      next[sel.r][sel.h] = src;
      return next;
    });
  }

  function placeFlag() {
    if (!sel) return;
    placeFromKouho(assetUrl("images/flag.png"));
  }

  function check() {
    if (checkNestedAnswer(filled, MINE_ANSWER as unknown as number[][])) {
      const p = getProgress();
      if (p < 2) setProgress(2);
      navigate("/story/escape-forest");
      return;
    }
    setModal(
      `アリスは回答をチェシャ猫に見せました。<br>「違うね。これじゃあ白うさぎの行った場所は教えられないよ」`
    );
  }

  const rule = (
    <div id="rule" className="box26">
      <span className="box-title">ルール</span>
      <ul>
        <li>
          盤面の数字は、そのマスに隣接する黒マスの数（斜めも含む）を表しています。
        </li>
        <li>
          空白のマスに数字をいれる、もしくは空白を黒マスにして、盤面を完成させましょう。
        </li>
        <li>候補にある数字は、全て盤面に出てくるようにしてください。</li>
        <li>フラグは自由にお使いください。答えには関係しません。</li>
      </ul>
    </div>
  );

  return (
    <>
      <PuzzleLayout rule={rule}>
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
          <div className="flex min-w-0 flex-1 justify-center overflow-x-auto">
            <table id="mine" className="question mx-auto shrink-0">
              <tbody>
                {MINE_LAYOUT.map((row, ri) => {
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
                            <img
                              src={cell.src}
                              width={30}
                              height={30}
                              alt=""
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:min-w-[240px] lg:max-w-[300px]">
            <h4 className="puzzle-kouho-title m-0 w-full text-center">候補</h4>
            <table id="kouho" className="mx-auto">
              <tbody>
                <tr>
                  {KOUHO_SRC.slice(0, 4).map((src) => (
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
                  {KOUHO_SRC.slice(4, 8).map((src) => (
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
                  {KOUHO_SRC.slice(8, 10).map((src) => (
                    <td
                      key={src}
                      className="kouho_masu"
                      onClick={() => placeFromKouho(src)}
                    >
                      <img
                        src={src}
                        width={src.includes("black") ? 48 : 30}
                        height={src.includes("black") ? 48 : 30}
                        alt=""
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="puzzle-sub-btn-row">
              <button
                type="button"
                id="clear_masu"
                className="btn puzzle-sub-btn rounded-full"
                onClick={() => placeFromKouho(null)}
              >
                数字をクリア
              </button>
              <button
                type="button"
                id="flag"
                className="btn puzzle-sub-btn rounded-full"
                onClick={placeFlag}
              >
                フラグを立てる
              </button>
            </div>
          </div>
        </div>

        <PuzzleCheckActions
          onCheck={check}
          skipHref="/story/escape-forest"
          showSkip={showSkip}
        />
      </PuzzleLayout>
      {modal ? <Modal html={modal} onClose={() => setModal(null)} /> : null}
    </>
  );
}
