import { cn, componentStyles } from "@/lib/utils";
import { LuCheck } from "react-icons/lu";
import type { ReactNode } from "react";
import type { ComponentProps } from "@/lib/types";

interface CheckboxProps extends ComponentProps {
  checked?: boolean;
  label?: ReactNode;
}

export function Checkbox({ checked = false, label, noMargin, className }: CheckboxProps) {
  return (
    <div className={cn("flex items-center gap-2", componentStyles({ noMargin, className }))}>
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
          checked
            ? "bg-primary border-border text-primary-text" 
            : "border-border bg-transparent"
        )}
      >
        {checked && <LuCheck size={14} strokeWidth={4} />}
      </div>
      
      {label && (
        <span className="text-text">
          {label}
        </span>
      )}
    </div>
  );
}