import type { ProjectMeta } from '@/lib/types';
import { allPages } from '@/content/_index'; 
import SidebarItem from './sidebar-item';
import { LuX } from 'react-icons/lu';
import { Button } from '../ui';

interface SidebarProps {
  projectId: string;
  projectMeta: ProjectMeta;
  isOpen?: boolean;
  onClose?: () => void;
}

function formatFolderName(folderName: string) {
  return folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, ' ');
}

export function Sidebar({ projectId, projectMeta, isOpen, onClose }: SidebarProps) {
  const projectPages = Object.entries(allPages)
    .filter(([_, pageData]) => pageData.projectId === projectId)
    .map(([_, pageData]) => ({ path: pageData.path, ...pageData.data, isIndex: pageData.isIndex }));

  const tree: Record<string, any[]> = {};
  
  const sections = projectMeta.sections || [];
  sections.forEach(section => {
    tree[section.id] = [];
  });
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
      
      // Build nested folder structure
      for (let i = 0; i < folderPathParts.length; i++) {
        const part = folderPathParts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        let existing = currentLevel.find(n => n.type === 'folder' && n.path === currentPath);
        if (!existing) {
          existing = { 
            type: 'folder', 
            path: currentPath, 
            label: formatFolderName(part),
            items: [],
            indexPage: null
          };
          currentLevel.push(existing);
        }
        folderNode = existing;
        currentLevel = existing.items;
      }
      
      if (folderNode) {
        if (page.isIndex) {
          folderNode.indexPage = page;
          folderNode.label = page.label || folderNode.label; 
        } else {
          folderNode.items.push({ type: 'page', ...page });
        }
      }
    }
  });

  // Sort nodes recursively
  function sortTree(items: any[]) {
    items.sort((a, b) => {
      const orderA = a.type === 'folder' ? (a.indexPage?.order ?? 99) : (a.order ?? 99);
      const orderB = b.type === 'folder' ? (b.indexPage?.order ?? 99) : (b.order ?? 99);
      return orderA - orderB;
    });
    items.forEach(node => {
      if (node.type === 'folder') {
        sortTree(node.items);
      }
    });
  }

  Object.keys(tree).forEach(key => sortTree(tree[key]));

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 lg:hidden" onClick={onClose} />
          <Button variant="outline" size="icon" onClick={onClose} className="fixed top-4 right-4 z-50 lg:hidden" aria-label="Close sidebar">
            <LuX size={20} />
          </Button>
        </>
      )}

      <aside className={`fixed inset-y-0 bg-bg left-0 z-50 w-[75%] lg:w-80 transform overflow-y-auto border-r border-border p-4 transition-transform duration-300 ease-in-out lg:sticky lg:top-14 lg:z-0 lg:block lg:h-[calc(100vh-3.5rem)] ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          {projectMeta.logoUrl && (
            <img src={projectMeta.logoUrl} alt={`${projectMeta.title} logo`} className="h-6 w-6 object-contain" />
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