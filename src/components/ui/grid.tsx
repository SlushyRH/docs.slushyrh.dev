import { type ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  minWidth?: string;
  className?: string;
}

export function Grid({ children, minWidth = '250px', className = '' }: GridProps) {
  return (
    <div 
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))` }}
    >
      {children}
    </div>
  );
}