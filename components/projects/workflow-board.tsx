"use client";

import { useMemo, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/content";

type WorkflowBoardProps = {
  projects: Project[];
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
    if (selected.length >= 3) {
      return selected;
    }
  }

  for (const tech of project.tech) {
    if (!selected.includes(tech)) {
      selected.push(tech);
    }
    if (selected.length >= 3) {
      break;
    }
  }

  return selected;
}

function getStatusBand(index: number, total: number): "old" | "recent" | "latest" {
  if (index >= total - 2) {
    return "latest";
  }

  if (index >= total - 4) {
    return "recent";
  }

  return "old";
}

function statusClasses(status: "old" | "recent" | "latest", selected: boolean): string {
  if (status === "latest") {
    return selected ? "border-[var(--line-neon)] bg-[rgba(255,255,255,0.16)]" : "border-[var(--line-strong)] bg-[rgba(255,255,255,0.08)]";
  }

  if (status === "recent") {
    return selected ? "border-[var(--line-strong)] bg-[rgba(255,255,255,0.12)]" : "border-[var(--line-strong)] bg-[rgba(39,39,39,0.9)]";
  }

  return selected ? "border-[var(--line-strong)] bg-[rgba(45,45,45,0.92)]" : "border-[var(--line-soft)] bg-[var(--surface-inset)]";
}

function statusDotClasses(status: "old" | "recent" | "latest"): string {
  if (status === "latest") {
    return "bg-[var(--text-secondary)] shadow-[0_0_0_4px_rgba(255,255,255,0.18)]";
  }

  if (status === "recent") {
    return "bg-[var(--text-secondary)]";
  }

  return "bg-[var(--text-tertiary)]";
}

function getDesktopFitScale(total: number): number {
  return Math.max(0.42, Math.min(1, 5.8 / Math.max(1, total)));
}

export function ProjectWorkflowBoard({ projects }: WorkflowBoardProps): JSX.Element {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(projects.at(-1)?.slug ?? null);
  const [zoomPercent, setZoomPercent] = useState(100);

  const selected = useMemo(() => projects.find((project) => project.slug === selectedSlug) ?? projects.at(-1), [projects, selectedSlug]);

  const oldest = projects[0];
  const newest = projects.at(-1);
  const topStacks = Array.from(new Set(projects.flatMap((project) => project.tech))).slice(0, 4).join(" / ");
  const fitScale = getDesktopFitScale(projects.length);

  if (projects.length === 0) {
    return <p className="text-sm text-[var(--text-tertiary)]">業務経歴データが見つかりませんでした。</p>;
  }

  return (
    <div className="space-y-4">
      <section className="site-panel rounded-xl p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-[var(--text-tertiary)]">Triggered via career timeline</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{projects.length} workflows</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)]">Status</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-secondary)]">Success</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)]">Total duration</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
              {oldest?.period} → {newest?.period}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)]">Artifacts</p>
            <p className="mt-1 truncate text-sm font-semibold text-[var(--text-secondary)]">{topStacks}</p>
          </div>
        </div>
      </section>

      <section className="site-panel rounded-xl p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold text-[var(--text-primary)]">career-workflow.yml</p>
            <p className="text-sm text-[var(--text-tertiary)]">on: timeline</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="site-panel-inset rounded-md px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">{zoomPercent}%</span>
          </div>
        </div>

        <div className="hidden md:block">
          <TransformWrapper
            initialScale={fitScale}
            minScale={0.35}
            maxScale={2.2}
            centerOnInit
            wheel={{ step: 0.08 }}
            panning={{ disabled: false }}
            onInit={() => setZoomPercent(Math.round(fitScale * 100))}
            onTransformed={(_, state) => setZoomPercent(Math.round(state.scale * 100))}
          >
            {({ zoomIn, zoomOut, centerView }) => (
              <>
                <div className="mb-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => zoomOut()}
                    className="site-button-secondary rounded-md px-2.5 py-1 text-xs"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => centerView(fitScale, 200)}
                    className="site-button-secondary rounded-md px-2.5 py-1 text-xs"
                  >
                    Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => zoomIn()}
                    className="site-button-secondary rounded-md px-2.5 py-1 text-xs"
                  >
                    +
                  </button>
                </div>

                <TransformComponent
                  wrapperClass="!w-full !h-[260px] !rounded-lg !border !border-[var(--line-soft)] !bg-[var(--surface-inset)]"
                  contentClass="!w-max !h-full !p-8"
                >
                  <div className="flex min-w-max items-center">
                    {projects.map((project, index) => {
                      const status = getStatusBand(index, projects.length);
                      const stacks = getRepresentativeStacks(project);
                      const isSelected = selected?.slug === project.slug;

                      return (
                        <div key={project.slug} className="flex items-center">
                          {index !== 0 ? <div className="h-px w-12 bg-[var(--line-soft)]" /> : null}
                          <button
                            type="button"
                            onClick={() => setSelectedSlug(project.slug)}
                            className={`w-[220px] rounded-lg border px-3 py-2 text-left transition ${statusClasses(status, isSelected)}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${statusDotClasses(status)}`} />
                                <span className="truncate text-sm font-semibold text-[var(--text-primary)]">{project.title}</span>
                              </div>
                              <span className="shrink-0 text-[11px] text-[var(--text-tertiary)]">#{project.order}</span>
                            </div>
                            <p className="mt-1 text-[11px] text-[var(--text-tertiary)]">{project.period}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {stacks.map((stack) => (
                                <span
                                  key={`${project.slug}-${stack}`}
                                  className="rounded-full border border-[var(--line-soft)] bg-[rgba(34,34,34,0.82)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                                >
                                  {stack}
                                </span>
                              ))}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>

        <div className="space-y-4 md:hidden">
          {projects.map((project, index) => {
            const status = getStatusBand(index, projects.length);
            const stacks = getRepresentativeStacks(project);
            const isSelected = selected?.slug === project.slug;

            return (
              <div key={project.slug} className="relative pl-7">
                {index !== projects.length - 1 ? <span className="absolute left-[9px] top-6 h-[calc(100%+10px)] w-px bg-[var(--line-soft)]" /> : null}
                <span
                  className={`absolute left-0 top-2 h-5 w-5 rounded-full border border-[var(--line-soft)] ${
                    status === "latest" ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(180,180,180,0.45)]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setSelectedSlug(project.slug)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition ${statusClasses(status, isSelected)}`}
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{project.title}</p>
                  <p className="mt-1 text-[11px] text-[var(--text-tertiary)]">{project.period}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {stacks.map((stack) => (
                      <span
                        key={`${project.slug}-m-${stack}`}
                        className="rounded-full border border-[var(--line-soft)] bg-[rgba(34,34,34,0.82)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {selected ? (
        <section className="site-panel rounded-xl p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Selected Job Details</p>
            <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(34,34,34,0.8)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">
              {selected.period}
            </span>
          </div>
          <ProjectCard project={selected} detailed />
        </section>
      ) : null}
    </div>
  );
}
