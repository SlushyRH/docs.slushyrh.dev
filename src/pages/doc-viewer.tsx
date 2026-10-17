import { allPages, projects } from "@/content/_index";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      {/* include sidebar here too */}
      404 - Document Not Found
    </div>
  )
}

export function DocViewerPage() {
  const { projectId, '*': docPath } = useParams<{ projectId: string; '*': string; }>();
  const projectMeta = projects[projectId || ''];

  console.log(projectMeta);

  if (!docPath || docPath.trim() === '')
    return <Navigate to={`/${projectId}/${projectMeta.redirectSlug}`} replace />

  const targetPage = allPages[docPath];

  if (!targetPage)
    return <PageNotFound />

  const title = `${targetPage.data.label} | ${projectMeta.title}`;
  const PageContent = targetPage.data.Content;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="flex">
        {/* include sidebar here */}

        <main className="flex-1">
          <PageContent />
        </main>
      </div>
    </>
  );
}