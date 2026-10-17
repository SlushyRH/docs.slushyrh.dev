import type { ReactNode } from "react";

export function Title({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <h1 className={`text-2xl font-bold py-4 ${className }`}>{children}</h1>
  );
}