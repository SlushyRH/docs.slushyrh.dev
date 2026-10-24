import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import type { ProjectMeta } from "@/lib/types";
import { allPages } from "@/content/_index";
import { Button, Card } from "../ui";
import {
  LuSearch,
  LuFileText,
  LuCornerDownLeft,
  LuArrowUp,
  LuArrowDown,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  project: ProjectMeta;
}

interface SearchResultItem {
  path: string;
  label: string;
  breadcrumbs: string[];
  description?: string;
  plainText?: string;
}

function formatFolderName(folderName: string) {
  return folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' ');
}

export function SearchBar({ project }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const projectPages = useMemo(() => {
    return Object.values(allPages)
      .filter((page) => page.projectId === project.id)
      .map((pageData) => {
        const pathParts = pageData.path.split("/");
        const breadcrumbs: string[] = [];

        if (pageData.data.section) {
          const sectionMeta = project.sections?.find(
            (s) => s.id === pageData.data.section
          );
          if (sectionMeta) breadcrumbs.push(sectionMeta.label);
        }

        // Parent directories for breadcrumbs
        const folderParts = pageData.isIndex ? pathParts.slice(0, -1) : pathParts.slice(0, -1);
        
        folderParts.forEach((folderName, index) => {
          const currentFolderPath = folderParts.slice(0, index + 1).join("/");
          const indexPageKey = `${project.id}/${currentFolderPath}`;
          const indexPage = allPages[indexPageKey];
          
          if (indexPage && indexPage.isIndex && indexPage.data.label) {
            breadcrumbs.push(indexPage.data.label);
          } else {
            breadcrumbs.push(formatFolderName(folderName));
          }
        });

        return {
          path: pageData.path,
          label: pageData.data.label,
          breadcrumbs,
          description: pageData.data.description || "",
          plainText: pageData.data.plainText || "",
        } as SearchResultItem;
      });
  }, [project.id, project.sections]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return projectPages.filter((item) => {
      const matchTitle = item.label.toLowerCase().includes(trimmed);
      const matchPath = item.path.toLowerCase().includes(trimmed);
      const matchBreadcrumbs = item.breadcrumbs.some((b) =>
        b.toLowerCase().includes(trimmed)
      );
      const matchDescription = item.description?.toLowerCase().includes(trimmed);
      const matchContent = item.plainText?.toLowerCase().includes(trimmed);

      return matchTitle || matchPath || matchBreadcrumbs || matchDescription || matchContent;
    });
  }, [query, projectPages]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigateToResult(results[selectedIndex].path);
    }
  };

  const navigateToResult = (path: string) => {
    setIsOpen(false);
    navigate(`/${project.id}/${path}`);
  };

  return (
    <>
      <Button
        variant="mobile"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open Search"
      >
        <LuSearch size={20} />
      </Button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-12 sm:pt-20"
            onClick={() => setIsOpen(false)}
            onKeyDown={handleModalKeyDown}
          >
            <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
              <Card noMargin className="p-0 overflow-hidden shadow-2xl bg-bg border-border">
                <div className="relative flex items-center border-b border-border px-3 py-2">
                  <LuSearch className="h-5 w-5 shrink-0 text-text/60 ml-1" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search project documentation..."
                    className="w-full bg-transparent px-3 py-1.5 text-base sm:text-sm text-text placeholder:text-text/50 outline-none"
                  />
                  {query && (
                    <span className="mr-2 text-xs text-text/50 shrink-0">
                      {results.length} {results.length === 1 ? "result" : "results"}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setIsOpen(false)}
                    className="shrink-0"
                  >
                    <LuX size={16} />
                  </Button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 show-scrollbar">
                  {query.trim() === "" ? (
                    <div className="p-8 text-center text-sm text-text/50">
                      Type a query to search <span className="font-semibold text-text/80">{project.title}</span> docs...
                    </div>
                  ) : results.length === 0 ? (
                    <div className="p-8 text-center text-sm text-text/50">
                      No results found for "<span className="text-text">{query}</span>"
                    </div>
                  ) : (
                    results.map((result, idx) => {
                      const isSelected = idx === selectedIndex;

                      return (
                        <button
                          key={result.path}
                          onClick={() => navigateToResult(result.path)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={cn(
                            "w-full text-left rounded-lg p-3 transition-colors flex items-start gap-3 cursor-pointer group",
                            isSelected
                              ? "bg-secondary text-text"
                              : "hover:bg-secondary/40 text-text/80"
                          )}
                        >
                          <div className="mt-0.5 rounded-md p-1.5 bg-input/40 text-text/70 shrink-0 border border-border/50">
                            <LuFileText size={18} />
                          </div>

                          <div className="flex-1 min-w-0">
                            {result.breadcrumbs.length > 0 && (
                              <div className="flex items-center gap-1 text-[11px] text-text/50 mb-0.5 font-medium truncate">
                                {result.breadcrumbs.map((crumb, bIdx) => (
                                  <span key={bIdx} className="flex items-center gap-1">
                                    {bIdx > 0 && <LuChevronRight className="h-3 w-3 shrink-0" />}
                                    <span>{crumb}</span>
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="font-semibold text-sm text-text group-hover:text-accent transition-colors">
                              {result.label}
                            </div>

                            <div className="text-xs text-text/60 truncate mt-0.5">
                              {result.description || `/${result.path}`}
                            </div>
                          </div>

                          <div className="self-center shrink-0 ml-2">
                            {isSelected ? (
                              <span className="flex items-center justify-center size-6 rounded bg-accent text-accent-text">
                                <LuCornerDownLeft size={14} />
                              </span>
                            ) : (
                              <LuChevronRight size={16} className="text-text/40" />
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="border-t border-border bg-input/10 px-4 py-2.5 text-xs text-text/50 flex items-center justify-end gap-4 font-sans select-none">
                  <div className="flex items-center gap-1">
                    <span className="rounded bg-input/40 px-1 py-0.5 text-[10px] border border-border">
                      <LuArrowUp className="inline h-3 w-3" />
                    </span>
                    <span className="rounded bg-input/40 px-1 py-0.5 text-[10px] border border-border">
                      <LuArrowDown className="inline h-3 w-3" />
                    </span>
                    <span>Navigate</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="rounded bg-input/40 px-1.5 py-0.5 text-[10px] border border-border font-mono">
                      ↵
                    </span>
                    <span>Select</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="rounded bg-input/40 px-1.5 py-0.5 text-[10px] border border-border font-mono">
                      ESC
                    </span>
                    <span>Close</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}