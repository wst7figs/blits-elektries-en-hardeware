"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ClipboardList, Store, Truck, Check, Lock, ArrowLeft, Trash2 } from "lucide-react";
import {
  useMandjie,
  mandjieTotaalRand,
  mandjieTotaalItems,
} from "@/lib/winkelmandjie";
import { useGehidreer } from "@/lib/use-gehidreer";
import { randFormaat, btwOpbreek } from "@/lib/format";
import { STORE } from "@/lib/store-info";
import KategorieIkoon from "./KategorieIkoon";

type Aflewering = "kollekteer" | "koerier";

function HoeveelheidBeheer({ hoeveelheid, opStel }: { hoeveelheid: number; opStel: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-md border border-blits-line">
      <button onClick={() => opStel(hoeveelheid - 1)} className="flex h-8 w-8 items-center justify-center text-lg font-bold text-blits-ink hover:bg-blits-paper" aria-label="Verminder">−</button>
      <input type="number" min={1} value={hoeveelheid} onChange={(e) => opStel(Math.max(1, Number(e.target.value) || 1))} className="h-8 w-12 border-x border-blits-line text-center text-sm outline-none" />
      <button onClick={() => opStel(hoeveelheid + 1)} className="flex h-8 w-8 items-center justify-center text-lg font-bold text-blits-ink hover:bg-blits-paper" aria-label="Vermeerder">+</button>
    </div>
  );
}

