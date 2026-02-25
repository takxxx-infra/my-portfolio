import { CertificationBadge } from "@/components/certification-badge";
import { Reveal } from "@/components/motion/reveal";
import { getAllCertifications } from "@/lib/content";

export default async function CertificationsPage(): Promise<JSX.Element> {
  const certifications = await getAllCertifications();
  const latest = certifications[0]?.acquired ?? "-";

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="site-surface rounded-3xl p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Certifications</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-0)] md:text-4xl">資格一覧</h1>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="site-chip rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Total</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--text-0)]">{certifications.length}</p>
            </div>
            <div className="site-chip rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Latest</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--text-0)]">{latest}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {certifications.length === 0 ? (
        <p className="site-surface-soft rounded-2xl p-5 text-sm text-[var(--text-1)]">
          資格データは未登録です。`content/certifications` に Markdown を追加してください。
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {certifications.map((certification) => (
            <article key={certification.slug} className="site-surface-soft flex items-start gap-4 rounded-2xl p-5">
              <CertificationBadge src={certification.badge} title={certification.title} />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{certification.acquired}</p>
                <h2 className="mt-2 text-lg font-semibold text-[var(--text-0)]">{certification.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-1)]">{certification.issuer}</p>
                {certification.level ? <p className="mt-1 text-xs text-[var(--muted)]">Level: {certification.level}</p> : null}
                {certification.credentialId ? <p className="mt-1 text-xs text-[var(--muted)]">Credential ID: {certification.credentialId}</p> : null}
                {certification.credentialUrl ? (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="site-link mt-3 inline-block text-sm font-semibold"
                  >
                    Credential
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
