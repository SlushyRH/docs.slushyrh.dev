import React, { createContext, useContext, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "@/lib/types";

const TableContext = createContext<{
  alignments: React.RefObject<Record<number, string>>;
} | null>(null);

export function Table({ noMargin, className, children, ...props }: React.HTMLAttributes<HTMLTableElement> & ComponentProps) {
  const alignments = useRef<Record<number, string>>({});

  return (
    <TableContext.Provider value={{ alignments }}>
      <div className={cn('w-full overflow-x-auto rounded-lg border border-border shadow-sm', !noMargin ? 'component-margin' : undefined)}>
        <table className={cn("w-full text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("bg-input/20 border-b border-border", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0 [&_tr:hover]:bg-secondary/30", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr 
      className={cn("border-b border-border transition-colors divide-x divide-border", className)} 
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { colIndex: index } as any);
        }
        return child;
      })}
    </tr>
  );
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  colIndex?: number;
}

export function TableHead({ className, align, colIndex = 0, children, ...props }: TableHeadProps) {
  const context = useContext(TableContext);

  if (context && align) {
    context.alignments.current[colIndex] = align;
  }

  const finalAlign = align || "left";
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th 
      className={cn("p-4 align-middle font-semibold text-text", alignClasses[finalAlign], className)} 
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  colIndex?: number;
}

export function TableCell({ className, align, colIndex = 0, children, ...props }: TableCellProps) {
  const context = useContext(TableContext);

  const columnAlign = context?.alignments.current[colIndex] as "left" | "center" | "right" | undefined;
  const finalAlign = align || columnAlign || "left";

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td 
      className={cn("p-4 align-middle text-text", alignClasses[finalAlign], className)} 
      {...props}
    >
      {children}
    </td>
  );
}