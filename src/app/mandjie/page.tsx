import type { Metadata } from "next";
import MandjieBladsy from "@/components/MandjieBladsy";

export const metadata: Metadata = {
  title: "Winkelmandjie & Betaling",
  description:
    "Jou aanlyn winkelmandjie met BTW-opbreking, kollektering of koerier-aflewering in Pretoria.",
};

export default function Bladsy() {
  return <MandjieBladsy />;
}
