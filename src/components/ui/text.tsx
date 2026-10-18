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
  const Tag = size || "h1";

  return (
    <Tag 
      data-size={size} 
      className={cn(headingVariants({ size, className }))}
    >
      {children}
    </Tag>
  );
}