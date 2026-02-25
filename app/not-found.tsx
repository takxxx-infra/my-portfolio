import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-tertiary)]">404</p>
      <h1 className="text-3xl font-bold text-[var(--text-primary)]">ページが見つかりません</h1>
      <Link href="/" className="site-button-secondary rounded-full px-5 py-2 text-sm font-semibold">
        トップへ戻る
      </Link>
    </div>
  );
}
