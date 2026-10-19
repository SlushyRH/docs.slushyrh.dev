import type { ProjectMeta } from "@/lib/types";
import { LuMenu, LuSun, LuMoon } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "../ui";
import { SearchBar } from "./search-bar";

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

      <div className="flex lg:px-0 xl:px-40 items-center justify-end gap-2">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="hidden md:flex">
            {theme === 'dark' ? <LuMoon size={20} /> : <LuSun size={20} />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="md:hidden">
            {theme === 'dark' ? <LuMoon size={20} /> : <LuSun size={20} />}
        </Button>

        <SearchBar project={project} />
      </div>
    </header>
  );
}