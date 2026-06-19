"use client";

import { useState } from "react";
import { Check, CalendarCheck } from "lucide-react";
import { STORE } from "@/lib/store-info";

const TIPES = [
  "Huishoudelike bedrading / herstel",
  "Kommersiële installasie",
  "Voorafbetaalde meter-installasie",
  "Plafon-vervanging",
  "Beligting & kragpunte",
  "Nood / foutopsporing",
];

const invoer =
  "w-full rounded-md border border-blits-line bg-white px-3 py-2.5 text-sm text-blits-ink outline-none focus:border-blits-red focus:ring-2 focus:ring-blits-red/20";

export default function DiensBespreking() {
  const [gestuur, stelGestuur] = useState(false);
  const [vorm, stelVorm] = useState({
    naam: "", telefoon: "", adres: "", tipe: TIPES[0], besonderhede: "",
  });
  const op = (k: keyof typeof vorm, w: string) => stelVorm((v) => ({ ...v, [k]: w }));

  if (gestuur) {
    return (
      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check size={24} />
        </div>
        <h3 className="mt-3 text-lg font-bold text-blits-ink">Aanvraag ontvang!</h3>
        <p className="mt-1 text-sm text-blits-grey">
          Een van ons spanne sal jou skakel om &apos;n terreinbesoek te reël. Dringend? Skakel{" "}
          <a href={`tel:${STORE.telefoonSkoon}`} className="font-semibold text-blits-red">{STORE.telefoon}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); stelGestuur(true); }} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink">Naam *</span>
          <input required value={vorm.naam} onChange={(e) => op("naam", e.target.value)} className={invoer} placeholder="Jou naam" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink">Telefoon *</span>
          <input required type="tel" value={vorm.telefoon} onChange={(e) => op("telefoon", e.target.value)} className={invoer} placeholder="082 123 4567" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink">Terrein-adres *</span>
        <input required value={vorm.adres} onChange={(e) => op("adres", e.target.value)} className={invoer} placeholder="Waar moet ons werk doen?" />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink">Tipe werk</span>
        <select value={vorm.tipe} onChange={(e) => op("tipe", e.target.value)} className={invoer}>
          {TIPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink">Besonderhede</span>
        <textarea rows={4} value={vorm.besonderhede} onChange={(e) => op("besonderhede", e.target.value)} className={`${invoer} resize-y`} placeholder="Beskryf kortliks wat gedoen moet word…" />
      </label>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-blits-red px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark">
        <CalendarCheck size={16} /> Bespreek &apos;n terreinbesoek
      </button>
    </form>
  );
}
