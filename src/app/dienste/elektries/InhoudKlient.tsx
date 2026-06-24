"use client";

import Link from "next/link";
import { Zap, ScrollText, BadgeCheck, Clock, Trophy, Phone } from "lucide-react";
import DiensBespreking from "@/components/DiensBespreking";
import { STORE } from "@/lib/store-info";
import { useTaal } from "@/lib/taal";

export default function ElektrieseInhoud() {
  const { t } = useTaal();

  const spanne = [
    { naam: t("Span 1 · Huishoudelik", "Team 1 · Residential"),      fokus: t("Huisbedrading, herstelwerk, beligting, kragpunte en foutopsporing.", "House wiring, repair work, lighting, power points and fault finding.") },
    { naam: t("Span 2 · Kommersieel", "Team 2 · Commercial"),         fokus: t("Winkels, kantore en kompleks-installasies volgens kode.", "Shops, offices and complex installations to code.") },
    { naam: t("Span 3 · Spesiaal & Meters", "Team 3 · Special & Meters"), fokus: t("Voorafbetaalde meters, plafonwerk en groter kontrakprojekte.", "Prepaid meters, ceiling work and larger contract projects.") },
  ];

  const waarborge = [
    { Ikoon: Trophy,     titel: t("ECA-geregistreer", "ECA-registered"),           beskrywing: t("Lede van die Electrical Contractors' Association — werk volgens SANS-standaarde.", "Members of the Electrical Contractors' Association — work to SANS standards.") },
    { Ikoon: ScrollText, titel: t("CoC uitgereik", "CoC issued"),                  beskrywing: t("Elektriese sertifikaat van ooreenstemming (CoC) op voltooide werk.", "Certificate of compliance (CoC) on completed work.") },
    { Ikoon: BadgeCheck, titel: t("Gewaarborgde vakmanskap", "Guaranteed workmanship"), beskrywing: t("Ons staan agter elke installasie wat ons span doen.", "We stand behind every installation our team does.") },
    { Ikoon: Clock,      titel: t("Vinnige reaksie", "Fast response"),             beskrywing: t("Plaaslike spanne in die Moot — vinnig op die toneel.", "Local teams in the Moot — quickly on the scene.") },
  ];

  const beloftes = [
    t("Gratis, vrywillige terreinassessering", "Free, no-obligation site assessment"),
    t("Duidelike kwotasie voordat werk begin", "Clear quote before work begins"),
    t("CoC-sertifikaat op voltooiing", "CoC certificate on completion"),
    t("Plaaslike spanne — vinnige reaksietyd", "Local teams — fast response time"),
  ];

  return (
    <>
      <section className="bg-blits-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-blits-amber/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blits-amber">
            <Zap size={13} /> {t("Elektriese Dienste", "Electrical Services")}
          </span>
          <h1 className="mt-3 heading-block text-3xl text-white sm:text-4xl lg:text-5xl">
            {t("Drie gesertifiseerde spanne. Een gerusstelling.", "Three certified teams. One peace of mind.")}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
            {t(
              `Van 'n stukkende kragpunt tot volledige kommersiële installasies — Blits se ECA-gesertifiseerde elektrisiëns lewer gewaarborgde werk vir die Moot-gemeenskap sedert ${STORE.sedert}.`,
              `From a broken power point to complete commercial installations — Blits's ECA-certified electricians deliver guaranteed work for the Moot community since ${STORE.sedert}.`
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#bespreek" className="inline-flex items-center gap-2 rounded-md bg-blits-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
              <Zap size={15} /> {t("Bespreek 'n konsultasie", "Book a consultation")}
            </a>
            <a href={`tel:${STORE.telefoonSkoon}`} className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-white hover:text-blits-black">
              <Phone size={15} /> {STORE.telefoon}
            </a>
          </div>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Ons spanne", "Our teams")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {spanne.map((s) => (
            <div key={s.naam} className="rounded-xl border border-blits-line bg-white p-6 shadow-card">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blits-red text-white">
                <Zap size={22} />
              </div>
              <h3 className="font-bold text-blits-ink">{s.naam}</h3>
              <p className="mt-1 text-sm text-blits-grey">{s.fokus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Hoekom Blits", "Why Blits")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {waarborge.map(({ Ikoon, titel, beskrywing }) => (
              <div key={titel} className="rounded-xl border border-blits-line bg-blits-paper p-5">
                <Ikoon size={28} className="text-blits-red" aria-hidden />
                <h3 className="mt-2 font-bold text-blits-ink">{titel}</h3>
                <p className="mt-1 text-sm text-blits-grey">{beskrywing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bespreek" className="mx-auto max-w-7xl scroll-mt-44 px-4 py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">{t("Bespreek 'n terreinkonsultasie", "Book a site consultation")}</h2>
            <p className="mt-2 text-blits-grey">
              {t("Voltooi die vorm en een van ons spanne kontak jou om 'n besoek te reël. Vir grootmaat-materiaal saam met die werk, vra ook gerus 'n", "Complete the form and one of our teams will contact you to arrange a visit. For bulk materials with the work, also feel free to request a")}{" "}
              <Link href="/kwotasie" className="font-semibold text-blits-red hover:underline">{t("kwotasie", "quote")}</Link>.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-blits-ink">
              {beloftes.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 shrink-0 text-blits-red" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-blits-line bg-white p-6 shadow-card">
            <DiensBespreking />
          </div>
        </div>
      </section>
    </>
  );
}
