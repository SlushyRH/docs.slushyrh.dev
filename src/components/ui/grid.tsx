import React, { type ReactNode } from 'react';
import type { ComponentProps } from '@/lib/types';
import { cn, componentStyles } from '@/lib/utils';

interface GridProps extends ComponentProps {
  children: ReactNode;
  minWidth?: string;
  columns?: string;
  maxColumns?: number;
}

export function Grid({ children, minWidth = '250px', columns, maxColumns, className, noMargin }: GridProps) {
  const gridTemplateColumns = columns || (maxColumns
    ? `repeat(auto-fit, minmax(max(${minWidth}, calc((100% - ${(maxColumns - 1)}1rem) / ${maxColumns})), 1fr))`
    : `repeat(auto-fit, minmax(${minWidth}, 1fr))`);

  return (
    <div 
      className={cn('grid gap-4', componentStyles({ noMargin, className }))}
      style={{ gridTemplateColumns }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { noMargin: true } as any);
        }
        return child;
      })}
    </div>
  );
}