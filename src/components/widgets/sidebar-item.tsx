import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function SidebarItem({ item, projectId }: { item: any, projectId: string }) {
  const [isOpen, setIsOpen] = useState(true);
  console.log(item);

  if (item.type === 'page') {
    return (
      <li>
        <NavLink
          to={`/${projectId}/${item.path}`}
          className={({ isActive }) => 
            `block px-3 py-1.5 text-sm rounded-md transition-colors ${
              isActive ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`
          }
        >
          {item.label}
        </NavLink>
      </li>
    );
  }else if (item.type === 'folder') {
    const isCollapsable = item.meta?.collapsable ?? false;

    return (
      <li className="mt-2">
        <div 
          className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-zinc-300 cursor-pointer hover:text-white"
          onClick={() => isCollapsable && setIsOpen(!isOpen)}
        >
          <span>{item.meta?.label || item.path}</span>
          {isCollapsable && (
            isOpen ? <LuChevronDown className="w-4 h-4" /> : <LuChevronRight className="w-4 h-4" />
          )}
        </div>
        
        {isOpen && (
          <ul className="ml-3 mt-1 space-y-1 border-l border-zinc-800 pl-2">
            {item.pages.map((page: any, idx: number) => (
              <li key={idx}>
                <NavLink
                  to={`/${projectId}/${page.path}`}
                  className={({ isActive }) => 
                    `block px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isActive ? 'text-indigo-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`
                  }
                >
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return null;
}