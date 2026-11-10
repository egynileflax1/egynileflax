"use client";

import React, { useState } from "react";
import { useFlax } from "@/context/FlaxContext";
import EgyNileLogo from "@/components/EgyNileLogo";
import {
  ProductItem,
  ProductCategory,
  ClientOrder,
  LoadingPhoto,
} from "@/data/initialData";
import {
  Settings,
  Package,
  Ship,
  Inbox,
  Building2,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  ArrowLeft,
  Upload,
  CheckCircle2,
  ExternalLink,
  Camera,
  Lock,
  LogOut,
} from "lucide-react";

export default function AdminPanelView() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    inquiries,
    updateInquiryStatus,
    company,
    updateCompany,
    resetAllToDefaults,
    setActiveView,
    openPortalWithCode,
  } = useFlax();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "products" | "orders" | "inquiries" | "settings"
  >("products");

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [saveToast, setSaveToast] = useState("");

  // New Loading Photo State for an Order
  const [selectedOrderForPhoto, setSelectedOrderForPhoto] = useState<string>(
    orders[0]?.id || ""
  );
  const [newPhotoForm, setNewPhotoForm] = useState({
    title: "",
    stage: "Stage 4 — Container Loading",
    containerNo: "MSCU 849201-4",
    imageUrl: "",
    caption: "",
  });

  // New Order Form State
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    trackingCode: `ENF-2026-${Math.floor(9000 + Math.random() * 900)}`,
    clientName: "",
    companyName: "",
    destinationCountry: "",
    destinationPort: "",
    productSummary: "Scutched Long Flax Fibers (Grade EK)",
    grade: "Grade EK",
    quantityMT: 22.4,
    balesCount: 140,
    containerNo: "MSCU 774120-9 (1 × 40'HQ)",
    sealNo: "EG-DM-88301",
    blNumber: "MEDUDM992011",
    vesselName: "MSC MEDITERRANEAN V.210",
    etd: "2026-11-15",
    eta: "2026-11-24",
  });

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(""), 3500);
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setEditingProduct({ ...editingProduct, imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLoadingPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setNewPhotoForm({ ...newPhotoForm, imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const startCreateProduct = () => {
    setIsCreatingProduct(true);
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: `custom-flax-${Date.now()}`,
      category: "scutched",
      name: {
        en: "New Egyptian Flax Product",
        ar: "منتج كتان مصري جديد",
        zh: "新款埃及亚麻产品",
        fr: "Nouveau Produit en Lin Égyptien",
      },
      subtitle: {
        en: "Custom Export Grade • Nile Delta Origin",
        ar: "درجة تصدير مخصصة • دلتا النيل",
        zh: "定制出口级 • 尼罗河三角洲原产",
        fr: "Qualité Export sur Mesure • Delta du Nil",
      },
      description: {
        en: "High-purity natural Egyptian flax processed and graded at our Gamasa facility.",
        ar: "ألياف كتان مصري طبيعي عالية النقاء مجهزة ومفروزة في مصنعنا بجمصة.",
        zh: "在加马萨工厂加工与分级的埃及高纯度天然亚麻产品。",
        fr: "Lin naturel égyptien de haute pureté transformé et classé dans notre usine de Gamasa.",
      },
      grades: ["Grade A", "Export Selection"],
      specs: {
        stapleLength: "700 mm – 900 mm",
        moisture: "≤ 11.5%",
        shiveContent: "< 1.0%",
        baleWeight: "150 kg Hydraulic Bales",
        container40HQ: "22 – 24 Metric Tons",
        hsCode: "5301.21",
      },
      applications: {
        en: ["Linen Spinning Mills", "Industrial Textiles"],
        ar: ["مصانع غزل الكتان", "المنسوجات الصناعية"],
        zh: ["亚麻纺纱厂", "工业纺织品"],
        fr: ["Filatures de lin", "Textiles industriels"],
      },
      badge: "New Grade",
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
      featured: true,
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (isCreatingProduct) {
      addProduct(editingProduct);
      showToast(`Added "${editingProduct.name.en}" to Product Catalog!`);
    } else {
      updateProduct(editingProduct);
      showToast(`Updated "${editingProduct.name.en}" successfully!`);
    }
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const handleAddPhotoToOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrder = orders.find((o) => o.id === selectedOrderForPhoto);
    if (!targetOrder) return;
    const newPhoto: LoadingPhoto = {
      id: `lp-${Date.now()}`,
      title: newPhotoForm.title || "Container Inspection Photo",
      stage: newPhotoForm.stage,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      containerNo: newPhotoForm.containerNo,
      imageUrl:
        newPhotoForm.imageUrl ||
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      caption: newPhotoForm.caption || "Uploaded via EgyNile Flax Admin CMS.",
    };
    updateOrder({
      ...targetOrder,
      loadingPhotos: [newPhoto, ...targetOrder.loadingPhotos],
    });
    setNewPhotoForm({
      title: "",
      stage: "Stage 4 — Container Loading",
      containerNo: targetOrder.containerNo,
      imageUrl: "",
      caption: "",
    });
    showToast(`Added loading photo to Order ${targetOrder.trackingCode}!`);
  };

  const handleCreateNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ClientOrder = {
      id: `ord-${Date.now()}`,
      trackingCode: newOrderForm.trackingCode,
      pinCode: "0000",
      clientName: newOrderForm.clientName,
      companyName: newOrderForm.companyName,
      destinationCountry: newOrderForm.destinationCountry,
      destinationPort: newOrderForm.destinationPort,
      originPort: "Damietta Port, Egypt (EGDAM)",
      productSummary: newOrderForm.productSummary,
      grade: newOrderForm.grade,
      quantityMT: Number(newOrderForm.quantityMT),
      balesCount: Number(newOrderForm.balesCount),
      containerNo: newOrderForm.containerNo,
      sealNo: newOrderForm.sealNo,
      blNumber: newOrderForm.blNumber,
      vesselName: newOrderForm.vesselName,
      etd: newOrderForm.etd,
      eta: newOrderForm.eta,
      currentStageIndex: 1,
      stages: [
        {
          step: 1,
          title: "Sales Contract & Proforma Confirmation",
          date: new Date().toISOString().slice(0, 10),
          status: "completed",
          location: "Gamasa HQ, Egypt",
          notes: "Sales contract confirmed and lot reserved.",
        },
        {
          step: 2,
          title: "Hackling, Grading & Bale Pressing",
          date: new Date().toISOString().slice(0, 10),
          status: "current",
          location: "EgyNile Mill, Gamasa",
          notes: "Bales being pressed and lot-coded.",
        },
        {
          step: 3,
          title: "ISO 9001 Pre-Shipment Inspection & Sampling",
          date: "Pending",
          status: "upcoming",
          location: "EgyNile Quality Lab",
          notes: "Moisture & shive verification scheduled.",
        },
        {
          step: 4,
          title: "Container Loading & Seal Verification",
          date: "Pending",
          status: "upcoming",
          location: "Gamasa Loading Bay",
          notes: "Loading photos will be uploaded upon stuffing.",
        },
        {
          step: 5,
          title: "Customs Clearance & Vessel Departure",
          date: newOrderForm.etd,
          status: "upcoming",
          location: "Damietta Port, Egypt",
          notes: `Booked on ${newOrderForm.vesselName}.`,
        },
        {
          step: 6,
          title: "Destination Port Arrival",
          date: newOrderForm.eta,
          status: "upcoming",
          location: newOrderForm.destinationPort,
          notes: "Original shipping documents ready upon departure.",
        },
      ],
      loadingPhotos: [
        {
          id: `lp-${Date.now()}`,
          title: "Warehouse Lot Staging & Bale Tagging",
          stage: "Stage 1 — Bale Prep",
          timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
          containerNo: newOrderForm.containerNo,
          imageUrl:
            "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
          caption: "Initial bale lot staged for pre-shipment inspection.",
        },
      ],
      documents: [
        {
          id: `doc-${Date.now()}`,
          name: `Signed Sales Contract (${newOrderForm.trackingCode}).pdf`,
          type: "Contract",
          status: "Verified",
          referenceNo: `SC-${newOrderForm.trackingCode}`,
          date: new Date().toISOString().slice(0, 10),
        },
      ],
    };
    addOrder(created);
    setShowNewOrderModal(false);
    showToast(`Created Client Portal Order ${created.trackingCode}!`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100dvh-6rem)] bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <EgyNileLogo className="w-11 h-11 shrink-0" />
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <button
              onClick={() => setActiveView("showcase")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              AUTHORIZED FACTORY ACCESS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {company.brandName} — Admin CMS Login
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              Enter your administrator password to manage flax products, upload container loading photos, and review B2B quotes.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passwordInput.trim() === "egynile2026") {
                setIsAuthenticated(true);
                setAuthError("");
              } else {
                setAuthError("Invalid administrator password. Default is: egynile2026");
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (egynile2026)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325] font-mono"
              />
            </div>

            {authError && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 font-extrabold text-xs cursor-pointer shadow-sm"
            >
              Unlock Admin CMS
            </button>
          </form>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-2 text-xs text-stone-500">
            <span>Local Demo Password: <strong className="font-mono text-stone-800">egynile2026</strong></span>
            <button
              type="button"
              onClick={() => {
                setPasswordInput("egynile2026");
                setIsAuthenticated(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-[11px] cursor-pointer"
            >
              1-Click Demo Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-24 md:pb-20 w-full overflow-x-hidden">
      {/* Top Admin Header */}
      <div className="bg-stone-900 text-white border-b border-stone-800">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setActiveView("showcase")}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline mb-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Live Website
            </button>
            <div className="flex items-center gap-2.5">
              <EgyNileLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
              <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                {company.brandName} — Admin CMS Panel
              </h1>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Add/edit flax products, upload product & container loading photos, manage Client Portal orders, and review B2B quote requests.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all products, orders, and company settings back to factory defaults?"
                  )
                ) {
                  resetAllToDefaults();
                  showToast("Restored default factory catalog and demo shipments.");
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPasswordInput("");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 text-xs font-semibold border border-red-800/60 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock Admin
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Swipeable on small screens) */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pb-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "products"
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            <Package className="w-4 h-4" />
            Products & Photos ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "orders"
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            <Ship className="w-4 h-4" />
            Client Portal Shipments ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "inquiries"
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            <Inbox className="w-4 h-4" />
            RFQ Quote Inbox ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "settings"
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Factory Branding & Contacts
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {saveToast && (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6">
          <div className="p-4 rounded-2xl bg-emerald-900 text-amber-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveToast}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8">
        {/* =========================================================
            TAB 1: PRODUCTS MANAGER
        ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                  Flax Product Catalog Manager
                </h2>
                <p className="text-xs text-stone-500">
                  Add new flax products, upload custom factory photos, or edit specifications and grades.
                </p>
              </div>
              <button
                onClick={startCreateProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Flax Product
              </button>
            </div>

            {/* Product Editor Form */}
            {editingProduct && (
              <form
                onSubmit={handleSaveProduct}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-[#1B3325] shadow-xl space-y-5 sm:space-y-6"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                    {isCreatingProduct
                      ? "Create New Flax Product"
                      : `Edit Product: ${editingProduct.name.en}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="text-xs font-bold text-stone-500 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Product Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name.en}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: { ...editingProduct.name, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Product Name (Arabic - العربية)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={editingProduct.name.ar}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: { ...editingProduct.name, ar: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Category *
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as ProductCategory,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    >
                      <option value="scutched">Scutched (Raw Flax)</option>
                      <option value="hackled">Hackled & Spinning Flax</option>
                      <option value="plumbing">Plumbing & Sanitary Flax</option>
                      <option value="twine">Twines, Ropes & Seeds</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Subtitle / Grade Summary (English)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.subtitle.en}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          subtitle: {
                            ...editingProduct.subtitle,
                            en: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Available Grades (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.grades.join(", ")}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          grades: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-stone-700 block mb-1">
                    Technical Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description.en}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: {
                          ...editingProduct.description,
                          en: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                  />
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Staple Length / Format
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.stapleLength}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            stapleLength: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Moisture Regain
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.moisture}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            moisture: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Shive / Impurity %
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.shiveContent}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            shiveContent: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Bale Weight & Packing
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.baleWeight}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            baleWeight: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      40&apos;HQ Loadability
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.container40HQ}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            container40HQ: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      HS Tariff Code
                    </label>
                    <input
                      type="text"
                      value={editingProduct.specs.hsCode}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          specs: {
                            ...editingProduct.specs,
                            hsCode: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-base sm:text-xs"
                    />
                  </div>
                </div>

                {/* Image URL or Local File Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Product Photo URL
                    </label>
                    <input
                      type="text"
                      value={editingProduct.imageUrl}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Or Upload Photo from Device
                    </label>
                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold cursor-pointer border border-amber-300 w-full sm:w-auto">
                      <Upload className="w-4 h-4" />
                      <span>Choose Image File...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-extrabold cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save Product
                  </button>
                </div>
              </form>
            )}

            {/* Existing Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-stone-200 relative">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name.en}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 start-2.5 px-2 py-0.5 rounded bg-black/70 text-amber-300 text-[10px] font-bold uppercase">
                        {prod.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 className="text-sm font-extrabold text-stone-900">
                        {prod.name.en}
                      </h3>
                      <p className="text-xs text-stone-500" dir="rtl">
                        {prod.name.ar}
                      </p>
                      <p className="text-[11px] text-stone-600 line-clamp-2">
                        {prod.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setIsCreatingProduct(false);
                        setEditingProduct(prod);
                        window.scrollTo({ top: 150, behavior: "smooth" });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-800 text-xs font-bold cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Specs / Photo
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${prod.name.en}"?`)) {
                          deleteProduct(prod.id);
                          showToast(`Deleted "${prod.name.en}".`);
                        }
                      }}
                      className="p-2 rounded-xl text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: CLIENT PORTAL ORDERS & LOADING PHOTOS MANAGER
        ========================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                  Client Portal Shipments & Container Loading Photos
                </h2>
                <p className="text-xs text-stone-500">
                  Update order execution stages (Steps 1–6), create new buyer tracking codes, and upload container loading photos.
                </p>
              </div>
              <button
                onClick={() => setShowNewOrderModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create New Buyer Shipment
              </button>
            </div>

            {/* Upload Container Loading Photo Card */}
            <form
              onSubmit={handleAddPhotoToOrder}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#1B3325] shrink-0" />
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                  Upload New Container Loading Photo to Client Portal
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Target Shipment Order
                  </label>
                  <select
                    value={selectedOrderForPhoto}
                    onChange={(e) => setSelectedOrderForPhoto(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono text-base sm:text-xs"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.trackingCode} ({o.companyName})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhotoForm.title}
                    onChange={(e) =>
                      setNewPhotoForm({ ...newPhotoForm, title: e.target.value })
                    }
                    placeholder="e.g. Full Tier & Bolt Seal"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Container Number
                  </label>
                  <input
                    type="text"
                    value={newPhotoForm.containerNo}
                    onChange={(e) =>
                      setNewPhotoForm({
                        ...newPhotoForm,
                        containerNo: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Upload Loading Photo
                  </label>
                  <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-300 cursor-pointer w-full">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {newPhotoForm.imageUrl ? "Photo Selected ✓" : "Select Photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLoadingPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs">
                <input
                  type="text"
                  value={newPhotoForm.caption}
                  onChange={(e) =>
                    setNewPhotoForm({ ...newPhotoForm, caption: e.target.value })
                  }
                  placeholder="Inspection notes (e.g. 140 bales loaded, moisture 10.4%, sealed with #EG-DM-994120)..."
                  className="flex-1 px-3 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1B3325] text-amber-300 font-bold cursor-pointer shrink-0"
                >
                  Publish Photo to Portal
                </button>
              </div>
            </form>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#1B3325] text-amber-300 font-mono text-xs font-bold">
                          {ord.trackingCode}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                          {ord.companyName} ({ord.destinationCountry})
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 break-words">
                        {ord.productSummary} • <strong>{ord.quantityMT} MT</strong> •
                        Container: <span className="font-mono">{ord.containerNo}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPortalWithCode(ord.trackingCode)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-amber-100 text-amber-950 text-xs font-bold cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Inspect in Client Portal
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete shipment ${ord.trackingCode}?`)) {
                            deleteOrder(ord.id);
                          }
                        }}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stage Changer */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                    <span className="font-bold text-stone-600 w-full sm:w-auto mb-1 sm:mb-0 sm:me-2">
                      Set Active Execution Stage:
                    </span>
                    {ord.stages.map((st, sIdx) => (
                      <button
                        key={st.step}
                        onClick={() => {
                          const updatedStages = ord.stages.map((item, i) => ({
                            ...item,
                            status:
                              i < sIdx
                                ? ("completed" as const)
                                : i === sIdx
                                ? ("current" as const)
                                : ("upcoming" as const),
                          }));
                          updateOrder({
                            ...ord,
                            currentStageIndex: sIdx,
                            stages: updatedStages,
                          });
                          showToast(
                            `Updated ${ord.trackingCode} to Stage ${st.step}: ${st.title}`
                          );
                        }}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                          ord.currentStageIndex === sIdx
                            ? "bg-amber-400 text-stone-950 font-bold"
                            : sIdx < ord.currentStageIndex
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {st.step}. {st.title.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: RFQ QUOTE INQUIRIES INBOX
        ========================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200">
              <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                B2B Export Quote Inquiries (RFQ Inbox)
              </h2>
              <p className="text-xs text-stone-500">
                Every quote submitted on the website is stored here automatically.
              </p>
            </div>

            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-900 text-amber-300">
                      {inq.id}
                    </span>
                    <span className="text-sm font-extrabold text-stone-900">
                      {inq.companyName} ({inq.country})
                    </span>
                    <span className="text-xs text-stone-500">• {inq.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-700 break-words">
                    <strong>Contact:</strong> {inq.contactPerson} ({inq.email} /{" "}
                    {inq.phone})
                  </p>
                  <p className="text-xs text-[#1B3325] font-bold">
                    Product: {inq.productInterest} • Volume: {inq.quantityTons} •
                    Incoterm: {inq.incoterm}
                  </p>
                  {inq.message && (
                    <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                      &ldquo;{inq.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => {
                      updateInquiryStatus(
                        inq.id,
                        e.target.value as typeof inq.status
                      );
                      showToast(`Updated ${inq.id} status to ${e.target.value}`);
                    }}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-stone-50"
                  >
                    <option value="New">New</option>
                    <option value="Quoted">Quoted</option>
                    <option value="In Negotiation">In Negotiation</option>
                    <option value="Confirmed">Confirmed Order</option>
                  </select>

                  <a
                    href={`mailto:${inq.email}?subject=${encodeURIComponent(
                      `Official Flax Quotation — ${company.brandName} (${inq.id})`
                    )}`}
                    className="flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-bold"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
            TAB 4: COMPANY BRANDING & CONTACTS SETTINGS
        ========================================================= */}
        {activeTab === "settings" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCompany(company);
              showToast("Saved Factory Branding & Contact Settings!");
            }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 space-y-6"
          >
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                Factory Branding, ISO Credentials & Contact Information
              </h2>
              <p className="text-xs text-stone-500">
                Changes made here update the header, hero, contact section, and footer immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={company.brandName}
                  onChange={(e) =>
                    updateCompany({ ...company, brandName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Full Legal Export Name
                </label>
                <input
                  type="text"
                  value={company.legalName}
                  onChange={(e) =>
                    updateCompany({ ...company, legalName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Primary Export Email
                </label>
                <input
                  type="email"
                  value={company.primaryEmail}
                  onChange={(e) =>
                    updateCompany({ ...company, primaryEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Egypt Primary Phone / WhatsApp Display
                </label>
                <input
                  type="text"
                  value={company.egyptPhone1}
                  onChange={(e) =>
                    updateCompany({ ...company, egyptPhone1: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  WhatsApp International Number (Digits Only)
                </label>
                <input
                  type="text"
                  value={company.whatsappNumber}
                  onChange={(e) =>
                    updateCompany({ ...company, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Official WeChat ID (for China & Asia Buyers)
                </label>
                <input
                  type="text"
                  value={company.wechatId}
                  onChange={(e) =>
                    updateCompany({ ...company, wechatId: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Factory Address
                </label>
                <input
                  type="text"
                  value={company.factoryAddress}
                  onChange={(e) =>
                    updateCompany({ ...company, factoryAddress: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-extrabold cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Company Settings
            </button>
          </form>
        )}
      </div>

      {/* Create New Shipment Modal */}
      {showNewOrderModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-backdrop"
          onClick={() => setShowNewOrderModal(false)}
        >
          <form
            onSubmit={handleCreateNewOrder}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-8 space-y-4 animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
              Create New Client Portal Shipment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Tracking Code *</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.trackingCode}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      trackingCode: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Buyer Company Name *</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.companyName}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      companyName: e.target.value,
                    })
                  }
                  placeholder="e.g. Courtrai Linen NV"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Buyer Contact Name *</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.clientName}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      clientName: e.target.value,
                    })
                  }
                  placeholder="e.g. Jean Peeters"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">
                  Destination Country *
                </label>
                <input
                  type="text"
                  required
                  value={newOrderForm.destinationCountry}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      destinationCountry: e.target.value,
                    })
                  }
                  placeholder="e.g. Belgium"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Destination Port *</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.destinationPort}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      destinationPort: e.target.value,
                    })
                  }
                  placeholder="e.g. Port of Antwerp (BEANR)"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Product Summary *</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.productSummary}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      productSummary: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Container Number</label>
                <input
                  type="text"
                  value={newOrderForm.containerNo}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      containerNo: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-base sm:text-xs"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Quantity (MT)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newOrderForm.quantityMT}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      quantityMT: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-base sm:text-xs"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowNewOrderModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#1B3325] text-amber-300 text-xs font-bold cursor-pointer"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
