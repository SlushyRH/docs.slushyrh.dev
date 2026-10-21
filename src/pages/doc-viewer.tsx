import { useState, useEffect } from "react";
import { Sidebar } from "@/components/widgets/sidebar";
import { allPages, folders, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams, Link } from "react-router-dom";
import { NotFoundPage } from "./404";
import { Header } from "@/components/widgets/header";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export function OnThisPage({ docPath }: { docPath: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (!docPath)
      return;

    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(
        'article h1, article h2, article h3, article h4, article h5, article h6, article [data-size]'
      ));
      
      const parsedHeadings = elements.map((elem, index) => {
        if (!elem.id) {
          elem.id = elem.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `heading-${index}`;
        }
        
        const dataSize = elem.getAttribute('data-size');
        let level = 1;
        
        if (dataSize) {
          const match = dataSize.match(/\d+/); 
          if (match) level = Number(match[0]);
        } 
        else if (/^H[1-6]$/i.test(elem.tagName)) {
          level = Number(elem.tagName.substring(1));
        }

        return {
          id: elem.id,
          text: elem.textContent || '',
          level: Math.max(1, Math.min(level, 6))
        };
      });

      setHeadings(parsedHeadings);
    }, 0);

    return () => clearTimeout(timer);
  }, [docPath]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 55; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
    window.history.pushState(null, '', `#${id}`);
  };

  useEffect(() => {
    if (headings.length > 0 && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      
      const timer = setTimeout(() => {
        scrollToId(hashId);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [headings, docPath]);

  if (headings.length === 0)
    return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 p-8 pl-0">
      <div className="sticky top-14">
        <h4 className="font-semibold uppercase tracking-wider mb-2 ml-2.5 text-text">
          On This Page
        </h4>
        <ul className="flex flex-col">
          {headings.map((heading) => {
            const isSubheading = heading.level > 1;
            
            return (
              <li 
                key={heading.id} 
                className={cn(
                  "w-full",
                  isSubheading && "border-l border-border ml-3"
                )}
              >
                <a 
                  href={`#${heading.id}`} 
                  className="block w-full"
                  onClick={(e) => handleLinkClick(e, heading.id)}
                >
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start text-left text-text/60 hover:text-text h-auto py-1.5",
                      isSubheading && "rounded-l-none"
                    )}
                    style={{ 
                      paddingLeft: isSubheading ? `${(heading.level - 1) * 16}px` : '12px',
                      fontSize: heading.level === 1 ? '0.875rem' : '0.75rem',
                      fontWeight: heading.level === 1 ? 500 : 400
                    }}
                  >
                    <span className="truncate whitespace-normal text-left">
                      {heading.text}
                    </span>
                  </Button>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

function PageNotFound({ projectId, projectMeta }: { projectId: string, projectMeta: any }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header project={projectMeta} onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        {projectMeta && (
          <Sidebar 
            projectId={projectId} 
            projectMeta={projectMeta} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold">404 - Document Not Found</h1>
          <p className="text-zinc-400 mt-2">The documentation page you are looking for does not exist.</p>
        </main>
      </div>
    </>
  );
}

export function DocViewerPage() {
  const { projectId, '*': docPath } = useParams<{ projectId: string; '*': string; }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const projectMeta = projects[projectId || ''];
  
  if (!projectMeta)
    return <NotFoundPage />;

  if (!docPath || docPath.trim() === '')
    return <Navigate to={`/${projectId}/${projectMeta.redirectSlug}`} replace />;

  const folderMeta = folders[docPath];
  if (folderMeta && folderMeta.redirectSlug)
    return <Navigate to={`/${projectId}/${docPath}/${folderMeta.redirectSlug}`} replace />;

  const targetPage = allPages[docPath];

  if (!targetPage) {
    return <PageNotFound projectId={projectId || ''} projectMeta={projectMeta} />;
  }

  const title = `${targetPage.data.label} | ${projectMeta.title}`;
  const PageContent = targetPage.data.Content;

  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    .map(([path, pageData]) => ({ path, ...pageData.data }));

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
      const folderMeta = folders[folderPath]; 
      
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
      
      {/* FIX 1: Restored max-w-[1600px] instead of the invalid max-w-400 */}
      <div className="flex lg:px-0 w-full max-w-[1600px] mx-auto">
        <Sidebar projectId={projectId!} projectMeta={projectMeta} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* FIX 2: Added flex justify-center so the inner container is perfectly centered */}
        <main className="flex-1 min-w-0 p-8 lg:p-12 flex justify-center">
          
          {/* FIX 3: Added a centered w-full max-w-4xl wrapper to lock the document width */}
          <div className="w-full max-w-4xl flex flex-col h-full">
            <article className="prose prose-invert max-w-none flex-1">
              <PageContent project={projectMeta} />
            </article>

            <div className="flex items-center justify-between pt-6 mt-12 border-t border-border">
              {prevPage ? (
                <Link to={`/${projectId}/${prevPage.path}`}>
                  <Button variant="outline" size='lg'>
                    <LuArrowLeft className="mr-2" />
                    {prevPage.label}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextPage ? (
                <Link to={`/${projectId}/${nextPage.path}`}>
                  <Button variant="outline" size='lg'>
                    {nextPage.label}
                    <LuArrowRight className="ml-2" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>

        <OnThisPage docPath={docPath} />
      </div>
    </>
  );
}