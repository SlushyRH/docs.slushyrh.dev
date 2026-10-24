import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}

export function Separator({ className, direction = "horizontal" }: SeparatorProps) {
  return (
    <div 
      className={cn(
        "border-border",
        direction === "horizontal" 
          ? "border-t-2 w-full my-3" 
          : "border-l-2 h-full mx-3 min-h-[1rem]",
        className
      )} 
    />
  );
}