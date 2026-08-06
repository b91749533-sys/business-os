"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import {
  FolderArchive,
  Folder,
  FileText,
  Upload,
  Search,
  Eye,
  Download,
  Plus,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface DocItem {
  id: string;
  name: string;
  category: "Contracts" | "Finance" | "Security" | "HR";
  size: string;
  tags: string;
  uploadedBy: string;
  createdAt: string;
}

const initialDocs: DocItem[] = [
  {
    id: "doc_1",
    name: "Acme Cloud Master Service Agreement 2026.pdf",
    category: "Contracts",
    size: "2.4 MB",
    tags: "Legal, Enterprise",
    uploadedBy: "Youssef Manssouri",
    createdAt: "2026-08-01",
  },
  {
    id: "doc_2",
    name: "Q2 2026 Financial Audit & Cash Flow Report.pdf",
    category: "Finance",
    size: "5.1 MB",
    tags: "Audit, Executive",
    uploadedBy: "Marcus Vance",
    createdAt: "2026-08-02",
  },
  {
    id: "doc_3",
    name: "SOC2 Type II Security Compliance Certification.pdf",
    category: "Security",
    size: "1.8 MB",
    tags: "Compliance, SOC2",
    uploadedBy: "Alex Chen",
    createdAt: "2026-08-03",
  },
  {
    id: "doc_4",
    name: "Global Employee Benefits & Code of Conduct.pdf",
    category: "HR",
    size: "890 KB",
    tags: "Internal, HR",
    uploadedBy: "Sarah Jenkins",
    createdAt: "2026-08-04",
  },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs);
  const [activeFolder, setActiveFolder] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocItem | null>(null);

  // Form
  const [fileName, setFileName] = useState("");
  const [fileCat, setFileCat] = useState<DocItem["category"]>("Contracts");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocItem = {
      id: `doc_${Date.now()}`,
      name: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`,
      category: fileCat,
      size: "1.5 MB",
      tags: "Uploaded",
      uploadedBy: "Youssef Manssouri",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDocs([newDoc, ...docs]);
    setIsUploadOpen(false);
    setFileName("");
  };

  const filteredDocs = docs.filter((d) => {
    const matchesCat = activeFolder === "ALL" || d.category === activeFolder;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Document Vault & Knowledge Repository
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Secure storage for contracts, invoices, compliance reports, and internal company assets.
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="gap-2" size="sm">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Folders Navigation Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { id: "ALL", label: "All Vault Files", count: docs.length },
          { id: "Contracts", label: "Contracts", count: docs.filter((d) => d.category === "Contracts").length },
          { id: "Finance", label: "Financial Audits", count: docs.filter((d) => d.category === "Finance").length },
          { id: "Security", label: "Security & SOC2", count: docs.filter((d) => d.category === "Security").length },
          { id: "HR", label: "HR Policies", count: docs.filter((d) => d.category === "HR").length },
        ].map((folder) => (
          <button
            key={folder.id}
            onClick={() => setActiveFolder(folder.id)}
            className={`flex items-center justify-between rounded-2xl border p-3 text-xs font-semibold transition-all ${
              activeFolder === folder.id
                ? "border-neutral-900 bg-neutral-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Folder className="h-4 w-4 shrink-0" />
              <span className="truncate">{folder.label}</span>
            </div>
            <span className="rounded-full bg-neutral-200/50 px-1.5 py-0.5 text-[10px] dark:bg-neutral-800">
              {folder.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Search documents by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Documents Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredDocs.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="truncate max-w-xs">{doc.name}</span>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{doc.category}</Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">{doc.size}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <Tag className="h-3 w-3" />
                  {doc.tags}
                </span>
              </TableCell>
              <TableCell>{doc.uploadedBy}</TableCell>
              <TableCell>{formatDate(doc.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => setPreviewDoc(doc)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Upload Modal */}
      <Dialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Document to Vault"
        description="Select a file to securely index into the company repository."
      >
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Document Title:</label>
            <Input required value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="e.g. Executive Partner NDA 2026" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Category:</label>
            <select
              value={fileCat}
              onChange={(e: any) => setFileCat(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <option value="Contracts">Contracts</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center bg-neutral-50 dark:bg-neutral-800/40">
            <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Drag & drop files or click to browse UploadThing storage
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Upload File
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Preview Modal */}
      {previewDoc && (
        <Dialog
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          title={`Document Preview: ${previewDoc.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-500 border-b border-neutral-200 pb-2 dark:border-neutral-800">
              <span>Category: {previewDoc.category}</span>
              <span>Size: {previewDoc.size}</span>
            </div>
            <div className="h-64 flex flex-col items-center justify-center text-neutral-400 space-y-2">
              <FileText className="h-12 w-12 text-blue-500" />
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {previewDoc.name}
              </p>
              <span className="text-[11px]">PDF Encrypted Preview Ready</span>
            </div>
            <div className="flex justify-end gap-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <Button size="sm" onClick={() => setPreviewDoc(null)}>
                Done
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
