import type { ProjectMeta, DocPageMeta, DocFolderMeta } from "@/lib/types";

const metaModules = import.meta.glob<{ default: any }>(
  ["./**/_index.ts", "!./_index.ts"],
  { eager: true }
);

const pageModules = import.meta.glob<{ page: DocPageMeta }>(
  ["./**/*.tsx", "!./**/_*.tsx"],
  { eager: true }
);

export const projects: Record<string, ProjectMeta> = {};
export const folders: Record<string, DocFolderMeta> = {};
export const allPages: Record<string, { path: string; data: DocPageMeta; projectId: string }> = {};

// process meta data
for (const filePath in metaModules) {
  const mod = metaModules[filePath];
  if (!mod.default) continue;

  const pathParts = filePath.split('/'); 

  // if length == 3, then its a project meta from root, otherwise its a folder meta
  if (pathParts.length === 3) {
    projects[mod.default.slug] = mod.default as ProjectMeta;
  } else if (pathParts.length > 3) {
    const folderPath = pathParts.slice(2, -1).join('/'); 
    folders[folderPath] = mod.default as DocFolderMeta;
  }
}

// process pages
for (const filePath in pageModules) {
  const mod = pageModules[filePath];
  if (!mod.page || !mod.page.slug) continue;

  const pathParts = filePath.split('/');
  const projectId = pathParts[1]; 
  
  const folderDirectories = pathParts.slice(2, -1);
  const fullPath = [...folderDirectories, mod.page.slug].join('/');

  allPages[fullPath] = {
    path: fullPath,
    data: mod.page,
    projectId: projectId,
  };
}