import type { ProjectMeta } from '@/lib/types';
import { allPages, folders } from '@/content/_index'; 
import SidebarItem from './sidebar-item';

interface SidebarProps {
  projectId: string;
  projectMeta: ProjectMeta;
}

export function Sidebar({ projectId, projectMeta }: SidebarProps) {  
  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    .map(([path, pageData]) => ({ path, ...pageData.data }));

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
      // extract the folder path
      const folderPath = pathParts.slice(0, -1).join('/');
      const folderMeta = folders[folderPath]; 
      
      // look for the section on the folder first, then the page, then fallback to root
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
    <aside className="w-64 border-r border-zinc-800 p-4 hidden lg:block overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <div className="mb-6 font-bold text-lg">{projectMeta.title}</div>
      
      <nav className="space-y-2">
        {/* root items (no sections) */}
        {tree['root']?.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {tree['root'].map((item, idx) => (
                <SidebarItem key={`root-${idx}`} item={item} projectId={projectId} />
              ))}
            </ul>
          </div>
        )}

        {/* sections */}
        {sections.map(section => {
          const items = tree[section.id];
          if (!items || items.length === 0) return null;

          return (
            <div key={section.id} className="mt-8">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                {section.label}
              </h4>
              <ul className="space-y-1">
                {items.map((item, idx) => (
                  <SidebarItem key={idx} item={item} projectId={projectId} />
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}