"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { STORE, adresEenReel } from "@/lib/store-info";
import { KATEGORIEE } from "@/lib/products";
import { useTaal } from "@/lib/taal";

export default function Footer() {
  const { t } = useTaal();

  const dagEn: Record<string, string> = {
    "Maandag – Vrydag": "Monday – Friday",
    "Saterdag": "Saturday",
    "Sondag & Openbare Vakansiedae": "Sunday & Public Holidays",
    "Gesluit": "Closed",
  };

  return (
    <footer className="mt-16 bg-blits-black text-white/80">
      <div className="hazard-stripe h-2 w-full" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4">
            <Image src="/blits-logo.png" alt="Blits Elektries en Hardeware" width={140} height={52} className="h-12 w-auto" />
          </div>
          <p className="text-sm leading-relaxed">{STORE.slagspreuk}.</p>
          <p className="mt-3 text-sm">
            {t("Trots familiebestuur sedert", "Proudly family-owned since")}{" "}
            <span className="font-bold text-blits-amber">{STORE.sedert}</span>.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t("Winkel", "Shop")}</h4>
          <ul className="space-y-2 text-sm">
            {KATEGORIEE.map((k) => (
              <li key={k.sleutel}>
                <Link href={`/winkel?kategorie=${k.sleutel}`} className="hover:text-blits-amber">
                  {t(k.naam, k.naamEn)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t("Skakels", "Links")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dienste/elektries" className="hover:text-blits-amber">{t("Elektriese Dienste", "Electrical Services")}</Link></li>
            <li><Link href="/kwotasie" className="hover:text-blits-amber">{t("Kry 'n Kwotasie", "Get a Quote")}</Link></li>
            <li><Link href="/mandjie" className="hover:text-blits-amber">{t("Winkelmandjie & Betaling", "Shopping Cart & Payment")}</Link></li>
            <li><Link href="/kontak" className="hover:text-blits-amber">{t("Kontak & Ligging", "Contact & Location")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t("Kontak", "Contact")}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${STORE.telefoonSkoon}`} className="flex items-center gap-2 hover:text-blits-amber">
                <Phone size={14} aria-hidden className="shrink-0" /> {STORE.telefoon}
              </a>
            </li>
            <li>
              <a href={`mailto:${STORE.epos}`} className="flex items-center gap-2 hover:text-blits-amber">
                <Mail size={14} aria-hidden className="shrink-0" /> {STORE.epos}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} aria-hidden className="mt-0.5 shrink-0" />
              <span>{adresEenReel}</span>
            </li>
          </ul>
          <div className="mt-4 rounded-md border border-white/15 p-3 text-xs">
            {STORE.ure.map((u) => (
              <div key={u.dag} className="flex justify-between gap-3 py-0.5">
                <span>{t(u.dag, dagEn[u.dag] ?? u.dag)}</span>
                <span className="font-semibold text-white">{t(u.tyd, u.tyd === "Gesluit" ? "Closed" : u.tyd)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row">
          <p>© {STORE.sedert}–2026 {STORE.naam}. {t("Alle regte voorbehou.", "All rights reserved.")}</p>
          <p>{t("Pryse sluit 15% BTW in · ECA-gesertifiseerde elektriese spanne.", "Prices include 15% VAT · ECA-certified electrical teams.")}</p>
        </div>
      </div>
    </footer>
  );
}
