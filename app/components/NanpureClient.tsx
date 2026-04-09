import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Modal } from "~/components/Modal";
import { PuzzleCheckActions, PuzzleLayout } from "~/components/PuzzleLayout";
import { NANPURE_LAYOUT } from "~/lib/nanpureLayout";
import { NANPURE_ANSWER } from "~/lib/puzzleAnswers";
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
];

export function NanpureClient() {
  const navigate = useNavigate();
  const initial = useMemo(
    () => NANPURE_ANSWER.map((row) => row.map(() => null as string | null)),
    []
  );
  const [filled, setFilled] = useState<(string | null)[][]>(initial);
  const [sel, setSel] = useState<{ r: number; h: number } | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    setShowSkip(getProgress() >= 1);
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
    if (checkNestedAnswer(filled, NANPURE_ANSWER as unknown as number[][])) {
      const p = getProgress();
      if (p < 1) setProgress(1);
      navigate("/story/tea-party-end");
      return;
    }
    setModal(
      `アリスは回答を帽子屋とマーチヘアに見せました。<br>しかし、彼らは笑いながら首を横に振るだけ。<br>どうやら間違いのようです。`
    );
  }

  const rule = (
    <div id="rule" className="box26">
      <span className="box-title">ルール</span>
      <ul>
        <li>
          まだ数字の入っていないマスに、候補から数字を選択して入れていきましょう。
        </li>
        <li>
          縦列、横列、太線で囲まれたブロックのいずれも、同じ数字が重複して入らないようにしましょう。
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <PuzzleLayout rule={rule}>
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
          <div className="flex min-w-0 flex-1 justify-center overflow-x-auto">
            <table id="nanpure" className="question mx-auto shrink-0">
              <tbody>
                {NANPURE_LAYOUT.map((row, ri) => {
                  let hi = 0;
                  return (
                    <tr key={ri}>
                      {row.map((cell, ci) => {
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

          <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:min-w-[220px] lg:max-w-[280px]">
            <h4 className="puzzle-kouho-title m-0 w-full text-center">候補</h4>
            <table id="kouho" className="mx-auto">
              <tbody>
                <tr>
                  {KOUHO_SRC.slice(0, 3).map((src) => (
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
                  {KOUHO_SRC.slice(3, 6).map((src) => (
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
                  {KOUHO_SRC.slice(6, 9).map((src) => (
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
          skipHref="/story/tea-party-end"
          showSkip={showSkip}
        />
      </PuzzleLayout>
      {modal ? <Modal html={modal} onClose={() => setModal(null)} /> : null}
    </>
  );
}
