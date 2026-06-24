"use client";

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
import { useTaal } from "@/lib/taal";

const KAT_IKONE: Record<KategorieSleutel, React.ElementType> = {
  elektries: Zap,
  hardeware: Wrench,
  konstruksie: Layers,
  verf: Palette,
  loodgieter: Droplets,
  gas: Flame,
};

export default function Tuis() {
  const tops = topVerkopers();
  const { taal, t } = useTaal();

  const stats: [string, string][] = [
    [t("50+ jaar", "50+ years"),  t("ervaring", "experience")],
    [t("3 spanne", "3 teams"),    t("ECA-gesertifiseer", "ECA-certified")],
    [t("1000e", "1000s"),         t("SKU's op rak", "SKUs in stock")],
  ];

  const dienste = [
    { Ikoon: Zap,        titel: t("3 Elektriese Spanne", "3 Electrical Teams"),          beskrywing: t("ECA-gesertifiseerde spanne vir huishoudelike én kommersiële werk, met gewaarborgde vakmanskap.", "ECA-certified teams for residential and commercial work, with guaranteed workmanship."), skakel: "/dienste/elektries" },
    { Ikoon: PlugZap,    titel: t("Voorafbetaalde Meters", "Prepaid Meters"),            beskrywing: t("Installasie en omskakeling van voorafbetaalde kragmeters deur gekwalifiseerde elektrisiëns.", "Installation and conversion of prepaid power meters by qualified electricians."), skakel: "/dienste/elektries" },
    { Ikoon: Paintbrush, titel: t("Verfmenging op Bestelling", "Paint Mixing on Demand"), beskrywing: t("Bring jou kleurmonster — ons meng dit presies, terwyl jy wag.", "Bring your colour sample — we mix it precisely, while you wait."), skakel: "/winkel?kategorie=verf" },
    { Ikoon: Key,        titel: t("Sleutels Sny", "Key Cutting"),                       beskrywing: t("Vinnige, akkurate sleutelsny vir huis-, hek- en hangslotsleutels.", "Fast, accurate key cutting for house, gate and padlock keys."), skakel: "/kontak" },
    { Ikoon: Flame,      titel: t("LP-Gas Hervullings", "LP Gas Refills"),               beskrywing: t("Hervul 9kg en 19kg gasbottels — bring jou leë bottel in winkel in.", "Refill 9kg and 19kg gas cylinders — bring your empty cylinder in store."), skakel: "/winkel?kategorie=gas" },
    { Ikoon: HardHat,    titel: t("Doen-Dit-Self Advies", "DIY Advice"),                 beskrywing: t("Persoonlike, kundige raad oor enige projek — groot of klein.", "Personal, expert advice on any project — big or small."), skakel: "/kontak" },
  ];

  const vertroue = [
    { Ikoon: Trophy,     titel: t("ECA-gesertifiseer", "ECA-certified"),          beskrywing: t("Geregistreerde, gekwalifiseerde elektriese spanne.", "Registered, qualified electrical teams.") },
    { Ikoon: BadgeCheck, titel: t("Gewaarborgde werk", "Guaranteed workmanship"), beskrywing: t("Vakmanskap met 'n waarborg waarop jy kan staatmaak.", "Workmanship with a guarantee you can rely on.") },
    { Ikoon: Truck,      titel: t("Kollekteer of aflewer", "Collect or deliver"), beskrywing: t("Plaaslike Pretoria-roetes & in-winkel kollektering.", "Local Pretoria routes & in-store collection.") },
    { Ikoon: Users,      titel: t("Familiebestuur", "Family-owned"),               beskrywing: t(`Trots gemeenskapsbesit sedert ${STORE.sedert}.`, `Proudly community-owned since ${STORE.sedert}.`) },
  ];

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
              <Star size={12} /> {t(`Bedien die Moot sedert ${STORE.sedert}`, `Serving Die Moot since ${STORE.sedert}`)}
            </span>
            <h1 className="mt-4 heading-block text-3xl text-white sm:text-4xl lg:text-5xl">
              {taal === "en"
                ? <>Die Moot&apos;s <span className="text-blits-amber">electrician</span> &amp; hardware store</>
                : <>Die Moot se <span className="text-blits-amber">elektrisiën</span> &amp; hardeware winkel</>
              }
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">
              {t(
                "Familiebestuur, vinnige diens en eerlike pryse — van 'n enkele skroef tot volledige elektriese kontrakteurswerk. Koop aanlyn of kry vinnig 'n kwotasie.",
                "Family-owned, fast service and honest prices — from a single screw to complete electrical contracting. Shop online or get a quick quote."
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/winkel" className="flex items-center justify-center gap-2 rounded-md bg-blits-red px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-blits-red-dark">
                <ShoppingCart size={16} /> {t("Koop nou aanlyn", "Shop online now")}
              </Link>
              <Link href="/kwotasie" className="flex items-center justify-center gap-2 rounded-md border-2 border-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-blits-black">
                <ClipboardList size={16} /> {t("Vra 'n grootmaat-kwotasie", "Request a bulk quote")}
              </Link>
            </div>
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/15 pt-5">
              {stats.map(([groot, klein]) => (
                <div key={klein}>
                  <dt className="heading-block text-xl text-blits-amber sm:text-2xl">{groot}</dt>
                  <dd className="text-[10px] uppercase tracking-wide text-white/70 sm:text-xs">{klein}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:grid gap-4 animate-fade-up">
            <Link href="/winkel" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blits-red text-white"><ShoppingCart size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t("Koop Aanlyn Nou", "Shop Online Now")}</h3>
                  <p className="text-sm text-white/70">{t("Retail-mandjie, betaal & kollekteer of aflewering.", "Retail cart, pay & collect or delivery.")}</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/kwotasie" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blits-amber text-blits-black"><ClipboardList size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t("Kry 'n Kontrakteur-kwotasie", "Get a Contractor Quote")}</h3>
                  <p className="text-sm text-white/70">{t("Grootmaat, pasgemaakte volumes & terreinwerk.", "Bulk, custom volumes & site work.")}</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link href="/dienste/elektries" className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blits-amber hover:bg-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-blits-black"><Zap size={22} /></span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t("Bespreek 'n Elektrisiën", "Book an Electrician")}</h3>
                  <p className="text-sm text-white/70">{t("Domesties & kommersieel — gewaarborgde werk.", "Domestic & commercial — guaranteed work.")}</p>
                </div>
                <ArrowRight size={22} className="ml-auto text-white/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      {/* Kategorieë */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Koop per kategorie", "Shop by category")}</h2>
            <p className="mt-1 text-sm text-blits-grey sm:text-base">{t("Alles vir die huis, terrein en projek.", "Everything for the home, property and project.")}</p>
          </div>
          <Link href="/winkel" className="hidden items-center gap-1 text-sm font-bold uppercase tracking-wide text-blits-red hover:underline sm:flex">
            {t("Sien alles", "See all")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {KATEGORIEE.map((k) => {
            const Ikoon = KAT_IKONE[k.sleutel];
            return (
              <Link key={k.sleutel} href={`/winkel?kategorie=${k.sleutel}`} className="group flex flex-col items-center rounded-xl border border-blits-line bg-white p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-blits-red hover:shadow-lg">
                <Ikoon size={36} className="text-blits-red" aria-hidden />
                <span className="mt-3 text-sm font-bold text-blits-ink group-hover:text-blits-red">{t(k.naam, k.naamEn)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Diens-kollig */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Meer as net 'n winkel", "More than just a store")}</h2>
            <p className="mt-1 text-sm text-blits-grey sm:text-base">{t("Kerndienste wat ons gemeenskap al dekades lank vertrou.", "Core services our community has trusted for decades.")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dienste.map((d) => (
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
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Topverkopers", "Top Sellers")}</h2>
          <Link href="/winkel" className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-blits-red hover:underline">
            {t("Sien alles", "See all")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
          {tops.map((p) => <ProductCard key={p.id} produk={p} />)}
        </div>
      </section>

      {/* Vertroue-strook */}
      <section className="bg-blits-black py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {vertroue.map(({ Ikoon, titel, beskrywing }) => (
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
