import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <p className="mb-2 pl-5 font-semibold uppercase">{children}</p>;
}
