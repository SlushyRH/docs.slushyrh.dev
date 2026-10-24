import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type ReactNode } from "react";
import { toast } from "sonner";

const paragraphVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "text",
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

function generateId(node: ReactNode): string {
  if (typeof node === "string") {
    return node.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  if (Array.isArray(node)) {
    return node.map(generateId).filter(Boolean).join("-");
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children) {
      return generateId(props.children);
    }
  }
  return "";
}

interface HeadingProps extends ComponentProps {
  children: ReactNode;
  hideOnPageSidebar?: boolean;
  id?: string;
}

export function Heading({ children, size = "h1", className, noMargin, hideOnPageSidebar, id }: HeadingProps & VariantProps<typeof headingVariants>) {
  const Tag = size || "h1";
  const headingId = id || generateId(children);

  const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const url = new URL(window.location.href);
    url.hash = headingId;
    
    navigator.clipboard.writeText(url.toString());
    toast.success("Link copied to clipboard!");
  };

  return (
    <Tag 
      id={headingId}
      data-size={size} 
      data-hide-on-sidebar={hideOnPageSidebar ? "true" : undefined}
      className={cn("group relative", headingVariants({ size }), componentStyles({ noMargin, className }))}
    >
      {headingId && (
        <a 
          href={`#${headingId}`}
          onClick={handleCopy}
          className="absolute -left-8 w-8 text-right pr-2 opacity-0 transition-opacity group-hover:opacity-100 text-text/50 hover:text-text no-underline cursor-pointer"
          aria-label="Copy"
        >
          #
        </a>
      )}
      {children}
    </Tag>
  );
}