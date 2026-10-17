import { useState, useEffect } from "react";
import { Sidebar } from "@/components/widgets/sidebar";
import { allPages, folders, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { NotFoundPage } from "./404";
import { Header } from "@/components/widgets/header";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {projectMeta.logoUrl && (
          <link rel="icon" href={projectMeta.logoUrl} />
        )}
      </Helmet>

      <Header project={projectMeta} onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex lg:px-0 w-full max-w-[1600px] mx-auto">
        <Sidebar projectId={projectId!} projectMeta={projectMeta} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 min-w-0 p-8 lg:p-12">
          <article className="prose prose-invert max-w-none">
            <PageContent project={projectMeta} />
          </article>
        </main>

        <OnThisPage docPath={docPath} />
      </div>
    </>
  );
}