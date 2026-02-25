"use client";

import Image from "next/image";
import { useState } from "react";

type CertificationBadgeProps = {
  src?: string;
  title: string;
};

export function CertificationBadge({ src, title }: CertificationBadgeProps): JSX.Element {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-[var(--line-soft)] bg-[var(--surface-inset)] text-[10px] font-semibold text-[var(--text-tertiary)]">
        NO
        <br />
        BADGE
      </div>
    );
  }

  return (
    <div className="group relative h-24 w-24 shrink-0 cursor-pointer">
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-transparent blur-xl transition duration-300 group-hover:bg-[rgba(255,255,255,0.18)]" />
      <Image
        src={src}
        alt={`${title} badge`}
        width={96}
        height={96}
        className="relative h-24 w-24 object-contain transition duration-300 will-change-transform group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-2"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
