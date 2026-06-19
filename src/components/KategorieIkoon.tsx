import { Zap, Wrench, Layers, Palette, Droplets, Flame } from "lucide-react";
import type { KategorieSleutel } from "@/lib/products";

const IKONE: Record<KategorieSleutel, React.ElementType> = {
  elektries: Zap,
  hardeware: Wrench,
  konstruksie: Layers,
  verf: Palette,
  loodgieter: Droplets,
  gas: Flame,
};

export default function KategorieIkoon({
  kategorie,
  size = 20,
  className = "",
}: {
  kategorie: KategorieSleutel;
  size?: number;
  className?: string;
}) {
  const Ikoon = IKONE[kategorie];
  return <Ikoon size={size} className={className} aria-hidden />;
}
