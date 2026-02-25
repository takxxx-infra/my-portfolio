"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type LearningDiagramViewerProps = {
  title: string;
  src?: string;
};

export function LearningDiagramViewer({ title, src }: LearningDiagramViewerProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(100);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    modalRef.current?.focus();
  }, [open]);

  if (!src) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line-soft)] bg-[var(--surface-inset)] p-4 text-sm text-[var(--text-tertiary)]">
        構成図は未登録です。
      </div>
    );
  }

  const modal =
    open && typeof document !== "undefined" ? (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(20,20,20,0.92)] p-4" onClick={() => setOpen(false)}>
        <div
          className="relative h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-inset)]"
          onClick={(event) => event.stopPropagation()}
          ref={modalRef}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              return;
            }

            if (event.key === "+" || event.key === "=") {
              event.preventDefault();
              const target = event.currentTarget.querySelector<HTMLButtonElement>('button[aria-label=\"拡大\"]');
              target?.click();
              return;
            }

            if (event.key === "-" || event.key === "_") {
              event.preventDefault();
              const target = event.currentTarget.querySelector<HTMLButtonElement>('button[aria-label=\"縮小\"]');
              target?.click();
              return;
            }

            if (event.key === "0") {
              event.preventDefault();
              const target = event.currentTarget.querySelector<HTMLButtonElement>('button[aria-label=\"リセット\"]');
              target?.click();
            }
          }}
        >
          <TransformWrapper
            initialScale={1}
            minScale={0.6}
            maxScale={5}
            centerOnInit
            wheel={{ step: 0.1 }}
            onInit={() => setZoomPercent(100)}
            onTransformed={(_, state) => setZoomPercent(Math.round(state.scale * 100))}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => zoomOut()}
                    className="site-button-secondary rounded-full px-3 py-2"
                    aria-label="縮小"
                  >
                    -
                  </button>
                  <div className="site-panel-inset rounded-full px-3 py-2 text-xs font-semibold text-[var(--text-primary)]">
                    {zoomPercent}%
                  </div>
                  <button
                    type="button"
                    onClick={() => resetTransform()}
                    className="site-button-secondary rounded-full px-3 py-2"
                    aria-label="リセット"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => zoomIn()}
                    className="site-button-secondary rounded-full px-3 py-2"
                    aria-label="拡大"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="site-button-secondary rounded-full px-3 py-2"
                    aria-label="閉じる"
                  >
                    Close
                  </button>
                </div>
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                  <div className="flex h-full w-full items-center justify-center">
                    <Image src={src} alt={`${title} の構成図詳細`} width={1800} height={1200} className="h-auto max-h-full w-auto max-w-full" />
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[rgba(24,24,24,0.86)]"
      >
        <Image
          src={src}
          alt={`${title} の構成図`}
          width={1200}
          height={675}
          className="h-56 w-full object-contain p-2 transition duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 rounded-full border border-[var(--line-soft)] bg-[rgba(28,28,28,0.84)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">
          Click to Zoom
        </span>
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
