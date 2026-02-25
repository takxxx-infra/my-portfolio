import Image from "next/image";

import type { ProfileLinkIcon } from "@/types/content";

type ProfileLinkIconProps = {
  icon?: ProfileLinkIcon;
  label: string;
};

const iconMap: Record<ProfileLinkIcon, string> = {
  github: "/images/icon/github-mark.png",
  x: "/images/icon/x-logo.png",
  link: ""
};

export function ProfileLinkIcon({ icon, label }: ProfileLinkIconProps): JSX.Element {
  const source = icon ? iconMap[icon] : undefined;

  if (!source) {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
        ↗
      </span>
    );
  }

  return <Image src={source} alt={`${label} icon`} width={16} height={16} className="h-4 w-4 object-contain" />;
}
