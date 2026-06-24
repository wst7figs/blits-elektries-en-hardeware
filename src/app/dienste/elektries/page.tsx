import type { Metadata } from "next";
import ElektrieseInhoud from "./InhoudKlient";

export const metadata: Metadata = {
  title: "Elektriese Dienste & Kontrakteurswerk",
  description:
    "Drie ECA-gesertifiseerde elektriese spanne vir huishoudelike en kommersiële werk in Pretoria — gewaarborgde vakmanskap en voorafbetaalde meter-installasies.",
};

export default function ElektriesePage() {
  return <ElektrieseInhoud />;
}
