"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { KATEGORIEE, PRODUKTE, type KategorieSleutel } from "@/lib/products";
import KategorieIkoon from "./KategorieIkoon";
import ProductCard from "./ProductCard";

type Sortering = "relevant" | "prys-op" | "prys-af" | "naam";
const BLAD = 12;

export default function WinkelKatalogus() {
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Kantbalk */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <div className="rounded-lg border border-blits-line bg-white p-4 shadow-card">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-blits-black">Kategorieë</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => { stelKategorie("alle"); stelWysAantal(BLAD); }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${
                    kategorie === "alle" ? "bg-blits-red text-white" : "text-blits-ink hover:bg-blits-paper"
                  }`}
                >
                  <span>Alle produkte</span>
                  <span className="text-xs opacity-70">{PRODUKTE.length}</span>
                </button>
              </li>
              {KATEGORIEE.map((k) => {
                const aantal = PRODUKTE.filter((p) => p.kategorie === k.sleutel).length;
                return (
                  <li key={k.sleutel}>
                    <button
                      onClick={() => { stelKategorie(k.sleutel); stelWysAantal(BLAD); }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${
                        kategorie === k.sleutel ? "bg-blits-red text-white" : "text-blits-ink hover:bg-blits-paper"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <KategorieIkoon kategorie={k.sleutel} size={15} />
                        {k.naam}
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
              Wys slegs items op voorraad
            </label>
          </div>

          <div className="mt-4 rounded-lg border-2 border-blits-black bg-blits-black p-4 text-white">
            <p className="text-sm font-bold uppercase tracking-wide text-blits-amber">
              Nie kry wat jy soek nie?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Vra ons vir &apos;n pasgemaakte kwotasie op grootmaat of spesiale items.
            </p>
            <a
              href="/kwotasie"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-blits-red px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-blits-red-dark"
            >
              <ClipboardList size={14} /> Kry &apos;n kwotasie
            </a>
          </div>
        </aside>

        {/* Produkrooster */}
        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="heading-block text-2xl text-blits-black">Aanlyn Winkel</h1>
              <p className="text-sm text-blits-grey">
                {gefiltreer.length} produk{gefiltreer.length === 1 ? "" : "te"} gevind
                {soek ? ` vir "${soek}"` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="search"
                value={soek}
                onChange={(e) => { stelSoek(e.target.value); stelWysAantal(BLAD); }}
                placeholder="Verfyn soektog…"
                className="w-40 rounded-md border border-blits-line bg-white px-3 py-2 text-sm outline-none focus:border-blits-red sm:w-48"
              />
              <select
                value={sortering}
                onChange={(e) => stelSortering(e.target.value as Sortering)}
                aria-label="Sorteer produkte"
                className="rounded-md border border-blits-line bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blits-red"
              >
                <option value="relevant">Aanbeveel</option>
                <option value="prys-op">Prys: laag → hoog</option>
                <option value="prys-af">Prys: hoog → laag</option>
                <option value="naam">Naam (A–Z)</option>
              </select>
            </div>
          </div>

          {sigbaar.length === 0 ? (
            <div className="rounded-lg border border-dashed border-blits-line bg-white p-12 text-center">
              <p className="text-lg font-bold text-blits-ink">Geen resultate nie</p>
              <p className="mt-1 text-sm text-blits-grey">
                Probeer &apos;n ander soekterm of vra ons vir &apos;n kwotasie.
              </p>
              <a
                href="/kwotasie"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-blits-red px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark"
              >
                <ClipboardList size={15} /> Kry &apos;n kwotasie
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {sigbaar.map((p) => (
                  <ProductCard key={p.id} produk={p} />
                ))}
              </div>
              {wysAantal < gefiltreer.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => stelWysAantal((n) => n + BLAD)}
                    className="rounded-md border-2 border-blits-black px-8 py-3 text-sm font-bold uppercase tracking-wide text-blits-black transition-colors hover:bg-blits-black hover:text-white"
                  >
                    Laai nog produkte ({gefiltreer.length - wysAantal} oor)
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
