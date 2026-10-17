import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

function SidebarButton({ label, to, onClose, className }: { label: string, to: string, onClose?: () => void, className?: string }) {
  return (
    <NavLink to={to} onClick={onClose}>
      {({ isActive }) => (
        <Button variant="ghost" className={cn(`w-full justify-start text-text/60 hover:text-text ${isActive ? 'text-accent' : undefined}`, className)}>
          {label}
        </Button>
      )}
    </NavLink>
  );
}

export default function SidebarItem({ item, projectId, onClose }: { item: any, projectId: string, onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(true);

  if (item.type === 'page') {
    return (
      <SidebarButton label={item.label} to={`/${projectId}/${item.path}`} onClose={onClose} />   
    );
  } else if (item.type === 'folder') {
    const isCollapsable = item.meta?.collapsable ?? false;

    return (
      <li className="mt-2">
        <Button
          variant="ghost"
          onClick={() => isCollapsable && setIsOpen(!isOpen)}
          className="w-full justify-between text-text/60 hover:text-text"
        >
          <span>{item.meta?.label || item.path}</span>
          {isCollapsable && (
            isOpen ? <LuChevronDown className="w-4 h-4" /> : <LuChevronRight className="w-4 h-4" />
          )}
        </Button>
        
        {isOpen && (
          <ul className="ml-3 mt-2 space-y-1 border-l border-border">
            {item.pages.map((page: any, idx: number) => (
              <li key={idx}>
                <SidebarButton label={page.label} to={`/${projectId}/${page.path}`} onClose={onClose} className="rounded-l-none" />
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return null;
}