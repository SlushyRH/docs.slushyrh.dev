import type { ReactNode } from "react";

export function Paragraph({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <p className={`pb-2 ${className }`}>{children}</p>
  );
}