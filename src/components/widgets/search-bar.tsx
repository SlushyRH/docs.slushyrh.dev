import type { ProjectMeta } from "@/lib/types";
import { Button } from "../ui";
import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";

interface SearchBarProps {
  project: ProjectMeta;
}

export function SearchBar({ project }: SearchBarProps) {
  return (
    <>
      {/* mobile search icon */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <LuSearch size={20} />
      </Button>

      {/* desktop search bar */}
      <Input placeholder="Search..." icon={LuSearch} className="hidden! w-64 md:flex!" />
    </>
  )
}