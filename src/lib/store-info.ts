/**
 * Sentrale besigheidsinligting vir Blits Elektries en Hardeware.
 * Word reg deur die werf gebruik sodat kontakbesonderhede op een plek bly.
 */
export const STORE = {
  naam: "Blits Elektries en Hardeware",
  slagspreuk: "Die Moot se gunsteling elektrisiën en hardeware winkel",
  sedert: 1970,
  telefoon: "012 332 1815",
  telefoonSkoon: "0123321815",
  whatsapp: "27123321815",
  epos: "info@blitspta.co.za",
  adres: {
    straat: "800 34ste Laan, h/v Cunningham",
    voorstad: "Villieria",
    stad: "Pretoria",
    land: "Suid-Afrika",
    kode: "0186",
  },
  ure: [
    { dag: "Maandag – Vrydag", tyd: "07:00 – 18:00" },
    { dag: "Saterdag", tyd: "08:00 – 15:00" },
    { dag: "Sondag & Openbare Vakansiedae", tyd: "Gesluit" },
  ],
  btwKoers: 0.15,
} as const;

export const adresEenReel = `${STORE.adres.straat}, ${STORE.adres.voorstad}, ${STORE.adres.stad}`;
