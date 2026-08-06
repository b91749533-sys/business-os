"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Building2,
  Sparkles,
  ShieldCheck,
  Globe,
  Clock,
  DollarSign,
  Save,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [saved, setSaved] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("Acme Cloud Technologies");
  const [industry, setIndustry] = useState("Enterprise Software & Cloud");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("10.0");
  const [timezone, setTimezone] = useState("America/New_York");

  // AI Modules State
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoEmail, setAutoEmail] = useState(true);
  const [autoInvoice, setAutoInvoice] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Company & System Settings
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Configure multi-tenant branding, tax rates, working hours, security, and modular AI engines.
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2" size="sm" variant={saved ? "glow" : "default"}>
          {saved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
          {saved ? "Settings Saved" : "Save Changes"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: "branding", label: "Company Profile" },
          { id: "ai", label: "Modular AI Features" },
          { id: "financials", label: "Taxes & Currencies" },
          { id: "security", label: "Security & RBAC" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Company Profile Tab */}
      {activeTab === "branding" && (
        <Card className="p-6 space-y-6">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-500" />
            Tenant Branding & Identity
          </h3>

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Company Name:</label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Industry / Vertical:</label>
              <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Timezone:</label>
              <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>
          </form>
        </Card>
      )}

      {/* Modular AI Features Tab */}
      {activeTab === "ai" && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Modular BusinessOS Copilot
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Toggle AI modules on or off without affecting core application functionality.
              </p>
            </div>
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                aiEnabled ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800"
              }`}
            >
              {aiEnabled ? "AI Active" : "AI Disabled"}
            </button>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  AI Invoice Auto-Summarizer
                </div>
                <div className="text-[11px] text-neutral-500">Automatically generate summaries for incoming PDF invoices.</div>
              </div>
              <input
                type="checkbox"
                checked={autoInvoice}
                onChange={() => setAutoInvoice(!autoInvoice)}
                className="h-4 w-4 rounded text-neutral-900"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  AI Smart Email Drafter
                </div>
                <div className="text-[11px] text-neutral-500">Draft context-aware proposal emails for CRM leads.</div>
              </div>
              <input
                type="checkbox"
                checked={autoEmail}
                onChange={() => setAutoEmail(!autoEmail)}
                className="h-4 w-4 rounded text-neutral-900"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Taxes & Currencies Tab */}
      {activeTab === "financials" && (
        <Card className="p-6 space-y-6">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            Financial & Tax Parameters
          </h3>

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Base Currency:</label>
              <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Default Tax Rate (%):</label>
              <Input value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
          </form>
        </Card>
      )}

      {/* Security & RBAC Tab */}
      {activeTab === "security" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Security & Audit Telemetry
          </h3>
          <p className="text-xs text-neutral-500">
            Enforces company-level data isolation, CSRF protection, and audit logging.
          </p>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="font-bold">Multi-Tenant Isolation Active</div>
            <div className="mt-1">All database queries strictly filter by companyId: comp_acme_2026.</div>
          </div>
        </Card>
      )}
    </div>
  );
}
