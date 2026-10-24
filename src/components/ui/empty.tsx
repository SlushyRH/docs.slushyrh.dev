import { type ReactNode } from 'react';
import type { ComponentProps } from '@/lib/types';
import { cn, componentStyles } from '@/lib/utils';

interface EmptyProps extends ComponentProps {
  children: ReactNode;
}

export function Empty({ children, className, noMargin }: EmptyProps) {
  return (
    <div className={cn(componentStyles({ noMargin, className }))}>
      {children}
    </div>
  );
}