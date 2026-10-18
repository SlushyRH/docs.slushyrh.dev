import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
}

export function Image({ src, alt, caption, className, ...props }: ImageProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-lg border border-border bg-zinc-900/50 shadow-sm">
        <img 
          src={src} 
          alt={alt || caption || "Documentation image"} 
          className="w-full h-auto object-contain"
          {...props} 
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-center text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}