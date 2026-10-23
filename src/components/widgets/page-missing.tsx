import { useState } from "react";
import { Header } from "@/components/widgets/header";
import { Sidebar } from "@/components/widgets/sidebar";

export function PageMissing({ projectId, projectMeta }: { projectId: string, projectMeta: any }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header project={projectMeta} onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex lg:px-0 w-full max-w-[1600px] mx-auto">
        {projectMeta && (
          <Sidebar 
            projectId={projectId} 
            projectMeta={projectMeta} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
        
        <main className="flex-1 min-w-0 p-8 lg:p-12 flex justify-center">
          <div className="w-full max-w-4xl flex flex-col h-full">
            <article className="prose prose-invert max-w-none flex-1">
              <h1 className="text-3xl font-bold">404 - Document Not Found</h1>
              <p className="text-zinc-400 mt-2">The documentation page you are looking for does not exist or has been moved.</p>
            </article>
          </div>
        </main>

        <aside className="hidden xl:block w-64 shrink-0 p-8 pl-0" />
      </div>
    </>
  );
}