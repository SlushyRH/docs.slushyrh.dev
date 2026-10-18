import { Button as ButtonPrimitive } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, componentStyles } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import type { ComponentProps } from "@/lib/types";

const buttonVariants = cva(
  "group/button inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-text hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-text hover:bg-secondary/90",
        outline: "bg-bg text-text border border-border shadow-xs hover:bg-input hover:text-input-text",
        ghost: "hover:bg-input hover:text-input-text"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({
  className,
  noMargin,
  variant = "default",
  size = "default",
  tooltip = "",
  tooltipSide = "top",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    tooltip?: string,
    tooltipSide?: "top" | "bottom" | "left" | "right" | undefined,
  } & ComponentProps) {
    const buttonElement = (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), componentStyles({ noMargin, className }))}
        {...props}
      />
    );

    if (!tooltip)
      return buttonElement;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {buttonElement}
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent side={tooltipSide}>
              {tooltip}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }