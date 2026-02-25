"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroPipelineProps = {
  name: string;
  title: string;
  summary: string;
};

const flow = [
  { key: "discover", label: "要件定義", duration: "2d" },
  { key: "design", label: "設計", duration: "5d" },
  { key: "deliver", label: "構築", duration: "8d" },
  { key: "operate", label: "運用", duration: "ongoing" }
];

export function HeroPipeline({ name, title, summary }: HeroPipelineProps): JSX.Element {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % flow.length);
    }, 1200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="site-surface relative overflow-hidden rounded-3xl px-6 py-10 md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.09),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.07),transparent_34%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-[var(--line-soft)] bg-[rgba(34,34,34,0.55)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">
            Engineering Portfolio
          </span>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            実務で価値を出す
            <span className="block gradient-text">Cloud Delivery</span>
          </h1>

          <p className="text-sm leading-7 text-[var(--text-1)] md:text-base">
            {name} / {title}
            <br />
            {summary}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="site-button-primary rounded-lg px-5 py-3 text-sm font-semibold"
            >
              実務プロジェクトを見る
            </Link>
            <Link
              href="/learning"
              className="site-button-secondary rounded-lg px-5 py-3 text-sm font-semibold"
            >
              学習アーカイブへ
            </Link>
          </div>
        </div>

        <div className="site-surface-soft rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>portfolio-delivery.yml</span>
            <span>latest run #{active + 1}</span>
          </div>

          <div className="site-panel-inset rounded-xl p-4">
            <div className="flex min-w-max items-center gap-2 overflow-x-auto pb-2">
              {flow.map((item, index) => {
                const isActive = active === index;

                return (
                  <div key={item.key} className="flex items-center gap-2">
                    <div
                      className={`w-32 rounded-md border px-3 py-2 transition ${
                        isActive ? "border-[var(--line-neon)] bg-[rgba(255,255,255,0.1)]" : "border-[var(--border-soft)] bg-[var(--surface-2)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`h-2 w-2 rounded-full ${isActive ? "bg-[var(--accent-green)]" : "bg-[var(--text-tertiary)]"}`} />
                        <span className="truncate text-xs font-semibold text-[var(--text-0)]">{item.label}</span>
                      </div>
                      <p className="mt-1 text-[10px] text-[var(--muted)]">{item.duration}</p>
                    </div>
                    {index < flow.length - 1 ? <div className="h-px w-4 bg-[var(--border-strong)]" /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
