"use client";

import React, { useState, useEffect } from "react";
import { useFlax } from "@/context/FlaxContext";
import { ShipmentDocument, LoadingPhoto } from "@/data/initialData";
import EgyNileLogo from "@/components/EgyNileLogo";
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Camera,
  ShieldCheck,
  ArrowLeft,
  Printer,
  MapPin,
  X,
  Eye,
} from "lucide-react";

export default function ClientPortalView() {
  const { orders, selectedPortalCode, setActiveView, company } = useFlax();
  const [trackingInput, setTrackingInput] = useState(selectedPortalCode);
  const [activeOrder, setActiveOrder] = useState(
    orders.find(
      (o) => o.trackingCode.toLowerCase() === selectedPortalCode.toLowerCase()
    ) || orders[0]
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState<LoadingPhoto | null>(null);
  const [previewDoc, setPreviewDoc] = useState<ShipmentDocument | null>(null);

  useEffect(() => {
    const match = orders.find(
      (o) => o.trackingCode.toLowerCase() === selectedPortalCode.toLowerCase()
    );
    if (match) {
      setActiveOrder(match);
      setTrackingInput(match.trackingCode);
      setErrorMsg("");
    }
  }, [selectedPortalCode, orders]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const match = orders.find(
      (o) =>
        o.trackingCode.toLowerCase() === trackingInput.trim().toLowerCase() ||
        o.blNumber.toLowerCase() === trackingInput.trim().toLowerCase()
    );
    if (match) {
      setActiveOrder(match);
      setErrorMsg("");
    } else {
      setErrorMsg(
        `No shipment found matching "${trackingInput}". Try one of the demo tracking codes below.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EFE6] pb-24 md:pb-20 w-full overflow-x-hidden">
      {/* Top Client Portal Banner */}
      <div className="bg-[#14231A] text-white border-b border-amber-500/30">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <button
                onClick={() => setActiveView("showcase")}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline mb-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to {company.brandName} Main Website
              </button>
              <div className="flex flex-wrap items-center gap-2.5">
                <EgyNileLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
                <span className="px-2.5 py-0.5 rounded bg-amber-400 text-stone-950 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shrink-0">
                  CLIENT PORTAL
                </span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight">
                  Order Execution, Documents & Loading Photos
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Digital shipment transparency system powered by {company.legalName} (
                {company.isoCert})
              </p>
            </div>

            {/* Search / Switch Shipment Form */}
            <form
              onSubmit={handleLookup}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-stone-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Order Code or B/L Number..."
                  className="w-full sm:w-64 ps-9 pe-4 py-2.5 rounded-xl bg-black/35 border border-white/20 text-base sm:text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs cursor-pointer shrink-0"
              >
                Load Shipment
              </button>
            </form>
          </div>

          {/* Demo Order Selector Strip (Swipeable on small screens) */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <span className="text-[11px] sm:text-xs text-stone-400 font-medium block mb-2">
              Active Buyer Shipments (Tap to switch):
            </span>
            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              {orders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => {
                    setActiveOrder(ord);
                    setTrackingInput(ord.trackingCode);
                    setErrorMsg("");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeOrder?.id === ord.id
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "bg-white/10 hover:bg-white/20 text-stone-200"
                  }`}
                >
                  {ord.trackingCode} ({ord.destinationCountry} • {ord.quantityMT} MT)
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-xs text-red-200">
              {errorMsg}
            </div>
          )}
        </div>
      </div>

      {/* Main Portal Content */}
      {activeOrder && (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
          {/* 1. Order Executive Header Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-stone-100 pb-5 sm:pb-6">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#1B3325] text-amber-300 font-mono text-xs font-bold">
                    {activeOrder.trackingCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    ISO 9001 Inspected Lot
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-stone-900 mt-1">
                  {activeOrder.companyName} — {activeOrder.destinationCountry}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                  Buyer Representative: <strong>{activeOrder.clientName}</strong> •
                  Commodity:{" "}
                  <strong className="text-[#1B3325]">
                    {activeOrder.productSummary}
                  </strong>
                </p>
              </div>

              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl px-4 py-3 text-start md:text-end shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-amber-900 font-bold block">
                  Net Contracted Volume
                </span>
                <span className="text-xl sm:text-2xl font-black text-stone-900">
                  {activeOrder.quantityMT} MT
                </span>
                <span className="text-xs text-stone-600 block">
                  {activeOrder.balesCount} Hydraulic Bales / Units ({activeOrder.grade})
                </span>
              </div>
            </div>

            {/* Container, Seal, B/L, Vessel & Route Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-stone-500 font-medium block">
                  Container & Customs Bolt Seal
                </span>
                <strong className="text-stone-900 font-mono block break-words">
                  {activeOrder.containerNo}
                </strong>
                <span className="text-emerald-800 font-mono text-[11px] block break-words">
                  Seal: {activeOrder.sealNo}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-stone-500 font-medium block">
                  Ocean Vessel & Bill of Lading
                </span>
                <strong className="text-stone-900 block break-words">
                  {activeOrder.vesselName}
                </strong>
                <span className="text-stone-600 font-mono text-[11px] block break-all">
                  B/L: {activeOrder.blNumber}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-stone-500 font-medium block">
                  Port of Loading (Origin)
                </span>
                <strong className="text-stone-900 block">
                  {activeOrder.originPort}
                </strong>
                <span className="text-stone-600 text-[11px] block">
                  ETD: {activeOrder.etd}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-stone-500 font-medium block">
                  Port of Discharge (Destination)
                </span>
                <strong className="text-stone-900 block">
                  {activeOrder.destinationPort}
                </strong>
                <span className="text-emerald-800 font-bold text-[11px] block">
                  ETA: {activeOrder.eta}
                </span>
              </div>
            </div>
          </div>

          {/* 2. 6-Stage Execution Timeline */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  STEP-BY-STEP EXECUTION TRACKER
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Order Execution & Logistics Milestones
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                Stage {activeOrder.currentStageIndex + 1} of{" "}
                {activeOrder.stages.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {activeOrder.stages.map((st, idx) => {
                const isDone =
                  idx < activeOrder.currentStageIndex || st.status === "completed";
                const isCurrent =
                  idx === activeOrder.currentStageIndex || st.status === "current";

                return (
                  <div
                    key={st.step}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isCurrent
                        ? "bg-amber-50/70 border-amber-400 shadow-sm ring-2 ring-amber-400/30"
                        : isDone
                        ? "bg-emerald-50/30 border-emerald-200"
                        : "bg-stone-50 border-stone-200 opacity-75"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-extrabold text-stone-500">
                          STAGE 0{st.step}
                        </span>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        ) : isCurrent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-300/70 px-2 py-0.5 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            In Progress
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-stone-400">
                            Scheduled
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-extrabold text-stone-900">
                        {st.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {st.notes}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2 text-[11px] text-stone-500">
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{st.location}</span>
                      </span>
                      <span className="font-mono font-semibold shrink-0">
                        {st.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Container Loading Photos & Export Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Container Loading Photos Gallery (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                      Container Loading & Seal Photos
                    </h3>
                    <p className="text-xs text-stone-500">
                      Time-stamped visual proof from our Gamasa factory loading bays
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700">
                  {activeOrder.loadingPhotos.length} Verified Photos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeOrder.loadingPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setPreviewPhoto(photo)}
                    className="group rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="relative h-44 bg-stone-900 overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 start-2.5 px-2 py-0.5 rounded bg-black/70 text-amber-300 text-[10px] font-bold">
                        {photo.stage}
                      </span>
                      <span className="absolute bottom-2.5 end-2.5 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                        {photo.containerNo}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900">
                          {photo.title}
                        </h4>
                        <Eye className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 shrink-0" />
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2">
                        {photo.caption}
                      </p>
                      <span className="text-[10px] text-stone-400 font-mono block pt-1">
                        {photo.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Documents & Certificates Center (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                    Shipping Documents & Lab Reports
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tap any certificate to inspect or print official copy
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeOrder.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50/50 border border-stone-200 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">
                        {doc.name}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
                        <span className="font-mono">Ref: {doc.referenceNo}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {doc.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="px-3 py-1.5 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 text-xs font-bold shrink-0 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-backdrop"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-96 bg-black">
              <img
                src={previewPhoto.imageUrl}
                alt={previewPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-3.5 end-3.5 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 font-mono">
                <span>{previewPhoto.stage}</span>
                <span>Container: {previewPhoto.containerNo}</span>
                <span>{previewPhoto.timestamp}</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-stone-900">
                {previewPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                {previewPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Official Document Preview / Print Modal */}
      {previewDoc && activeOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-backdrop"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-stone-300 space-y-5 sm:space-y-6 animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <EgyNileLogo className="w-11 h-11 shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-emerald-800 block">
                    OFFICIAL DIGITAL EXPORT DOCUMENT • {company.isoCert}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">
                    {previewDoc.type} — {previewDoc.referenceNo}
                  </h3>
                  <p className="text-xs text-stone-500">{company.legalName}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-stone-500 block">DOCUMENT FILE:</span>
                  <strong className="break-all">{previewDoc.name}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">ISSUE DATE & STATUS:</span>
                  <strong>
                    {previewDoc.date} ({previewDoc.status})
                  </strong>
                </div>
                <div>
                  <span className="text-stone-500 block">CONSIGNEE / BUYER:</span>
                  <strong>{activeOrder.companyName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">ORDER TRACKING NO:</span>
                  <strong>{activeOrder.trackingCode}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">CONTAINER / SEAL:</span>
                  <strong className="break-words">
                    {activeOrder.containerNo} / {activeOrder.sealNo}
                  </strong>
                </div>
                <div>
                  <span className="text-stone-500 block">VESSEL & B/L:</span>
                  <strong className="break-words">
                    {activeOrder.vesselName} ({activeOrder.blNumber})
                  </strong>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-200">
                <span className="text-stone-500 block">
                  CERTIFIED CARGO DESCRIPTION:
                </span>
                <strong>
                  {activeOrder.quantityMT} Metric Tons ({activeOrder.balesCount}{" "}
                  Bales) of {activeOrder.productSummary} — Grade:{" "}
                  {activeOrder.grade}. Processed, inspected, and hydraulically baled
                  at Gamasa Industrial Zone, Egypt.
                </strong>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Certificate
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
