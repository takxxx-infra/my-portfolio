"use client";

import { useEffect, useMemo, useState } from "react";

type TerminalHeroProps = {
  name: string;
  title: string;
  summary: string;
  ctaHref: string;
};

const steps = [
  { id: "setup", duration: "3s" },
  { id: "build-targets", duration: "4s" },
  { id: "validate", duration: "6s" },
  { id: "migrate", duration: "5s" },
  { id: "notify", duration: "2s" }
];

export function TerminalHero({ name, title, summary, ctaHref }: TerminalHeroProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(true), 80);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="site-surface relative overflow-hidden rounded-[20px] px-6 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_85%,rgba(255,255,255,0.06),transparent_35%)]" />

      <div className={`relative grid gap-8 md:grid-cols-[1fr_1.1fr] ${introVisible ? "animate-floatIn" : "opacity-0"}`}>
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-md border border-[var(--line-soft)] bg-[rgba(34,34,34,0.88)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            GitHub Actions style portfolio
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">{name}</h1>
            <p className="text-lg text-[var(--text-secondary)]">{title}</p>
            <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">{summary}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={ctaHref} className="site-button-primary rounded-md px-5 py-2.5 text-sm font-semibold">
              業務経歴を見る
            </a>
            <a href="/learning" className="site-button-secondary rounded-md px-5 py-2.5 text-sm font-semibold">
              学習実績を見る
            </a>
          </div>
        </div>

        <div className="site-panel-inset rounded-xl p-4">
          <div className="site-panel mb-4 grid gap-3 rounded-lg p-3 md:grid-cols-4">
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)]">Triggered via</p>
              <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">push</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)]">Status</p>
              <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">Success</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)]">Duration</p>
              <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">4m 38s</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--text-tertiary)]">Run</p>
              <p className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">#{activeIndex + 1}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">deploy.yml</p>
            <p className="mb-4 text-xs text-[var(--text-tertiary)]">on: push</p>

            <div className="site-panel overflow-x-auto rounded-lg p-3">
              <div className="flex min-w-max items-center">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-[130px] rounded-md border px-2.5 py-2 transition ${
                          isActive
                            ? "border-[var(--line-neon)] bg-[rgba(255,255,255,0.11)]"
                            : "border-[var(--line-soft)] bg-[rgba(33,33,33,0.8)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`h-2 w-2 rounded-full ${isActive ? "bg-[var(--accent-cyan)]" : "bg-[var(--text-tertiary)]"}`} />
                          <span className="truncate text-[11px] font-semibold text-[var(--text-secondary)]">{step.id}</span>
                          <span className="text-[10px] text-[var(--text-tertiary)]">{step.duration}</span>
                        </div>
                      </div>
                      {index < steps.length - 1 ? <div className="h-px w-5 bg-[var(--line-soft)]" /> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
