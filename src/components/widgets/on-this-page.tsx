import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function OnThisPage({ docPath }: { docPath: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (!docPath) return;

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

  if (headings.length === 0) return null;

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