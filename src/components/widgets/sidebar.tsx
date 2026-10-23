import type { ProjectMeta } from '@/lib/types';
import { allPages, folders } from '@/content/_index'; 
import SidebarItem from './sidebar-item';
import { LuX } from 'react-icons/lu';
import { Button } from '../ui';

interface SidebarProps {
  projectId: string;
  projectMeta: ProjectMeta;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ projectId, projectMeta, isOpen, onClose }: SidebarProps) {
  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    // Extract path from the object, not the dictionary key
    .map(([_, pageData]) => ({ path: pageData.path, ...pageData.data }));

  const tree: Record<string, any[]> = {};
  
  const sections = projectMeta.sections || [];
  sections.forEach(section => {
    tree[section.id] = [];
  });
  tree['root'] = []; 

  projectPages.forEach(page => {
    const pathParts = page.path.split('/'); 
    const isRootPage = pathParts.length === 1;
    
    if (isRootPage) {
      const sectionId = tree[page.section || ''] ? page.section! : 'root';
      tree[sectionId].push({ type: 'page', ...page });
    } else {
      const folderPath = pathParts.slice(0, -1).join('/');
      // Look up folder meta using the unique composite key
      const folderMeta = folders[`${projectId}/${folderPath}`]; 
      
      const requestedSection = folderMeta?.section || page.section || 'root';
      const sectionId = tree[requestedSection] ? requestedSection : 'root';
      
      let folderNode = tree[sectionId].find(n => n.type === 'folder' && n.path === folderPath);
      if (!folderNode) {
        folderNode = { 
          type: 'folder', 
          path: folderPath, 
          meta: folderMeta, 
          pages: [] 
        };
        tree[sectionId].push(folderNode);
      }
      folderNode.pages.push({ type: 'page', ...page });
    }
  });

  // sort items
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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 lg:hidden"
            onClick={onClose}
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onClose} 
            className="fixed top-4 right-4 z-50 lg:hidden" 
            aria-label="Close sidebar"
          >
            <LuX size={20} />
          </Button>
        </>
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed inset-y-0 bg-bg left-0 z-50 w-[75%] lg:w-64 transform overflow-y-auto border-r border-border p-4 transition-transform duration-300 ease-in-out lg:sticky lg:top-14 lg:z-0 lg:block lg:h-[calc(100vh-3.5rem)] ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Mobile Header with Close Button */}
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          {projectMeta.logoUrl && (
            <img 
              src={projectMeta.logoUrl} 
              alt={`${projectMeta.title} logo`} 
              className="h-6 w-6 object-contain" 
            />
          )}
          <span className="font-bold text-lg">{projectMeta.title}</span>
        </div>
        
        <nav className="space-y-2">
          {tree['root']?.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-1">
                {tree['root'].map((item, idx) => (
                  <SidebarItem key={`root-${idx}`} item={item} projectId={projectId} onClose={onClose} />
                ))}
              </ul>
            </div>
          )}

          {sections.map(section => {
            const items = tree[section.id];
            if (!items || items.length === 0) return null;

            return (
              <div key={section.id} className="mt-8">
                <h4 className="font-semibold uppercase tracking-wider mb-2 ml-2.5">
                  {section.label}
                </h4>
                <ul className="space-y-1">
                  {items.map((item, idx) => (
                    <SidebarItem key={idx} item={item} projectId={projectId} onClose={onClose} />
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}