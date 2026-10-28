import type { ProjectMeta, DocPageMeta } from "@/lib/types";

const metaModules = import.meta.glob<{ default: any }>(
  ["./**/_index.ts", "!./_index.ts"],
  { eager: true }
);

const pageModules = import.meta.glob<{ page: DocPageMeta }>(
  ["./**/*.tsx", "!./**/_*.tsx"],
  { eager: true }
);

export const projects: Record<string, ProjectMeta> = {};
export const allPages: Record<string, { path: string; rawPath: string; data: DocPageMeta; projectId: string; isIndex: boolean }> = {};

for (const filePath in metaModules) {
  const mod = metaModules[filePath];
  if (!mod.default) continue;

  const pathParts = filePath.split('/'); 
  const projectId = pathParts[1];

  if (mod.default.hidden)
    continue;

  if (pathParts.length === 3) {
    projects[projectId] = { ...mod.default, id: projectId } as ProjectMeta;
  }
}

// process pages
for (const filePath in pageModules) {
  const mod = pageModules[filePath];
  if (!mod.page) continue;

  const pathParts = filePath.split('/');
  const projectId = pathParts[1]; 
  
  const folderDirectories = pathParts.slice(2, -1);
  
  // Clean URL directories (strips the '_' so '_admin' becomes 'admin')
  const urlDirectories = folderDirectories.map(f => f.startsWith('_') ? f.slice(1) : f);
  
  const pageSlug = pathParts[pathParts.length - 1].replace(/\.tsx$/, '');
  const isIndex = pageSlug === 'index';
  
  // The Clean URL for routing
  const relativeUrlPath = isIndex 
    ? urlDirectories.join('/')
    : [...urlDirectories, pageSlug].filter(Boolean).join('/');
    
  // The Raw Path so the sidebar knows which folders had an '_'
  const rawRelativePath = isIndex 
    ? folderDirectories.join('/')
    : [...folderDirectories, pageSlug].filter(Boolean).join('/');
    
  const uniqueKey = `${projectId}/${relativeUrlPath}`;

  if (mod.page.hidden)
    continue;

  allPages[uniqueKey] = {
    path: relativeUrlPath,    // This powers the clean slug: /id/folder/page
    rawPath: rawRelativePath, // This powers the sidebar hiding logic
    data: mod.page,
    projectId: projectId,
    isIndex
  };
}