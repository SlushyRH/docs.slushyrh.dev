import type { ProjectMeta, DocPageMeta } from "@/lib/types";

// load all project metadata
const metaModules = import.meta.glob<{ default: ProjectMeta }>(
  [ "./**/_index.ts", "!./_index.ts" ],
  { eager: true }
);

// load all content pages
const pageModules = import.meta.glob<{ page: DocPageMeta }>(
  ["./**/*.tsx", "!./**/_*.tsx"],
  { eager: true }
);

// build data structures
export const projects: Record<string, ProjectMeta> = {};
export const allPages: Record<string, { path: string; data: DocPageMeta; projectId: string }> = {};

// process projects
for (const filePath in metaModules) {
  const mod = metaModules[filePath];
  if (mod.default && mod.default.slug) {
    projects[mod.default.slug] = mod.default;
  }
}

// process content
for (const filePath in pageModules) {
  const mod = pageModules[filePath];
  const slug = mod.page.slug;

  if (!slug)
    continue;

  // extract the project id from the filepath
  const pathParts = filePath.split('/');
  const projectId = pathParts[1]; 

  allPages[slug] = {
    path: filePath,
    data: mod.page,
    projectId: projectId,
  };
}