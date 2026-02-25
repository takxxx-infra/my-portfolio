import type { Metadata } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { TopNav } from "@/components/site/top-nav";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cloud Engineer Portfolio",
  description: "クラウドエンジニアの業務経歴・自己学習・資格をまとめたポートフォリオサイト",
  openGraph: {
    title: "Cloud Engineer Portfolio",
    description: "クラウドエンジニアの業務経歴・自己学習・資格をまとめたポートフォリオサイト",
    type: "website",
    locale: "ja_JP"
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): Promise<JSX.Element> {
  const profile = await getProfile();

  return (
    <html lang="ja" className="dark">
      <body className="text-[var(--text-0)] antialiased">
        <TopNav />
        <main className="mx-auto min-h-[calc(100vh-132px)] max-w-6xl px-6 py-10">{children}</main>
        <SiteFooter name={profile.name} title={profile.title} links={profile.links} />
      </body>
    </html>
  );
}
