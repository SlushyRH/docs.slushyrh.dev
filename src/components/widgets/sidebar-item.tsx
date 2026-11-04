import { useState } from "react";
import { LuChevronDown, LuChevronRight, LuExternalLink } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { Button } from "../ui";
import { capitalizeWords, cn } from "@/lib/utils";

function cleanPath(path: string) {
  return path
    .split('/')
    .map(part => part.startsWith('_') ? part.slice(1) : part)
    .join('/');
}

function SidebarButton({ label, to, redirect, onClose, className }: { label: string, to: string, redirect?: string, onClose?: () => void, className?: string }) {
  const button = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start transition-colors h-9 py-1.5",
        "text-text/60",
        redirect ? "justify-between" : "",
        className
      )}
    >
      <span className="ml-1">{label}</span>
      {redirect && <LuExternalLink className="h-4 w-4 shrink-0" aria-label="External" />}
    </Button>
  );

  if (redirect) {
    return (
      <a href={redirect} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block">
        {button}
      </a>
    );
  }

  return (
    <NavLink to={to} onClick={onClose} end className="block">
      {({ isActive }) => (
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start transition-colors h-9 py-1.5",
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
      <SidebarButton 
        label={item.label} 
        to={`/${projectId}/${cleanPath(item.path)}`} 
        redirect={item.redirect}
        onClose={onClose} 
      />   
    );
  } else if (item.type === 'folder') {
    const hasItems = item.items.length > 0;

    return (
      <li className="list-none">
        <div className="relative flex items-center w-full group">
          <div className="flex-1 w-full">
            {item.indexPage ? (
              <SidebarButton 
                label={item.label} 
                to={`/${projectId}/${item.indexPage.path}`}
                redirect={item.indexPage.redirect}
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
                  "w-full justify-start transition-colors h-9 py-1.5",
                  "text-text/60 group-hover:bg-input group-hover:text-input-text",
                  hasItems ? "pr-8" : ""
                )}
              >
                {capitalizeWords(item.label)}
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
          <ul className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
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