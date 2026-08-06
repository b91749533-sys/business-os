"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  User,
  CheckCircle,
  Video,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  duration: number;
  price: number;
  category: string;
}

interface BookingRecord {
  id: string;
  clientName: string;
  clientCompany: string;
  serviceTitle: string;
  staffName: string;
  date: string;
  time: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

const services: ServiceItem[] = [
  { id: "srv_1", title: "Executive Strategy Deep Dive", duration: 60, price: 450.0, category: "Advisory" },
  { id: "srv_2", title: "Enterprise Platform Onboarding", duration: 120, price: 1200.0, category: "Implementation" },
  { id: "srv_3", title: "Security & SOC2 Compliance Audit", duration: 90, price: 850.0, category: "Security" },
];

const initialBookings: BookingRecord[] = [
  {
    id: "bk_1",
    clientName: "Guillermo Rauch",
    clientCompany: "Vercel Inc.",
    serviceTitle: "Executive Strategy Deep Dive",
    staffName: "Youssef Manssouri",
    date: "2026-08-07",
    time: "14:00 - 15:00",
    status: "CONFIRMED",
  },
  {
    id: "bk_2",
    clientName: "Patrick Collison",
    clientCompany: "Stripe Press",
    serviceTitle: "Enterprise Platform Onboarding",
    staffName: "Alex Chen",
    date: "2026-08-08",
    time: "10:00 - 12:00",
    status: "CONFIRMED",
  },
  {
    id: "bk_3",
    clientName: "Karri Saarinen",
    clientCompany: "Linear Orbit",
    serviceTitle: "Security & SOC2 Compliance Audit",
    staffName: "Sarah Jenkins",
    date: "2026-08-05",
    time: "11:00 - 12:30",
    status: "COMPLETED",
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [viewMode, setViewMode] = useState<"calendar" | "services">("calendar");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Booking Form State
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [selectedService, setSelectedService] = useState(services[0].title);
  const [bookingDate, setBookingDate] = useState("2026-08-10");
  const [bookingTime, setBookingTime] = useState("14:00");

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBk: BookingRecord = {
      id: `bk_${Date.now()}`,
      clientName: clientName || "Valued Client",
      clientCompany: clientCompany || "Client Corp",
      serviceTitle: selectedService,
      staffName: "Youssef Manssouri",
      date: bookingDate,
      time: `${bookingTime} - 15:00`,
      status: "CONFIRMED",
    };
    setBookings([newBk, ...bookings]);
    setIsBookModalOpen(false);
    setClientName("");
    setClientCompany("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Bookings & Calendar
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage service catalog, staff availability, and client appointment schedules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              { id: "calendar", label: "Calendar Schedule" },
              { id: "services", label: "Service Catalog" },
            ]}
            activeTab={viewMode}
            onChange={(v: any) => setViewMode(v)}
          />
          <Button onClick={() => setIsBookModalOpen(true)} className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Schedule Booking
          </Button>
        </div>
      </div>

      {/* Main View Mode Switch */}
      {viewMode === "calendar" ? (
        <div className="space-y-6">
          {/* Calendar Header Navigation */}
          <div className="flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800/80 dark:bg-neutral-900 shadow-subtle">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                August 2026
              </span>
              <Badge variant="secondary" className="text-[10px]">
                3 Appointments
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 px-2">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                Today
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Weekly Grid Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {["Mon Aug 4", "Tue Aug 5", "Wed Aug 6", "Thu Aug 7", "Fri Aug 8", "Sat Aug 9", "Sun Aug 10"].map((day, idx) => {
              const dayDateStr = `2026-08-0${idx + 4}`;
              const dayBookings = bookings.filter((b) => b.date === dayDateStr);

              return (
                <div
                  key={day}
                  className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-3 dark:border-neutral-800/80 dark:bg-neutral-900 min-h-[220px]"
                >
                  <div className="text-xs font-bold text-neutral-500 border-b border-neutral-100 pb-2 dark:border-neutral-800">
                    {day}
                  </div>
                  <div className="mt-2 space-y-2 flex-1">
                    {dayBookings.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-2.5 text-xs text-blue-900 dark:text-blue-300"
                      >
                        <div className="font-bold truncate">{b.serviceTitle}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">{b.clientCompany}</div>
                        <div className="text-[10px] font-semibold mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {b.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Service Catalog Grid */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((srv) => (
            <Card key={srv.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px]">
                    {srv.category}
                  </Badge>
                  <span className="text-xs font-bold text-neutral-400">
                    <Clock className="h-3.5 w-3.5 inline mr-1" />
                    {srv.duration} mins
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {srv.title}
                </h3>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(srv.price)}
                </span>
                <Button size="sm" onClick={() => setIsBookModalOpen(true)}>
                  Book Service
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Schedule Booking Dialog */}
      <Dialog
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Schedule Client Booking"
        description="Book a new session in your calendar."
      >
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Client Name:</label>
            <Input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Sam Altman" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Client Company:</label>
            <Input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} placeholder="e.g. OpenAI" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Select Service:</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            >
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title} ({formatCurrency(s.price)})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Date:</label>
              <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Start Time:</label>
              <Input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsBookModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Confirm Booking
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
