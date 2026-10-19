import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <div className={cn('border-t-2 border-border my-3', className)} />
  )
}