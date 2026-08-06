export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE";
export type DealStage = "NEW_LEAD" | "CONTACTED" | "PROPOSAL" | "WON" | "LOST";
export type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE" | "DRAFT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type FinanceType = "REVENUE" | "EXPENSE";

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  industry?: string | null;
  currency: string;
  taxRate: number;
  timezone: string;
  plan: string;
  createdAt: Date;
}

export interface User {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  department?: string | null;
  title?: string | null;
  phone?: string | null;
  status: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  status: string;
  totalSpent: number;
  lastContact?: Date | null;
  createdAt: Date;
}

export interface Deal {
  id: string;
  companyId: string;
  customerId?: string | null;
  customer?: Customer | null;
  title: string;
  amount: number;
  stage: DealStage;
  probability: number;
  expectedClose?: Date | null;
  createdAt: Date;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  companyId: string;
  customerId: string;
  customer?: Customer | null;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  notes?: string | null;
  items?: InvoiceItem[];
  createdAt: Date;
}

export interface Service {
  id: string;
  companyId: string;
  title: string;
  description?: string | null;
  durationMinutes: number;
  price: number;
  category: string;
  isActive: boolean;
}

export interface Appointment {
  id: string;
  companyId: string;
  customerId: string;
  customer?: Customer | null;
  serviceId: string;
  service?: Service | null;
  staffId?: string | null;
  staff?: User | null;
  startTime: Date;
  endTime: Date;
  status: string;
  notes?: string | null;
}

export interface Task {
  id: string;
  companyId: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string | null;
  assignee?: User | null;
  dueDate?: Date | null;
  tags?: string | null;
  createdAt: Date;
}

export interface Product {
  id: string;
  companyId: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStockAlert: number;
  supplier?: string | null;
  barcode?: string | null;
}

export interface FinanceRecord {
  id: string;
  companyId: string;
  type: FinanceType;
  category: string;
  amount: number;
  date: Date;
  description: string;
  status: string;
}

export interface Document {
  id: string;
  companyId: string;
  name: string;
  category: string;
  size: string;
  url?: string | null;
  mimeType: string;
  tags?: string | null;
  uploadedById?: string | null;
  uploadedBy?: User | null;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  companyId: string;
  action: string;
  category: string;
  description: string;
  actorName: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  companyId: string;
  userId?: string | null;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ALERT";
  isRead: boolean;
  createdAt: Date;
}

export interface AISetting {
  id: string;
  companyId: string;
  isEnabled: boolean;
  autoDraftEmails: boolean;
  autoSummarizeInvoices: boolean;
  insightsFrequency: string;
}
