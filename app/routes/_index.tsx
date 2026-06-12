import type { MetaFunction } from "@remix-run/node";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import { ChapterLinks } from "~/components/ChapterLinks";
import { CookieCrack } from "~/components/CookieCrack";
import { KonamiListener } from "~/components/KonamiListener";
import { Modal } from "~/components/Modal";
import { assetUrl } from "~/lib/assetUrl";
import { buildXShareUrl, isReturnHomeNavigation } from "~/lib/returnHome";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/lib/siteMeta";

export const meta: MetaFunction = () => {
  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showReturnModal, setShowReturnModal] = useState(false);

  useEffect(() => {
    if (!isReturnHomeNavigation(searchParams)) return;
    setShowReturnModal(true);
    navigate("/", { replace: true });
  }, [searchParams, navigate]);

  const closeReturnModal = useCallback(() => setShowReturnModal(false), []);

  const openXShare = useCallback(() => {
    window.open(buildXShareUrl(), "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-visible pb-16"
      style={{ paddingBottom: 0 }}
    >
      <KonamiListener />
      {showReturnModal ? (
        <Modal
          onClose={closeReturnModal}
          panelClassName="return-modal-panel max-w-[min(92vw,22rem)] !p-4 sm:max-w-[min(92vw,36rem)] sm:!p-6"
        >
          <div className="return-modal-body text-center text-gray-800">
            <h2 className="mb-3 text-2xl font-bold tracking-wide sm:mb-5 sm:text-4xl">
              帰還
            </h2>
            <p className="mb-2.5 text-sm leading-snug sm:mb-4 sm:text-base sm:leading-relaxed">
              無事に元の世界に帰還することができました！おめでとうございます！
            </p>
            <p className="mb-4 text-sm leading-snug sm:mb-5 sm:text-base sm:leading-relaxed">
              クリア報告をXにポストしていただけると、とても嬉しいです。
            </p>
            <button
              type="button"
              className="return-share-btn"
              onClick={openXShare}
            >
              Xでポストする
            </button>
          </div>
        </Modal>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 10%, rgba(149,204,255,0.35), transparent 60%), radial-gradient(700px 450px at 90% 30%, rgba(255,195,195,0.35), transparent 55%), radial-gradient(600px 400px at 50% 90%, rgba(255,246,230,0.9), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 pt-[12vh] text-center">
        <h1
          id="book-title"
          className="font-lobster text-5xl text-[#6b7b8c] drop-shadow-sm sm:text-6xl md:text-7xl"
          style={{
            borderBottom: "solid 3px #95ccff",
            display: "inline-block",
            paddingBottom: "0.15em",
          }}
        >
          Alice in NoneBer Land
        </h1>
        <p id="author" className="mt-5 text-lg text-[#7c8aa0]">
          作：くろねこ
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-2xl px-4">
        <div id="rule" className="box26">
          <span className="box-title">注意事項</span>
          <ul className="text-left text-[#5c6b7a]">
            <li>
              各パズルを解いた後、この画面から、そのパズルの後から物語を再開することが可能になります。
            </li>
            <li>各パズル内での進捗（埋めた数字）の情報は保存されません。</li>
            <li>コンピュータ・情報系の基礎知識が多少必要になります。</li>
            <li>検索は自由にして構いません。</li>
            <li>ソースコードの閲覧は禁止です。</li>
            <li>どうぞお楽しみください。</li>
          </ul>
        </div>
      </div>

      <div className="relative mt-8 text-center">
        <CookieCrack src={assetUrl("images/play_me.png")} alt="PLAY ME" />
      </div>

      <div className="relative mt-6 text-center">
        <ChapterLinks />
      </div>
    </div>
  );
}
