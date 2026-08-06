"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 max-h-[90vh] overflow-y-auto",
              {
                "max-w-sm": maxWidth === "sm",
                "max-w-md": maxWidth === "md",
                "max-w-lg": maxWidth === "lg",
                "max-w-xl": maxWidth === "xl",
                "max-w-2xl": maxWidth === "2xl",
              }
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                {description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
