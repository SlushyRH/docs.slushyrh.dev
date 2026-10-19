import type { ComponentProps } from '@/lib/types';
import { cn, componentStyles } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps extends ComponentProps {
  children: ReactNode;
}

export function Card({ children, className, noMargin }: CardProps) {
  return (
    <div className={cn('w-full rounded-lg border border-border bg-input p-4 shadow-sm', componentStyles({ noMargin, className }))}>
      {children}
    </div>
  );
}