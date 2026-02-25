type WorkflowStripProps = {
  labels: string[];
};

export function WorkflowStrip({ labels }: WorkflowStripProps): JSX.Element {
  return (
    <section className="site-surface-soft rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Project Workflow</p>
      <div className="mt-4 flex min-w-max items-center gap-2 overflow-x-auto pb-1">
        {labels.map((label, index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-2">
            <div className="site-chip rounded-full px-4 py-2 text-xs font-semibold text-[var(--text-1)]">{label}</div>
            {index < labels.length - 1 ? <div className="h-px w-4 bg-[var(--border-strong)]" /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
