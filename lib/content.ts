import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import type { Certification, Learning, Profile, ProfileKpi, ProfileLinkIcon, Project, TechTableItem } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const LEARNING_DIR = path.join(CONTENT_ROOT, "learning");
const CERTIFICATIONS_DIR = path.join(CONTENT_ROOT, "certifications");
const PROFILE_FILE = path.join(CONTENT_ROOT, "profile.md");

const TEMPLATE_FILES = new Set(["project_template.md", "learning_template.md", "certification_template.md"]);

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

function parseStringArray(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Invalid ${fieldName}: expected string[]`);
  }
  return value;
}

function parseOptionalStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseTechTable(value: unknown): TechTableItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    const record = item as { label?: unknown; values?: unknown };
    if (typeof record.label !== "string") {
      throw new Error("Invalid techTable.label: expected string");
    }

    return {
      label: record.label,
      values: parseStringArray(record.values, "techTable.values")
    };
  });
}

function requiredString(input: unknown, fieldName: string): string {
  if (typeof input !== "string" || input.trim().length === 0) {
    throw new Error(`Invalid ${fieldName}: expected non-empty string`);
  }
  return input;
}

function optionalString(input: unknown): string | undefined {
  if (typeof input !== "string") {
    return undefined;
  }
  const trimmed = input.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

function parseProfileLinkIcon(input: unknown): ProfileLinkIcon | undefined {
  if (typeof input !== "string") {
    return undefined;
  }

  if (input === "github" || input === "x" || input === "link") {
    return input;
  }

  return "link";
}

function requiredNumber(input: unknown, fieldName: string): number {
  if (typeof input !== "number" || Number.isNaN(input)) {
    throw new Error(`Invalid ${fieldName}: expected number`);
  }
  return input;
}

async function readMarkdownFiles(dir: string): Promise<Array<{ slug: string; data: Record<string, unknown>; content: string }>> {
  let entries: string[] = [];

  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const markdownFiles = entries.filter((entry) => entry.endsWith(".md") && !TEMPLATE_FILES.has(entry));

  const parsed = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(dir, fileName);
      const source = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(source);
      return {
        slug: fileName.replace(/\.md$/, ""),
        data: data as Record<string, unknown>,
        content
      };
    })
  );

  return parsed;
}

function parsePeriodStart(period: string): number {
  const match = period.match(/^(\d{4})[.-](\d{2})/);
  if (!match) {
    return 0;
  }

  return Number(`${match[1]}${match[2]}`);
}

function parseOutcomeBullets(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^・/, "").trim())
    .filter((line) => line.length > 0)
    .slice(0, 3);
}

function parseProfileKpis(value: unknown): ProfileKpi[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const kpis: ProfileKpi[] = [];

  value.forEach((item) => {
    const record = item as { label?: unknown; value?: unknown; detail?: unknown };
    if (typeof record.label !== "string" || typeof record.value !== "string") {
      return;
    }

    kpis.push({
      label: record.label,
      value: record.value,
      detail: typeof record.detail === "string" ? record.detail : undefined
    });
  });

  return kpis;
}

export async function getAllProjects(): Promise<Project[]> {
  const files = await readMarkdownFiles(PROJECTS_DIR);

  const projects = await Promise.all(
    files.map(async ({ slug, data, content }) => {
      const type = requiredString(data.type, `project.type (${slug})`);
      if (type !== "project") {
        throw new Error(`Invalid project type (${slug}): expected 'project'`);
      }

      const outcome = requiredString(data.outcome, `project.outcome (${slug})`);
      const impactMetrics = parseOptionalStringArray(data.impactMetrics);

      return {
        slug,
        title: requiredString(data.title, `project.title (${slug})`),
        type: "project" as const,
        period: requiredString(data.period, `project.period (${slug})`),
        role: requiredString(data.role, `project.role (${slug})`),
        summary: requiredString(data.summary, `project.summary (${slug})`),
        tech: parseStringArray(data.tech, `project.tech (${slug})`),
        phases: parseStringArray(data.phases, `project.phases (${slug})`),
        techTable: parseTechTable(data.techTable),
        outcome,
        impactMetrics: impactMetrics.length > 0 ? impactMetrics : parseOutcomeBullets(outcome),
        domain: optionalString(data.domain),
        scale: optionalString(data.scale),
        order: requiredNumber(data.order, `project.order (${slug})`),
        contentHtml: await markdownToHtml(content)
      };
    })
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.slice(0, limit);
}

export async function getAllLearnings(): Promise<Learning[]> {
  const files = await readMarkdownFiles(LEARNING_DIR);

  const learnings = await Promise.all(
    files.map(async ({ slug, data, content }) => {
      const type = requiredString(data.type, `learning.type (${slug})`);
      if (type !== "learning") {
        throw new Error(`Invalid learning type (${slug}): expected 'learning'`);
      }

      return {
        slug,
        title: requiredString(data.title, `learning.title (${slug})`),
        type: "learning" as const,
        period: requiredString(data.period, `learning.period (${slug})`),
        summary: requiredString(data.summary, `learning.summary (${slug})`),
        tech: parseStringArray(data.tech, `learning.tech (${slug})`),
        techTable: parseTechTable(data.techTable),
        focus: optionalString(data.focus),
        outcome: optionalString(data.outcome) ?? "・継続学習中",
        github: optionalString(data.github),
        diagram: optionalString(data.diagram),
        order: requiredNumber(data.order, `learning.order (${slug})`),
        contentHtml: await markdownToHtml(content)
      };
    })
  );

  return learnings.sort((a, b) => b.order - a.order);
}

export async function getFeaturedLearnings(limit = 3): Promise<Learning[]> {
  const learnings = await getAllLearnings();
  return learnings.slice(0, limit);
}

export async function getAllCertifications(): Promise<Certification[]> {
  const files = await readMarkdownFiles(CERTIFICATIONS_DIR);

  const certifications = await Promise.all(
    files.map(async ({ slug, data, content }) => ({
      slug,
      title: requiredString(data.title, `certification.title (${slug})`),
      issuer: requiredString(data.issuer, `certification.issuer (${slug})`),
      acquired: requiredString(data.acquired, `certification.acquired (${slug})`),
      level: optionalString(data.level),
      credentialId: optionalString(data.credentialId),
      badge: optionalString(data.badge),
      credentialUrl: optionalString(data.credentialUrl),
      order: typeof data.order === "number" ? data.order : undefined,
      contentHtml: await markdownToHtml(content)
    }))
  );

  return certifications.sort((a, b) => {
    if (typeof b.order === "number" && typeof a.order === "number") {
      return b.order - a.order;
    }

    return parsePeriodStart(b.acquired) - parsePeriodStart(a.acquired);
  });
}

export async function getProfile(): Promise<Profile> {
  try {
    const source = await fs.readFile(PROFILE_FILE, "utf8");
    const { data, content } = matter(source);

    const links = Array.isArray(data.links)
      ? data.links
          .map((item) => {
            const link = item as { label?: unknown; url?: unknown; icon?: unknown };
            if (typeof link.label !== "string" || typeof link.url !== "string") {
              return undefined;
            }
            const icon = parseProfileLinkIcon(link.icon);
            return icon ? { label: link.label, url: link.url, icon } : { label: link.label, url: link.url };
          })
          .filter((item): item is NonNullable<typeof item> => item !== undefined)
      : [];

    const kpis = parseProfileKpis(data.kpis);

    return {
      name: requiredString(data.name, "profile.name"),
      title: requiredString(data.title, "profile.title"),
      summary: requiredString(data.summary, "profile.summary"),
      intro: optionalString(data.intro),
      skills: parseStringArray(data.skills ?? [], "profile.skills"),
      links,
      kpis,
      contentHtml: await markdownToHtml(content)
    };
  } catch {
    return {
      name: "Your Name",
      title: "Cloud Engineer",
      summary: "content/profile.md を追加すると自己紹介が表示されます。",
      intro: undefined,
      skills: ["AWS", "Terraform"],
      links: [],
      kpis: [],
      contentHtml: ""
    };
  }
}
