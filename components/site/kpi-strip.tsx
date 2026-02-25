type KpiItem = {
  label: string;
  value: string;
  detail: string;
};

type KpiStripProps = {
  items: KpiItem[];
};

export function KpiStrip({ items }: KpiStripProps): JSX.Element {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="site-surface-soft rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--text-0)]">{item.value}</p>
          <p className="mt-2 text-sm text-[var(--text-1)]">{item.detail}</p>
        </article>
      ))}
    </section>
  );
}
