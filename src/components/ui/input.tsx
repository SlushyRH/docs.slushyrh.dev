import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ElementType | React.ReactNode;
}

const renderIcon = (icon: React.ElementType | React.ReactNode) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  const IconComponent = icon as React.ElementType;
  return <IconComponent />;
};

function Input({
  className,
  type,
  icon,
  ...props
}: InputProps) {
  const Icon = icon;

  const baseInputStyles =
    "h-9 w-full min-w-0 rounded-lg border border-border bg-transparent hover:bg-secondary focus:bg-input focus:text-input-text px-2.5 py-1 text-base transition-colors outline-none placeholder:text-text/60";

  if (!Icon) {
    return (
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(baseInputStyles, className)}
        {...props}
      />
    );
  }

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <span className="absolute left-2.5 flex items-center justify-center pointer-events-none text-text/60 [&>svg]:size-4 [&>svg]:shrink-0">
        {renderIcon(Icon)}
      </span>
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(baseInputStyles, "pl-8")}
        {...props}
      />
    </div>
  );
}

export { Input };