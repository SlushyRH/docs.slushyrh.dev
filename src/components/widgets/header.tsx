import type { ProjectMeta } from "@/lib/types";
import { LuMenu, LuSearch, LuSun, LuMoon } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "../ui";

interface HeaderProps {
  project: ProjectMeta;
  onMenuClick?: () => void;
}

export function Header({ project, onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border px-4 backdrop-blur-md">   
      <div className="flex lg:px-0 xl:px-40 items-center gap-3">
        {/* mobile hamburger button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <LuMenu size={20} />
        </Button>

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

      <div className="flex lg:px-0 xl:px-40 items-center justify-end gap-1">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="hidden md:flex">
            {theme === 'dark' ? <LuMoon size={20} /> : <LuSun size={20} />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="md:hidden">
            {theme === 'dark' ? <LuMoon size={20} /> : <LuSun size={20} />}
        </Button>

        {/* mobile search icon */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <LuSearch size={20} />
        </Button>

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