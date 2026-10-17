import type { ProjectMeta } from "@/lib/types";
import { LuMenu, LuSearch } from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  project: ProjectMeta;
  onMenuClick?: () => void;
}

export function Header({ project, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-white/10 bg-[#1e1e1e]/80 px-4 text-white backdrop-blur-md">
      
      <div className="flex items-center gap-3">
        {/* mobile hamburger button */}
        <button 
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 -ml-2 text-neutral-400 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          <LuMenu size={20} />
        </button>

        {/* project logo and title */}
        <NavLink to={`/${project.slug}/${project.redirectSlug}`} className="flex items-center gap-2">
          {project.logoUrl && (
            <img 
              src={project.logoUrl} 
              alt={`${project.title} logo`} 
              className="h-6 w-6 object-contain" 
            />
          )}
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            {project.title}
          </span>
        </NavLink>
      </div>

      <div className="flex items-center justify-end">
        {/* mobile search icon */}
        <button 
          type="button"
          className="rounded-md p-2 -mr-2 text-neutral-400 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Search"
        >
          <LuSearch size={20} />
        </button>

        {/* desktop search bar */}
        <button type="button" className="hidden w-64 items-center gap-2 rounded-md border border-white/10 bg-[#141414] px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:border-white/20 hover:bg-[#1a1a1a] md:flex">
          <LuSearch size={16} />
          <span className="flex-1 text-left">Search...</span>
          
          <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-500">
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">Ctrl</kbd>
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">K</kbd>
          </div>
        </button>
      </div>
    </header>
  );
}