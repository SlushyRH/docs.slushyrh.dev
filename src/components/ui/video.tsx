import type { ComponentProps } from "@/lib/types";
import { cn, componentStyles } from "@/lib/utils";
import ReactPlayer from 'react-player';

interface VideoProps extends ComponentProps, React.VideoHTMLAttributes<HTMLVideoElement> {
  caption?: string;
}

export function Video({ src, caption, className, noMargin, controls = true, ...props }: VideoProps) {
  return (
    <figure className={cn("w-full", componentStyles({ noMargin, className }))}>
      <div className="relative overflow-hidden rounded-lg border border-border bg-black aspect-video shadow-sm">

        <ReactPlayer 
          src={src} 
          controls={controls} 
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0 }}
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