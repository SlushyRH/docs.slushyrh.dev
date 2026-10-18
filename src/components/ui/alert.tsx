import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { LuInfo, LuLightbulb, LuTriangleAlert, LuCircleX } from "react-icons/lu";

const alertVariants = cva(
  "w-full rounded-lg border-2 p-4 mb-4 flex flex-col gap-2",
  {
    variants: {
      type: {
        info: "border-blue-500/30 bg-blue-500/10",
        warning: "border-yellow-500/30 bg-yellow-500/10",
        tip: "border-green-500/30 bg-green-500/10",
        caution: "border-red-500/30 bg-red-500/10",
      }
    },
    defaultVariants: {
      type: "info",
    }
  }
);

const iconMap = {
  info: LuInfo,
  warning: LuTriangleAlert,
  tip: LuLightbulb,
  caution: LuCircleX,
};

const titleMap = {
  info: "Note",
  warning: "Warning",
  tip: "Tip",
  caution: "Caution",
};

const titleColorMap = {
  info: "text-blue-500",
  warning: "text-yellow-500",
  tip: "text-green-500",
  caution: "text-red-500",
};

interface AlertProps extends VariantProps<typeof alertVariants> {
  children: ReactNode;
  className?: string;
  title?: string; 
}

export function Alert({ type = "info", title, children, className }: AlertProps) {
  const alertType = type || "info";
  
  const Icon = iconMap[alertType];
  const displayTitle = title || titleMap[alertType];

  return (
    <div className={cn(alertVariants({ type: alertType, className }))}>
      <div className={cn("flex items-center gap-2 font-semibold", titleColorMap[alertType])}>
        <Icon size={18} />
        <span>{displayTitle}</span>
      </div>
      
      <div className="text-zinc-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}