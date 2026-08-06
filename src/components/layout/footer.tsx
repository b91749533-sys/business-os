import React from "react";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200/80 bg-white/60 px-6 py-4 dark:border-neutral-800/80 dark:bg-neutral-950/60 backdrop-blur-md">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2 font-medium">
          <Zap className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
          <span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-semibold">BusinessOS</strong> &copy; {new Date().getFullYear()} Enterprise Platform
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            Built by Youssef Manssouri
          </span>
          <span className="h-3 w-[1px] bg-neutral-300 dark:bg-neutral-700" />
          <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer transition-colors">
            v1.0.0 Stable
          </span>
        </div>
      </div>
    </footer>
  );
}
