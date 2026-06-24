"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Phone, Clock, Search, ShoppingCart, ClipboardList, Menu, X } from "lucide-react";
import { STORE } from "@/lib/store-info";
import { useMandjie, mandjieTotaalItems } from "@/lib/winkelmandjie";
import { useGehidreer } from "@/lib/use-gehidreer";
import { useTaal } from "@/lib/taal";

function SoekBalk({ kompak = false }: { kompak?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [waarde, stel] = useState(params.get("soek") ?? "");
  const { t } = useTaal();

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = waarde.trim();
        router.push(q ? `/winkel?soek=${encodeURIComponent(q)}` : "/winkel");
      }}
      className={`flex items-stretch w-full ${kompak ? "max-w-full" : "max-w-2xl"}`}
    >
      <div className="relative flex-1">
        <Search size={16} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-blits-grey" />
        <input
          type="search"
          value={waarde}
          onChange={(e) => stel(e.target.value)}
          placeholder={t(
            "Soek tussen duisende produkte — bv. kabel, sement, verf…",
            "Search thousands of products — e.g. cable, cement, paint…"
          )}
          aria-label={t("Soek produkte", "Search products")}
          className="w-full rounded-l-md border border-blits-line bg-white py-3 pl-9 pr-3 text-sm text-blits-ink outline-none placeholder:text-blits-grey focus:border-blits-red focus:ring-2 focus:ring-blits-red/20"
        />
      </div>
      <button
        type="submit"
        className="rounded-r-md bg-blits-red px-5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark"
      >
        {t("Soek", "Search")}
      </button>
    </form>
  );
}

function Telling({ getal, gehidreer }: { getal: number; gehidreer: boolean }) {
  if (!gehidreer || getal === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blits-amber px-1 text-[11px] font-black text-blits-black">
      {getal > 99 ? "99+" : getal}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [oop, stelOop] = useState(false);
  const gehidreer = useGehidreer();
  const mandjie = useMandjie((s) => s.mandjie);
  const kwotasie = useMandjie((s) => s.kwotasie);
  const mandjieTelling = mandjieTotaalItems(mandjie);
  const kwotasieTelling = mandjieTotaalItems(kwotasie);
  const { taal, stelTaal, t } = useTaal();

  const NAV = [
    { href: "/",                   label: t("Tuis", "Home") },
    { href: "/winkel",             label: t("Aanlyn Winkel", "Online Shop") },
    { href: "/dienste/elektries",  label: t("Elektriese Dienste", "Electrical Services") },
    { href: "/kwotasie",           label: t("Kry 'n Kwotasie", "Get a Quote") },
    { href: "/kontak",             label: t("Kontak", "Contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Boonste hulpbalk */}
      <div className="bg-blits-black text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a href={`tel:${STORE.telefoonSkoon}`} className="flex items-center gap-1.5 font-semibold hover:text-blits-amber">
              <Phone size={13} aria-hidden /> {STORE.telefoon}
            </a>
            <span className="hidden items-center gap-1.5 text-white/70 sm:flex">
              <Clock size={13} aria-hidden />
              {t("Ma–Vr 07:00–18:00 · Sa 08:00–15:00", "Mon–Fri 07:00–18:00 · Sat 08:00–15:00")}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <span className="hidden md:inline">
              {t(`Bedien die Moot sedert ${STORE.sedert}`, `Serving Die Moot since ${STORE.sedert}`)}
            </span>
            <button
              onClick={() => stelTaal(taal === "af" ? "en" : "af")}
              className="rounded border border-white/25 px-1.5 py-0.5 font-semibold text-white/90 transition-colors hover:border-blits-amber hover:text-blits-amber"
              title={taal === "af" ? "Switch to English" : "Wissel na Afrikaans"}
            >
              {taal === "af" ? "EN" : "AF"}
            </button>
          </div>
        </div>
      </div>

      {/* Hoofbalk */}
      <div className="border-b border-blits-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/blits-logo.png" alt="Blits Elektries en Hardeware" width={160} height={60} priority className="h-14 w-auto" />
          </Link>

          <div className="hidden flex-1 lg:block">
            <Suspense fallback={<div className="h-12" />}>
              <SoekBalk />
            </Suspense>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/kwotasie"
              className="relative hidden items-center gap-2 rounded-md border-2 border-blits-black px-3 py-2 text-sm font-bold uppercase tracking-wide text-blits-black transition-colors hover:bg-blits-black hover:text-white sm:flex"
            >
              <ClipboardList size={16} aria-hidden /> {t("Kwotasie", "Quote")}
              <Telling getal={kwotasieTelling} gehidreer={gehidreer} />
            </Link>
            <Link
              href="/mandjie"
              aria-label={t("Winkelmandjie", "Shopping cart")}
              className="relative flex items-center gap-2 rounded-md bg-blits-red px-3 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blits-red-dark"
            >
              <ShoppingCart size={16} aria-hidden />
              <span className="hidden sm:inline">{t("Mandjie", "Cart")}</span>
              <Telling getal={mandjieTelling} gehidreer={gehidreer} />
            </Link>
            <button
              type="button"
              aria-label={t("Wys kieslys", "Show menu")}
              aria-expanded={oop}
              onClick={() => stelOop((v) => !v)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-md border border-blits-line text-blits-black lg:hidden"
            >
              {oop ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobiele soekbalk */}
        <div className="px-4 pb-3 lg:hidden">
          <Suspense fallback={<div className="h-12" />}>
            <SoekBalk kompak />
          </Suspense>
        </div>
      </div>

      {/* Navigasie */}
      <nav className="hidden bg-blits-red lg:block">
        <div className="mx-auto flex max-w-7xl items-center px-4">
          {NAV.map((item) => {
            const aktief = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                  aktief ? "bg-blits-red-dark text-white" : "text-white/90 hover:bg-blits-red-dark hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobiele kieslys */}
      {oop && (
        <nav className="border-b border-blits-line bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-2 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => stelOop(false)}
                className="block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wide text-blits-ink hover:bg-blits-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
