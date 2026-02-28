import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { LearningDiagramViewer } from "@/components/learning-diagram-viewer";
import { TechTable } from "@/components/tech-table";
import { getAllLearnings } from "@/lib/content";

function toList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^・/, "").trim())
    .filter((line) => line.length > 0);
}

export default async function LearningPage(): Promise<JSX.Element> {
  const learnings = await getAllLearnings();

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="site-surface rounded-3xl p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Learning</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-0)] md:text-4xl">自己学習アーカイブ</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-1)]">
            実務に転用できる設計パターンを意識し、狙い・構成・学びをセットで記録しています。
          </p>
        </section>
      </Reveal>

      <StaggerGroup className="grid gap-6">
        {learnings.map((learning) => {
          const outcomeItems = toList(learning.outcome);

          return (
            <article
              id={learning.slug}
              key={learning.slug}
              className="site-surface-soft scroll-mt-28 grid gap-6 rounded-3xl p-6 lg:grid-cols-2"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--text-0)]">{learning.title}</h2>
                  {learning.focus ? <p className="mt-2 text-sm text-[var(--accent-cyan)]">Focus: {learning.focus}</p> : null}
                </div>

                <p className="whitespace-pre-line text-sm leading-7 text-[var(--text-1)]">{learning.summary}</p>

                {outcomeItems.length > 0 ? (
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-0)]">Point</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-1)]">
                      {outcomeItems.map((item) => (
                        <li key={`${learning.slug}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {learning.github ? (
                  <a
                    href={learning.github}
                    target="_blank"
                    rel="noreferrer"
                    className="site-button-primary inline-flex rounded-lg px-4 py-2 text-sm font-semibold"
                  >
                    GitHub Repository
                  </a>
                ) : null}
              </div>

              <div className="space-y-4">
                <LearningDiagramViewer title={learning.title} src={learning.diagram} />
                <TechTable items={learning.techTable} />
              </div>
            </article>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
