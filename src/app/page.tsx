import Link from "next/link";
import {
  ShoppingCart, ClipboardList, Zap, Wrench, Layers, Palette,
  Droplets, Flame, Key, PlugZap, Paintbrush, HardHat,
  ArrowRight, Star, Users, Trophy, BadgeCheck, Truck,
} from "lucide-react";
import { STORE } from "@/lib/store-info";
import { KATEGORIEE, topVerkopers } from "@/lib/products";
import type { KategorieSleutel } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const KAT_IKONE: Record<KategorieSleutel, React.ElementType> = {
  elektries: Zap,
  hardeware: Wrench,
  konstruksie: Layers,
  verf: Palette,
  loodgieter: Droplets,
  gas: Flame,
};

const DIENSTE = [
  { Ikoon: Zap,        titel: "3 Elektriese Spanne",        beskrywing: "ECA-gesertifiseerde spanne vir huishoudelike én kommersiële werk, met gewaarborgde vakmanskap.", skakel: "/dienste/elektries" },
  { Ikoon: PlugZap,    titel: "Voorafbetaalde Meters",       beskrywing: "Installasie en omskakeling van voorafbetaalde kragmeters deur gekwalifiseerde elektrisiëns.", skakel: "/dienste/elektries" },
  { Ikoon: Paintbrush, titel: "Verfmenging op Bestelling",   beskrywing: "Bring jou kleurmonster — ons meng dit presies, terwyl jy wag.", skakel: "/winkel?kategorie=verf" },
  { Ikoon: Key,        titel: "Sleutels Sny",               beskrywing: "Vinnige, akkurate sleutelsny vir huis-, hek- en hangslotsleutels.", skakel: "/kontak" },
  { Ikoon: Flame,      titel: "LP-Gas Hervullings",          beskrywing: "Hervul 9kg en 19kg gasbottels — bring jou leë bottel in winkel in.", skakel: "/winkel?kategorie=gas" },
  { Ikoon: HardHat,    titel: "Doen-Dit-Self Advies",        beskrywing: "Persoonlike, kundige raad oor enige projek — groot of klein.", skakel: "/kontak" },
];

const STATS = [
  ["50+ jaar", "ervaring"],
  ["3 spanne", "ECA-gesertifiseer"],
  ["1000e", "SKU's op rak"],
];

export default function Tuis() {
  const tops = topVerkopers();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blits-black text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 2px, transparent 14px)" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-blits-amber/50 bg-blits-amber/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blits-amber">
              <Star size={12} /> Bedien die Moot sedert {STORE.sedert}
            </span>
            <h1 className="mt-4 heading-block text-4xl text-white sm:text-5xl lg:text-6xl">
              Die Moot se <span className="text-blits-amber">elektrisiën</span> &amp; hardeware winkel
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Familiebestuur, vinnige diens en eerlike pryse — van &apos;n enkele skroef tot volledige elektriese kontrakteurswerk. Koop aanlyn of kry vinnig &apos;n kwotasie.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/winkel" className="flex items-center justify-center gap-2 rounded-md bg-blits-red px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-blits-red-dark">
                <ShoppingCart size={16} /> Koop nou aanlyn
              </Link>
              <Link href="/kwotasie" className="flex items-center justify-center gap-2 rounded-md border-2 border-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-blits-black">
                <ClipboardList size={16} /> Vra &apos;n grootmaat-kwotasie
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {STATS.map(([groot, klein]) => (
                <div key={klein}>
                  <dt className="heading-block text-2xl text-blits-amber">{groot}</dt>
                  <dd className="text-xs uppercase tracking-wide text-white/70">{klein}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Dubbele-roete kaarte */}
          <div className="grid gap-4 animate-fade-up">
            <Link href="/winkel" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blits-red text-white"><ShoppingCart size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">Koop Aanlyn Nou</h3>
                  <p className="text-sm text-white/70">Retail-mandjie, betaal &amp; kollekteer of aflewering.</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/kwotasie" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blits-amber text-blits-black"><ClipboardList size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">Kry &apos;n Kontrakteur-kwotasie</h3>
                  <p className="text-sm text-white/70">Grootmaat, pasgemaakte volumes &amp; terreinwerk.</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/dienste/elektries" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-blits-black"><Zap size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">Bespreek &apos;n Elektrisiën</h3>
                  <p className="text-sm text-white/70">Domesties &amp; kommersieel — gewaarborgde werk.</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      {/* Kategorieë */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="heading-block text-3xl text-blits-black">Koop per kategorie</h2>
            <p className="mt-1 text-blits-grey">Alles vir die huis, terrein en projek.</p>
          </div>
          <Link href="/winkel" className="hidden items-center gap-1 text-sm font-bold uppercase tracking-wide text-blits-red hover:underline sm:flex">
            Sien alles <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {KATEGORIEE.map((k) => {
            const Ikoon = KAT_IKONE[k.sleutel];
            return (
              <Link
                key={k.sleutel}
                href={`/winkel?kategorie=${k.sleutel}`}
                className="group flex flex-col items-center rounded-xl border border-blits-line bg-white p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-blits-red hover:shadow-lg"
              >
                <Ikoon size={36} className="text-blits-red" aria-hidden />
                <span className="mt-3 text-sm font-bold text-blits-ink group-hover:text-blits-red">{k.naam}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Diens-kollig */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h2 className="heading-block text-3xl text-blits-black">Meer as net &apos;n winkel</h2>
            <p className="mt-1 text-blits-grey">Kerndienste wat ons gemeenskap al dekades lank vertrou.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIENSTE.map((d) => (
              <Link key={d.titel} href={d.skakel} className="group flex gap-4 rounded-xl border border-blits-line bg-blits-paper p-5 transition-colors hover:border-blits-red hover:bg-white">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blits-red/10 text-blits-red">
                  <d.Ikoon size={22} aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-blits-ink group-hover:text-blits-red">{d.titel}</h3>
                  <p className="mt-1 text-sm text-blits-grey">{d.beskrywing}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topverkopers */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="heading-block text-3xl text-blits-black">Topverkopers</h2>
          <Link href="/winkel" className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-blits-red hover:underline">
            Sien alles <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
          {tops.map((p) => <ProductCard key={p.id} produk={p} />)}
        </div>
      </section>

      {/* Vertroue-strook */}
      <section className="bg-blits-black py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Ikoon: Trophy,      titel: "ECA-gesertifiseer",    beskrywing: "Geregistreerde, gekwalifiseerde elektriese spanne." },
            { Ikoon: BadgeCheck,  titel: "Gewaarborgde werk",    beskrywing: "Vakmanskap met 'n waarborg waarop jy kan staatmaak." },
            { Ikoon: Truck,       titel: "Kollekteer of aflewer", beskrywing: "Plaaslike Pretoria-roetes & in-winkel kollektering." },
            { Ikoon: Users,       titel: "Familiebestuur",       beskrywing: `Trots gemeenskaps­besit sedert ${STORE.sedert}.` },
          ].map(({ Ikoon, titel, beskrywing }) => (
            <div key={titel}>
              <Ikoon size={32} className="mx-auto text-blits-amber" aria-hidden />
              <h3 className="mt-2 font-bold text-blits-amber">{titel}</h3>
              <p className="mt-1 text-sm text-white/70">{beskrywing}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
