import { useState } from "react";
import { Sidebar } from "@/components/widgets/sidebar";
import { Header } from "@/components/widgets/header";
import { allPages, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { NotFoundPage } from "./404"; 

// Widgets
import { OnThisPage } from "@/components/widgets/on-this-page";
import { Pagination } from "@/components/widgets/pagination";
import { PageMissing } from "@/components/widgets/page-missing";

function formatFolderName(folderName: string) {
  return folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' ');
}

export function DocViewerPage() {
  const { projectId, '*': docPath } = useParams<{ projectId: string; '*': string; }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const projectMeta = projects[projectId || ''];
  
  if (!projectMeta) return <NotFoundPage />;

  if (!docPath || docPath.trim() === '')
    return <Navigate to={`/${projectId}/${projectMeta.redirectSlug}`} replace />;

  const targetPage = allPages[`${projectId}/${docPath}`];

  if (!targetPage) {
    const childPages = Object.values(allPages).filter(
      p => p.projectId === projectId && p.path.startsWith(`${docPath}/`)
    );

    if (childPages.length > 0) {
      // Find the first child page directly and navigate to its path
      const firstChild = childPages.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))[0];
      return <Navigate to={`/${projectId}/${firstChild.path}`} replace />;
    }

    return <PageMissing projectId={projectId || ''} projectMeta={projectMeta} />;
  }

  const title = `${targetPage.data.label} | ${projectMeta.title}`;
  const PageContent = targetPage.data.Content;

  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    .map(([_, pageData]) => ({ path: pageData.path, ...pageData.data, isIndex: pageData.isIndex }));

  const tree: Record<string, any[]> = {};
  const sections = projectMeta.sections || []; 
  sections.forEach((section: any) => { tree[section.id] = []; }); 
  tree['root'] = [];

  projectPages.forEach(page => {
    const pathParts = page.path.split('/');
    const isRootPage = pathParts.length === 1;

    const requestedSection = page.section || 'root';
    const sectionId = tree[requestedSection] ? requestedSection : 'root';

    if (isRootPage && !page.isIndex) {
      tree[sectionId].push({ type: 'page', ...page });
    } else {
      const folderPathParts = page.isIndex ? pathParts : pathParts.slice(0, -1);
      
      let currentLevel = tree[sectionId];
      let currentPath = '';
      let folderNode = null;
      
      for (let i = 0; i < folderPathParts.length; i++) {
        const part = folderPathParts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        let existing = currentLevel.find((n: any) => n.type === 'folder' && n.path === currentPath);
        if (!existing) {
          existing = { type: 'folder', path: currentPath, label: formatFolderName(part), items: [], indexPage: null };
          currentLevel.push(existing);
        }
        folderNode = existing;
        currentLevel = existing.items;
      }
      
      if (folderNode) {
        if (page.isIndex) {
          folderNode.indexPage = page;
        } else {
          folderNode.items.push({ type: 'page', ...page });
        }
      }
    }
  });

  function sortTree(items: any[]) {
    items.sort((a, b) => {
      const orderA = a.type === 'folder' ? (a.indexPage?.order ?? 99) : (a.order ?? 99);
      const orderB = b.type === 'folder' ? (b.indexPage?.order ?? 99) : (b.order ?? 99);
      return orderA - orderB;
    });
    items.forEach(node => {
      if (node.type === 'folder') sortTree(node.items);
    });
  }

  Object.keys(tree).forEach(key => sortTree(tree[key]));

  const flatPages: any[] = [];
  const renderOrder = ['root', ...sections.map((s: any) => s.id)];
  
  function flattenNodes(items: any[]) {
    items.forEach(node => {
      if (node.type === 'folder') {
        if (node.indexPage) flatPages.push(node.indexPage);
        flattenNodes(node.items);
      } else {
        flatPages.push(node);
      }
    });
  }
  
  renderOrder.forEach(sectionId => {
    if (tree[sectionId]) flattenNodes(tree[sectionId]);
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