import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const paragraphVariants = cva(
  "",
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

interface ParagraphProps extends ComponentProps, VariantProps<typeof paragraphVariants> {
  children: ReactNode;
}

export function Paragraph({ children, size, className, noMargin }: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ size }), componentStyles({ noMargin, className }))}>
      {children}
    </p>
  );
}

const headingVariants = cva(
  "font-bold",
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

interface HeadingProps extends ComponentProps {
  children: ReactNode;
}

export function Heading({ children, size = "h1", className, noMargin }: HeadingProps & VariantProps<typeof headingVariants>) {
  const Tag = size || "h1";

  return (
    <Tag 
      data-size={size} 
      className={cn(headingVariants({ size }), componentStyles({ noMargin, className }))}
    >
      {children}
    </Tag>
  );
}