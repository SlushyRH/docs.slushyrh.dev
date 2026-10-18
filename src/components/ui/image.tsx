import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
}

export function Image({ src, alt, caption, className, ...props }: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const openLightbox = () => {
    if (!imgRef.current)
      return;
    
    const rect = imgRef.current.getBoundingClientRect();
    
    setStyle({
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 51,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      objectFit: "contain",
    });
    
    setIsOpen(true);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStyle({
          position: "fixed",
          top: "5vh",
          left: "5vw",
          width: "90vw",
          height: "90vh",
          zIndex: 51,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          objectFit: "contain",
        });
        setIsAnimating(true);
      });
    });
  };

  const closeLightbox = () => {
    if (!imgRef.current)
      return;
    
    const rect = imgRef.current.getBoundingClientRect();
    
    setStyle({
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 51,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      objectFit: "contain",
    });
    setIsAnimating(false);
    
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen)
      document.body.style.overflow = "hidden";

    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      <figure className={cn("mb-4 w-full", className)}>
        <div className="overflow-hidden rounded-lg border border-border bg-black shadow-sm">
          <img 
            ref={imgRef}
            src={src} 
            alt={alt || caption || "Documentation image"} 
            className={cn(
              "w-full h-auto object-contain cursor-zoom-in transition-opacity",
              isOpen ? "invisible" : "visible" 
            )}
            onClick={openLightbox}
            {...props} 
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-sm text-center text-text/60">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div 
          className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-zoom-out transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={closeLightbox}
        />
      )}
      
      {isOpen && (
        <img 
          src={src} 
          alt={alt || caption || "Enlarged image"} 
          style={style}
          className="cursor-zoom-out"
          onClick={closeLightbox}
        />
      )}
    </>
  );
}