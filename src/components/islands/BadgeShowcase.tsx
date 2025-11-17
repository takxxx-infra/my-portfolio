import { useState } from "react";

type Badge = {
	name: string;
	provider: string;
	issuedOn: string;
	credentialId?: string;
	image: string;
};

type Props = {
	badges: Badge[];
};

export default function BadgeShowcase({ badges }: Props) {
	const [active, setActive] = useState<string | null>(null);

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{badges.map((badge) => {
				const isActive = active === badge.name;
				return (
					<button
						type="button"
						key={badge.name}
						onMouseEnter={() => setActive(badge.name)}
						onMouseLeave={() => setActive(null)}
						onClick={() => setActive((prev) => (prev === badge.name ? null : badge.name))}
					className={`group relative flex flex-col items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 ${
						isActive ? "scale-[1.02] border-slate-400 shadow-md" : ""
					}`}
					>
						<img
							src={badge.image}
							alt={badge.name}
							className="h-16 w-16 rounded-full border border-slate-200 object-cover"
							loading="lazy"
						/>
						<div className="text-center">
							<p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{badge.provider}</p>
							<p className="text-lg font-bold text-slate-900">{badge.name}</p>
						</div>
						<div
							className={`w-full text-center text-xs text-slate-600 transition-opacity duration-200 ${
								isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
							}`}
						>
							<p>取得日: {badge.issuedOn}</p>
							{badge.credentialId && <p>ID: {badge.credentialId}</p>}
						</div>
					</button>
				);
			})}
		</div>
	);
}
