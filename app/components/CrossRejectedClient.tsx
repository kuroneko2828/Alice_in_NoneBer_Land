import { useEffect, useState } from "react";
import { Modal } from "~/components/Modal";
import { PuzzleCheckActions, PuzzleLayout } from "~/components/PuzzleLayout";
import { CROSS_GRID } from "~/lib/crossLayout";
import { assetUrl } from "~/lib/assetUrl";
import { getProgress } from "~/lib/progress";

const KOUHO_SRC = [
  "images/7tH3ba-e74zEbr2B.png",
  "images/dyT3ksKEBSB8Q4pt.png",
  "images/fdrDDa-R-WTFpdtJ.png",
  "images/FTKTbcjU_dSd4ELT.png",
  "images/kxjuTJf3xAAe5yTf.png",
  "images/mi2TKWYM_FGuYfWz.png",
  "images/mZjUp8tYWs6fHWae.png",
  "images/PauEnBcbXDSy-3GF.png",
  "images/xBu3tDpGjjhjR27B.png",
  "images/BBfmTKNrc45DYPcw.png",
].map(assetUrl);

const keyList = (
  <ul className="m-0 list-none space-y-1 pl-0 text-left text-sm">
    <li>
      これ以外の鍵の合計+
      <img className="in-text" src={assetUrl("images/FTKTbcjU_dSd4ELT.png")} alt="" />
    </li>
    <li>
      binary
      <img className="in-text" src={assetUrl("images/7tH3ba-e74zEbr2B.png")} alt="" />
      <img className="in-text" src={assetUrl("images/BBfmTKNrc45DYPcw.png")} alt="" />
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
      <img className="in-text" src={assetUrl("images/FTKTbcjU_dSd4ELT.png")} alt="" />
      <img className="in-text" src={assetUrl("images/xBu3tDpGjjhjR27B.png")} alt="" />
      番目の素数
    </li>
    <li>短歌の文字数</li>
    <li>
      <img className="in-text" src={assetUrl("images/FTKTbcjU_dSd4ELT.png")} alt="" />
      桁の自然数のうち、最大の数
    </li>
  </ul>
);

export function CrossRejectedClient() {
  const [modal, setModal] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    setShowSkip(getProgress() >= 3);
  }, []);

  function checkCrossRejected() {
    setModal(
      `アリスは白うさぎに回答を見せませんでした。<br>ぜったい間違っていると思ったからです。`
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
              <table id="mine" className="question mx-auto shrink-0">
                <tbody>
                  {CROSS_GRID.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => {
                        if (cell === "BLK") {
                          return <td key={ci} className="black-box" />;
                        }
                        if (cell === "H") {
                          return (
                            <td key={ci} className="holder">
                              {/* 旧版はチェックに使われない */}
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
                  ))}
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
            <table id="kouho" className="mx-auto max-w-full">
              <tbody>
                <tr>
                  {KOUHO_SRC.slice(0, 8).map((src) => (
                    <td key={src} className="kouho_masu">
                      <img src={src} width={30} height={30} alt="" />
                    </td>
                  ))}
                </tr>
                <tr>
                  {KOUHO_SRC.slice(8, 10).map((src) => (
                    <td key={src} className="kouho_masu">
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
            >
              数字をクリア
            </button>
          </div>
        </div>

        <PuzzleCheckActions
          onCheck={checkCrossRejected}
          skipHref="/story/choice"
          showSkip={showSkip}
        />
      </PuzzleLayout>
      {modal ? <Modal html={modal} onClose={() => setModal(null)} /> : null}
    </>
  );
}
