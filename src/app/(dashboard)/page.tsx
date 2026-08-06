"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getDashboardMetrics } from "@/lib/actions";
import {
  DollarSign,
  Calendar,
  Users,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Activity,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getDashboardMetrics();
      setData(res);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Executive Command Center
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time business telemetry across revenue, bookings, CRM, and cash flow.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="px-2.5 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1.5 inline-block" />
            Live Synchronization
          </Badge>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Revenue */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {formatCurrency(data.totalRevenue)}
              </span>
              <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +18.4%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">vs. $107,600 last month</p>
          </CardContent>
        </Card>

        {/* KPI 2: Pending Invoices */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Pending Invoices
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {formatCurrency(data.pendingInvoicesAmount)}
              </span>
              <Badge variant="warning" className="text-[10px]">
                3 Invoices
              </Badge>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">1 Overdue payment notice</p>
          </CardContent>
        </Card>

        {/* KPI 3: Bookings */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Upcoming Bookings
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {data.totalAppointments} Sessions
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Next: 2:00 PM
              </span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">4 Confirmed this week</p>
          </CardContent>
        </Card>

        {/* KPI 4: Active Customers */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Active Customers
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {data.totalCustomers} Accounts
              </span>
              <span className="flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
                <TrendingUp className="h-3.5 w-3.5" />
                +4 New
              </span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">100% Retained MRR</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Revenue Analytics Chart Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Weekly Revenue Velocity</CardTitle>
            <p className="text-xs text-neutral-500">Gross revenue vs appointment volume across days</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-white inline-block" />
              Revenue ($)
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weeklyAnalytics}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
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
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Grid: Upcoming Sessions & Activity Timeline */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Upcoming Client Bookings
            </CardTitle>
            <Link href="/bookings">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.upcomingAppointments.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-4">No upcoming bookings scheduled.</p>
            ) : (
              data.upcomingAppointments.map((apt: any) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold text-xs">
                      {apt.customer?.companyName?.slice(0, 2) || "CL"}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {apt.service?.title || "Strategy Session"}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {apt.customer?.name} ({apt.customer?.companyName || "Client"})
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-[10px]">
                      {new Date(apt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Badge>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {formatDate(apt.startTime)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Right Column: Recent Activity Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Live Audit & Activity Feed
            </CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              Real-time
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.activityLogs.map((log: any) => (
              <div key={log.id} className="flex items-start gap-3 text-xs border-b border-neutral-100 pb-2.5 dark:border-neutral-800/50 last:border-0">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 font-bold text-[10px]">
                  {log.category.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {log.description}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    by <strong className="text-neutral-600 dark:text-neutral-300">{log.actorName}</strong> &bull; {formatDate(log.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
