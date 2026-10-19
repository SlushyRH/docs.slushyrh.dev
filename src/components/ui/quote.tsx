import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import type { ReactNode } from "react";

interface QuoteProps extends ComponentProps {
  children: ReactNode;
}

export function Quote({ children, className, noMargin }: QuoteProps) {
  return (
    <div className={cn('border-l-4 border-border pl-4 py-4', componentStyles({ noMargin, className }))}>
      {children}
    </div>
  )
}