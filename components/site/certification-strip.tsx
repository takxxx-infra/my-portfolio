import Link from "next/link";

import { CertificationBadge } from "@/components/certification-badge";
import type { Certification } from "@/types/content";

type CertificationStripProps = {
  certifications: Certification[];
};

export function CertificationStrip({ certifications }: CertificationStripProps): JSX.Element {
  if (certifications.length === 0) {
    return <p className="text-sm text-[var(--text-1)]">資格データは未登録です。</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Certifications</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-0)]">継続学習の証跡</h2>
        </div>
        <Link href="/certifications" className="site-link text-sm font-semibold">
          一覧へ
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.slice(0, 4).map((certification) => (
          <article key={certification.slug} className="site-surface-soft flex items-start gap-4 rounded-2xl p-5">
            <CertificationBadge src={certification.badge} title={certification.title} />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{certification.acquired}</p>
              <h3 className="mt-2 text-base font-semibold text-[var(--text-0)]">{certification.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-1)]">{certification.issuer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
