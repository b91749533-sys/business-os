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
import { createNewInvoice } from "@/lib/actions";
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Printer,
  Eye,
  Building2,
  DollarSign,
} from "lucide-react";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];
}

const initialInvoices: InvoiceRecord[] = [
  {
    id: "inv_1",
    invoiceNumber: "INV-2026-001",
    clientName: "Patrick Collison",
    clientCompany: "Stripe Press & Payments",
    status: "PAID",
    issueDate: "2026-07-01",
    dueDate: "2026-07-15",
    subtotal: 25000.0,
    taxAmount: 2500.0,
    totalAmount: 27500.0,
    items: [
      { description: "Enterprise Architecture Consulting (Q3)", quantity: 1, unitPrice: 20000.0, amount: 20000.0 },
      { description: "Dedicated SLA Support Channel (Monthly)", quantity: 1, unitPrice: 5000.0, amount: 5000.0 },
    ],
  },
  {
    id: "inv_2",
    invoiceNumber: "INV-2026-002",
    clientName: "Guillermo Rauch",
    clientCompany: "Vercel Inc.",
    status: "PENDING",
    issueDate: "2026-07-20",
    dueDate: "2026-08-10",
    subtotal: 18000.0,
    taxAmount: 1800.0,
    totalAmount: 19800.0,
    items: [
      { description: "Edge Network Optimization Module", quantity: 2, unitPrice: 7500.0, amount: 15000.0 },
      { description: "Security Vulnerability Audit", quantity: 1, unitPrice: 3000.0, amount: 3000.0 },
    ],
  },
  {
    id: "inv_3",
    invoiceNumber: "INV-2026-003",
    clientName: "Karri Saarinen",
    clientCompany: "Linear Orbit Inc.",
    status: "OVERDUE",
    issueDate: "2026-06-15",
    dueDate: "2026-07-01",
    subtotal: 12000.0,
    taxAmount: 1200.0,
    totalAmount: 13200.0,
    items: [
      { description: "Custom Kanban Sync Integration", quantity: 1, unitPrice: 12000.0, amount: 12000.0 },
    ],
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Invoice Form state
  const [clientCompany, setClientCompany] = useState("");
  const [itemDesc, setItemDesc] = useState("SaaS Subscription License");
  const [itemQty, setItemQty] = useState("1");
  const [itemPrice, setItemPrice] = useState("5000");

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(itemQty) || 1;
    const price = parseFloat(itemPrice) || 5000;
    const subtotal = qty * price;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const newInv: InvoiceRecord = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: "Enterprise Client",
      clientCompany: clientCompany || "Client Corp",
      status: "PENDING",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      subtotal,
      taxAmount: tax,
      totalAmount: total,
      items: [{ description: itemDesc, quantity: qty, unitPrice: price, amount: subtotal }],
    };

    setInvoices([newInv, ...invoices]);
    setIsCreateOpen(false);
    setClientCompany("");
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === "ALL" || inv.status === activeTab;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: InvoiceRecord["status"]) => {
    if (status === "PAID") return <Badge variant="success">PAID</Badge>;
    if (status === "PENDING") return <Badge variant="warning">PENDING</Badge>;
    return <Badge variant="destructive">OVERDUE</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Invoices & Financial Billing
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Generate Quotes, Estimates, PDF Invoices, and track customer payment receipts.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Status Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase">
            <span>Collected Revenue</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.totalAmount, 0))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase">
            <span>Pending Receivables</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(invoices.filter((i) => i.status === "PENDING").reduce((s, i) => s + i.totalAmount, 0))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase">
            <span>Overdue Balance</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(invoices.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + i.totalAmount, 0))}
          </div>
        </Card>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs
          tabs={[
            { id: "ALL", label: "All Invoices", badge: invoices.length },
            { id: "PAID", label: "Paid", badge: invoices.filter((i) => i.status === "PAID").length },
            { id: "PENDING", label: "Pending", badge: invoices.filter((i) => i.status === "PENDING").length },
            { id: "OVERDUE", label: "Overdue", badge: invoices.filter((i) => i.status === "OVERDUE").length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search invoice # or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer Company</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredInvoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-bold text-neutral-900 dark:text-neutral-100">
                {inv.invoiceNumber}
              </TableCell>
              <TableCell>{inv.clientCompany}</TableCell>
              <TableCell>{formatDate(inv.issueDate)}</TableCell>
              <TableCell>{formatDate(inv.dueDate)}</TableCell>
              <TableCell className="font-semibold text-neutral-900 dark:text-neutral-100">
                {formatCurrency(inv.totalAmount)}
              </TableCell>
              <TableCell>{getStatusBadge(inv.status)}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => setSelectedInvoice(inv)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Create Invoice Dialog */}
      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Generate New Invoice"
        description="Create an itemized invoice for your customer."
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Client Company Name:</label>
            <Input required value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} placeholder="e.g. OpenAI Research" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Line Item Description:</label>
            <Input required value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="e.g. Enterprise Cloud License" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Quantity:</label>
              <Input type="number" value={itemQty} onChange={(e) => setItemQty(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Unit Price ($):</label>
              <Input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Generate & Issue
            </Button>
          </div>
        </form>
      </Dialog>

      {/* PDF Invoice Modal Preview */}
      {selectedInvoice && (
        <Dialog
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice Preview: ${selectedInvoice.invoiceNumber}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 bg-white p-6 rounded-xl border border-neutral-200 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 dark:border-neutral-800">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">BusinessOS</h2>
                <p className="text-xs text-neutral-500">Acme Cloud Technologies Inc.</p>
                <p className="text-xs text-neutral-500">Built by Youssef Manssouri</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedInvoice.invoiceNumber}
                </span>
                <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
              </div>
            </div>

            {/* Bill To Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-neutral-500 uppercase">Billed To:</span>
                <div className="mt-1 font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedInvoice.clientCompany}
                </div>
                <div className="text-neutral-500">{selectedInvoice.clientName}</div>
              </div>
              <div className="text-right">
                <div><span className="text-neutral-500">Issue Date:</span> {formatDate(selectedInvoice.issueDate)}</div>
                <div><span className="text-neutral-500">Due Date:</span> {formatDate(selectedInvoice.dueDate)}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-left text-xs border-t border-b border-neutral-200 dark:border-neutral-800 py-2">
              <thead>
                <tr className="border-b border-neutral-200 font-semibold text-neutral-500 dark:border-neutral-800">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-neutral-100 dark:border-neutral-800/50">
                    <td className="py-2.5 font-medium">{item.description}</td>
                    <td className="py-2.5 text-center">{item.quantity}</td>
                    <td className="py-2.5 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-2.5 text-right font-semibold">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Breakdown */}
            <div className="flex justify-end text-xs">
              <div className="w-48 space-y-1.5">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Tax (10%):</span>
                  <span>{formatCurrency(selectedInvoice.taxAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-neutral-900 dark:text-neutral-100 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span>Total Due:</span>
                  <span>{formatCurrency(selectedInvoice.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <Button onClick={() => window.print()} variant="outline" size="sm" className="gap-1.5">
                <Printer className="h-3.5 w-3.5" />
                Print / Save PDF
              </Button>
              <Button onClick={() => setSelectedInvoice(null)} size="sm">
                Close Preview
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
