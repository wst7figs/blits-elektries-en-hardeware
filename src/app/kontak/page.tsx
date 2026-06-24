import type { Metadata } from "next";
import { STORE, adresEenReel } from "@/lib/store-info";
import KontakInhoud from "./InhoudKlient";

export const metadata: Metadata = {
  title: "Kontak & Ligging",
  description: `Besoek Blits Elektries en Hardeware by ${adresEenReel}. Oop Ma–Vr 07:00–18:00, Sa 08:00–15:00. Skakel ${STORE.telefoon}.`,
};

export default function KontakPage() {
  return <KontakInhoud />;
}
