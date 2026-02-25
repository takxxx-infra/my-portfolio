"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/content";

type ProjectAccordionProps = {
  projects: Project[];
  initialOpenSlug?: string;
};

const PRIORITY_LABELS = ["プラットフォーム", "クラウド", "AWSサービス", "IaC", "OS", "言語"];

function getRepresentativeStacks(project: Project): string[] {
  const selected: string[] = [];

  for (const label of PRIORITY_LABELS) {
    const entry = project.techTable.find((item) => item.label === label);
    if (!entry || entry.values.length === 0) {
      continue;
    }
    selected.push(entry.values[0]);
    if (selected.length >= 4) {
      return selected;
    }
  }

  for (const tech of project.tech) {
    if (!selected.includes(tech)) {
      selected.push(tech);
    }
    if (selected.length >= 4) {
      break;
    }
  }

  return selected;
}

function hasProjectSlug(projects: Project[], slug: string): boolean {
  return projects.some((project) => project.slug === slug);
}

export function ProjectAccordion({ projects, initialOpenSlug }: ProjectAccordionProps): JSX.Element {
  const [openSlug, setOpenSlug] = useState<string | null>(() => {
    if (initialOpenSlug && hasProjectSlug(projects, initialOpenSlug)) {
      return initialOpenSlug;
    }
    return null;
  });
  const lastHandledInitialSlugRef = useRef<string | null>(initialOpenSlug ?? null);

  useEffect(() => {
    const nextInitialSlug = initialOpenSlug ?? null;
    if (nextInitialSlug === lastHandledInitialSlugRef.current) {
      return;
    }
    lastHandledInitialSlugRef.current = nextInitialSlug;

    if (nextInitialSlug && hasProjectSlug(projects, nextInitialSlug)) {
      setOpenSlug(nextInitialSlug);
      return;
    }
    setOpenSlug(null);
  }, [initialOpenSlug, projects]);

  useEffect(() => {
    if (openSlug && !hasProjectSlug(projects, openSlug)) {
      setOpenSlug(null);
    }
  }, [openSlug, projects]);

  if (projects.length === 0) {
    return <p className="site-surface-soft rounded-2xl p-5 text-sm text-[var(--text-1)]">該当する業務経歴はありません。</p>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const isOpen = openSlug === project.slug;
        const stacks = getRepresentativeStacks(project);

        return (
          <section key={project.slug} className="site-surface-soft rounded-2xl p-2">
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : project.slug)}
              className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-left transition hover:bg-white/5"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-[var(--text-0)]">{project.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stacks.map((stack) => (
                    <span key={`${project.slug}-${stack}`} className="site-chip rounded-full px-2.5 py-1 text-[11px] text-[var(--text-1)]">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-[var(--muted)]">{isOpen ? "Close" : "Open"}</span>
            </button>

            {isOpen ? (
              <div className="px-2 pb-2">
                <ProjectCard project={project} detailed />
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
