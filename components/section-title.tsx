type SectionTitleProps = {
  title: string;
  description?: string;
};

export function SectionTitle({ title, description }: SectionTitleProps): JSX.Element {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
        Section
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">{title}</h2>
      {description ? <p className="text-sm text-[var(--text-secondary)]">{description}</p> : null}
    </div>
  );
}
