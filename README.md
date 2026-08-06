# BusinessOS - Modern Multi-Tenant All-in-One SaaS

**BusinessOS** is a production-ready, multi-tenant enterprise business operating system designed for small and medium businesses. It replaces multiple fragmented business tools (CRM, Invoicing, Bookings, HR, Tasks, Inventory, Cash Flow, Documents, and AI Analytics) with one cohesive, lightning-fast, highly aesthetic platform.

> Designed with the combined product ethics of **Linear**, **Notion**, **Stripe Dashboard**, and **Vercel**.
> **Built by Youssef Manssouri**.

---

## Key Features & Modules

1. **Executive Dashboard**: Live revenue metrics, pending receivables, upcoming client bookings, activity telemetry timeline, and interactive weekly revenue velocity charts.
2. **CRM & Sales Pipeline**: Multi-stage sales pipeline (Kanban board & Table view), lead cards, deal probabilities, and customer history.
3. **Invoices & Financial Billing**: Itemized invoice builder, PDF printable preview, tax calculations, and status tracking (Paid, Pending, Overdue).
4. **Bookings & Calendar**: Service catalog, duration/price management, interactive appointment calendar (Month/Week/Day), and scheduling modal.
5. **Employee Directory & Attendance**: Team member profiles, RBAC role assignments, department matrix, and attendance clock-in tracker simulator.
6. **Task Board**: Linear-inspired issue tracker (To Do, In Progress, Review, Done) with priorities (LOW, MEDIUM, HIGH, URGENT), assignees, tags, and deadlines.
7. **Inventory & Stock Vault**: Product catalog, stock thresholds with low-stock alert triggers, supplier tracking, and SKU/barcode support.
8. **Financial Ledger & Cash Flow**: Profit & Loss overview, revenue vs expenses comparison, tax estimation, and expense logging.
9. **Analytics & Business Intelligence**: Multi-dimensional Recharts visualizations for MRR growth, retention, LTV, CAC payback, and channel breakdown.
10. **Document Vault**: Folder-based document repository (Contracts, Finance, Security, HR), tag search, and document viewer.
11. **Settings & Modular AI Copilot**: Branding customization, working hours, currencies, RBAC matrix, and toggleable AI tools (Email Drafter, Invoice Summarizer, Financial Insights).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, Server Actions, Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom Design Tokens (Light & Dark mode)
- **Database & ORM**: Prisma ORM with SQLite out-of-the-box (PostgreSQL schema ready)
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Form & Validation**: React Hook Form + Zod

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Database Migration & Seeding

Push the Prisma schema and run the seed script to populate realistic enterprise sample data:

```bash
npx prisma db push
npm run db:seed
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
businessOS/
├── prisma/
│   ├── schema.prisma          # Multi-tenant Prisma schema
│   └── seed.ts                # Rich seed script with realistic data
├── src/
│   ├── app/
│   │   ├── (auth)/login/       # Authentication login page
│   │   ├── (dashboard)/        # Main dashboard shell & 11 core modules
│   │   └── globals.css         # Linear/Vercel design system CSS variables
│   ├── components/
│   │   ├── ai/                 # Modular AI Copilot drawer
│   │   ├── layout/             # Sidebar, Topbar, CommandMenu (Cmd+K), Footer
│   │   ├── providers/          # ThemeProvider (Next-Themes)
│   │   └── ui/                 # Button, Card, Badge, Input, Dialog, Table, Tabs
│   ├── lib/
│   │   ├── actions/            # Next.js Server Actions data layer
│   │   ├── db.ts               # Prisma singleton client
│   │   └── utils.ts            # Currency, Date, and Class merging helpers
│   └── types/                  # Centralized TypeScript definitions
```

---

## Deployment (Vercel & PostgreSQL)

To deploy to production on Vercel:

1. Update `prisma/schema.prisma` provider to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set Environment Variables in Vercel:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/businessos"
   NEXTAUTH_SECRET="your-production-secret"
   ```
3. Deploy via Vercel CLI or GitHub integration:
   ```bash
   vercel --prod
   ```

---

## Attribution

Application: **BusinessOS**
Author: **Built by Youssef Manssouri**
