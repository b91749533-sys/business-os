"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils";
import { createNewCustomer } from "@/lib/actions";
import {
  Users,
  Plus,
  Search,
  Building2,
  Phone,
  Mail,
  DollarSign,
  Briefcase,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List,
} from "lucide-react";

interface DealCard {
  id: string;
  customerName: string;
  companyName: string;
  title: string;
  amount: number;
  stage: "NEW_LEAD" | "CONTACTED" | "PROPOSAL" | "WON" | "LOST";
  probability: number;
}

const initialDeals: DealCard[] = [
  {
    id: "deal_1",
    customerName: "Patrick Collison",
    companyName: "Stripe Press & Payments",
    title: "Global Payments Orchestration Expansion",
    amount: 68000.0,
    stage: "PROPOSAL",
    probability: 75,
  },
  {
    id: "deal_2",
    customerName: "Sam Altman",
    companyName: "OpenAI Research",
    title: "AI Inference Gateway Retainer",
    amount: 120000.0,
    stage: "CONTACTED",
    probability: 50,
  },
  {
    id: "deal_3",
    customerName: "Paul Copplestone",
    companyName: "Supabase Labs",
    title: "Database Sync Engine Pilot",
    amount: 18000.0,
    stage: "NEW_LEAD",
    probability: 25,
  },
  {
    id: "deal_4",
    customerName: "Guillermo Rauch",
    companyName: "Vercel Inc.",
    title: "Frontend Infrastructure Enterprise Tier",
    amount: 35000.0,
    stage: "WON",
    probability: 100,
  },
  {
    id: "deal_5",
    customerName: "Karri Saarinen",
    companyName: "Linear Orbit Inc.",
    title: "Productivity API Integration License",
    amount: 24000.0,
    stage: "WON",
    probability: 100,
  },
];

const stages = [
  { id: "NEW_LEAD", label: "New Lead", color: "bg-blue-500" },
  { id: "CONTACTED", label: "Contacted", color: "bg-indigo-500" },
  { id: "PROPOSAL", label: "Proposal", color: "bg-purple-500" },
  { id: "WON", label: "Won", color: "bg-emerald-500" },
  { id: "LOST", label: "Lost", color: "bg-rose-500" },
];

export default function CRMPage() {
  const [deals, setDeals] = useState<DealCard[]>(initialDeals);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form fields
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custCompany, setCustCompany] = useState("");
  const [dealTitle, setDealTitle] = useState("");
  const [dealAmount, setDealAmount] = useState("25000");

  const moveStage = (dealId: string, direction: "next" | "prev") => {
    const stageOrder: DealCard["stage"][] = ["NEW_LEAD", "CONTACTED", "PROPOSAL", "WON", "LOST"];
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const currIndex = stageOrder.indexOf(d.stage);
        const nextIndex =
          direction === "next"
            ? Math.min(currIndex + 1, stageOrder.length - 1)
            : Math.max(currIndex - 1, 0);
        return { ...d, stage: stageOrder[nextIndex] };
      })
    );
  };

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal: DealCard = {
      id: `deal_${Date.now()}`,
      customerName: custName,
      companyName: custCompany || "Independent",
      title: dealTitle || "Enterprise Contract",
      amount: parseFloat(dealAmount) || 15000,
      stage: "NEW_LEAD",
      probability: 30,
    };
    setDeals([newDeal, ...deals]);
    await createNewCustomer({ name: custName, email: custEmail, companyName: custCompany });
    setIsAddModalOpen(false);
    setCustName("");
    setCustEmail("");
    setCustCompany("");
    setDealTitle("");
  };

  const filteredDeals = deals.filter(
    (d) =>
      d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            CRM & Sales Pipeline
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage enterprise leads, deal flow, customer accounts, and sales pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-100 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                viewMode === "kanban"
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                viewMode === "table"
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Table View
            </button>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add Lead / Deal
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search by company, customer, or deal title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <Badge variant="secondary" className="px-3 py-2 text-xs">
          Pipeline Total: {formatCurrency(deals.reduce((s, d) => s + d.amount, 0))}
        </Badge>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((s, d) => s + d.amount, 0);

            return (
              <div
                key={stage.id}
                className="flex flex-col rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-3 dark:border-neutral-800/80 dark:bg-neutral-900/40 min-w-[240px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {stage.label}
                    </span>
                    <span className="rounded-full bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      {stageDeals.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-400">
                    {formatCurrency(stageTotal)}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="mt-3 space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                  {stageDeals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="p-4 hover:shadow-card transition-all cursor-pointer border-neutral-200 dark:border-neutral-800"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {deal.companyName}
                        </span>
                        <Badge variant="secondary" className="text-[9px]">
                          {deal.probability}% Prob
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {deal.title}
                      </div>
                      <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(deal.amount)}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>{deal.customerName}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveStage(deal.id, "prev")}
                            className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          >
                            &larr;
                          </button>
                          <button
                            onClick={() => moveStage(deal.id, "next")}
                            className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          >
                            &rarr;
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Deal Title</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Probability</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredDeals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-bold text-neutral-900 dark:text-neutral-100">
                  {deal.companyName}
                </TableCell>
                <TableCell>{deal.customerName}</TableCell>
                <TableCell>{deal.title}</TableCell>
                <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(deal.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{deal.stage}</Badge>
                </TableCell>
                <TableCell>{deal.probability}%</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Deal Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Lead & Deal"
        description="Register a new enterprise customer opportunity."
      >
        <form onSubmit={handleAddDeal} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Contact Name:</label>
            <Input required value={custName} onChange={(e) => setCustName(e.target.value)} placeholder="e.g. Patrick Collison" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Email Address:</label>
            <Input type="email" required value={custEmail} onChange={(e) => setCustEmail(e.target.value)} placeholder="e.g. patrick@stripe.com" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Company Name:</label>
            <Input value={custCompany} onChange={(e) => setCustCompany(e.target.value)} placeholder="e.g. Stripe Inc" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Deal Title:</label>
            <Input value={dealTitle} onChange={(e) => setDealTitle(e.target.value)} placeholder="e.g. Cloud License Expansion" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Estimated Deal Value ($):</label>
            <Input type="number" value={dealAmount} onChange={(e) => setDealAmount(e.target.value)} placeholder="25000" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Create Deal
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
