import React, { createContext, useContext, type ReactNode } from "react";
import { cn, componentStyles } from "@/lib/utils";
import type { ComponentProps } from "@/lib/types";

const ListContext = createContext<number>(0);

interface ListProps extends ComponentProps, React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: ReactNode;
  type: "ordered" | "unordered";
}

export function List({ children, type, className, noMargin, ...props }: ListProps) {
  const depth = useContext(ListContext);
  const Tag = type === "ordered" ? "ol" : "ul";

  let listStyle = "";
  if (type === "ordered") {
    listStyle = depth === 0 ? "list-decimal" : depth === 1 ? "list-[lower-alpha]" : "list-[lower-roman]";
  } else {
    listStyle = depth === 0 ? "list-disc" : depth === 1 ? "list-[circle]" : "list-[square]";
  }

  // If noMargin is explicitly passed, respect it. Otherwise, default to true for nested lists.
  const isNested = depth > 0;
  const appliedNoMargin = noMargin !== undefined ? noMargin : isNested;

  return (
    <ListContext.Provider value={depth + 1}>
      <Tag
        className={cn(
          "pl-4",
          listStyle,
          componentStyles({ noMargin: appliedNoMargin, className })
        )}
        {...props}
      >
        {children}
      </Tag>
    </ListContext.Provider>
  );
}

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  className?: string;
}

export function ListItem({ children, className, ...props }: ListItemProps) {
  return (
    <li 
      className={cn("mb-1 text-text text-sm leading-relaxed marker:text-text/50", className)} 
      {...props}
    >
      {children}
    </li>
  );
}