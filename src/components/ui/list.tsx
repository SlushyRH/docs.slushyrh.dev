"use client"; // <-- Add this if you are using Next.js App Router

import React, { createContext, useContext, Children, isValidElement, type ReactNode } from "react";
import { cn, componentStyles } from "@/lib/utils";
import type { ComponentProps } from "@/lib/types";

const ListContext = createContext<number>(0);

// We use Omit here just in case native HTML 'type' attribute conflicts with your custom 'type'
interface ListProps extends ComponentProps, Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, "type"> {
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
        {Children.toArray(children).map((child, index) => {
          if (isValidElement(child) && child.type === "li") {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                "mb-1 text-text text leading-relaxed marker:text-text/50",
                (child.props as any).className
              ),
            });
          }

          // Otherwise, automatically wrap the element (like your <Link> or <span>) in an <li>
          return (
            <li 
              key={isValidElement(child) && child.key ? child.key : index} 
              className="mb-1 text-text leading-relaxed marker:text-text/50"
            >
              {child}
            </li>
          );
        })}
      </Tag>
    </ListContext.Provider>
  );
}