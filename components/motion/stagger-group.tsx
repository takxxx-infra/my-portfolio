import { Children, isValidElement } from "react";

import { Reveal } from "@/components/motion/reveal";

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  stepMs?: number;
};

export function StaggerGroup({ children, className, stepMs = 90 }: StaggerGroupProps): JSX.Element {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return <Reveal delayMs={index * stepMs}>{child}</Reveal>;
      })}
    </div>
  );
}
