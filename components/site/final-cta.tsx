import Link from "next/link";

export function FinalCta(): JSX.Element {
  return (
    <section className="site-surface relative overflow-hidden rounded-3xl p-7 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.1),transparent_44%)]" />
      <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Next Step</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-0)] md:text-3xl">案件ごとの設計判断を詳細で確認する</h2>
          <p className="mt-2 text-sm text-[var(--text-1)]">背景・課題・対応・成果を時系列で整理した全プロジェクト一覧を用意しています。</p>
        </div>
        <Link
          href="/projects"
          className="site-button-secondary site-outline-neon rounded-lg px-6 py-3 text-sm font-semibold"
        >
          Projects 詳細へ
        </Link>
      </div>
    </section>
  );
}
