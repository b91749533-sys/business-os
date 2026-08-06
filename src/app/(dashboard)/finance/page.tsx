"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Receipt,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface FinanceItem {
  id: string;
  type: "REVENUE" | "EXPENSE";
  category: string;
  amount: number;
  date: string;
  description: string;
}

const initialRecords: FinanceItem[] = [
  { id: "fin_1", type: "REVENUE", category: "SaaS Subscriptions", amount: 84500.0, date: "2026-08-01", description: "Stripe Monthly Recurring MRR Settlement" },
  { id: "fin_2", type: "REVENUE", category: "Enterprise Consulting", amount: 27500.0, date: "2026-08-03", description: "Invoice INV-2026-001 settlement from Stripe Press" },
  { id: "fin_3", type: "EXPENSE", category: "Cloud Infrastructure", amount: 14200.0, date: "2026-08-02", description: "AWS Multi-Region Compute & Database cluster invoice" },
  { id: "fin_4", type: "EXPENSE", category: "Payroll & Salaries", amount: 42000.0, date: "2026-08-04", description: "Bi-weekly executive & engineering staff payroll" },
  { id: "fin_5", type: "EXPENSE", category: "Software Tooling", amount: 3800.0, date: "2026-08-05", description: "Linear, Vercel, Figma, and Notion workspace licenses" },
];

const cashFlowData = [
  { month: "Jan", revenue: 65000, expenses: 32000 },
  { month: "Feb", revenue: 72000, expenses: 34000 },
  { month: "Mar", revenue: 88000, expenses: 38000 },
  { month: "Apr", revenue: 95000, expenses: 41000 },
  { month: "May", revenue: 104000, expenses: 44000 },
  { month: "Jun", revenue: 112000, expenses: 50000 },
  { month: "Jul", revenue: 127500, expenses: 60000 },
];

export default function FinancePage() {
  const [records, setRecords] = useState<FinanceItem[]>(initialRecords);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Record state
  const [recType, setRecType] = useState<"REVENUE" | "EXPENSE">("EXPENSE");
  const [recCategory, setRecCategory] = useState("Software");
  const [recAmount, setRecAmount] = useState("1500");
  const [recDesc, setRecDesc] = useState("SaaS Tooling");

  const totalRev = records.filter((r) => r.type === "REVENUE").reduce((s, r) => s + r.amount, 0);
  const totalExp = records.filter((r) => r.type === "EXPENSE").reduce((s, r) => s + r.amount, 0);
  const netProfit = totalRev - totalExp;
  const taxEstimate = netProfit > 0 ? netProfit * 0.1 : 0;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec: FinanceItem = {
      id: `fin_${Date.now()}`,
      type: recType,
      category: recCategory,
      amount: parseFloat(recAmount) || 1000,
      date: new Date().toISOString().split("T")[0],
      description: recDesc,
    };
    setRecords([newRec, ...records]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Financial Ledger & Cash Flow
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time cash flow, revenue vs expenses, net profit margin, and tax liabilities.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Log Transaction
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Gross Revenue</span>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalRev)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Operating Expenses</span>
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalExp)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Net Operating Profit</span>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(netProfit)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Estimated Tax (10%)</span>
            <Receipt className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(taxEstimate)}
          </div>
        </Card>
      </div>

      {/* Cash Flow Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Velocity (Revenue vs Expenses)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {records.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>
                <Badge variant={rec.type === "REVENUE" ? "success" : "destructive"}>
                  {rec.type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-neutral-800 dark:text-neutral-200">
                {rec.category}
              </TableCell>
              <TableCell>{rec.description}</TableCell>
              <TableCell>{formatDate(rec.date)}</TableCell>
              <TableCell className={`text-right font-bold ${rec.type === "REVENUE" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {rec.type === "REVENUE" ? "+" : "-"}{formatCurrency(rec.amount)}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Add Entry Modal */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Log Financial Transaction"
        description="Record an income or expense line item."
      >
        <form onSubmit={handleAddRecord} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Transaction Type:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRecType("REVENUE")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold ${recType === "REVENUE" ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}
              >
                + Revenue
              </button>
              <button
                type="button"
                onClick={() => setRecType("EXPENSE")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold ${recType === "EXPENSE" ? "bg-rose-600 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}
              >
                - Expense
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Category:</label>
            <Input required value={recCategory} onChange={(e) => setRecCategory(e.target.value)} placeholder="e.g. Software, Payroll" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Amount ($):</label>
            <Input type="number" required value={recAmount} onChange={(e) => setRecAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Description:</label>
            <Input value={recDesc} onChange={(e) => setRecDesc(e.target.value)} placeholder="Notes regarding payment..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Entry
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
