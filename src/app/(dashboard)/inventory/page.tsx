"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  Barcode,
  Truck,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStockAlert: number;
  supplier: string;
  barcode: string;
}

const initialProducts: ProductItem[] = [
  {
    id: "prod_1",
    name: "Enterprise Edge Server Rack R750",
    sku: "HW-R750-01",
    category: "Hardware",
    price: 4950.0,
    cost: 3200.0,
    stock: 14,
    minStockAlert: 5,
    supplier: "Dell Enterprise Corp",
    barcode: "88902194012",
  },
  {
    id: "prod_2",
    name: "Fiber Optic Switch 100Gbps Gateway",
    sku: "NET-GW-100G",
    category: "Networking",
    price: 2100.0,
    cost: 1400.0,
    stock: 3, // Triggers Low Stock Alert!
    minStockAlert: 5,
    supplier: "Cisco Systems",
    barcode: "77201948102",
  },
  {
    id: "prod_3",
    name: "Developer Workstation Pro Max M3",
    sku: "DEV-WS-M3P",
    category: "Hardware",
    price: 3499.0,
    cost: 2800.0,
    stock: 22,
    minStockAlert: 4,
    supplier: "Apple Direct Supply",
    barcode: "19594901294",
  },
  {
    id: "prod_4",
    name: "Encrypted Hardware Key Vault v2",
    sku: "SEC-KEY-V2",
    category: "Security",
    price: 199.0,
    cost: 85.0,
    stock: 45,
    minStockAlert: 10,
    supplier: "Yubico Supply",
    barcode: "50601948210",
  },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Product Form
  const [prodName, setProdName] = useState("");
  const [prodSku, setProdSku] = useState("");
  const [prodCategory, setProdCategory] = useState("Hardware");
  const [prodPrice, setProdPrice] = useState("1200");
  const [prodStock, setProdStock] = useState("10");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: ProductItem = {
      id: `prod_${Date.now()}`,
      name: prodName,
      sku: prodSku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: prodCategory,
      price: parseFloat(prodPrice) || 1200,
      cost: (parseFloat(prodPrice) || 1200) * 0.6,
      stock: parseInt(prodStock) || 10,
      minStockAlert: 5,
      supplier: "Global Tech Logistics",
      barcode: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
    };
    setProducts([newProd, ...products]);
    setIsAddOpen(false);
    setProdName("");
    setProdSku("");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = products.filter((p) => p.stock <= p.minStockAlert).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200/60 pb-5 dark:border-neutral-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Inventory & Stock Vault
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Track product catalog, SKU barcodes, stock thresholds, and purchase orders.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Total Catalog Items</span>
            <Package className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {products.length} Products
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
            {lowStockCount} Items Below Min
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-neutral-500 font-semibold uppercase flex justify-between">
            <span>Total Asset Value</span>
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(products.reduce((s, p) => s + p.price * p.stock, 0))}
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Search by product name, SKU, or barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Inventory Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Level</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Barcode</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredProducts.map((p) => {
            const isLow = p.stock <= p.minStockAlert;

            return (
              <TableRow key={p.id}>
                <TableCell className="font-bold text-neutral-900 dark:text-neutral-100">
                  {p.name}
                </TableCell>
                <TableCell className="font-mono text-xs text-neutral-500">{p.sku}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.category}</Badge>
                </TableCell>
                <TableCell className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {formatCurrency(p.price)}
                </TableCell>
                <TableCell>
                  <Badge variant={isLow ? "destructive" : "success"}>
                    {p.stock} Units {isLow ? "(LOW STOCK)" : ""}
                  </Badge>
                </TableCell>
                <TableCell>{p.supplier}</TableCell>
                <TableCell className="text-right font-mono text-xs text-neutral-400">
                  <Barcode className="h-3.5 w-3.5 inline mr-1" />
                  {p.barcode}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Product to Vault"
        description="Register a new hardware item or product into inventory."
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Product Name:</label>
            <Input required value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="e.g. Cisco Edge Router" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">SKU:</label>
              <Input value={prodSku} onChange={(e) => setProdSku(e.target.value)} placeholder="NET-RTR-01" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Category:</label>
              <Input value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} placeholder="Networking" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Unit Price ($):</label>
              <Input type="number" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Stock Initial Count:</label>
              <Input type="number" value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Product
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
