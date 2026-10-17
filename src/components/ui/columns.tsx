import { type ReactNode } from 'react';

interface ColumnsProps {
  children: ReactNode;
  minWidth?: string;
  className?: string;
}

export function Columns({ children, minWidth = '250px', className = '' }: ColumnsProps) {
  return (
    <div 
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))` }}
    >
      {children}
    </div>
  );
}