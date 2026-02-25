import Link from "next/link";

import { ProfileLinkIcon } from "@/components/profile-link-icon";
import type { ProfileLink } from "@/types/content";

type FooterProps = {
  links: ProfileLink[];
};

export function Footer({ links }: FooterProps): JSX.Element {
  const socialLinks = links.filter((link) => link.icon === "github" || link.icon === "x");

  return (
    <footer className="border-t border-[var(--line-soft)] py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-[var(--text-tertiary)]">
        <p>Built with Next.js, Tailwind CSS, and Markdown Content.</p>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-inset)] transition hover:-translate-y-0.5 hover:border-[var(--line-neon)] hover:shadow-[var(--glow-cyan)]"
            >
              <ProfileLinkIcon icon={link.icon} label={link.label} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
