export type TechTableItem = {
  label: string;
  values: string[];
};

export type Project = {
  slug: string;
  title: string;
  type: "project";
  period: string;
  role: string;
  summary: string;
  tech: string[];
  phases: string[];
  techTable: TechTableItem[];
  outcome: string;
  impactMetrics: string[];
  domain?: string;
  scale?: string;
  order: number;
  contentHtml: string;
};

export type Learning = {
  slug: string;
  title: string;
  type: "learning";
  period: string;
  summary: string;
  tech: string[];
  techTable: TechTableItem[];
  focus?: string;
  outcome: string;
  github?: string;
  diagram?: string;
  order: number;
  contentHtml: string;
};

export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  acquired: string;
  level?: string;
  credentialId?: string;
  badge?: string;
  credentialUrl?: string;
  order?: number;
  contentHtml: string;
};

export type ProfileLinkIcon = "github" | "x" | "link";

export type ProfileLink = {
  label: string;
  url: string;
  icon?: ProfileLinkIcon;
};

export type ProfileKpi = {
  label: string;
  value: string;
  detail?: string;
};

export type Profile = {
  name: string;
  title: string;
  summary: string;
  intro?: string;
  skills: string[];
  links: ProfileLink[];
  kpis: ProfileKpi[];
  contentHtml: string;
};
