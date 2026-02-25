const values = [
  {
    title: "設計と実装を分断しない",
    description: "要件整理から設計、構築、運用までを1本の設計思想でつなぎ、引き継ぎ可能な形で残します。",
    icon: "01"
  },
  {
    title: "運用品質を先に設計する",
    description: "監視、通知、障害切り分け導線まで含めて設計し、運用で破綻しない実装を優先します。",
    icon: "02"
  },
  {
    title: "改善サイクルを短くする",
    description: "IaC と CI/CD を軸に再現性を担保し、変更を安全に繰り返せる基盤を構築します。",
    icon: "03"
  }
];

export function ValueGrid(): JSX.Element {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {values.map((value) => (
        <article key={value.title} className="site-surface-soft rounded-2xl p-5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-strong)] text-xs font-semibold text-[var(--accent-cyan)]">
            {value.icon}
          </span>
          <h2 className="mt-3 text-lg font-semibold text-[var(--text-0)]">{value.title}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-1)]">{value.description}</p>
        </article>
      ))}
    </section>
  );
}
