import { STORE } from "./store-info";

/** Formateer 'n bedrag as Suid-Afrikaanse Rand, bv. R1 299,00 */
export function randFormaat(bedrag: number): string {
  return new Intl.NumberFormat("af-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(bedrag);
}

/** Breek 'n BTW-insluitende prys op in netto + BTW. Pryse word BTW-ingesluit gewys (SA standaard). */
export function btwOpbreek(btwIngeslote: number) {
  const netto = btwIngeslote / (1 + STORE.btwKoers);
  const btw = btwIngeslote - netto;
  return { netto, btw };
}
