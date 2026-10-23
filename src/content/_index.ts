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

for (const filePath in metaModules) {
  const mod = metaModules[filePath];
  if (!mod.default) continue;

  const pathParts = filePath.split('/'); 
  const projectId = pathParts[1];

  if (pathParts.length === 3) {
    projects[projectId] = { ...mod.default, id: projectId } as ProjectMeta;
  } else if (pathParts.length > 3) {
    const folderPath = pathParts.slice(2, -1).join('/'); 
    folders[`${projectId}/${folderPath}`] = mod.default as DocFolderMeta;
  }
}

// process pages
for (const filePath in pageModules) {
  const mod = pageModules[filePath];
  if (!mod.page) continue;

  const pathParts = filePath.split('/');
  const projectId = pathParts[1]; 
  
  const folderDirectories = pathParts.slice(2, -1);
  const pageSlug = pathParts[pathParts.length - 1].replace(/\.tsx$/, '');
  
  const relativePath = [...folderDirectories, pageSlug].filter(Boolean).join('/');
  const uniqueKey = `${projectId}/${relativePath}`;

  allPages[uniqueKey] = {
    path: relativePath,
    data: mod.page,
    projectId: projectId,
  };
}