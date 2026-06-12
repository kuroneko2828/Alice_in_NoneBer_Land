import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  /** 白枠の幅など。未指定時は従来どおり w-full max-w-[80vw] */
  panelClassName?: string;
} & (
  | { html: string; children?: undefined }
  | { html?: undefined; children: ReactNode }
);

export function Modal({ html, children, onClose, panelClassName }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const panelSizing = panelClassName ?? "w-full max-w-[80vw]";

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] animate-modal-in overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="閉じる"
        onClick={onClose}
      />
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center p-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:min-h-full sm:p-4">
        <div
          className={`my-auto w-full max-w-[80vw] rounded-2xl border-2 border-[#95ccff] bg-white p-6 shadow-xl sm:max-h-[min(90dvh,720px)] ${panelSizing}`}
        >
          {children ?? (
            <div
              className="max-h-[calc(90dvh-3rem)] overflow-y-auto text-base text-gray-700 [&_button]:mt-2 [&_button]:rounded-lg [&_button]:border-2 [&_button]:border-[#95ccff] [&_button]:px-4 [&_button]:py-2 [&_button]:text-[#95ccff]"
              dangerouslySetInnerHTML={{ __html: html! }}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
