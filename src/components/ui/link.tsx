import type { ReactNode } from "react";
import { LuExternalLink } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export function Link({ children, href, sameTab = true }: { children: ReactNode, href: string, sameTab?: boolean }) {
  return (
    <NavLink 
      to={href} 
      target={sameTab ? '' : '_blank'} 
      rel="noopener noreferrer" 
      className="inline-flex items-center gap-1.5 text-accent underline underline-offset-4 decoration-dashed hover:bg-input hover:text-input-text hover:no-underline rounded-sm"
    >
      {children}
      {!sameTab && (
        <LuExternalLink className="text-xs" />
      )}
    </NavLink>
  );
}