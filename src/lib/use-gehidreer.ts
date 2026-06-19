"use client";

import { useEffect, useState } from "react";

/**
 * Keer hidrasie-wanverhoudings: gee `false` tydens SSR/eerste-render en
 * `true` sodra die kliënt gehidreer is. Gebruik om localStorage-afhanklike
 * waardes (mandjie-tellings) eers ná hidrasie te wys.
 */
export function useGehidreer() {
  const [gehidreer, stel] = useState(false);
  useEffect(() => stel(true), []);
  return gehidreer;
}
