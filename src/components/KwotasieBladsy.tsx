"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, MessageCircle, Check, X, Trash2 } from "lucide-react";
import { useMandjie } from "@/lib/winkelmandjie";
import { useGehidreer } from "@/lib/use-gehidreer";
import { randFormaat } from "@/lib/format";
import { STORE } from "@/lib/store-info";

const KATEGORIE_OPSIES = [
  "Elektries",
  "Hardeware",
  "Loodgieter",
  "Konstruksie / Kontrakteur",
  "Verf & Gereedskap",
  "Gasprodukte",
  "Ander / Algemeen",
];

const invoerKlas =
  "w-full rounded-md border border-blits-line bg-white px-3 py-2.5 text-sm text-blits-ink outline-none focus:border-blits-red focus:ring-2 focus:ring-blits-red/20";

export default function KwotasieBladsy() {
  const gehidreer = useGehidreer();
  const kwotasie = useMandjie((s) => s.kwotasie);
  const stelHoev = useMandjie((s) => s.stelKwotasieHoeveelheid);
  const verwyder = useMandjie((s) => s.verwyderUitKwotasie);
  const maakLeeg = useMandjie((s) => s.maakKwotasieLeeg);
  const [gestuur, stelGestuur] = useState(false);
  const [vorm, stelVorm] = useState({
    naam: "", telefoon: "", epos: "", adres: "",
    kategorie: KATEGORIE_OPSIES[0], beskrywing: "",
  });
  const opdateer = (sleutel: keyof typeof vorm, waarde: string) =>
    stelVorm((v) => ({ ...v, [sleutel]: waarde }));

  if (gestuur) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check size={32} />
        </div>
        <h1 className="mt-4 heading-block text-3xl text-blits-black">Kwotasie-aanvraag gestuur!</h1>
        <p className="mt-2 text-blits-grey">
          Dankie, {vorm.naam || "kliënt"}. Ons span keer gewoonlik binne 24 uur terug. Vir dringende navrae, skakel{" "}
          <a href={`tel:${STORE.telefoonSkoon}`} className="font-semibold text-blits-red">{STORE.telefoon}</a>.
        </p>
        <p className="mt-1 text-sm text-blits-grey">(Demonstrasie — geen e-pos is werklik gestuur nie.)</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-blits-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
          Terug tuis
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-xl bg-blits-black p-6 text-white sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-blits-amber/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blits-amber">
          <ClipboardList size={13} /> Kry &apos;n Kwotasie
        </span>
        <h1 className="mt-3 heading-block text-2xl text-white sm:text-3xl lg:text-4xl">Vra &apos;n pasgemaakte kwotasie aan</h1>
        <p className="mt-2 max-w-2xl text-white/80">
          Nie &apos;n item gekry nie, of het jy grootmaat- of pasgemaakte hoeveelhede nodig? Voltooi die vorm — ons span keer binne 24 uur terug.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); stelGestuur(true); }} className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5 rounded-lg border border-blits-line bg-white p-6 shadow-card">
          <div className="grid gap-5 sm:grid-cols-2">
            <Veld label="Naam &amp; van" verplig>
              <input required value={vorm.naam} onChange={(e) => opdateer("naam", e.target.value)} className={invoerKlas} placeholder="bv. Pieter van der Merwe" />
            </Veld>
            <Veld label="Telefoonnommer" verplig>
              <input required type="tel" value={vorm.telefoon} onChange={(e) => opdateer("telefoon", e.target.value)} className={invoerKlas} placeholder="bv. 082 123 4567" />
            </Veld>
            <Veld label="E-posadres" verplig>
              <input required type="email" value={vorm.epos} onChange={(e) => opdateer("epos", e.target.value)} className={invoerKlas} placeholder="jou@epos.co.za" />
            </Veld>
            <Veld label="Diens-kategorie" verplig>
              <select value={vorm.kategorie} onChange={(e) => opdateer("kategorie", e.target.value)} className={invoerKlas}>
                {KATEGORIE_OPSIES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Veld>
          </div>
          <Veld label="Aflewering- / terrein-adres" verplig>
            <input required value={vorm.adres} onChange={(e) => opdateer("adres", e.target.value)} className={invoerKlas} placeholder="Straatadres waar werk gedoen of goedere afgelewer word" />
          </Veld>
          <Veld label="Werkbeskrywing / pasgemaakte items" verplig>
            <textarea required rows={6} value={vorm.beskrywing} onChange={(e) => opdateer("beskrywing", e.target.value)} className={`${invoerKlas} resize-y`} placeholder="Beskryf die werk of lys die items en hoeveelhede wat jy benodig…" />
          </Veld>
          <p className="text-xs text-blits-grey">
            Verplig <span className="text-blits-red">*</span> · Ons deel nooit jou besonderhede met derde partye nie.
          </p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-44 lg:self-start">
          <div className="rounded-lg border border-blits-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-blits-black">Items vir kwotasie</h2>
              {gehidreer && kwotasie.length > 0 && (
                <button type="button" onClick={maakLeeg} className="flex items-center gap-1 text-xs font-semibold text-blits-grey hover:text-blits-red">
                  <Trash2 size={12} /> Maak leeg
                </button>
              )}
            </div>
            {!gehidreer ? (
              <p className="mt-3 text-sm text-blits-grey">Laai…</p>
            ) : kwotasie.length === 0 ? (
              <p className="mt-3 text-sm text-blits-grey">
                Geen items gekies nie. Voeg produkte vanaf die{" "}
                <Link href="/winkel" className="font-semibold text-blits-red hover:underline">winkel</Link>{" "}
                by, of beskryf dit net hierbo.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {kwotasie.map((item) => (
                  <li key={item.produk.id} className="flex items-center gap-2 text-sm">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-blits-ink">{item.produk.naam}</p>
                      <p className="text-xs text-blits-grey">SKU {item.produk.sku} · {randFormaat(item.produk.prys)}</p>
                    </div>
                    <input
                      type="number" min={1} value={item.hoeveelheid}
                      onChange={(e) => stelHoev(item.produk.id, Math.max(1, Number(e.target.value) || 1))}
                      className="h-8 w-14 rounded-md border border-blits-line text-center text-sm outline-none focus:border-blits-red"
                      aria-label={`Hoeveelheid vir ${item.produk.naam}`}
                    />
                    <button type="button" onClick={() => verwyder(item.produk.id)} className="text-blits-grey hover:text-blits-red" aria-label="Verwyder">
                      <X size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 border-t border-blits-line pt-3 text-[11px] text-blits-grey">
              Pryse is ter inligting — finale kwotasie kan verskil op grond van hoeveelheid en aflewering.
            </p>
          </div>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-blits-red px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark">
            <ClipboardList size={15} /> Stuur kwotasie-aanvraag
          </button>
          <a
            href={`https://wa.me/${STORE.whatsapp}`}
            target="_blank" rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-blits-black px-4 py-3 text-sm font-bold uppercase tracking-wide text-blits-black transition-colors hover:bg-blits-black hover:text-white"
          >
            <MessageCircle size={15} /> Vra eerder op WhatsApp
          </a>
        </aside>
      </form>
    </div>
  );
}

function Veld({ label, verplig, children }: { label: string; verplig?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blits-ink"
        dangerouslySetInnerHTML={{ __html: `${label}${verplig ? ' <span class="text-blits-red">*</span>' : ""}` }}
      />
      {children}
    </label>
  );
}
