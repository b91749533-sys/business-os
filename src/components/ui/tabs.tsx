"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; badge?: string | number }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-sm font-medium",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-150 text-xs font-medium focus:outline-none select-none",
              isActive
                ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-neutral-100"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            {tab.icon && <span className="h-3.5 w-3.5">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold rounded-full",
                  isActive
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200"
                    : "bg-neutral-200/70 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
