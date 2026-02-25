import Link from "next/link";

import type { Project } from "@/types/content";

type FeatureProjectsProps = {
  projects: Project[];
};

export function FeatureProjects({ projects }: FeatureProjectsProps): JSX.Element {
  if (projects.length === 0) {
    return (
      <section className="site-surface-soft rounded-2xl p-6">
        <p className="text-sm text-[var(--text-1)]">プロジェクトデータがありません。</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Featured Projects</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-0)]">成果につながった案件</h2>
        </div>
        <Link href="/projects" className="site-link text-sm font-semibold">
          すべて見る
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.slug} className="site-surface-soft flex h-full flex-col rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{project.period}</p>
            <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-[var(--text-0)]">{project.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-1)]">{project.role}</p>
            <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--text-1)]">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.impactMetrics.slice(0, 2).map((metric) => (
                <span key={`${project.slug}-${metric}`} className="site-chip rounded-full px-3 py-1 text-xs text-[var(--text-1)]">
                  {metric}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <span className="text-xs text-[var(--muted)]">{project.domain ?? "業務案件"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
