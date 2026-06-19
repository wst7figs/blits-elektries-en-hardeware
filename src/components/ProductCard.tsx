"use client";

import { useState } from "react";
import { ShoppingCart, ClipboardList, Check } from "lucide-react";
import type { Produk } from "@/lib/products";
import { kategorieNaam } from "@/lib/products";
import { randFormaat } from "@/lib/format";
import { useMandjie } from "@/lib/winkelmandjie";
import KategorieIkoon from "./KategorieIkoon";

function produkKleur(id: string) {
  const palet = [
    ["#1e3a8a", "#0f1f5c"],
    ["#0d0c1f", "#2a2840"],
    ["#f5b800", "#b88a00"],
    ["#1e4d8a", "#0f2d6e"],
    ["#1a5c3a", "#0e3321"],
  ];
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % palet.length;
  return palet[i];
}

export default function ProductCard({ produk }: { produk: Produk }) {
  const voegByMandjie = useMandjie((s) => s.voegByMandjie);
  const voegByKwotasie = useMandjie((s) => s.voegByKwotasie);
  const [flits, stelFlits] = useState<"" | "mandjie" | "kwotasie">("");
  const [kleurA, kleurB] = produkKleur(produk.id);

  const wys = (tipe: "mandjie" | "kwotasie") => {
    stelFlits(tipe);
    window.setTimeout(() => stelFlits(""), 1400);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-blits-line bg-white shadow-card transition-shadow hover:shadow-lg">
      <div
        className="relative flex aspect-[4/3] items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${kleurA}, ${kleurB})` }}
      >
        <KategorieIkoon kategorie={produk.kategorie} size={48} className="text-white/80" />
        {produk.topverkoper && (
          <span className="absolute left-2 top-2 rounded bg-blits-amber px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-blits-black">
            Topverkoper
          </span>
        )}
        <span
          className={`absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
            produk.voorraad
              ? "bg-white/90 text-green-700"
              : "bg-blits-black/85 text-white"
          }`}
        >
          {produk.voorraad ? "Op voorraad" : "Uit voorraad"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-blits-red">
          {kategorieNaam(produk.kategorie)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-blits-ink">
          {produk.naam}
        </h3>
        <p className="mt-0.5 text-xs text-blits-grey">
          {produk.handelsmerk} · SKU {produk.sku}
        </p>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-black text-blits-black">
            {randFormaat(produk.prys)}
          </span>
          <span className="text-[10px] text-blits-grey">BTW ingesluit</span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {produk.voorraad ? (
            <button
              type="button"
              onClick={() => { voegByMandjie(produk); wys("mandjie"); }}
              className="flex items-center justify-center gap-2 rounded-md bg-blits-red px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark"
            >
              {flits === "mandjie"
                ? <><Check size={13} /> Bygevoeg!</>
                : <><ShoppingCart size={13} /> Voeg by mandjie</>}
            </button>
          ) : (
            <span className="rounded-md bg-blits-paper px-3 py-2 text-center text-xs font-semibold text-blits-grey">
              Beskikbaar op bestelling
            </span>
          )}
          <button
            type="button"
            onClick={() => { voegByKwotasie(produk); wys("kwotasie"); }}
            className="flex items-center justify-center gap-2 rounded-md border-2 border-blits-black px-3 py-2 text-xs font-bold uppercase tracking-wide text-blits-black transition-colors hover:bg-blits-black hover:text-white"
          >
            {flits === "kwotasie"
              ? <><Check size={13} /> By kwotasie!</>
              : <><ClipboardList size={13} /> Voeg by kwotasie</>}
          </button>
        </div>
      </div>
    </article>
  );
}
