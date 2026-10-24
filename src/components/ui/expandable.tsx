import React, { useState, type ReactNode } from 'react';
import type { ComponentProps } from '@/lib/types';
import { cn, componentStyles } from '@/lib/utils';
import { LuChevronDown } from 'react-icons/lu';

interface ExpandableProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  icon?: React.ElementType;
}

export function Expandable({ 
  title, 
  children, 
  defaultOpen = false, 
  isOpen: controlledIsOpen,
  onToggle,
  className, 
  noMargin,
  icon: Icon,
  ...props
}: ExpandableProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isActuallyOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div 
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-bg shadow-sm', 
        componentStyles({ noMargin, className })
      )}
      {...props}
    >
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between cursor-pointer px-4 py-3 text-left font-medium text-text transition-colors bg-input/20 hover:bg-secondary/30"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-text/60" />}
          <span>{title}</span>
        </div>
        <LuChevronDown
          size={16}
          className={cn(
            "text-text/60 transition-transform duration-200", 
            isActuallyOpen && "rotate-180"
          )}
        />
      </button>
      
      {isActuallyOpen && (
        <div className="border-t border-border px-4 py-3 text-sm text-text/80 leading-relaxed">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child))
              return React.cloneElement(child, { noMargin: true } as any);

            return child;
          })}
        </div>
      )}
    </div>
  );
}