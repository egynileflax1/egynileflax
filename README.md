# EgyNile Flax™ — Factory Portfolio Website

Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS** for **EgyNile Flax Overseas Co. (Tanta, Gharbia, Egypt)**.

## Features

- **Factory Overview & Heritage**: ISO 9001:2015 & Textile Export Council of Egypt (TEC) credentials, capacity highlights, and Nile Delta field-to-fibre story.
- **Interactive 12-Product Catalog**: Filterable across 4 categories (*Scutched Raw Flax*, *Hackled & Spinning Flax*, *Plumbing & Sanitary Flax*, and *Twines, Ropes & Seeds*) with Technical Data Sheet modals (Staple Length, Moisture %, Shive %, Bale Weight, Grades, and Applications).
- **6-Stage ISO 9001:2015 Production Workflow**: Step-by-step agricultural, mechanical, and laboratory quality control stages.
- **Direct Factory Contact**: Address, phone numbers, email, WhatsApp, and WeChat ID / QR.
- **Multi-Language Support (`EN` / `AR` / `中文`)**: Full translations in `src/data/translations.ts` and `src/data/initialData.ts`, including automatic **RTL (`dir="rtl"`)** layout when switching to Arabic (`AR`).

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
