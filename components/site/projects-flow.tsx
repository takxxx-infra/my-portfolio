import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/content";

type ProjectsFlowProps = {
  projects: Project[];
  fullBleed?: boolean;
};

type PlaceholderCard = {
  kind: "placeholder";
  id: string;
  title: string;
  summary: string;
};

type FlowItem =
  | {
      kind: "project";
      project: Project;
    }
  | PlaceholderCard;

type TerraformTone = "resource" | "attribute" | "brace" | "comment";

type TerraformLine = {
  text: string;
  indent: number;
  tone: TerraformTone;
};

const TERRAFORM_LINES: TerraformLine[] = [
  { text: "terraform {", indent: 0, tone: "resource" },
  { text: "required_version = \">= 1.6.0\"", indent: 1, tone: "attribute" },
  { text: "}", indent: 0, tone: "brace" },
  { text: "provider \"aws\" {", indent: 0, tone: "resource" },
  { text: "region = \"ap-northeast-1\"", indent: 1, tone: "attribute" },
  { text: "default_tags {", indent: 1, tone: "resource" },
  { text: "tags = {", indent: 2, tone: "resource" },
  { text: "Project = \"portfolio\"", indent: 3, tone: "attribute" },
  { text: "ManagedBy = \"terraform\"", indent: 3, tone: "attribute" },
  { text: "}", indent: 2, tone: "brace" },
  { text: "}", indent: 1, tone: "brace" },
  { text: "}", indent: 0, tone: "brace" },
  { text: "resource \"aws_vpc\" \"shared\" {", indent: 0, tone: "resource" },
  { text: "cidr_block = \"10.20.0.0/16\"", indent: 1, tone: "attribute" },
  { text: "enable_dns_hostnames = true", indent: 1, tone: "attribute" },
  { text: "tags = { Name = \"portfolio-shared-vpc\" }", indent: 1, tone: "attribute" },
  { text: "}", indent: 0, tone: "brace" },
  { text: "resource \"aws_subnet\" \"public_a\" {", indent: 0, tone: "resource" },
  { text: "vpc_id = aws_vpc.shared.id", indent: 1, tone: "attribute" },
  { text: "availability_zone = \"ap-northeast-1a\"", indent: 1, tone: "attribute" },
  { text: "cidr_block = \"10.20.1.0/24\"", indent: 1, tone: "attribute" },
  { text: "map_public_ip_on_launch = true", indent: 1, tone: "attribute" },
  { text: "}", indent: 0, tone: "brace" },
  { text: "resource \"aws_security_group\" \"web\" {", indent: 0, tone: "resource" },
  { text: "name = \"portfolio-web-sg\"", indent: 1, tone: "attribute" },
  { text: "vpc_id = aws_vpc.shared.id", indent: 1, tone: "attribute" },
  { text: "ingress {", indent: 1, tone: "resource" },
  { text: "from_port = 443", indent: 2, tone: "attribute" },
  { text: "to_port = 443", indent: 2, tone: "attribute" },
  { text: "protocol = \"tcp\"", indent: 2, tone: "attribute" },
  { text: "cidr_blocks = [\"0.0.0.0/0\"]", indent: 2, tone: "attribute" },
  { text: "}", indent: 1, tone: "brace" },
  { text: "egress {", indent: 1, tone: "resource" },
  { text: "from_port = 0", indent: 2, tone: "attribute" },
  { text: "to_port = 0", indent: 2, tone: "attribute" },
  { text: "protocol = \"-1\"", indent: 2, tone: "attribute" },
  { text: "cidr_blocks = [\"0.0.0.0/0\"]", indent: 2, tone: "attribute" },
  { text: "}", indent: 1, tone: "brace" },
  { text: "}", indent: 0, tone: "brace" },
  { text: "# workloads for ECS/Lambda are attached in per-project modules", indent: 0, tone: "comment" }
];

const PLACEHOLDER_LINES: Array<{ title: string; summary: string }> = [
  { title: "awaiting_next_migration", summary: "TODO: capture architecture decisions and rollout notes." },
  { title: "incident_playbook_draft", summary: "WIP: define SLO alerting and incident response workflow." },
  { title: "cost_optimization_backlog", summary: "Queued: rightsizing and schedule automation tasks." },
  { title: "platform_hardening_task", summary: "Pending: baseline security controls and audit checklist." }
];

const STACK_PRIORITY_LABELS = ["プラットフォーム", "クラウド", "AWSサービス", "IaC", "OS/HyperVisor", "OS", "言語・ツール", "言語"];

