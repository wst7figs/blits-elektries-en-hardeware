"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Taal = "af" | "en";

interface TaalKonteks {
  taal: Taal;
  stelTaal: (t: Taal) => void;
  t: (af: string, en: string) => string;
}

const Konteks = createContext<TaalKonteks>({
  taal: "af",
  stelTaal: () => {},
  t: (af) => af,
});

export function TaalVerskaffer({ children }: { children: ReactNode }) {
  const [taal, stelTaal] = useState<Taal>("af");
  const t = (af: string, en: string) => (taal === "en" ? en : af);
  return (
    <Konteks.Provider value={{ taal, stelTaal, t }}>
      {children}
    </Konteks.Provider>
  );
}

export const useTaal = () => useContext(Konteks);
