import { Sidebar } from "@/components/widgets/sidebar";
import { allPages, folders, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { NotFoundPage } from "./404";

function PageNotFound({ projectId, projectMeta }: { projectId: string, projectMeta: any }) {
  return (
    <div className="flex">
      {projectMeta && <Sidebar projectId={projectId} projectMeta={projectMeta} />}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">404 - Document Not Found</h1>
        <p className="text-zinc-400 mt-2">The documentation page you are looking for does not exist.</p>
      </main>
    </div>
  );
}

export function DocViewerPage() {
  const { projectId, '*': docPath } = useParams<{ projectId: string; '*': string; }>();
  const projectMeta = projects[projectId || ''];
  
  // if project dont exist, show 404
  if (!projectMeta)
    return <NotFoundPage />

  // handle base project redirect
  if (!docPath || docPath.trim() === '')
    return <Navigate to={`/${projectId}/${projectMeta.redirectSlug}`} replace />;

  // handle folder root redirects
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
      </Helmet>

      <div className="flex max-w-7xl mx-auto w-full">
        <Sidebar projectId={projectId!} projectMeta={projectMeta} />

        <main className="flex-1 min-w-0 p-8">
          <article className="prose prose-invert max-w-none">
            <PageContent />
          </article>
        </main>
      </div>
    </>
  );
}