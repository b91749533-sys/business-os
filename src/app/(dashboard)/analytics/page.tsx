"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  PieChart as PieIcon,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const growthData = [
  { month: "Q1 Jan", mrr: 65000, customers: 14, bookings: 8 },
  { month: "Q1 Feb", mrr: 72000, customers: 18, bookings: 12 },
  { month: "Q1 Mar", mrr: 88000, customers: 21, bookings: 15 },
  { month: "Q2 Apr", mrr: 95000, customers: 24, bookings: 18 },
  { month: "Q2 May", mrr: 104000, customers: 26, bookings: 22 },
  { month: "Q2 Jun", mrr: 112000, customers: 27, bookings: 25 },
  { month: "Q3 Jul", mrr: 127500, customers: 28, bookings: 29 },
];

const channelData = [
  { channel: "Enterprise Sales", value: 68000 },
  { channel: "SaaS Self-Serve", value: 34500 },
  { channel: "Advisory Bookings", value: 18000 },
  { channel: "Partner Referrals", value: 7000 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("YTD");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Business Intelligence & Analytics
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Deep multi-dimensional analysis across MRR growth, retention, bookings, and sales channels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["30D", "90D", "YTD", "ALL"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                timeRange === range
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Summary Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase flex justify-between">
            <span>MRR Velocity</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            $127,500
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            +22.5% YoY
          </span>
        </Card>
        <Card className="p-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase flex justify-between">
            <span>Customer LTV</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            $18,400
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">Avg contract length 14 mo</span>
        </Card>
        <Card className="p-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase flex justify-between">
            <span>CAC Payback</span>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            4.2 Months
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 block">Top 5% SaaS Benchmark</span>
        </Card>
        <Card className="p-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase flex justify-between">
            <span>Net Revenue Retention</span>
            <PieIcon className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            124.8%
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">Zero Account Churn</span>
        </Card>
      </div>

      {/* Main Growth Curve Chart */}
      <Card>
        <CardHeader>
          <CardTitle>MRR Trajectory & Customer Expansion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="MRR ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Channel Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Gross Revenue by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical">
                <XAxis type="number" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis dataKey="channel" type="category" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderRadius: "12px",
                    border: "1px solid #333",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
