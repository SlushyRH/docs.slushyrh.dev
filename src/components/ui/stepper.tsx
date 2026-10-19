import type { ComponentProps } from '@/lib/types';
import { cn, componentStyles } from '@/lib/utils';
import React, { type ReactNode, type ReactElement } from 'react';

interface StepProps {
  children: ReactNode;
  stepNumber?: number;
  className?: string;
}

export function Step({ children, stepNumber, className }: StepProps) {
  return (
    <div className={cn('relative border-l-2 border-zinc-700 pl-8 pb-8 last:pb-0 last:border-transparent', className)}>
      
      <div className="absolute -left-4.25 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border border-zinc-600 text-sm font-bold text-white">
        {stepNumber}
      </div>

      <div className="pt-1 text-zinc-300">
        {children}
      </div>
    </div>
  );
}

interface StepperProps extends ComponentProps {
  children: ReactNode;
}

export function Stepper({ children, className, noMargin }: StepperProps) {
  const stepElements = React.Children.toArray(children).filter(React.isValidElement) as ReactElement<StepProps>[];

  return (
    <div className={cn('flex flex-col ml-4', componentStyles({ noMargin, className }))}>
      {stepElements.map((child, index) => {
        return React.cloneElement(child, {
          stepNumber: index + 1,
        });
      })}
    </div>
  );
}