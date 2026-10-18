import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-md border border-border bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-200",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}