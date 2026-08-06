"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  UserCheck,
  CheckSquare,
  Package,
  DollarSign,
  BarChart3,
  FolderArchive,
  Settings,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI: () => void;
}

export function CommandMenu({ isOpen, onClose, onOpenAI }: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const commands = [
    { label: "Go to Dashboard", href: "/", icon: LayoutDashboard, category: "Navigation" },
    { label: "View CRM & Sales Leads", href: "/crm", icon: Users, category: "Navigation" },
    { label: "Manage Invoices & Quotes", href: "/invoices", icon: FileText, category: "Navigation" },
    { label: "Bookings & Calendar", href: "/bookings", icon: Calendar, category: "Navigation" },
    { label: "Employee Directory & Attendance", href: "/employees", icon: UserCheck, category: "Navigation" },
    { label: "Kanban Task Board", href: "/tasks", icon: CheckSquare, category: "Navigation" },
    { label: "Inventory & Stock Catalog", href: "/inventory", icon: Package, category: "Navigation" },
    { label: "Finance & Profit/Loss", href: "/finance", icon: DollarSign, category: "Navigation" },
    { label: "Interactive Analytics", href: "/analytics", icon: BarChart3, category: "Navigation" },
    { label: "Document Vault", href: "/documents", icon: FolderArchive, category: "Navigation" },
    { label: "Company & AI Settings", href: "/settings", icon: Settings, category: "Navigation" },
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open menu via trigger
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Command Palette" maxWidth="md">
      <div className="space-y-4">
        <Input
          placeholder="Search modules, pages, actions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="rounded-xl bg-neutral-50 dark:bg-neutral-800"
        />

        {/* AI Action Shortcut */}
        <button
          onClick={() => {
            onClose();
            onOpenAI();
          }}
          className="flex w-full items-center justify-between rounded-xl p-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 hover:border-indigo-500/40 transition-all text-xs font-semibold"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-indigo-600 animate-pulse" />
            <span>Ask BusinessOS AI Copilot</span>
          </div>
          <kbd className="rounded border border-indigo-300 bg-white/60 px-1.5 py-0.5 text-[10px] font-mono font-medium">
            AI
          </kbd>
        </button>

        {/* Command List */}
        <div className="max-h-64 overflow-y-auto space-y-1">
          <div className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Quick Navigation
          </div>
          {filteredCommands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.href}
                onClick={() => handleSelect(cmd.href)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-neutral-500" />
                  <span>{cmd.label}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </button>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
}
