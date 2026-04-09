import { useEffect, type ReactNode } from "react";

type Props = {
  onClose: () => void;
  /** 白枠の幅など。未指定時は従来どおり w-full max-w-[80vw] */
  panelClassName?: string;
} & (
  | { html: string; children?: undefined }
  | { html?: undefined; children: ReactNode }
);

export function Modal({ html, children, onClose, panelClassName }: Props) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const panelSizing = panelClassName ?? "w-full max-w-[80vw]";

  return (
    <div
      className="fixed inset-0 z-[200] flex animate-modal-in items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="閉じる"
        onClick={onClose}
      />
      <div
        className={`relative max-h-[80vh] overflow-auto rounded-2xl border-2 border-[#95ccff] bg-white p-6 shadow-xl ${panelSizing}`}
      >
        {children ?? (
          <div
            className="text-base text-gray-700 [&_button]:mt-2 [&_button]:rounded-lg [&_button]:border-2 [&_button]:border-[#95ccff] [&_button]:px-4 [&_button]:py-2 [&_button]:text-[#95ccff]"
            dangerouslySetInnerHTML={{ __html: html! }}
          />
        )}
      </div>
    </div>
  );
}
