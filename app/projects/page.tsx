import Link from "next/link";

import { ProjectsCatalog } from "@/components/projects/projects-catalog";
import { Reveal } from "@/components/motion/reveal";
import { getAllProjects } from "@/lib/content";

type ProjectsPageProps = {
  searchParams?: {
    slug?: string | string[];
  };
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps): Promise<JSX.Element> {
  const projects = await getAllProjects();
  const initialOpenSlug = typeof searchParams?.slug === "string" ? searchParams.slug : Array.isArray(searchParams?.slug) ? searchParams?.slug[0] : undefined;

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="site-surface rounded-3xl p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-0)] md:text-4xl">実務プロジェクト一覧</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-1)]">
            背景、課題、設計判断、成果までを一連の流れで整理しています。フィルタで業種・ロールを絞り込んで確認できます。
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/" className="site-link font-semibold">
              Homeへ戻る
            </Link>
            <Link href="/learning" className="site-link font-semibold">
              Learningへ
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ProjectsCatalog projects={projects} initialOpenSlug={initialOpenSlug} />
      </Reveal>
    </div>
  );
}
