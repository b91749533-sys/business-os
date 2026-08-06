import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          {
            "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-sm":
              variant === "default",
            "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700":
              variant === "secondary",
            "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800":
              variant === "outline",
            "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800":
              variant === "ghost",
            "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 shadow-sm":
              variant === "destructive",
            "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white hover:shadow-md dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900 border border-neutral-700/20":
              variant === "glow",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs rounded-lg": size === "sm",
            "h-11 px-6 text-base rounded-xl": size === "lg",
            "h-9 w-9 p-0 rounded-xl": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
