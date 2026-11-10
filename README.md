# EgyNile Flax™ — Official B2B Export Website, Client Portal & Admin CMS

Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**, modeled after `makoverseas.net` and `cp.makoverseas.net` for **EgyNile Flax Overseas Co. (Gamasa, Egypt)**.

## Key Features Included

1. **B2B Industrial Showcase Website (`src/components/ShowcaseView.tsx`)**
   - **Above-the-Fold Widescreen Hero**: ISO 9001:2015 & Textile Export Council of Egypt (TEC) credentials, 4 key metrics, and live Container & Loading Photo Quick-Tracker.
   - **About & Field-to-Container Integration**: Nile Delta cultivation, retting, scutching, hackling, grading, and container stuffing story.
   - **4-Pillar Services Section**: Flax Export, Pre-Shipment Inspection & Baling, Freight Forwarding & Customs Clearance, and Import/Production Line Solutions.
   - **Interactive 12-Product Catalog**: Filterable across 4 categories (*Scutched Raw Flax*, *Hackled & Spinning Flax*, *Plumbing & Sanitary Flax*, and *Twines, Ropes & Seeds*) with Technical Data Sheet modals (Staple Length, Moisture %, Shive %, Bale Weight, 40'HQ Loadability, HS Code).
   - **6-Stage ISO 9001:2015 Production Workflow**: Step-by-step agricultural, mechanical, and laboratory quality control stages.
   - **Global Locations & 23+ Export Destinations**: Egypt HQ (Gamasa), UAE, Lebanon, and European liaison offices + Mediterranean/Red Sea port advantages.
   - **B2B Request-a-Quote (RFQ) Form + Multi-Channel Export Desk**: Logs inquiries straight into the Admin CMS Inbox and provides direct **WhatsApp**, **WeChat QR / Copy ID**, and **Email** connection.

2. **Working Client Portal (`src/components/ClientPortalView.tsx`)**
   - Real-time lookup by Order Tracking Code or Bill of Lading (`ENF-2026-8841`, `ENF-2026-8902`, `ENF-2026-8955`).
   - 6-Stage Order & Vessel Execution Stepper.
   - Time-stamped **Container Loading & Bolt Seal Photo Gallery** with lightbox zoom.
   - Official digital export documents (Sales Contract, Commercial Invoice, Packing List, EUR.1 Certificate of Origin, Phytosanitary Certificate, ISO 9001 Lab Grading Report) with print/preview view.

3. **Full Admin CMS Panel (`src/components/AdminPanelView.tsx`)**
   - **Products & Photos Manager**: Add new flax products, edit grades/specs, or upload product photos directly from your computer.
   - **Client Portal Shipments Manager**: Create new buyer tracking codes, advance shipment execution stages (Steps 1–6), and upload new container loading photos.
   - **RFQ Quote Inbox**: View buyer quote requests, update deal status (`New`, `Quoted`, `In Negotiation`, `Confirmed`), and reply via email.
   - **Factory Branding & Contact Settings**: Update brand name, emails, WhatsApp numbers, WeChat ID, and factory address live.

4. **Multi-Language Support (`EN` / `AR` / `中文` / `FR`)**
   - Full translations in `src/data/translations.ts` and `src/data/initialData.ts`, including automatic **RTL (`dir="rtl"`)** layout when switching to Arabic (`AR`).

---

## Running Locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Building for Production

```powershell
npm run build
npm start
```

