"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Plus,
  Download,
  Search,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  Send,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Users,
  Factory,
} from "lucide-react";
import { CrmEmailLog, CrmLead, LEAD_STATUSES, LeadStatus } from "@/lib/db";
import SuppliersTab from "@/components/SuppliersTab";

const STATUS_META: Record<
  LeadStatus,
  { label: string; badgeClass: string }
> = {
  new: { label: "New", badgeClass: "bg-amber-100 text-amber-900 border-amber-200" },
  contacted: { label: "Contacted", badgeClass: "bg-sky-100 text-sky-900 border-sky-200" },
  sample_sent: { label: "Sample Sent", badgeClass: "bg-violet-100 text-violet-900 border-violet-200" },
  quoted: { label: "Quoted", badgeClass: "bg-[#EDC271]/35 text-[#3F166B] border-[#EDC271]" },
  won: { label: "Won", badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-200" },
  lost: { label: "Lost", badgeClass: "bg-stone-200 text-stone-700 border-stone-300" },
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function toDateInputValue(iso: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

function isFollowUpDue(lead: CrmLead): boolean {
  if (!lead.next_follow_up_at) return false;
  if (lead.status === "won" || lead.status === "lost") return false;
  const due = new Date(lead.next_follow_up_at);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return due.getTime() <= endOfToday.getTime();
}

export default function AdminCrmDashboard() {
  const [activeTab, setActiveTab] = useState<"leads" | "suppliers">("leads");
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [googleConfigured, setGoogleConfigured] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all" | "due">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Active drawer
  const [activeLead, setActiveLead] = useState<CrmLead | null>(null);
  const [activeEmails, setActiveEmails] = useState<CrmEmailLog[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [editStatus, setEditStatus] = useState<LeadStatus>("new");
  const [editIncoterm, setEditIncoterm] = useState("");
  const [editFollowUp, setEditFollowUp] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [savingLead, setSavingLead] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Quick reply inside drawer
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  // Add lead modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    quantity: "",
    source: "whatsapp",
    notes: "",
  });
  const [addingLead, setAddingLead] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch("/api/admin/auth");
      const data = (await res.json()) as {
        authenticated: boolean;
        dbConfigured: boolean;
        googleConfigured?: boolean;
      };
      setAuthenticated(data.authenticated);
      setDbConfigured(data.dbConfigured);
      setGoogleConfigured(Boolean(data.googleConfigured));

      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      if (err === "unauthorized_email") {
        setLoginError("Access denied: this Google account is not authorized for Egy Nile Flax CRM.");
      } else if (err) {
        setLoginError("Google Sign-In did not complete. Please try again.");
      }
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    setLeadsError(null);
    try {
      const res = await fetch("/api/admin/leads");
      const data = (await res.json()) as { leads?: CrmLead[]; error?: string };
      if (!res.ok) {
        setLeadsError(data.error || "Failed to load leads.");
        return;
      }
      setLeads(data.leads || []);
    } catch {
      setLeadsError("Network error loading leads.");
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (authenticated && dbConfigured) {
      fetchLeads();
    }
  }, [authenticated, dbConfigured, fetchLeads]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setActiveLead(null);
  };

  const openLeadDrawer = async (lead: CrmLead) => {
    setActiveLead(lead);
    setEditStatus(lead.status);
    setEditIncoterm(lead.incoterm || "");
    setEditFollowUp(toDateInputValue(lead.next_follow_up_at));
    setEditNotes(lead.notes || "");
    setSaveFeedback(null);
    setReplyFeedback(null);
    setReplySubject(
      lead.product
        ? `Re: ${lead.product} Inquiry — Egy Nile Flax`
        : "Egyptian Flax Fibre Quotation — Egy Nile Flax"
    );
    setReplyMessage(
      `Dear ${lead.name},\n\nThank you for contacting Egy Nile Flax regarding ${lead.product || "Egyptian flax fibre"}.\n\n\n\nBest regards,`
    );
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`);
      if (res.ok) {
        const data = (await res.json()) as { lead: CrmLead; emails: CrmEmailLog[] };
        setActiveLead(data.lead);
        setActiveEmails(data.emails || []);
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSaveLead = async () => {
    if (!activeLead || savingLead) return;
    setSavingLead(true);
    setSaveFeedback(null);
    try {
      const res = await fetch(`/api/admin/leads/${activeLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          incoterm: editIncoterm,
          next_follow_up_at: editFollowUp ? `${editFollowUp}T09:00:00.000Z` : null,
          notes: editNotes,
        }),
      });
      const data = (await res.json()) as { lead?: CrmLead; error?: string };
      if (!res.ok || !data.lead) {
        setSaveFeedback(data.error || "Failed to update lead.");
        return;
      }
      setActiveLead(data.lead);
      setLeads((prev) => prev.map((l) => (l.id === data.lead!.id ? data.lead! : l)));
      setSaveFeedback("Saved!");
    } finally {
      setSavingLead(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!activeLead) return;
    if (!window.confirm(`Delete lead for ${activeLead.name}?`)) return;
    const res = await fetch(`/api/admin/leads/${activeLead.id}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== activeLead.id));
      setActiveLead(null);
    }
  };

  const handleQuickReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || sendingReply) return;
    setSendingReply(true);
    setReplyFeedback(null);
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: activeLead.id,
          to: activeLead.email,
          toName: activeLead.company ? `${activeLead.name} (${activeLead.company})` : activeLead.name,
          subject: replySubject,
          message: replyMessage,
          includeSignature: true,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        provider?: string;
        error?: string;
      };
      if (!res.ok) {
        setReplyFeedback({ type: "err", text: data.error || "Failed to send email." });
        return;
      }
      setReplyFeedback({
        type: "ok",
        text: `Sent to ${activeLead.email} via ${(data.provider || "brevo").toUpperCase()}.`,
      });
      // Refresh detail & leads list
      await openLeadDrawer(activeLead);
      await fetchLeads();
    } finally {
      setSendingReply(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addingLead) return;
    setAddError(null);
    setAddingLead(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const data = (await res.json()) as { lead?: CrmLead; error?: string };
      if (!res.ok || !data.lead) {
        setAddError(data.error || "Failed to create lead.");
        return;
      }
      setLeads((prev) => [data.lead!, ...prev]);
      setShowAddModal(false);
      setNewLead({
        name: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        product: "",
        quantity: "",
        source: "whatsapp",
        notes: "",
      });
    } finally {
      setAddingLead(false);
    }
  };

  const stats = useMemo(() => {
    return {
      total: leads.length,
      newCount: leads.filter((l) => l.status === "new").length,
      quotedCount: leads.filter((l) => l.status === "sample_sent" || l.status === "quoted").length,
      wonCount: leads.filter((l) => l.status === "won").length,
      dueCount: leads.filter(isFollowUpDue).length,
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter === "due") {
        if (!isFollowUpDue(lead)) return false;
      } else if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }
      if (q) {
        const hay = `${lead.name} ${lead.company} ${lead.email} ${lead.country} ${lead.product}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, statusFilter, searchQuery]);

  const exportCsv = () => {
    const headers = [
      "ID",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "Product",
      "Quantity",
      "Incoterm",
      "Status",
      "Source",
      "FollowUp",
      "Created",
      "Notes",
    ];
    const escapeCsv = (val: string) => `"${String(val ?? "").replace(/"/g, '""')}"`;
    const rows = filteredLeads.map((l) =>
      [
        l.id,
        l.name,
        l.company,
        l.email,
        l.phone,
        l.country,
        l.product,
        l.quantity,
        l.incoterm,
        l.status,
        l.source,
        toDateInputValue(l.next_follow_up_at),
        toDateInputValue(l.created_at),
        l.notes,
      ]
        .map((v) => escapeCsv(String(v)))
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `egynileflax-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-dvh bg-[#FAF8F5] flex items-center justify-center text-sm text-stone-500">
        Loading Admin CRM...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-dvh bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3F166B] text-[#EDC271] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#3F166B]">Egy Nile Flax CRM</h1>
              <p className="text-xs text-stone-500">Admin Lead &amp; Quotation Management</p>
            </div>
          </div>

          {!googleConfigured && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              Set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in your environment variables to enable Google Sign-In.
            </div>
          )}

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
              {loginError}
            </div>
          )}

          {googleConfigured && (
            <a
              href="/api/admin/google?next=/admin"
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                />
              </svg>
              <span>Sign in with Google</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FAF8F5] text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-[#3F166B] truncate">
              <span className="sm:hidden">Admin CRM</span>
              <span className="hidden sm:inline">Egy Nile Flax — Admin CRM</span>
            </h1>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Export Leads, Follow-Ups &amp; B2B Email History
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/mail"
              title="B2B Mail Sender"
              className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />
              <span className="hidden sm:inline">B2B Mail</span>
            </Link>
            <button
              type="button"
              onClick={() =>
                activeTab === "leads" ? setShowAddModal(true) : setShowAddSupplierModal(true)
              }
              className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>{activeTab === "leads" ? "Add Lead" : "Add Supplier"}</span>
            </button>
            <button
              type="button"
              onClick={exportCsv}
              title="Export CSV"
              className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="inline-flex items-center justify-center h-9 px-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-600 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* CRM Mode Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "leads"
                ? "bg-[#3F166B] text-[#EDC271]"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Buyers / Leads</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("suppliers")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "suppliers"
                ? "bg-[#3F166B] text-[#EDC271]"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Suppliers &amp; Mills</span>
          </button>
        </div>

        {!dbConfigured && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="font-bold">Database not connected yet (DATABASE_URL missing)</div>
            <p>
              Add your Neon Postgres <code>DATABASE_URL</code> in <code>.env.local</code> and Vercel Environment Variables, then refresh—tables will be created automatically.
            </p>
          </div>
        )}

        {activeTab === "suppliers" ? (
          <SuppliersTab
            showAddModal={showAddSupplierModal}
            setShowAddModal={setShowAddSupplierModal}
          />
        ) : (
          <>
            {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {[
            ["Total Leads", stats.total, "text-[#3F166B]"],
            ["New Inquiries", stats.newCount, "text-amber-700"],
            ["Sample / Quoted", stats.quotedCount, "text-[#3F166B]"],
            ["Won Deals", stats.wonCount, "text-emerald-700"],
            ["Follow-ups Due", stats.dueCount, "text-rose-700"],
          ].map(([label, val, cls], idx) => (
            <div
              key={String(label)}
              className={`bg-white rounded-xl border border-stone-200 p-3 sm:p-3.5 ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className={`text-lg sm:text-xl font-extrabold tabular-nums ${cls}`}>{val}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(
              [
                ["all", "All"],
                ["new", "New"],
                ["contacted", "Contacted"],
                ["sample_sent", "Sample Sent"],
                ["quoted", "Quoted"],
                ["won", "Won"],
                ["lost", "Lost"],
                ["due", `Due (${stats.dueCount})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                  statusFilter === key
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
                placeholder="Search buyer, company, country..."
                className="w-full ps-8 pe-3 py-2 rounded-xl border border-stone-200 bg-white text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
              />
            </div>
            <button
              type="button"
              onClick={fetchLeads}
              title="Refresh"
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {leadsError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
            {leadsError}
          </div>
        )}

        {/* Mobile Lead Cards (< md) */}
        <div className="md:hidden space-y-2.5">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              {loadingLeads ? "Loading leads..." : "No leads match this filter yet."}
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const meta = STATUS_META[lead.status] || STATUS_META.new;
              const due = isFollowUpDue(lead);
              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => openLeadDrawer(lead)}
                  className="w-full text-left bg-white rounded-2xl border border-stone-200 p-4 space-y-2.5 active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-stone-900 truncate">{lead.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {lead.company ? `${lead.company} • ` : ""}
                        {lead.email}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-600">
                    <span className="font-semibold text-stone-800">
                      {lead.product || "General Inquiry"}
                      {lead.quantity ? ` (${lead.quantity})` : ""}
                    </span>
                    {lead.country && <span>• {lead.country}</span>}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                    <span>Created {formatDate(lead.created_at)}</span>
                    <span className={due ? "font-bold text-rose-700" : ""}>
                      Follow-up: {formatDate(lead.next_follow_up_at)}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Desktop Leads Table (>= md) */}
        <div className="hidden md:block bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-bold">
                  <th className="py-3 px-4">Buyer / Company</th>
                  <th className="py-3 px-4">Product &amp; Qty</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Follow-Up</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-stone-500">
                      {loadingLeads ? "Loading leads..." : "No leads match this filter yet."}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const meta = STATUS_META[lead.status] || STATUS_META.new;
                    const due = isFollowUpDue(lead);
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => openLeadDrawer(lead)}
                        className="hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-900">{lead.name}</div>
                          <div className="text-[11px] text-stone-500">
                            {lead.company ? `${lead.company} • ` : ""}
                            {lead.email}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-stone-800">{lead.product || "—"}</div>
                          {lead.quantity && (
                            <div className="text-[11px] text-stone-500">{lead.quantity}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-stone-700">{lead.country || "—"}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                          >
                            {meta.label}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={due ? "font-bold text-rose-700" : "text-stone-600"}>
                            {formatDate(lead.next_follow_up_at)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500">{formatDate(lead.created_at)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}
      </main>

      {/* Slide-Over Lead Detail Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-full sm:max-w-2xl bg-[#FAF8F5] h-full overflow-y-auto shadow-2xl sm:border-l border-stone-200 p-4 sm:p-6 pb-10 space-y-4 sm:space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-[#3F166B]">{activeLead.name}</h2>
                <p className="text-xs text-stone-600">
                  {activeLead.company ? `${activeLead.company} • ` : ""}
                  Source: {activeLead.source} • Created {formatDate(activeLead.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDeleteLead}
                  title="Delete Lead"
                  className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-red-50 text-stone-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLead(null)}
                  className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Mail className="w-3.5 h-3.5 text-[#3F166B]" />
                <span className="truncate">{activeLead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-3.5 h-3.5 text-[#3F166B]" />
                <span>{activeLead.phone || "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-[#3F166B]" />
                <span>{activeLead.country || "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Package className="w-3.5 h-3.5 text-[#3F166B]" />
                <span>
                  {activeLead.product || "—"}
                  {activeLead.quantity ? ` (${activeLead.quantity})` : ""}
                </span>
              </div>
              {activeLead.message && (
                <div className="sm:col-span-2 mt-1 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 text-stone-700 whitespace-pre-wrap">
                  {activeLead.message}
                </div>
              )}
            </div>

            {/* Pipeline & Notes */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Stage</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs bg-white"
                  >
                    {LEAD_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {STATUS_META[st].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Incoterm / Target
                  </label>
                  <input
                    type="text"
                    value={editIncoterm}
                    onChange={(e) => setEditIncoterm(e.target.value)}
                    placeholder="e.g. FOB Alexandria"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    <Calendar className="w-3 h-3 inline me-1" />
                    Next Follow-Up
                  </label>
                  <input
                    type="date"
                    value={editFollowUp}
                    onChange={(e) => setEditFollowUp(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Quoted price, sample tracking #, buyer specs..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">{saveFeedback || ""}</span>
                <button
                  type="button"
                  onClick={handleSaveLead}
                  disabled={savingLead}
                  className="px-4 py-2 rounded-lg bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] text-xs font-bold cursor-pointer"
                >
                  {savingLead ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Quick Reply / Send B2B Quote */}
            <form
              onSubmit={handleQuickReply}
              className="bg-white rounded-xl border border-stone-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-[#3F166B]">
                  Send B2B Email / Quote to {activeLead.email}
                </h3>
                <Link
                  href={`/mail?to=${encodeURIComponent(activeLead.email)}&name=${encodeURIComponent(activeLead.name)}&leadId=${activeLead.id}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F166B] hover:underline"
                >
                  <span>Full Composer</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <input
                type="text"
                required
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                placeholder="Email Subject"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs"
              />
              <textarea
                rows={5}
                required
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-base sm:text-xs leading-relaxed"
              />

              {replyFeedback && (
                <div
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs ${
                    replyFeedback.type === "ok"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {replyFeedback.type === "ok" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{replyFeedback.text}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sendingReply}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] text-xs font-bold cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sendingReply ? "Sending..." : "Send & Log Email"}</span>
                </button>
              </div>
            </form>

            {/* Email History */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2.5">
              <h3 className="text-xs font-extrabold text-stone-700">Email History</h3>
              {loadingDetail ? (
                <p className="text-xs text-stone-400">Loading history...</p>
              ) : activeEmails.length === 0 ? (
                <p className="text-xs text-stone-400">No emails logged for this buyer yet.</p>
              ) : (
                <div className="space-y-2">
                  {activeEmails.map((em) => (
                    <div
                      key={em.id}
                      className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-stone-900">{em.subject}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {em.delivery_status && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                em.delivery_status === "opened" || em.delivery_status === "clicked"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : em.delivery_status === "delivered"
                                    ? "bg-sky-100 text-sky-800"
                                    : em.delivery_status === "bounced" || em.delivery_status === "complained"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-stone-200 text-stone-700"
                              }`}
                            >
                              {em.delivery_status}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-semibold text-stone-500">
                            {em.provider} • {formatDate(em.sent_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-stone-600 line-clamp-3 whitespace-pre-wrap">{em.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <form
            onSubmit={handleCreateLead}
            className="w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-white rounded-2xl border border-stone-200 shadow-xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#3F166B]">Add B2B Lead</h2>
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
                placeholder="Contact Name *"
                value={newLead.name}
                onChange={(e) => setNewLead((p) => ({ ...p, name: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Company / Mill"
                value={newLead.company}
                onChange={(e) => setNewLead((p) => ({ ...p, company: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="email"
                required
                placeholder="Email *"
                value={newLead.email}
                onChange={(e) => setNewLead((p) => ({ ...p, email: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Phone / WhatsApp"
                value={newLead.phone}
                onChange={(e) => setNewLead((p) => ({ ...p, phone: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Country"
                value={newLead.country}
                onChange={(e) => setNewLead((p) => ({ ...p, country: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Product of Interest"
                value={newLead.product}
                onChange={(e) => setNewLead((p) => ({ ...p, product: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                placeholder="Estimated Quantity"
                value={newLead.quantity}
                onChange={(e) => setNewLead((p) => ({ ...p, quantity: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300"
              />
              <select
                value={newLead.source}
                onChange={(e) => setNewLead((p) => ({ ...p, source: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="wechat">WeChat</option>
                <option value="email">Direct Email</option>
                <option value="trade_show">Trade Show</option>
                <option value="manual">Manual Entry</option>
              </select>
            </div>

            <textarea
              rows={3}
              placeholder="Notes..."
              value={newLead.notes}
              onChange={(e) => setNewLead((p) => ({ ...p, notes: e.target.value }))}
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
                disabled={addingLead}
                className="px-4 py-2 rounded-lg bg-[#3F166B] text-[#EDC271] text-xs font-bold cursor-pointer"
              >
                {addingLead ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
