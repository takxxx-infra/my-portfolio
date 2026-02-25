"use client";

import { useMemo, useState } from "react";

import { ProjectAccordion } from "@/components/project-accordion";
import type { Project } from "@/types/content";

type ProjectsCatalogProps = {
  projects: Project[];
  initialOpenSlug?: string;
};

function optionize(values: Array<string | undefined>, fallback: string): string[] {
  const unique = Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))));
  return unique.length > 0 ? ["All", ...unique] : ["All", fallback];
}

export function ProjectsCatalog({ projects, initialOpenSlug }: ProjectsCatalogProps): JSX.Element {
  const domains = useMemo(() => optionize(projects.map((project) => project.domain), "General"), [projects]);
  const roles = useMemo(() => optionize(projects.map((project) => project.role), "Engineer"), [projects]);

  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const domainOk = selectedDomain === "All" || project.domain === selectedDomain;
        const roleOk = selectedRole === "All" || project.role === selectedRole;
        return domainOk && roleOk;
      }),
    [projects, selectedDomain, selectedRole]
  );

  return (
    <section className="space-y-6">
      <div className="site-surface-soft flex flex-wrap gap-3 rounded-2xl p-4">
        <label className="text-xs text-[var(--muted)]">
          Domain
          <select
            value={selectedDomain}
            onChange={(event) => setSelectedDomain(event.target.value)}
            className="site-input mt-1 block rounded-md px-3 py-2 text-sm"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-[var(--muted)]">
          Role
          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
            className="site-input mt-1 block rounded-md px-3 py-2 text-sm"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <div className="ml-auto flex items-end text-xs text-[var(--muted)]">{filtered.length} projects</div>
      </div>

      <ProjectAccordion projects={filtered} initialOpenSlug={initialOpenSlug} />
    </section>
  );
}
