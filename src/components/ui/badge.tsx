import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        {
          "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":
            variant === "default",
          "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300":
            variant === "secondary",
          "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30":
            variant === "success",
          "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/30":
            variant === "warning",
          "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/30":
            variant === "destructive",
          "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
