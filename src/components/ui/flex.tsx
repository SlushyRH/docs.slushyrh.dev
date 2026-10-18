import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import type { ReactNode } from "react";

interface FlexProps extends ComponentProps {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  gap?: number | string;
  center?: boolean;
} 

export function Flex({ 
  children, 
  orientation = "horizontal", 
  gap = 8, 
  center = false,
  noMargin,
  className
}: FlexProps) {
  const directionClass = orientation === "vertical" ? "flex-col" : "flex-row";
  const gapValue = typeof gap === "number" ? `${gap}px` : gap;

  return (
    <div 
      className={cn("flex component-margin", center ? "items-center" : undefined, directionClass, componentStyles({ noMargin, className }))}
      style={{ gap: gapValue }}
    >
      {children}
    </div>
  );
}