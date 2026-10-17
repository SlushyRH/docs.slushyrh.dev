import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`w-full rounded-lg border border-border bg-input p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}