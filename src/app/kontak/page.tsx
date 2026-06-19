import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { STORE, adresEenReel } from "@/lib/store-info";

export const metadata: Metadata = {
  title: "Kontak & Ligging",
  description: `Besoek Blits Elektries en Hardeware by ${adresEenReel}. Oop Ma–Vr 07:00–18:00, Sa 08:00–15:00. Skakel ${STORE.telefoon}.`,
};

const kaartUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${STORE.adres.straat}, ${STORE.adres.voorstad}, ${STORE.adres.stad}`,
)}&z=15&output=embed`;

export default function KontakPage() {
  return (
    <>
      <section className="bg-blits-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <h1 className="heading-block text-3xl text-white sm:text-4xl lg:text-5xl">Kontak ons</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Kom kuier by ons winkel in {STORE.adres.voorstad}, of skakel — ons help graag persoonlik.
          </p>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <KaartBlok titel="Ligging" Ikoon={MapPin}>
              <p className="font-semibold text-blits-ink">{STORE.adres.straat}</p>
              <p>{STORE.adres.voorstad}, {STORE.adres.stad}</p>
              <p>{STORE.adres.land}, {STORE.adres.kode}</p>
            </KaartBlok>

            <KaartBlok titel="Winkelure" Ikoon={Clock}>
              <ul className="divide-y divide-blits-line">
                {STORE.ure.map((u) => (
                  <li key={u.dag} className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-blits-grey">{u.dag}</span>
                    <span className="font-bold text-blits-ink">{u.tyd}</span>
                  </li>
                ))}
              </ul>
            </KaartBlok>

            <KaartBlok titel="Kontakbesonderhede" Ikoon={Phone}>
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
                  <a
                    href={`https://wa.me/${STORE.whatsapp}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-blits-red hover:underline"
                  >
                    <MessageCircle size={14} aria-hidden /> WhatsApp — vinnige navrae &amp; afsprake
                  </a>
                </li>
              </ul>
            </KaartBlok>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${STORE.telefoonSkoon}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blits-red px-4 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark"
              >
                <Phone size={15} /> Skakel nou
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(adresEenReel)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-blits-black px-4 py-3 text-sm font-bold uppercase tracking-wide text-blits-black hover:bg-blits-black hover:text-white"
              >
                <Navigation size={15} /> Wys roete
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-blits-line bg-white shadow-card">
            <iframe
              title={`Kaart na ${STORE.naam}`}
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

function KaartBlok({
  titel,
  Ikoon,
  children,
}: {
  titel: string;
  Ikoon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-blits-line bg-white p-5 shadow-card">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blits-black">
        <Ikoon size={15} className="text-blits-red" aria-hidden /> {titel}
      </h2>
      <div className="text-sm text-blits-grey">{children}</div>
    </div>
  );
}
