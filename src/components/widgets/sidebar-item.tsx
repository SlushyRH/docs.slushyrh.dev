import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

function SidebarButton({ label, to, onClose, className }: { label: string, to: string, onClose?: () => void, className?: string }) {
  return (
    <NavLink to={to} onClick={onClose} end>
      {({ isActive }) => (
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start transition-colors my-0.25",
            isActive ? "text-accent" : "text-text/60",
            className
          )}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
}

export default function SidebarItem({ item, projectId, onClose }: { item: any, projectId: string, onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === 'page') {
    return (
      <SidebarButton label={item.label} to={`/${projectId}/${item.path}`} onClose={onClose} />   
    );
  } else if (item.type === 'folder') {
    const hasItems = item.items.length > 0;

    return (
      <li>
        <div className="relative flex items-center w-full group">
          <div className="flex-1 w-full">
            {item.indexPage ? (
              <SidebarButton 
                label={item.label} 
                to={`/${projectId}/${item.path}`} 
                onClose={() => {
                  setIsOpen(prev => !prev);
                  onClose?.();
                }}
                className={cn(
                  hasItems ? "pr-8" : "",
                  "group-hover:bg-input group-hover:text-input-text"
                )}
              />
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "w-full justify-start transition-colors",
                  "text-text/60 group-hover:bg-input group-hover:text-input-text",
                  hasItems ? "pr-8" : ""
                )}
              >
                {item.label}
              </Button>
            )}
          </div>
          
          {hasItems && (
            <button 
              className="absolute right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm bg-transparent text-text/60 group-hover:text-input-text transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle folder"
            >
              {isOpen ? <LuChevronDown className="w-4 h-4" /> : <LuChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {isOpen && hasItems && (
          <ul className="ml-3 space-y-1 border-l border-border pl-2">
            {item.items.map((subItem: any, idx: number) => (
              <SidebarItem key={idx} item={subItem} projectId={projectId} onClose={onClose} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return null;
}