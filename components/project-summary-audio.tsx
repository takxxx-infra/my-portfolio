"use client";

import { useMemo, useRef, useState } from "react";

type ProjectSummaryAudioProps = {
  projectSlug: string;
  projectTitle: string;
};

type AudioState = "idle" | "loading" | "playing" | "error";

const audioBaseUrl = process.env.NEXT_PUBLIC_AUDIO_BASE_URL ?? "";

function buildAudioUrl(projectSlug: string): string {
  const baseUrl = audioBaseUrl.replace(/\/+$/, "");
  if (baseUrl.length === 0) {
    return "";
  }

  return `${baseUrl}/projects/${encodeURIComponent(projectSlug)}.mp3`;
}

function getButtonLabel(state: AudioState, hasAudioUrl: boolean): string {
  if (!hasAudioUrl) {
    return "音声準備中";
  }

  if (state === "loading") {
    return "読み込み中";
  }

  if (state === "playing") {
    return "停止";
  }

  if (state === "error") {
    return "再試行";
  }

  return "要約音声を再生";
}

export function ProjectSummaryAudio({ projectSlug, projectTitle }: ProjectSummaryAudioProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioState>("idle");
  const audioUrl = useMemo(() => buildAudioUrl(projectSlug), [projectSlug]);
  const hasAudioUrl = audioUrl.length > 0;

  async function handleToggleAudio(): Promise<void> {
    const audio = audioRef.current;
    if (!audio || !hasAudioUrl || state === "loading") {
      return;
    }

    if (state === "playing") {
      audio.pause();
      setState("idle");
      return;
    }

    try {
      setState("loading");
      audio.currentTime = 0;
      await audio.play();
      setState("playing");
    } catch {
      setState("error");
    }
  }

  const buttonLabel = getButtonLabel(state, hasAudioUrl);

  return (
    <div className="site-panel-inset rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Audio summary</p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-0)]">要約音声</p>
        </div>

        <button
          type="button"
          onClick={handleToggleAudio}
          disabled={!hasAudioUrl || state === "loading"}
          aria-label={`${projectTitle} の要約音声を${state === "playing" ? "停止" : "再生"}`}
          className="site-button-secondary inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55"
        >
          <span aria-hidden="true" className="text-xs">
            {state === "playing" ? "II" : "▶"}
          </span>
          <span>{buttonLabel}</span>
        </button>
      </div>

      {hasAudioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          onPlaying={() => setState("playing")}
          onPause={() => setState((current) => (current === "playing" ? "idle" : current))}
          onEnded={() => setState("idle")}
          onError={() => setState("error")}
        />
      ) : null}

      {state === "error" ? <p className="mt-3 text-xs text-[var(--term-warn)]">音声ファイルを読み込めませんでした。</p> : null}
    </div>
  );
}
