import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900/60 shadow-subtle">
      <table className={cn("w-full text-left text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-neutral-50/80 text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:bg-neutral-800/40 dark:text-neutral-400 border-b border-neutral-200/80 dark:border-neutral-800/80", className)}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-neutral-100 transition-colors hover:bg-neutral-50/50 dark:border-neutral-800/50 dark:hover:bg-neutral-800/30 last:border-0",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  className,
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("px-4 py-3 font.medium", className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3.5 align-middle text-neutral-700 dark:text-neutral-300", className)} {...props}>
      {children}
    </td>
  );
}
