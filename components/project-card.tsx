import type { Project } from "@/types/content";

import { TechTable } from "@/components/tech-table";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

function renderBullets(text: string): JSX.Element[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^・/, "").trim())
    .filter((line) => line.length > 0)
    .map((line, index) => <li key={`${line}-${index}`}>{line}</li>);
}

export function ProjectCard({ project, detailed = false }: ProjectCardProps): JSX.Element {
  return (
    <article className="site-surface-soft grid gap-6 rounded-3xl p-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{project.period}</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--text-0)]">{project.title}</h3>
          <p className="mt-1 text-sm text-[var(--text-1)]">{project.role}</p>
        </div>

        <p className="whitespace-pre-line text-sm leading-7 text-[var(--text-1)]">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.phases.map((phase) => (
            <span key={phase} className="site-chip rounded-full px-3 py-1 text-xs text-[var(--text-1)]">
              {phase}
            </span>
          ))}
        </div>

        <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--text-1)]">{renderBullets(project.outcome)}</ul>

        <div className="flex flex-wrap gap-2">
          {project.impactMetrics.map((metric) => (
            <span key={`${project.slug}-${metric}`} className="rounded-full border border-[var(--line-neon)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[var(--text-secondary)]">
              {metric}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-[var(--text-0)]">技術スタック</p>
        <TechTable items={project.techTable} />
      </div>

      {detailed && project.contentHtml.length > 0 ? (
        <div className="prose site-panel-inset col-span-full max-w-none rounded-2xl p-4">
          <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        </div>
      ) : null}
    </article>
  );
}
