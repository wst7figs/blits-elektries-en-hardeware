import { Suspense } from "react";
import type { Metadata } from "next";
import WinkelKatalogus from "@/components/WinkelKatalogus";

export const metadata: Metadata = {
  title: "Aanlyn Winkel",
  description:
    "Blaai deur ons hardeware-, elektriese-, konstruksie-, verf-, loodgieter- en gasprodukte. Pryse in Rand, BTW ingesluit.",
};

export default function WinkelBladsy() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-blits-grey">
          Laai winkel…
        </div>
      }
    >
      <WinkelKatalogus />
    </Suspense>
  );
}