type StackBadge = {
  key: string;
  label: string;
  iconSrc?: string;
  text: string;
  isAws?: boolean;
};

function detectPrimaryStack(project: Project): string {
  for (const label of STACK_PRIORITY_LABELS) {
    const entry = project.techTable.find((item) => item.label === label);
    if (entry?.values?.[0]) {
      return entry.values[0];
    }
  }
  return project.tech[0] ?? "Stack";
}

function toStackIconText(stack: string): string {
  const value = stack.toLowerCase();
  if (value.includes("aws") || value.includes("amazon")) return "AWS";
  if (value.includes("terraform")) return "TF";
  if (value.includes("kubernetes") || value.includes("k8s")) return "K8s";
  if (value.includes("proxmox")) return "PX";
  if (value.includes("citrix")) return "CTX";
  if (value.includes("python")) return "Py";
  if (value.includes("bash")) return "SH";
  if (value.includes("zabbix")) return "ZBX";
  if (value.includes("linux")) return "LIN";
  if (value.includes("windows")) return "WIN";
  if (value.includes("lambda")) return "LMD";

  const letters = stack
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
  return letters || "ST";
}

function collectStackCandidates(project: Project): string[] {
  const fromTech = project.tech;
  const fromTable = project.techTable.flatMap((item) => item.values);
  return Array.from(new Set([...fromTech, ...fromTable].filter(Boolean)));
}

function toStackBadge(project: Project): StackBadge {
  const candidates = collectStackCandidates(project);

  const hasAws = candidates.find((value) => /aws|amazon/i.test(value));
  if (hasAws) {
    return {
      key: "aws",
      label: hasAws,
      iconSrc: "/images/icon/aws-icon.png",
      text: "AWS",
      isAws: true
    };
  }

  const hasLinux = candidates.find((value) => /linux|rhel|centos|rocky|ubuntu|amazon linux/i.test(value));
  if (hasLinux) {
    return {
      key: "linux",
      label: hasLinux,
      iconSrc: "/images/icon/linux_logo_icon_171222.png",
      text: "LIN"
    };
  }

  const primaryStack = detectPrimaryStack(project);
  return {
    key: "primary",
    label: primaryStack,
    text: toStackIconText(primaryStack)
  };
}

function splitLanes(projects: Project[]): [Project[], Project[]] {
  const left = projects.filter((_, index) => index % 2 === 0);
  const right = projects.filter((_, index) => index % 2 === 1);

  if (left.length === 0) {
    return [projects, projects];
  }

  if (right.length === 0) {
    return [left, left];
  }

  return [left, right];
}

function buildLaneItems(projects: Project[], laneKey: "left" | "right"): FlowItem[] {
  const minCardsPerLane = 4;
  const base: FlowItem[] = projects.map((project) => ({ kind: "project", project }));

  if (base.length >= minCardsPerLane) {
    return base;
  }

  const needed = minCardsPerLane - base.length;
  const placeholders = Array.from({ length: needed }, (_, index) => {
    const source = PLACEHOLDER_LINES[index % PLACEHOLDER_LINES.length];
    return {
      kind: "placeholder" as const,
      id: `${laneKey}-placeholder-${index}`,
      title: source.title,
      summary: source.summary
    };
  });

  return [...base, ...placeholders];
}

function FlowProjectCard({ project }: { project: Project }): JSX.Element {
  const primaryStack = detectPrimaryStack(project);
  const badge = toStackBadge(project);

  return (
    <Link
      href={`/projects?slug=${encodeURIComponent(project.slug)}`}
      aria-label={`${project.title} の詳細へ`}
      className="projects-flow-card site-surface-soft group relative block w-full max-w-[320px] shrink-0 rounded-xl p-4 transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--line-neon)] hover:shadow-[var(--glow-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--line-neon)] md:w-[320px] md:max-w-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[var(--text-tertiary)]">{project.period}</p>
          <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-tight text-[var(--text-primary)]">{project.title}</h3>
        </div>
        <span
          title={badge.label}
          className={`inline-flex h-14 w-14 shrink-0 items-center justify-center border text-[11px] font-semibold ${
            badge.isAws
              ? "overflow-hidden rounded-full border-[rgba(255,255,255,0.24)] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.28)]"
              : "overflow-hidden rounded-full border-[var(--line-strong)] bg-[rgba(28,28,28,0.95)] text-[var(--text-primary)]"
          }`}
        >
          {badge.iconSrc ? (
            <Image
              src={badge.iconSrc}
              alt={`${badge.label} icon`}
              width={40}
              height={40}
              className={badge.isAws ? "h-9 w-9 object-contain" : "h-10 w-10 object-contain"}
            />
          ) : (
            badge.text
          )}
        </span>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">{project.summary}</p>
      <p className="mt-3 text-[11px] text-[var(--text-tertiary)]">{primaryStack}</p>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)] opacity-0 transition group-hover:opacity-100">
        Open
      </span>
    </Link>
  );
}

