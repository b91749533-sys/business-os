"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { createNewTask, updateTaskStatus } from "@/lib/actions";
import {
  CheckSquare,
  Plus,
  Search,
  Clock,
  User,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assigneeName: string;
  dueDate: string;
  tags: string;
}

const initialTasks: TaskItem[] = [
  {
    id: "tsk_1",
    title: "Implement RBAC Middleware for Multi-Tenant Routing",
    description: "Ensure companyId scoping on all Server Actions and API endpoints.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    assigneeName: "Alex Chen",
    dueDate: "2026-08-10",
    tags: "Security, Backend",
  },
  {
    id: "tsk_2",
    title: "Design Linear-style Command Palette (Cmd+K)",
    description: "Global keyboard shortcuts for instant navigation across all 11 modules.",
    status: "DONE",
    priority: "HIGH",
    assigneeName: "Youssef Manssouri",
    dueDate: "2026-08-04",
    tags: "UI/UX, Polish",
  },
  {
    id: "tsk_3",
    title: "Setup Stripe Webhooks for Automated Invoice Settlement",
    description: "Parse invoice.payment_succeeded events and update Prisma status.",
    status: "TODO",
    priority: "HIGH",
    assigneeName: "Marcus Vance",
    dueDate: "2026-08-15",
    tags: "Payments, Finance",
  },
  {
    id: "tsk_4",
    title: "Audit Low Stock Threshold Alerts in Inventory Vault",
    description: "Send push notification when server hardware units drop under 5 items.",
    status: "REVIEW",
    priority: "MEDIUM",
    assigneeName: "Sarah Jenkins",
    dueDate: "2026-08-09",
    tags: "Inventory",
  },
];

const columns = [
  { id: "TODO", label: "To Do", color: "bg-neutral-400" },
  { id: "IN_PROGRESS", label: "In Progress", color: "bg-blue-500" },
  { id: "REVIEW", label: "In Review", color: "bg-amber-500" },
  { id: "DONE", label: "Completed", color: "bg-emerald-500" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<TaskItem["priority"]>("HIGH");
  const [taskTags, setTaskTags] = useState("Engineering");

  const moveTask = async (taskId: string, direction: "next" | "prev") => {
    const order: TaskItem["status"][] = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currIndex = order.indexOf(t.status);
        const nextIndex =
          direction === "next"
            ? Math.min(currIndex + 1, order.length - 1)
            : Math.max(currIndex - 1, 0);
        return { ...t, status: order[nextIndex] };
      })
    );
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskItem = {
      id: `tsk_${Date.now()}`,
      title: taskTitle,
      description: taskDesc || "High priority item",
      status: "TODO",
      priority: taskPriority,
      assigneeName: "Youssef Manssouri",
      dueDate: "2026-08-12",
      tags: taskTags,
    };
    setTasks([newTask, ...tasks]);
    await createNewTask({ title: taskTitle, description: taskDesc, priority: taskPriority, tags: taskTags });
    setIsAddOpen(false);
    setTaskTitle("");
    setTaskDesc("");
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityBadge = (priority: TaskItem["priority"]) => {
    if (priority === "URGENT") return <Badge variant="destructive">URGENT</Badge>;
    if (priority === "HIGH") return <Badge variant="warning">HIGH</Badge>;
    return <Badge variant="secondary">{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Tasks & Workflows
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Linear-style task management with assignees, priorities, tags, and column tracking.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Filter tasks by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-3 dark:border-neutral-800/80 dark:bg-neutral-900/40 min-w-[260px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {col.label}
                  </span>
                  <span className="rounded-full bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards */}
              <div className="mt-3 space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                {colTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 hover:shadow-card transition-all cursor-pointer border-neutral-200 dark:border-neutral-800"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {task.title}
                      </span>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <p className="mt-1 text-[11px] text-neutral-500 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {task.tags}
                      </span>
                      <span>Assigned: {task.assigneeName}</span>
                    </div>

                    {/* Column Shift Buttons */}
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-end gap-1">
                      <button
                        onClick={() => moveTask(task.id, "prev")}
                        className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[10px]"
                      >
                        &larr; Prev
                      </button>
                      <button
                        onClick={() => moveTask(task.id, "next")}
                        className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[10px]"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create New Task"
        description="Add a task to the Linear-style issue tracker."
      >
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Task Title:</label>
            <Input required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Optimize Prisma Queries" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Description:</label>
            <Input value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} placeholder="Details regarding execution..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Priority:</label>
              <select
                value={taskPriority}
                onChange={(e: any) => setTaskPriority(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Tags:</label>
              <Input value={taskTags} onChange={(e) => setTaskTags(e.target.value)} placeholder="e.g. Backend, UI" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Create Task
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
