import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ComponentProps } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function componentStyles({ noMargin, className }: ComponentProps) {
  return cn(
    !noMargin && "component-margin", 
    className
  );
}

export function capitalizeWords(val: string) {
  return String(val).replace(/\b\w/g, (char) => char.toUpperCase());
}