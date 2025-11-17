export type TagDefinition = {
	label: string;
	token: string;
	hex: `#${string}`;
};

export const TAG_LIBRARY = [
	{ label: "AWS", token: "aws", hex: "#7EC3D0" },
	{ label: "Terraform", token: "terraform", hex: "#6DA3B5" },
	{ label: "Serverless", token: "serverless", hex: "#9FC9A6" },
	{ label: "Container", token: "container", hex: "#7FB2A8" },
	{ label: "Kubernetes", token: "kubernetes", hex: "#4F87A2" },
	{ label: "Docker", token: "docker", hex: "#5CA9C2" },
	{ label: "Linux", token: "linux", hex: "#A0B18C" },
	{ label: "Networking", token: "networking", hex: "#C0D6C2" },
	{ label: "Security", token: "security", hex: "#F2A5A0" },
	{ label: "Automation", token: "automation", hex: "#E7C18D" },
	{ label: "Cost Optimization", token: "cost", hex: "#F6D8B5" },
	{ label: "Data & Analytics", token: "data", hex: "#C6B6E1" },
	{ label: "Observability", token: "observability", hex: "#B0A0C0" },
	{ label: "DevOps", token: "devops", hex: "#86B5B2" },
	{ label: "IaC", token: "iac", hex: "#5F8C94" },
	{ label: "CI/CD", token: "cicd", hex: "#8ED0C3" },
	{ label: "Python", token: "python", hex: "#F7C87C" },
	{ label: "Go", token: "go", hex: "#9ED3D2" },
	{ label: "TypeScript", token: "typescript", hex: "#7AA9E6" },
	{ label: "Database", token: "database", hex: "#D5B89E" },
] as const satisfies ReadonlyArray<TagDefinition>;

export type TagLabel = (typeof TAG_LIBRARY)[number]["label"];

export const TAG_MAP = TAG_LIBRARY.reduce<Record<TagLabel, TagDefinition>>((map, tag) => {
	map[tag.label as TagLabel] = tag;
	return map;
}, {} as Record<TagLabel, TagDefinition>);

export const TAG_ORDER = TAG_LIBRARY.map((tag) => tag.label);
