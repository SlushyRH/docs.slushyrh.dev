import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { LuExternalLink } from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface LinkProps {
  children: ReactNode;
  to: string;
  isNewTab?: boolean;
  className?: string;
}

export function Link({ children, to, isNewTab, className = '' }: LinkProps) {
  const isExternal = to.startsWith('http://') || to.startsWith('https://') || to.startsWith('//');
    const openInNewTab = isNewTab !== undefined ? isNewTab : isExternal;

  return (
    <NavLink 
      to={to} 
      target={openInNewTab ? '_blank' : undefined} 
      rel={openInNewTab ? "noopener noreferrer" : undefined} 
      className={cn(
        "inline-flex items-center gap-1 text-accent underline underline-offset-4 decoration-dashed hover:bg-input hover:text-input-text hover:no-underline rounded-sm", 
        className
      )}
    >
      {children}
      {openInNewTab && (
        <LuExternalLink className="text-xs" />
      )}
    </NavLink>
  );
}