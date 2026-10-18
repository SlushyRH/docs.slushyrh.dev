import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const paragraphVariants = cva(
  "pb-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      }
    },
    defaultVariants: {
      size: "base",
    }
  }
);

interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: ReactNode;
  className?: string;
}

export function Paragraph({ children, size, className = "" }: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ size, className }))}>
      {children}
    </p>
  );
}