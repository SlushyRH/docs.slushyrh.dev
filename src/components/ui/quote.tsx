import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  className?: string;
}

export function Quote({ children, className }: QuoteProps) {
  return (
    <div className={cn('border-l-4 border-border pl-4 py-4', className)}>
      {children}
    </div>
  )
}