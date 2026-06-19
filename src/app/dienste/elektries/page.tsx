import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ScrollText, BadgeCheck, Clock, Trophy, Phone } from "lucide-react";
import DiensBespreking from "@/components/DiensBespreking";
import { STORE } from "@/lib/store-info";

export const metadata: Metadata = {
  title: "Elektriese Dienste & Kontrakteurswerk",
  description:
    "Drie ECA-gesertifiseerde elektriese spanne vir huishoudelike en kommersiële werk in Pretoria — gewaarborgde vakmanskap en voorafbetaalde meter-installasies.",
};

const SPANNE = [
  { naam: "Span 1 · Huishoudelik", fokus: "Huisbedrading, herstelwerk, beligting, kragpunte en foutopsporing." },
  { naam: "Span 2 · Kommersieel",  fokus: "Winkels, kantore en kompleks-installasies volgens kode." },
  { naam: "Span 3 · Spesiaal & Meters", fokus: "Voorafbetaalde meters, plafonwerk en groter kontrakprojekte." },
];

const WAARBORGE = [
  { Ikoon: Trophy,     titel: "ECA-geregistreer",        beskrywing: "Lede van die Electrical Contractors' Association — werk volgens SANS-standaarde." },
  { Ikoon: ScrollText, titel: "CoC uitgereik",           beskrywing: "Elektriese sertifikaat van ooreenstemming (CoC) op voltooide werk." },
  { Ikoon: BadgeCheck, titel: "Gewaarborgde vakmanskap", beskrywing: "Ons staan agter elke installasie wat ons span doen." },
  { Ikoon: Clock,      titel: "Vinnige reaksie",         beskrywing: "Plaaslike spanne in die Moot — vinnig op die toneel." },
];

const BELOFTES = [
  "Gratis, vrywillige terreinassessering",
  "Duidelike kwotasie voordat werk begin",
  "CoC-sertifikaat op voltooiing",
  "Plaaslike spanne — vinnige reaksietyd",
];

export default function ElektriesePage() {
  return (
    <>
      <section className="bg-blits-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-blits-amber/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blits-amber">
            <Zap size={13} /> Elektriese Dienste
          </span>
          <h1 className="mt-3 heading-block text-3xl text-white sm:text-4xl lg:text-5xl">
            Drie gesertifiseerde spanne. Een gerusstelling.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
            Van &apos;n stukkende kragpunt tot volledige kommersiële installasies —
            Blits se ECA-gesertifiseerde elektrisiëns lewer gewaarborgde werk vir
            die Moot-gemeenskap sedert {STORE.sedert}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#bespreek" className="inline-flex items-center gap-2 rounded-md bg-blits-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-blits-red-dark">
              <Zap size={15} /> Bespreek &apos;n konsultasie
            </a>
            <a href={`tel:${STORE.telefoonSkoon}`} className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-white hover:text-blits-black">
              <Phone size={15} /> {STORE.telefoon}
            </a>
          </div>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">Ons spanne</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SPANNE.map((s) => (
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
          <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">Hoekom Blits</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WAARBORGE.map(({ Ikoon, titel, beskrywing }) => (
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
            <h2 className="heading-block text-2xl text-blits-black sm:text-3xl">Bespreek &apos;n terreinkonsultasie</h2>
            <p className="mt-2 text-blits-grey">
              Voltooi die vorm en een van ons spanne kontak jou om &apos;n besoek te reël. Vir grootmaat-materiaal saam met die werk, vra ook gerus &apos;n{" "}
              <Link href="/kwotasie" className="font-semibold text-blits-red hover:underline">kwotasie</Link>.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-blits-ink">
              {BELOFTES.map((p) => (
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
