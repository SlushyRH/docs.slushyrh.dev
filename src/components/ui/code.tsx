import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import type { ReactNode } from "react";

interface CodeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Code({ children, noMargin, className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-md border border-border bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-200",
        componentStyles({ noMargin, className })
      )}
      {...props}
    >
      {children}
    </code>
  );
}