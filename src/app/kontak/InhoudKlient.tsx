"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { STORE, adresEenReel } from "@/lib/store-info";
import { useTaal } from "@/lib/taal";

const kaartUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${STORE.adres.straat}, ${STORE.adres.voorstad}, ${STORE.adres.stad}`,
)}&z=15&output=embed`;

const dagEn: Record<string, string> = {
  "Maandag – Vrydag": "Monday – Friday",
  "Saterdag": "Saturday",
  "Sondag & Openbare Vakansiedae": "Sunday & Public Holidays",
  "Gesluit": "Closed",
};

export default function KontakInhoud() {
  const { t } = useTaal();

  return (
    <>
      <section className="bg-blits-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <h1 className="heading-block text-3xl text-white sm:text-4xl lg:text-5xl">{t("Kontak ons", "Contact us")}</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            {t(
              `Kom kuier by ons winkel in ${STORE.adres.voorstad}, of skakel — ons help graag persoonlik.`,
              `Visit our store in ${STORE.adres.voorstad}, or call — we're happy to help in person.`
            )}
          </p>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <KaartBlok titel={t("Ligging", "Location")} Ikoon={MapPin}>
              <p className="font-semibold text-blits-ink">{STORE.adres.straat}</p>
              <p>{STORE.adres.voorstad}, {STORE.adres.stad}</p>
              <p>{t(STORE.adres.land, "South Africa")}, {STORE.adres.kode}</p>
            </KaartBlok>

            <KaartBlok titel={t("Winkelure", "Store hours")} Ikoon={Clock}>
              <ul className="divide-y divide-blits-line">
                {STORE.ure.map((u) => (
                  <li key={u.dag} className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-blits-grey">{t(u.dag, dagEn[u.dag] ?? u.dag)}</span>
                    <span className="font-bold text-blits-ink">{t(u.tyd, u.tyd === "Gesluit" ? "Closed" : u.tyd)}</span>
                  </li>
                ))}
              </ul>
            </KaartBlok>

            <KaartBlok titel={t("Kontakbesonderhede", "Contact details")} Ikoon={Phone}>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`tel:${STORE.telefoonSkoon}`} className="flex items-center gap-2 font-semibold text-blits-red hover:underline">
                    <Phone size={14} aria-hidden /> {STORE.telefoon}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${STORE.epos}`} className="flex items-center gap-2 font-semibold text-blits-red hover:underline">
                    <Mail size={14} aria-hidden /> {STORE.epos}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-blits-red hover:underline">
                    <MessageCircle size={14} aria-hidden /> {t("WhatsApp — vinnige navrae & afsprake", "WhatsApp — quick enquiries & appointments")}
                  </a>
                </li>
              </ul>
            </KaartBlok>

            <div className="flex flex-wrap gap-3">
              <a href={`tel:${STORE.telefoonSkoon}`} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blits-red px-4 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
                <Phone size={15} /> {t("Skakel nou", "Call now")}
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(adresEenReel)}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-blits-black px-4 py-3 text-sm font-bold uppercase tracking-wide text-blits-black hover:bg-blits-black hover:text-white">
                <Navigation size={15} /> {t("Wys roete", "Get directions")}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-blits-line bg-white shadow-card">
            <iframe
              title={`${t("Kaart na", "Map to")} ${STORE.naam}`}
              src={kaartUrl}
              className="h-64 w-full sm:h-96 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function KaartBlok({ titel, Ikoon, children }: { titel: string; Ikoon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blits-line bg-white p-5 shadow-card">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blits-black">
        <Ikoon size={15} className="text-blits-red" aria-hidden /> {titel}
      </h2>
      <div className="text-sm text-blits-grey">{children}</div>
    </div>
  );
}
