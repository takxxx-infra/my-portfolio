import { defineCollection, z } from "astro:content";

const sharedFields = {
	title: z.string(),
	period: z.string(),
	summary: z.string(),
	tech: z.array(z.string()),
	phases: z.array(z.string()).optional(),
	techTable: z
		.array(
			z.object({
				label: z.string(),
				values: z.array(z.string()),
			}),
		)
		.optional(),
	priorityTags: z.array(z.string()).optional(),
	outcome: z.string(),
	github: z.union([z.string().url(), z.boolean()]).optional(),
	diagram: z.string().optional(),
	order: z.number().default(100),
};

const projects = defineCollection({
	type: "content",
	schema: z.object({
		type: z.literal("project"),
		role: z.string(),
		...sharedFields,
	}),
});

const learning = defineCollection({
	type: "content",
	schema: z.object({
		type: z.literal("learning"),
		role: z.string().optional(),
		...sharedFields,
	}),
});

export const collections = {
	projects,
	learning,
};
