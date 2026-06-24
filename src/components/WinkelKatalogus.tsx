"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardList, SlidersHorizontal, X } from "lucide-react";
import { KATEGORIEE, PRODUKTE, type KategorieSleutel } from "@/lib/products";
import KategorieIkoon from "./KategorieIkoon";
import ProductCard from "./ProductCard";
import { useTaal } from "@/lib/taal";

type Sortering = "relevant" | "prys-op" | "prys-af" | "naam";
const BLAD = 12;

export default function WinkelKatalogus() {
  const { t } = useTaal();
  const params = useSearchParams();
  const beginKategorie = (params.get("kategorie") as KategorieSleutel) ?? "alle";
  const soekUrl = params.get("soek") ?? "";

  const [kategorie, stelKategorie] = useState<KategorieSleutel | "alle">(
    KATEGORIEE.some((k) => k.sleutel === beginKategorie) ? beginKategorie : "alle",
  );
  const [soek, stelSoek] = useState(soekUrl);
  const [sortering, stelSortering] = useState<Sortering>("relevant");
  const [slegsVoorraad, stelSlegsVoorraad] = useState(false);
  const [wysAantal, stelWysAantal] = useState(BLAD);
  const [filterOop, stelFilterOop] = useState(false);

  const gefiltreer = useMemo(() => {
    const term = soek.trim().toLowerCase();
    let lys = PRODUKTE.filter((p) => {
      if (kategorie !== "alle" && p.kategorie !== kategorie) return false;
      if (slegsVoorraad && !p.voorraad) return false;
      if (term) {
        const teikens = `${p.naam} ${p.sku} ${p.handelsmerk} ${p.beskrywing}`.toLowerCase();
        if (!teikens.includes(term)) return false;
      }
      return true;
    });
    lys = [...lys].sort((a, b) => {
      switch (sortering) {
        case "prys-op": return a.prys - b.prys;
        case "prys-af": return b.prys - a.prys;
        case "naam": return a.naam.localeCompare(b.naam, "af");
        default: return Number(b.topverkoper ?? 0) - Number(a.topverkoper ?? 0);
      }
    });
    return lys;
  }, [kategorie, soek, sortering, slegsVoorraad]);

  const sigbaar = gefiltreer.slice(0, wysAantal);

  const kiesKategorie = (k: KategorieSleutel | "alle") => {
    stelKategorie(k);
    stelWysAantal(BLAD);
    stelFilterOop(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">

      {/* ── Mobiele kategorie-chips (horisontaal scroll) ── */}
      <div className="mb-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => kiesKategorie("alle")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              kategorie === "alle"
                ? "bg-blits-red text-white"
                : "border border-blits-line bg-white text-blits-ink"
            }`}
          >
            {t("Alles", "All")} ({PRODUKTE.length})
          </button>
          {KATEGORIEE.map((k) => (
            <button
              key={k.sleutel}
              onClick={() => kiesKategorie(k.sleutel)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                kategorie === k.sleutel
                  ? "bg-blits-red text-white"
                  : "border border-blits-line bg-white text-blits-ink"
              }`}
            >
              <KategorieIkoon kategorie={k.sleutel} size={12} />
              {t(k.naam, k.naamEn)}
            </button>
          ))}
        </div>

        {/* Mobiele filter/sorteer balk */}
        <div className="mt-2 flex gap-2">
          <input
            type="search"
            value={soek}
            onChange={(e) => { stelSoek(e.target.value); stelWysAantal(BLAD); }}
            placeholder={t("Soek produkte…", "Search products…")}
            className="flex-1 rounded-md border border-blits-line bg-white px-3 py-2 text-sm outline-none focus:border-blits-red"
          />
          <button
            onClick={() => stelFilterOop(!filterOop)}
            className="flex items-center gap-1.5 rounded-md border border-blits-line bg-white px-3 py-2 text-sm font-semibold text-blits-ink"
          >
            <SlidersHorizontal size={14} /> {t("Filter", "Filter")}
          </button>
        </div>

        {/* Mobiele filter-uitklap */}
        {filterOop && (
          <div className="mt-2 rounded-lg border border-blits-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-blits-black">{t("Filtreer & Sorteer", "Filter & Sort")}</span>
              <button onClick={() => stelFilterOop(false)}><X size={16} className="text-blits-grey" /></button>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-blits-ink mb-3">
              <input
                type="checkbox"
                checked={slegsVoorraad}
                onChange={(e) => { stelSlegsVoorraad(e.target.checked); stelWysAantal(BLAD); }}
                className="h-4 w-4 accent-blits-red"
              />
              {t("Slegs items op voorraad", "In stock items only")}
            </label>
            <select
              value={sortering}
              onChange={(e) => stelSortering(e.target.value as Sortering)}
              className="w-full rounded-md border border-blits-line bg-white px-3 py-2 text-sm outline-none focus:border-blits-red"
            >
              <option value="relevant">{t("Aanbeveel", "Recommended")}</option>
              <option value="prys-op">{t("Prys: laag → hoog", "Price: low → high")}</option>
              <option value="prys-af">{t("Prys: hoog → laag", "Price: high → low")}</option>
              <option value="naam">{t("Naam (A–Z)", "Name (A–Z)")}</option>
            </select>
          </div>
        )}
      </div>

      {/* ── Desktop: kantbalk + rooster ── */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        {/* Desktop kantbalk */}
        <aside className="hidden lg:block lg:sticky lg:top-44 lg:self-start">
          <div className="rounded-lg border border-blits-line bg-white p-4 shadow-card">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-blits-black">{t("Kategorieë", "Categories")}</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => kiesKategorie("alle")}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${
                    kategorie === "alle" ? "bg-blits-red text-white" : "text-blits-ink hover:bg-blits-paper"
                  }`}
                >
                  <span>{t("Alle produkte", "All products")}</span>
                  <span className="text-xs opacity-70">{PRODUKTE.length}</span>
                </button>
              </li>
              {KATEGORIEE.map((k) => {
                const aantal = PRODUKTE.filter((p) => p.kategorie === k.sleutel).length;
                return (
                  <li key={k.sleutel}>
                    <button
                      onClick={() => kiesKategorie(k.sleutel)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${
                        kategorie === k.sleutel ? "bg-blits-red text-white" : "text-blits-ink hover:bg-blits-paper"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <KategorieIkoon kategorie={k.sleutel} size={15} />
                        {t(k.naam, k.naamEn)}
                      </span>
                      <span className="text-xs opacity-70">{aantal}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <label className="mt-4 flex cursor-pointer items-center gap-2 border-t border-blits-line pt-4 text-sm font-semibold text-blits-ink">
              <input
                type="checkbox"
                checked={slegsVoorraad}
                onChange={(e) => { stelSlegsVoorraad(e.target.checked); stelWysAantal(BLAD); }}
                className="h-4 w-4 accent-blits-red"
              />
              {t("Wys slegs items op voorraad", "Show in stock items only")}
            </label>
          </div>

          <div className="mt-4 rounded-lg border-2 border-blits-black bg-blits-black p-4 text-white">
            <p className="text-sm font-bold uppercase tracking-wide text-blits-amber">{t("Kry jy nie wat jy soek nie?", "Can't find what you're looking for?")}</p>
            <p className="mt-1 text-sm text-white/80">{t("Vra ons vir 'n pasgemaakte kwotasie op grootmaat of spesiale items.", "Ask us for a custom quote on bulk or special items.")}</p>
            <a href="/kwotasie" className="mt-3 inline-flex items-center gap-2 rounded-md bg-blits-red px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-blits-red-dark">
              <ClipboardList size={14} /> {t("Kry 'n kwotasie", "Get a quote")}
            </a>
          </div>
        </aside>

        {/* Produkrooster */}
        <section>
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <div>
              <h1 className="heading-block text-2xl text-blits-black">{t("Aanlyn Winkel", "Online Shop")}</h1>
              <p className="text-sm text-blits-grey">
                {gefiltreer.length} {t(gefiltreer.length === 1 ? "produk" : "produkte", gefiltreer.length === 1 ? "product" : "products")} {t("gevind", "found")}
                {soek ? ` ${t("vir", "for")} "${soek}"` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="search"
                value={soek}
                onChange={(e) => { stelSoek(e.target.value); stelWysAantal(BLAD); }}
                placeholder={t("Verfyn soektog…", "Refine search…")}
                className="w-40 rounded-md border border-blits-line bg-white px-3 py-2 text-sm outline-none focus:border-blits-red sm:w-48"
              />
              <select
                value={sortering}
                onChange={(e) => stelSortering(e.target.value as Sortering)}
                className="rounded-md border border-blits-line bg-white px-3 py-2 text-sm font-semibold outline-none"
              >
                <option value="relevant">{t("Aanbeveel", "Recommended")}</option>
                <option value="prys-op">{t("Prys: laag → hoog", "Price: low → high")}</option>
                <option value="prys-af">{t("Prys: hoog → laag", "Price: high → low")}</option>
                <option value="naam">{t("Naam (A–Z)", "Name (A–Z)")}</option>
              </select>
            </div>
          </div>

          {/* Mobiele resultaat-telling */}
          <p className="mb-3 text-sm text-blits-grey lg:hidden">
            <span className="font-bold text-blits-ink">{gefiltreer.length}</span> {t(gefiltreer.length === 1 ? "produk" : "produkte", gefiltreer.length === 1 ? "product" : "products")} {t("gevind", "found")}
            {soek ? ` ${t("vir", "for")} "${soek}"` : ""}
          </p>

          {sigbaar.length === 0 ? (
            <div className="rounded-lg border border-dashed border-blits-line bg-white p-10 text-center">
              <p className="text-base font-bold text-blits-ink">{t("Geen resultate nie", "No results")}</p>
              <p className="mt-1 text-sm text-blits-grey">{t("Probeer 'n ander soekterm of vra ons vir 'n kwotasie.", "Try a different search term or ask us for a quote.")}</p>
              <a href="/kwotasie" className="mt-4 inline-flex items-center gap-2 rounded-md bg-blits-red px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
                <ClipboardList size={15} /> {t("Kry 'n kwotasie", "Get a quote")}
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {sigbaar.map((p) => <ProductCard key={p.id} produk={p} />)}
              </div>
              {wysAantal < gefiltreer.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => stelWysAantal((n) => n + BLAD)}
                    className="rounded-md border-2 border-blits-black px-8 py-3 text-sm font-bold uppercase tracking-wide text-blits-black transition-colors hover:bg-blits-black hover:text-white"
                  >
                    {t("Laai nog produkte", "Load more products")} ({gefiltreer.length - wysAantal} {t("oor", "remaining")})
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
