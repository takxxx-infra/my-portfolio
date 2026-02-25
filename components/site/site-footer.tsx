import Link from "next/link";

import { ProfileLinkIcon } from "@/components/profile-link-icon";
import type { ProfileLink } from "@/types/content";

type SiteFooterProps = {
  name: string;
  title: string;
  links: ProfileLink[];
};

const footerMenuLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/learning", label: "Learning" },
  { href: "/certifications", label: "Certifications" }
];

export function SiteFooter({ name, title, links }: SiteFooterProps): JSX.Element {
  const socialLinks = links.filter((link) => link.icon === "github" || link.icon === "x");

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[var(--line-soft)] bg-[var(--bg-elev-1)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[140%] -translate-x-1/2 rounded-[50%] border-t border-white/10 bg-[var(--bg-elev-2)]" />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-8 pt-16 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="font-[var(--font-display)] text-2xl tracking-[0.32em] text-[var(--text-primary)] md:text-3xl">{name.toUpperCase()}</p>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">{title}</p>
          <p className="mt-24 text-xs tracking-[0.08em] text-[var(--text-tertiary)]">© {new Date().getFullYear()} {name.toUpperCase()}</p>
        </div>

        <div className="space-y-8 md:text-right">
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px] md:justify-end">
            {footerMenuLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:justify-end">
            {socialLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)] transition hover:-translate-y-0.5 hover:border-[var(--line-neon)] hover:shadow-[var(--glow-cyan)]"
              >
                <ProfileLinkIcon icon={link.icon} label={link.label} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
