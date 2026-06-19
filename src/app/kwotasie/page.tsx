import type { Metadata } from "next";
import KwotasieBladsy from "@/components/KwotasieBladsy";

export const metadata: Metadata = {
  title: "Kry 'n Kwotasie",
  description:
    "Vra 'n pasgemaakte kwotasie aan vir grootmaat-hardeware, elektriese kontrakteurswerk, loodgieter- of konstruksieprojekte. 24-uur terugvoer.",
};

export default function Bladsy() {
  return <KwotasieBladsy />;
}
