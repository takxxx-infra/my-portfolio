import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/learning", label: "Learning" },
  { href: "/certifications", label: "Certifications" }
];

export function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-[rgba(24,24,24,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-[0.14em] text-[var(--text-primary)]">
          Cloud Portfolio
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden items-center justify-end gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent-cyan)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
