"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/learning", label: "Learning" },
  { href: "/certifications", label: "Certifications" }
];

export function TopNav(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled ? "border-[var(--line-strong)] bg-[rgba(24,24,24,0.88)] backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-3.5">
        <Link href="/" className="text-sm font-semibold tracking-[0.14em] text-[var(--text-primary)]">
          TAKAHIRO&apos;s Portfolio
        </Link>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="site-button-secondary ml-auto rounded-md px-3 py-2 text-xs font-semibold md:hidden"
        >
          MENU
        </button>
      </div>

      {open ? (
        <div className="site-panel mx-6 mb-4 rounded-xl p-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