function FlowPlaceholderCard({ item }: { item: PlaceholderCard }): JSX.Element {
  return (
    <article className="projects-flow-card-placeholder relative w-full max-w-[320px] shrink-0 rounded-xl border border-dashed border-[var(--line-soft)] bg-[rgba(38,38,38,0.32)] p-4 md:w-[320px] md:max-w-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[var(--text-tertiary)]">placeholder</p>
          <h3 className="mt-2 line-clamp-1 font-mono text-sm font-semibold text-[var(--text-secondary)]">{item.title}</h3>
        </div>
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--line-soft)] bg-[rgba(28,28,28,0.8)] text-[10px] font-semibold text-[var(--text-tertiary)]">
          DEV
        </span>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-[var(--text-tertiary)]">{item.summary}</p>
    </article>
  );
}

function FlowBackdrop(): JSX.Element {
  return (
    <div className="projects-flow-backdrop" aria-hidden="true">
      <article className="projects-flow-manifest">
        <header className="projects-flow-manifest-header">
          <span className="projects-flow-manifest-dot" />
          <span className="projects-flow-manifest-dot" />
          <span className="projects-flow-manifest-dot" />
          <span className="projects-flow-manifest-title">aws.tf</span>
        </header>
        <ol className="projects-flow-manifest-body">
          {TERRAFORM_LINES.map((line, index) => (
            <li key={`${line.text}-${line.indent}-${index}`} className={`projects-flow-manifest-line projects-flow-manifest-line-${line.tone}`}>
              <span className="projects-flow-manifest-lineno">{index + 1}</span>
              <span className="projects-flow-manifest-indent" style={{ width: `${line.indent * 14}px` }} />
              <span className="projects-flow-manifest-code">{line.text}</span>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}

export function ProjectsFlow({ projects, fullBleed = false }: ProjectsFlowProps): JSX.Element {
  if (projects.length === 0) {
    return <p className="mt-6 text-sm text-[var(--text-tertiary)]">プロジェクトデータがありません。</p>;
  }

  const [leftLane, rightLane] = splitLanes(projects);
  const leftFlow = buildLaneItems(leftLane, "left");
  const rightFlow = buildLaneItems(rightLane, "right");
  const leftItems = [...leftFlow, ...leftFlow];
  const rightItems = [...rightFlow, ...rightFlow];

  return (
    <>
      <div className="mt-6 grid justify-items-center gap-4 md:hidden">
        {projects.map((project) => (
          <FlowProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className={`projects-flow-root ${fullBleed ? "mt-8" : "mt-8"} relative hidden min-h-[52rem] overflow-hidden md:block`}>
        <FlowBackdrop />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden lg:block">
          <div className="mx-auto grid max-w-6xl grid-cols-[1.1fr_1fr] gap-8 px-6">
            <div />
            <aside className="projects-flow-copy">
              <h3>AWSを中心に様々なプロジェクトに対応しています</h3>
              <p>要件整理から設計、構築、運用改善までを一気通貫で担当しています。</p>
              <p>Terraform を軸に、再現性・保守性・セキュリティを意識した基盤を設計し、継続運用に耐える構成へ落とし込んでいます。</p>
            </aside>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10 z-10 space-y-4">
          <div className="projects-flow-mask">
            <div className="projects-flow-track-left">
              {leftItems.map((item, index) => (
                item.kind === "project" ? (
                  <FlowProjectCard key={`${item.project.slug}-left-${index}`} project={item.project} />
                ) : (
                  <FlowPlaceholderCard key={`${item.id}-${index}`} item={item} />
                )
              ))}
            </div>
          </div>

          <div className="projects-flow-mask">
            <div className="projects-flow-track-right">
              {rightItems.map((item, index) => (
                item.kind === "project" ? (
                  <FlowProjectCard key={`${item.project.slug}-right-${index}`} project={item.project} />
                ) : (
                  <FlowPlaceholderCard key={`${item.id}-${index}`} item={item} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
