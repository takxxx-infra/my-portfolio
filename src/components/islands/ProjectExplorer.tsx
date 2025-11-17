import { useMemo, useState } from "react";
import type { TagLabel } from "../../constants/tags";
import { TAG_LIBRARY, TAG_MAP } from "../../constants/tags";

type WorkItem = {
	title: string;
	slug: string;
	type: "project" | "learning";
	order: number;
	period: string;
	role?: string;
	summary: string;
	tech: string[];
	priorityTags?: string[];
	outcome: string;
	github?: string;
};

type Props = {
	items: WorkItem[];
};

const formatTagStyle = (label: string) => {
	const tag = TAG_MAP[label as TagLabel];
	const color = tag?.hex ?? "#cbd5f6";
	return {
		borderColor: color,
		backgroundColor: `${color}33`,
		color: "#0a2a33",
	};
};

const TagChip = ({
	label,
	active,
	onToggle,
}: {
	label: string;
	active: boolean;
	onToggle: () => void;
}) => (
	<button
		type="button"
		onClick={onToggle}
		style={formatTagStyle(label)}
		className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-wide transition duration-150 ${
			active ? "scale-105 shadow-md" : "opacity-70 hover:opacity-100"
		}`}
	>
		{label}
	</button>
);

const ItemCard = ({ item }: { item: WorkItem }) => (
	<article className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
		<div className="flex flex-wrap items-center justify-between gap-2">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
					{item.type === "project" ? "PROJECT" : "LEARNING"}
				</p>
				<h3 className="text-2xl font-extrabold text-slate-900">{item.title}</h3>
			</div>
			<span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold uppercase text-white">
				{item.period}
			</span>
		</div>
		{item.role && (
			<p className="text-sm font-semibold text-slate-600">Role: {item.role}</p>
		)}
		<p className="text-base leading-relaxed text-slate-700">{item.summary}</p>
		<p className="text-sm font-semibold text-emerald-700">{item.outcome}</p>
		<div className="flex flex-wrap gap-2">
			{item.tech.map((label) => (
				<span
					key={`${item.slug}-${label}`}
					style={formatTagStyle(label)}
					className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
				>
					{label}
				</span>
			))}
		</div>
		{item.github && (
			<a
				className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
				href={item.github}
				target="_blank"
				rel="noreferrer"
			>
				View GitHub Repo →
			</a>
		)}
	</article>
);

export default function ProjectExplorer({ items }: Props) {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	const filtered = useMemo(() => {
		if (!selectedTags.length) return items;
		return items.filter((item) =>
			selectedTags.every((tag) => item.tech.includes(tag)),
		);
	}, [items, selectedTags]);

	const grouped = useMemo(() => {
		return filtered.reduce<Record<WorkItem["type"], WorkItem[]>>(
			(acc, item) => {
				acc[item.type].push(item);
				return acc;
			},
			{ project: [], learning: [] },
		);
	}, [filtered]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap gap-3">
				{TAG_LIBRARY.map((tag) => (
					<TagChip
						key={tag.label}
						label={tag.label}
						active={selectedTags.includes(tag.label)}
						onToggle={() => toggleTag(tag.label)}
					/>
				))}
				{selectedTags.length > 0 && (
					<button
						type="button"
						onClick={() => setSelectedTags([])}
						className="rounded-full border border-slate-400/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900"
					>
						Clear
					</button>
				)}
			</div>

			<div className="flex flex-col gap-8">
				{grouped.project.length > 0 && (
					<section>
						<header className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-600">
								Projects
							</h2>
							<span className="text-sm text-slate-500">
								{grouped.project.length} items
							</span>
						</header>
						<div className="grid gap-5 md:grid-cols-2">
							{grouped.project.map((item) => (
								<ItemCard key={item.slug} item={item} />
							))}
						</div>
					</section>
				)}

				{grouped.learning.length > 0 && (
					<section>
						<header className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-600">
								Learning
							</h2>
							<span className="text-sm text-slate-500">
								{grouped.learning.length} items
							</span>
						</header>
						<div className="grid gap-5 md:grid-cols-2">
							{grouped.learning.map((item) => (
								<ItemCard key={item.slug} item={item} />
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
