import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { CertificationBadge } from "@/components/certification-badge";
import { ProfileLinkIcon } from "@/components/profile-link-icon";
import { ProjectsFlow } from "@/components/site/projects-flow";
import { TopTerminal } from "@/components/site/top-terminal";
import { TechTable } from "@/components/tech-table";
import { getAllCertifications, getAllProjects, getFeaturedLearnings, getProfile } from "@/lib/content";
import type { TechTableItem } from "@/types/content";

function compactLearningTechTable(items: TechTableItem[]): TechTableItem[] {
  const rowLimit = 3;
  const valueLimit = 6;

  return items.slice(0, rowLimit).map((item) => {
    const values = item.values.slice(0, valueLimit);
    if (item.values.length > valueLimit) {
      values.push(`+${item.values.length - valueLimit} more`);
    }
    return {
      ...item,
      values
    };
  });
}

export default async function HomePage(): Promise<JSX.Element> {
  const [profile, projects, learnings, certifications] = await Promise.all([
    getProfile(),
    getAllProjects(),
    getFeaturedLearnings(3),
    getAllCertifications()
  ]);

  return (
    <div className="space-y-14 pb-10">
      <Reveal>
        <section className="grid gap-8 px-1 pt-6 md:pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="site-kicker">Portfolio Overview</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-6xl">{profile.name}</h1>
            <p className="mt-3 text-base text-[var(--text-secondary)] md:text-xl">{profile.title}</p>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)] md:text-base">{profile.summary}</p>
          </div>
          <TopTerminal />
        </section>
      </Reveal>

      <Reveal>
        <section id="profile" className="site-surface rounded-2xl p-6 md:p-8">
          <p className="site-kicker">プロフィール</p>
          <div className="mt-5 grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
            <div>
              <div className="site-panel-inset overflow-hidden rounded-2xl p-2">
                <Image src="/images/profile-avatar.png" alt={`${profile.name} profile icon`} width={280} height={280} className="h-auto w-full rounded-xl object-cover" />
              </div>
              <p className="mt-3 text-center text-sm font-semibold tracking-[0.08em] text-[var(--text-secondary)]">{profile.name}</p>
            </div>

            <div>
              <p className="text-sm text-[var(--text-secondary)] md:text-base">{profile.title}</p>
              {profile.intro ? <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)]">{profile.intro}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="site-chip rounded-full px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {profile.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    <ProfileLinkIcon icon={link.icon} label={link.label} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="projects" className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-1">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <p className="site-kicker">業務経歴</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Projects</h2>
          </div>
          <ProjectsFlow projects={projects} fullBleed />
          <div className="mx-auto mt-5 max-w-6xl px-6 md:px-8">
            <Link href="/projects" className="site-link inline-block text-sm font-semibold">
              すべての業務経歴を見る
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="learning" className="site-surface rounded-2xl p-6 md:p-8">
          <p className="site-kicker">自己学習</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Learning</h2>
          <div className="mt-6 grid gap-6">
            {learnings.map((learning) => (
              <Link
                key={learning.slug}
                href={`/learning#${encodeURIComponent(learning.slug)}`}
                aria-label={`${learning.title} の詳細へ`}
                className="site-surface-soft group block min-h-[26rem] rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[var(--line-neon)] md:p-6"
              >
                <div className="grid gap-6 md:grid-cols-[1.35fr_1fr] md:items-start">
                <div>
                  <h3 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">{learning.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] line-clamp-8">{learning.summary}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Tech Stack</p>
                  <div className="mt-2">
                    <TechTable items={compactLearningTechTable(learning.techTable)} />
                  </div>
                </div>
                </div>
                <span className="mt-4 inline-block text-xs font-semibold text-[var(--text-tertiary)] transition group-hover:text-[var(--text-primary)]">詳細を見る →</span>
              </Link>
            ))}
          </div>
          <Link href="/learning" className="site-link mt-5 inline-block text-sm font-semibold">
            すべての自己学習を見る
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section id="certifications" className="site-surface rounded-2xl p-6 md:p-8">
          <p className="site-kicker">資格</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Certifications</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {certifications.slice(0, 4).map((certification) => (
              <article key={certification.slug} className="site-surface-soft flex items-center gap-3 rounded-lg p-3">
                <CertificationBadge src={certification.badge} title={certification.title} />
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">{certification.acquired}</p>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{certification.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{certification.issuer}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/certifications" className="site-link mt-5 inline-block text-sm font-semibold">
            すべての資格を見る
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
