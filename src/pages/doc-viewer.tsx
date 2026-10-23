import { useState } from "react";
import { Sidebar } from "@/components/widgets/sidebar";
import { Header } from "@/components/widgets/header";
import { allPages, folders, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { NotFoundPage } from "./404"; 

// Widgets
import { OnThisPage } from "@/components/widgets/on-this-page";
import { Pagination } from "@/components/widgets/pagination";
import { PageMissing } from "@/components/widgets/page-missing";

export function DocViewerPage() {
  const { projectId, '*': docPath } = useParams<{ projectId: string; '*': string; }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const projectMeta = projects[projectId || ''];
  
  if (!projectMeta)
    return <NotFoundPage />;

  if (!docPath || docPath.trim() === '')
    return <Navigate to={`/${projectId}/${projectMeta.redirectSlug}`} replace />;

  // Prefix docPath with projectId to match the new unique key
  const folderMeta = folders[`${projectId}/${docPath}`];
  if (folderMeta && folderMeta.redirectSlug)
    return <Navigate to={`/${projectId}/${docPath}/${folderMeta.redirectSlug}`} replace />;

  // Prefix docPath with projectId to match the new unique key
  const targetPage = allPages[`${projectId}/${docPath}`];

  if (!targetPage) {
    return <PageMissing projectId={projectId || ''} projectMeta={projectMeta} />;
  }

  const title = `${targetPage.data.label} | ${projectMeta.title}`;
  const PageContent = targetPage.data.Content;

  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    // Extract path from the object, not the dictionary key
    .map(([_, pageData]) => ({ path: pageData.path, ...pageData.data }));

  const tree: Record<string, any[]> = {};
  const sections = projectMeta.sections || []; 
  sections.forEach((section: any) => { tree[section.id] = []; }); 
  tree['root'] = [];

  projectPages.forEach(page => {
    const pathParts = page.path.split('/');
    const isRootPage = pathParts.length === 1;

    if (isRootPage) {
      const sectionId = tree[page.section || ''] ? page.section! : 'root';
      tree[sectionId].push({ type: 'page', ...page });
    } else {
      const folderPath = pathParts.slice(0, -1).join('/');
      
      // Prefix folderPath with projectId to look up the correct meta
      const folderMeta = folders[`${projectId}/${folderPath}`]; 
      
      const requestedSection = folderMeta?.section || page.section || 'root';
      const sectionId = tree[requestedSection] ? requestedSection : 'root';
      
      let folderNode = tree[sectionId].find((n: any) => n.type === 'folder' && n.path === folderPath);
      if (!folderNode) {
        folderNode = { type: 'folder', path: folderPath, meta: folderMeta, pages: [] };
        tree[sectionId].push(folderNode);
      }
      folderNode.pages.push({ type: 'page', ...page });
    }
  });

  Object.keys(tree).forEach(key => { 
    tree[key].sort((a, b) => { 
      const orderA = a.type === 'folder' ? (a.meta?.order ?? 99) : (a.order ?? 99); 
      const orderB = b.type === 'folder' ? (b.meta?.order ?? 99) : (b.order ?? 99); 
      return orderA - orderB; 
    });
    tree[key].forEach(node => {
      if (node.type === 'folder') {
        node.pages.sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99));
      }
    });
  });

  const flatPages: any[] = [];
  const renderOrder = ['root', ...sections.map((s: any) => s.id)];
  
  renderOrder.forEach(sectionId => {
    const items = tree[sectionId];
    if (!items) return;
    items.forEach(node => {
      if (node.type === 'page') {
        flatPages.push(node);
      } else if (node.type === 'folder') {
        node.pages.forEach((page: any) => flatPages.push(page));
      }
    });
  });

  const currentIndex = flatPages.findIndex(p => p.path === docPath);
  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const nextPage = currentIndex !== -1 && currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={targetPage.data.description} />
        {projectMeta.logoUrl && (
          <link rel="icon" href={projectMeta.logoUrl} />
        )}
      </Helmet>

      <Header project={projectMeta} onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex lg:px-0 w-full max-w-[1600px] mx-auto">
        <Sidebar projectId={projectId!} projectMeta={projectMeta} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 min-w-0 p-8 lg:p-12 flex justify-center">
          <div className="w-full max-w-4xl flex flex-col h-full">
            <article className="prose prose-invert max-w-none flex-1">
              <PageContent project={projectMeta} />
            </article>

            <Pagination projectId={projectId!} prevPage={prevPage} nextPage={nextPage} />
          </div>
        </main>

        <OnThisPage docPath={docPath} />
      </div>
    </>
  );
}