export default function MandjieBladsy() {
  const gehidreer = useGehidreer();
  const mandjie = useMandjie((s) => s.mandjie);
  const kwotasie = useMandjie((s) => s.kwotasie);
  const stelHoev = useMandjie((s) => s.stelMandjieHoeveelheid);
  const verwyder = useMandjie((s) => s.verwyderUitMandjie);
  const maakLeeg = useMandjie((s) => s.maakMandjieLeeg);
  const [aflewering, stelAflewering] = useState<Aflewering>("kollekteer");
  const [bestelGeplaas, stelBestelGeplaas] = useState<string | null>(null);

  if (!gehidreer) return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-blits-grey">Laai mandjie…</div>;

  const totaalBtwIngeslote = mandjieTotaalRand(mandjie);
  const { netto, btw } = btwOpbreek(totaalBtwIngeslote);
  const afleweringKoste = aflewering === "koerier" && totaalBtwIngeslote > 0
    ? totaalBtwIngeslote >= 2000 ? 0 : 95
    : 0;
  const finaleTotaal = totaalBtwIngeslote + afleweringKoste;

  if (bestelGeplaas) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-blits-red">
          <Check size={32} />
        </div>
        <h1 className="mt-4 heading-block text-3xl text-blits-black">Bestelling ontvang!</h1>
        <p className="mt-2 text-blits-grey">
          Bestelnommer <span className="font-mono font-bold text-blits-ink">{bestelGeplaas}</span>. Ons span sal jou skakel om betaling en{" "}
          {aflewering === "kollekteer" ? "kollektering" : "aflewering"} te bevestig.
        </p>
        <p className="mt-1 text-sm text-blits-grey">(Demonstrasie — geen werklike betaling is verwerk nie.)</p>
        <Link href="/winkel" className="mt-6 inline-flex items-center gap-2 rounded-md bg-blits-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
          <ShoppingCart size={15} /> Koop verder
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="heading-block text-3xl text-blits-black">Winkelmandjie</h1>
      <p className="mt-1 text-sm text-blits-grey">Aanlyn retail-bestelling · pryse sluit 15% BTW in.</p>

      {mandjieTotaalItems(kwotasie) > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-blits-amber/60 bg-blits-amber/10 p-4">
          <ClipboardList size={16} className="text-blits-ink" />
          <span className="text-sm font-semibold text-blits-ink">
            Jy het {mandjieTotaalItems(kwotasie)} item(s) in jou kwotasie-mandjie.
          </span>
          <Link href="/kwotasie" className="ml-auto rounded-md bg-blits-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blits-ink">
            Gaan na kwotasie →
          </Link>
        </div>
      )}

      {mandjie.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-blits-line bg-white p-12 text-center">
          <ShoppingCart size={40} className="mx-auto text-blits-grey" />
          <p className="mt-4 text-lg font-bold text-blits-ink">Jou mandjie is leeg</p>
          <p className="mt-1 text-sm text-blits-grey">Blaai deur die winkel en voeg produkte by.</p>
          <Link href="/winkel" className="mt-4 inline-flex items-center gap-2 rounded-md bg-blits-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
            <ShoppingCart size={15} /> Na die winkel
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="overflow-hidden rounded-lg border border-blits-line bg-white">
              {mandjie.map((item) => (
                <div key={item.produk.id} className="flex gap-3 border-b border-blits-line p-4 last:border-b-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blits-paper text-blits-red">
                    <KategorieIkoon kategorie={item.produk.kategorie} size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-tight text-blits-ink">{item.produk.naam}</h3>
                        <p className="text-xs text-blits-grey">SKU {item.produk.sku} · {randFormaat(item.produk.prys)} elk</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-blits-black">{randFormaat(item.produk.prys * item.hoeveelheid)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <HoeveelheidBeheer hoeveelheid={item.hoeveelheid} opStel={(n) => stelHoev(item.produk.id, n)} />
                      <button onClick={() => verwyder(item.produk.id)} className="flex items-center gap-1 text-xs font-semibold text-blits-red hover:underline">
                        <Trash2 size={11} /> Verwyder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <Link href="/winkel" className="flex items-center gap-1 text-sm font-semibold text-blits-red hover:underline">
                <ArrowLeft size={14} /> Koop verder
              </Link>
              <button onClick={maakLeeg} className="flex items-center gap-1 text-sm font-semibold text-blits-grey hover:text-blits-red">
                <Trash2 size={14} /> Maak mandjie leeg
              </button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-44 lg:self-start">
            <div className="rounded-lg border border-blits-line bg-white p-5 shadow-card">
              <h2 className="text-sm font-bold uppercase tracking-wide text-blits-black">Bestel-opsomming</h2>
              <fieldset className="mt-4">
                <legend className="text-xs font-semibold uppercase tracking-wide text-blits-grey">Aflewering</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([
                    ["kollekteer", Store, "Kollekteer", "Gratis · in-winkel"],
                    ["koerier", Truck, "Koerier", "Pretoria-roetes"],
                  ] as const).map(([waarde, Ikoon, titel, sub]) => (
                    <button
                      key={waarde}
                      onClick={() => stelAflewering(waarde)}
                      className={`rounded-md border-2 p-2 text-left text-xs ${
                        aflewering === waarde ? "border-blits-red bg-blits-red/5" : "border-blits-line hover:border-blits-grey"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-bold text-blits-ink">
                        <Ikoon size={13} /> {titel}
                      </span>
                      <span className="text-blits-grey">{sub}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <dl className="mt-4 space-y-2 border-t border-blits-line pt-4 text-sm">
                <div className="flex justify-between text-blits-grey"><dt>Subtotaal (netto)</dt><dd>{randFormaat(netto)}</dd></div>
                <div className="flex justify-between text-blits-grey"><dt>BTW (15%)</dt><dd>{randFormaat(btw)}</dd></div>
                <div className="flex justify-between text-blits-grey">
                  <dt>Aflewering</dt>
                  <dd>{aflewering === "kollekteer" ? "Gratis" : afleweringKoste === 0 ? "Gratis (oor R2 000)" : randFormaat(afleweringKoste)}</dd>
                </div>
                <div className="flex justify-between border-t border-blits-line pt-2 text-base font-black text-blits-black">
                  <dt>Totaal</dt><dd>{randFormaat(finaleTotaal)}</dd>
                </div>
              </dl>

              <button
                onClick={() => stelBestelGeplaas("BLITS-" + String(mandjie.length).padStart(2, "0") + "-" + String(Math.round(finaleTotaal)))}
                className="mt-5 w-full rounded-md bg-blits-red px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark"
              >
                Gaan na betaling
              </button>
              <p className="mt-3 flex items-start justify-center gap-1 text-center text-[11px] leading-relaxed text-blits-grey">
                <Lock size={11} className="mt-0.5 shrink-0" />
                Veilige betaling (demonstrasie). Vir grootmaat items, vra eerder &apos;n{" "}
                <Link href="/kwotasie" className="font-semibold text-blits-red hover:underline">kwotasie</Link>.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
