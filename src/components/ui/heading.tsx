import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const headingVariants = cva(
  "font-bold pt-4 pb-3",
  {
    variants: {
      size: {
        h1: "text-4xl",
        h2: "text-2xl",
        h3: "text-xl",
        h4: "text-lg",
        h5: "text",
        h6: "text-sm",
      }
    },
    defaultVariants: {
      size: "h1",
    }
  }
);

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export function Heading({ children, size = "h1", className = "" }: HeadingProps & VariantProps<typeof headingVariants>) {
  return (
    <h1 className={cn(headingVariants({ size, className }))}>
      {children}
    </h1>
  );
}