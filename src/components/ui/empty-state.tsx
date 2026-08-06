import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 mb-4">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
