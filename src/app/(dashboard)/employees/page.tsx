"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import {
  UserCheck,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Plus,
  Play,
  Square,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  status: "ACTIVE" | "ON_LEAVE";
  attendance: "CLOCKED_IN" | "CLOCKED_OUT";
  avatar: string;
}

const initialEmployees: Employee[] = [
  {
    id: "usr_youssef",
    name: "Youssef Manssouri",
    email: "youssef@acmecloud.com",
    title: "Founder & Chief Executive",
    department: "Executive Leadership",
    role: "ADMIN",
    status: "ACTIVE",
    attendance: "CLOCKED_IN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr_sarah",
    name: "Sarah Jenkins",
    email: "sarah.j@acmecloud.com",
    title: "VP of Business Development",
    department: "Sales & CRM",
    role: "MANAGER",
    status: "ACTIVE",
    attendance: "CLOCKED_IN",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr_alex",
    name: "Alex Chen",
    email: "alex.chen@acmecloud.com",
    title: "Lead Platform Engineer",
    department: "Engineering",
    role: "EMPLOYEE",
    status: "ACTIVE",
    attendance: "CLOCKED_OUT",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr_marcus",
    name: "Marcus Vance",
    email: "marcus.v@acmecloud.com",
    title: "Senior Financial Analyst",
    department: "Finance & Accounting",
    role: "EMPLOYEE",
    status: "ACTIVE",
    attendance: "CLOCKED_IN",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [activeTab, setActiveTab] = useState("directory");
  const [myClockedIn, setMyClockedIn] = useState(true);

  const toggleAttendance = (empId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== empId) return emp;
        const nextState = emp.attendance === "CLOCKED_IN" ? "CLOCKED_OUT" : "CLOCKED_IN";
        if (emp.id === "usr_youssef") setMyClockedIn(nextState === "CLOCKED_IN");
        return { ...emp, attendance: nextState };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Employee Directory & Attendance
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage organization team members, RBAC roles, departments, and attendance tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Clock In / Out Simulator Button */}
          <Button
            onClick={() => toggleAttendance("usr_youssef")}
            variant={myClockedIn ? "destructive" : "glow"}
            size="sm"
            className="gap-2"
          >
            {myClockedIn ? <Square className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            {myClockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: "directory", label: "Team Directory", badge: employees.length },
          { id: "attendance", label: "Live Attendance Log" },
          { id: "roles", label: "RBAC Permissions Matrix" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Directory View */}
      {activeTab === "directory" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {employees.map((emp) => (
            <Card key={emp.id} className="p-5 flex flex-col items-center text-center">
              <img
                src={emp.avatar}
                alt={emp.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
              />
              <h3 className="mt-3 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {emp.name}
              </h3>
              <p className="text-xs text-neutral-500">{emp.title}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <Badge variant={emp.role === "ADMIN" ? "default" : "secondary"} className="text-[10px]">
                  {emp.role}
                </Badge>
                <Badge
                  variant={emp.attendance === "CLOCKED_IN" ? "success" : "secondary"}
                  className="text-[10px]"
                >
                  {emp.attendance === "CLOCKED_IN" ? "CLOCKED IN" : "OFFLINE"}
                </Badge>
              </div>
              <div className="mt-4 w-full pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 space-y-1">
                <div className="truncate">{emp.email}</div>
                <div className="font-semibold text-neutral-700 dark:text-neutral-300">{emp.department}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Attendance View */}
      {activeTab === "attendance" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <img src={emp.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                  <span>{emp.name}</span>
                </TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Badge variant="success">{emp.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={emp.attendance === "CLOCKED_IN" ? "success" : "secondary"}>
                    {emp.attendance}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => toggleAttendance(emp.id)}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Toggle Clock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {/* Roles & Permissions Matrix View */}
      {activeTab === "roles" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Role-Based Access Control (RBAC) Architecture
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>ADMIN Role</TableHead>
                <TableHead>MANAGER Role</TableHead>
                <TableHead>EMPLOYEE Role</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              <TableRow>
                <TableCell className="font-bold">Financials & Invoices</TableCell>
                <TableCell><Badge variant="success">Full Access</Badge></TableCell>
                <TableCell><Badge variant="secondary">Read / Create</Badge></TableCell>
                <TableCell><Badge variant="outline">No Access</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">CRM & Pipeline</TableCell>
                <TableCell><Badge variant="success">Full Access</Badge></TableCell>
                <TableCell><Badge variant="success">Full Access</Badge></TableCell>
                <TableCell><Badge variant="secondary">Assigned Only</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Company Settings & AI</TableCell>
                <TableCell><Badge variant="success">Full Access</Badge></TableCell>
                <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                <TableCell><Badge variant="outline">No Access</Badge></TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Card>
      )}
    </div>
  );
}
