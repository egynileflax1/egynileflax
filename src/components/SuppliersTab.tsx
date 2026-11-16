"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  RefreshCw,
  Upload,
  Download,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Factory,
  Trash2,
  X,
  Plus,
} from "lucide-react";
import { CrmSupplier, SUPPLIER_TYPES, SupplierType } from "@/lib/db";
import { toTelHref, toWhatsAppHref } from "@/lib/crmHelpers";

const TYPE_META: Record<SupplierType, { label: string; badgeClass: string }> = {
  factory: { label: "Factory", badgeClass: "bg-[#EDC271]/35 text-[#3F166B] border-[#EDC271]" },
  farmer: { label: "Farmer", badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-200" },
  trader: { label: "Trader", badgeClass: "bg-sky-100 text-sky-900 border-sky-200" },
};

function toMapsHref(location: string): string | null {
  const trimmed = location.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^-?\d+\.\d+\s*,\s*-?\d+\.\d+/.test(trimmed)) {
    const coords = trimmed.match(/-?\d+\.\d+\s*,\s*-?\d+\.\d+/)?.[0].replace(/\s+/g, "");
    if (coords) return `https://www.google.com/maps/search/?api=1&query=${coords}`;
  }
  return null;
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function detectSupplierType(raw: string): SupplierType {
  const v = raw.toLowerCase();
  if (v.includes("مزارع") || v.includes("农户") || v.includes("farmer")) return "farmer";
  if (v.includes("外贸") || v.includes("trader")) return "trader";
  return "factory";
}

export default function SuppliersTab({
  showAddModal,
  setShowAddModal,
}: {
  showAddModal: boolean;
  setShowAddModal: (v: boolean) => void;
}) {
  const [suppliers, setSuppliers] = useState<CrmSupplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<SupplierType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [importing, setImporting] = useState(false);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drawer state
  const [active, setActive] = useState<CrmSupplier | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<SupplierType>("factory");
  const [editContact, setEditContact] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editProducts, setEditProducts] = useState("");
  const [editWorkers, setEditWorkers] = useState("");
  const [editOutput, setEditOutput] = useState("");
  const [editStockTons, setEditStockTons] = useState("");
  const [editPricePerTon, setEditPricePerTon] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Add modal state
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    type: "factory" as SupplierType,
    contact_person: "",
    phone: "",
    location: "",
    products: "",
    workers_shifts: "",
    daily_output: "",
    stock_tons: "",
    price_per_ton: "",
    quality_rating: 5,
    price_notes: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/suppliers");
      const data = (await res.json()) as { suppliers?: CrmSupplier[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to load suppliers.");
        return;
      }
      setSuppliers(data.suppliers || []);
    } catch {
      setError("Network error loading suppliers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const openDrawer = (s: CrmSupplier) => {
    setActive(s);
    setEditName(s.name || "");
    setEditType(s.type);
    setEditContact(s.contact_person || "");
    setEditPhone(s.phone || "");
    setEditLocation(s.location || "");
    setEditProducts(s.products || "");
    setEditWorkers(s.workers_shifts || "");
    setEditOutput(s.daily_output || "");
    setEditStockTons(s.stock_tons || "");
    setEditPricePerTon(s.price_per_ton || "");
    setEditRating(s.quality_rating ?? 5);
    setEditNotes(s.price_notes || "");
    setSaveMsg(null);
  };

  const handleSave = async () => {
    if (!active || saving) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch(`/api/admin/suppliers/${active.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim() || active.name,
          type: editType,
          contact_person: editContact,
          phone: editPhone,
          location: editLocation,
          products: editProducts,
          workers_shifts: editWorkers,
          daily_output: editOutput,
          stock_tons: editStockTons,
          price_per_ton: editPricePerTon,
          quality_rating: editRating,
          price_notes: editNotes,
        }),
      });
      const data = (await res.json()) as { supplier?: CrmSupplier; error?: string };
      if (!res.ok || !data.supplier) {
        setSaveMsg(data.error || "Failed to save.");
        return;
      }
      setActive(data.supplier);
      setSuppliers((prev) => prev.map((x) => (x.id === data.supplier!.id ? data.supplier! : x)));
      setSaveMsg("Saved!");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!active) return;
    if (!window.confirm(`Delete supplier "${active.name}"?`)) return;
    const res = await fetch(`/api/admin/suppliers/${active.id}`, { method: "DELETE" });
    if (res.ok) {
      setSuppliers((prev) => prev.filter((x) => x.id !== active.id));
      setActive(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adding) return;
    setAddError(null);
    setAdding(true);
    try {
      const res = await fetch("/api/admin/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });
      const data = (await res.json()) as { supplier?: CrmSupplier; error?: string };
      if (!res.ok || !data.supplier) {
        setAddError(data.error || "Failed to add supplier.");
        return;
      }
      setSuppliers((prev) => [...prev, data.supplier!]);
      setShowAddModal(false);
      setNewSupplier({
        name: "",
        type: "factory",
        contact_person: "",
        phone: "",
        location: "",
        products: "",
        workers_shifts: "",
        daily_output: "",
        stock_tons: "",
        price_per_ton: "",
        quality_rating: 5,
        price_notes: "",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportFeedback(null);
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseCsvRows(text);
      const parsedSuppliers: Array<Omit<CrmSupplier, "id" | "created_at" | "updated_at">> = [];

      for (const cols of rows) {
        if (cols.length < 2) continue;
        const c0 = (cols[0] || "").trim();
        const c1 = (cols[1] || "").trim();
        if (!c1 && !(cols[2] || "").trim()) continue;
        if (/^(序号|no\.|id|اسم المزارع|埃及亚麻)/i.test(c0) || /名称|工厂名称|^name$/i.test(c1)) continue;
        if (c1 === "未提供" && !(cols[2] || "").trim()) continue;

        const name =
          c1 && c1 !== "未提供"
            ? c1.replace(/\s+/g, " ")
            : `Supplier #${c0 || parsedSuppliers.length + 1}`;
        const contactRaw = (cols[2] || "").trim();
        const locationRaw = (cols[3] || "").trim();
        const location =
          /^https?:\/\//i.test(locationRaw) || /\d+\.\d+\s*,\s*\d+\.\d+/.test(locationRaw)
            ? locationRaw
            : "";
        const products = (cols[4] || "").trim();
        const workers_shifts = (cols[5] || "").trim();
        const daily_output = (cols[6] || "").trim();
        const price_notes = (cols[7] || "").trim();
        const type = detectSupplierType(cols[8] || "");

        parsedSuppliers.push({
          name,
          type,
          contact_person: contactRaw === "未提供 (Not provided)" ? "" : contactRaw,
          phone: "",
          location,
          products: products === "未提供" ? "" : products,
          workers_shifts:
            workers_shifts === "未提供" || workers_shifts === "—" ? "" : workers_shifts,
          daily_output: daily_output === "未提供" ? "" : daily_output,
          stock_tons: "",
          price_per_ton: "",
          quality_rating: 5,
          price_notes: price_notes === "未提供" ? "" : price_notes,
        });
      }

      if (parsedSuppliers.length === 0) {
        setImportFeedback("No valid supplier rows found in CSV.");
        return;
      }

      const res = await fetch("/api/admin/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suppliers: parsedSuppliers }),
      });
      const data = (await res.json()) as {
        count?: number;
        insertedCount?: number;
        updatedCount?: number;
        error?: string;
      };
      if (!res.ok) {
        setImportFeedback(data.error || "CSV import failed.");
        return;
      }
      setImportFeedback(
        `Processed ${data.count ?? parsedSuppliers.length} suppliers (${data.insertedCount ?? 0} new, ${data.updatedCount ?? 0} updated).`
      );
      await fetchSuppliers();
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const stats = useMemo(
    () => ({
      total: suppliers.length,
      factories: suppliers.filter((s) => s.type === "factory").length,
      farmers: suppliers.filter((s) => s.type === "farmer").length,
      traders: suppliers.filter((s) => s.type === "trader").length,
    }),
    [suppliers]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return suppliers.filter((s) => {
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (q) {
        const hay = `${s.name} ${s.contact_person} ${s.phone} ${s.products} ${s.stock_tons || ""} ${s.price_per_ton || ""} ${s.price_notes}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [suppliers, typeFilter, searchQuery]);

  const exportSuppliersCsv = () => {
    const headers = [
      "ID",
      "Name",
      "Type",
      "ContactPerson",
      "Phone",
      "Location",
      "Products",
      "WorkersShifts",
      "DailyOutput",
      "StockTons",
      "PricePerTon",
      "QualityRating",
      "PriceNotes",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((s) =>
      [
        s.id,
        s.name,
        s.type,
        s.contact_person,
        s.phone,
        s.location,
        s.products,
        s.workers_shifts,
        s.daily_output,
        s.stock_tons || "",
        s.price_per_ton || "",
        s.quality_rating ?? 5,
        s.price_notes,
      ]
        .map(esc)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `egynileflax-suppliers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          ["Total Suppliers", stats.total, "text-[#3F166B]"],
          ["Factories", stats.factories, "text-[#3F166B]"],
          ["Farmers", stats.farmers, "text-emerald-700"],
          ["Traders", stats.traders, "text-sky-700"],
        ].map(([label, val, cls]) => (
          <div key={String(label)} className="bg-white rounded-xl border border-stone-200 p-3 sm:p-3.5">
            <div className={`text-lg sm:text-xl font-extrabold tabular-nums ${cls}`}>{val}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters & Import/Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              ["all", "All"],
              ["factory", `Factories (${stats.factories})`],
              ["farmer", `Farmers (${stats.farmers})`],
              ["trader", `Traders (${stats.traders})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTypeFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                typeFilter === key
                  ? "bg-[#3F166B] text-[#EDC271] border-[#3F166B]"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mill, phone, product..."
              className="w-full ps-8 pe-3 py-2 rounded-xl border border-stone-200 bg-white text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleCsvUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            title="Import Suppliers CSV (Deduplicates by Name)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 whitespace-nowrap cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#3F166B]" />
            <span className="hidden sm:inline">{importing ? "Importing..." : "Import CSV"}</span>
          </button>
          <button
            type="button"
            onClick={exportSuppliersCsv}
            title="Export Suppliers CSV"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#3F166B]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            type="button"
            onClick={fetchSuppliers}
            title="Refresh"
            className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {importFeedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
          {importFeedback}
        </div>
      )}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">{error}</div>
      )}

      {/* Mobile Cards (< md) */}
      <div className="md:hidden space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
            {loading ? "Loading suppliers..." : "No suppliers match this filter."}
          </div>
        ) : (
          filtered.map((s) => {
            const meta = TYPE_META[s.type] || TYPE_META.factory;
            const mapsHref = toMapsHref(s.location);
            const telHref = toTelHref(s.phone);
            const waHref = toWhatsAppHref(s.phone, `السلام عليكم ${s.name}`);
            return (
              <div
                key={s.id}
                onClick={() => openDrawer(s)}
                className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-stone-900">{s.name}</div>
                    {s.contact_person && (
                      <div className="text-[11px] text-stone-500 truncate">{s.contact_person}</div>
                    )}
                  </div>
                  <span
                    className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                  >
                    {meta.label}
                  </span>
                </div>

                {s.products && <div className="text-xs font-semibold text-stone-800">{s.products}</div>}
                <div className="flex flex-wrap gap-2 text-[11px] text-stone-600">
                  {s.daily_output && <span>Output: {s.daily_output}</span>}
                  {s.stock_tons && <span className="font-semibold text-[#3F166B]">Stock: {s.stock_tons}</span>}
                  {s.price_per_ton && <span className="font-semibold text-emerald-800">Price: {s.price_per_ton}</span>}
                </div>
                {s.price_notes && <div className="text-[11px] text-stone-500 line-clamp-2">{s.price_notes}</div>}

                <div
                  className="flex flex-wrap items-center gap-3 pt-1 border-t border-stone-100 text-[11px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {telHref && (
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-1 font-semibold text-[#3F166B]"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {mapsHref && (
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sky-700"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Maps</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table (>= md) */}
      <div className="hidden md:block bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-bold">
                <th className="py-3 px-4">Factory / Farmer</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Contact &amp; Actions</th>
                <th className="py-3 px-4">Products &amp; Stock</th>
                <th className="py-3 px-4">Price / Rating</th>
                <th className="py-3 px-4">Map</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-stone-500">
                    {loading ? "Loading suppliers..." : "No suppliers match this filter."}
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const meta = TYPE_META[s.type] || TYPE_META.factory;
                  const mapsHref = toMapsHref(s.location);
                  const telHref = toTelHref(s.phone);
                  const waHref = toWhatsAppHref(s.phone, `السلام عليكم ${s.name}`);
                  const rating = s.quality_rating ?? 5;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => openDrawer(s)}
                      className="hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 max-w-[230px]">
                        <div className="font-bold text-stone-900">{s.name}</div>
                        {s.workers_shifts && (
                          <div className="text-[11px] text-stone-500">{s.workers_shifts}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-[220px]" onClick={(e) => e.stopPropagation()}>
                        <div className="text-stone-800">{s.contact_person || "—"}</div>
                        {s.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold text-stone-600">{s.phone}</span>
                            {telHref && (
                              <a
                                href={telHref}
                                title="Call"
                                className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-[#3F166B]"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            )}
                            {waHref && (
                              <a
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 max-w-[220px]">
                        <div className="font-semibold text-stone-800">{s.products || "—"}</div>
                        <div className="text-[11px] text-stone-500">
                          {s.daily_output || ""}
                          {s.stock_tons ? ` • Stock: ${s.stock_tons}` : ""}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#3F166B]">{s.price_per_ton || "—"}</div>
                        <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${idx < rating ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        {mapsHref ? (
                          <a
                            href={mapsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px] hover:bg-emerald-100"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>Map</span>
                          </a>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 max-w-[240px] text-stone-600">
                        <div className="line-clamp-2">{s.price_notes || "—"}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Edit Drawer */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-full sm:max-w-xl bg-[#FAF8F5] h-dvh overflow-y-auto shadow-2xl sm:border-l border-stone-200 pb-10 space-y-4"
          >
            <div className="sticky top-0 z-10 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-stone-200 px-4 sm:px-6 py-3.5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-extrabold text-[#3F166B] truncate">{active.name}</h2>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <Factory className="w-3.5 h-3.5 shrink-0" />
                  <span>Supplier #{active.id}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {toWhatsAppHref(editPhone || active.phone, `السلام عليكم ${active.name}`) && (
                  <a
                    href={toWhatsAppHref(editPhone || active.phone, `السلام عليكم ${active.name}`)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-red-50 text-stone-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6">
            <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Factory / Farmer Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as SupplierType)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs bg-white"
                  >
                    {SUPPLIER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {TYPE_META[t].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Contact Person / Owner
                  </label>
                  <input
                    type="text"
                    value={editContact}
                    onChange={(e) => setEditContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Quality Rating (1–5)
                  </label>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs bg-white"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {"★".repeat(r)} ({r}/5)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Google Maps Link or Coordinates
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="https://maps.app.goo.gl/... or 30.875,31.192"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Products</label>
                <input
                  type="text"
                  value={editProducts}
                  onChange={(e) => setEditProducts(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Current Stock (MT)
                  </label>
                  <input
                    type="text"
                    value={editStockTons}
                    onChange={(e) => setEditStockTons(e.target.value)}
                    placeholder="e.g. 45 MT Long Flax"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Price per Ton (EGP / USD)
                  </label>
                  <input
                    type="text"
                    value={editPricePerTon}
                    onChange={(e) => setEditPricePerTon(e.target.value)}
                    placeholder="e.g. 95,000 EGP / Ton"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Workers / Shifts
                  </label>
                  <input
                    type="text"
                    value={editWorkers}
                    onChange={(e) => setEditWorkers(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Daily Output
                  </label>
                  <input
                    type="text"
                    value={editOutput}
                    onChange={(e) => setEditOutput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Price &amp; Inspection Notes
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-emerald-700">{saveMsg || ""}</span>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] text-xs font-bold cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreate}
            className="w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl border border-stone-200 shadow-xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#3F166B] flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Add Supplier / Mill</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base sm:text-xs">
              <input
                type="text"
                required
                placeholder="Factory / Farmer Name *"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier((p) => ({ ...p, name: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <select
                value={newSupplier.type}
                onChange={(e) =>
                  setNewSupplier((p) => ({ ...p, type: e.target.value as SupplierType }))
                }
                className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="factory">Factory</option>
                <option value="farmer">Farmer</option>
                <option value="trader">Trader</option>
              </select>
              <input
                type="text"
                placeholder="Contact Person"
                value={newSupplier.contact_person}
                onChange={(e) => setNewSupplier((p) => ({ ...p, contact_person: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Phone / WhatsApp"
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier((p) => ({ ...p, phone: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Google Maps Link or Lat,Lng"
                value={newSupplier.location}
                onChange={(e) => setNewSupplier((p) => ({ ...p, location: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Products (Long / Short Flax)"
                value={newSupplier.products}
                onChange={(e) => setNewSupplier((p) => ({ ...p, products: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Current Stock (MT)"
                value={newSupplier.stock_tons}
                onChange={(e) => setNewSupplier((p) => ({ ...p, stock_tons: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Price per Ton (EGP / USD)"
                value={newSupplier.price_per_ton}
                onChange={(e) => setNewSupplier((p) => ({ ...p, price_per_ton: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Workers / Shifts"
                value={newSupplier.workers_shifts}
                onChange={(e) => setNewSupplier((p) => ({ ...p, workers_shifts: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Daily Output"
                value={newSupplier.daily_output}
                onChange={(e) => setNewSupplier((p) => ({ ...p, daily_output: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Price & Notes..."
              value={newSupplier.price_notes}
              onChange={(e) => setNewSupplier((p) => ({ ...p, price_notes: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
            />

            {addError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs">
                {addError}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={adding}
                className="px-4 py-2 rounded-lg bg-[#3F166B] text-[#EDC271] text-xs font-bold cursor-pointer"
              >
                {adding ? "Saving..." : "Save Supplier"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
