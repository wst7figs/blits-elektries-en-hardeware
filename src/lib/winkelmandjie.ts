"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Produk } from "./products";

export interface MandjieItem {
  produk: Produk;
  hoeveelheid: number;
}

export interface KwotasieItem {
  produk: Produk;
  hoeveelheid: number;
}

interface MandjieState {
  // Aanlyn winkelmandjie (retail-aankope)
  mandjie: MandjieItem[];
  // Kwotasie-mandjie (vir items wat 'n kwotasie benodig / pasgemaakte volumes)
  kwotasie: KwotasieItem[];

  voegByMandjie: (produk: Produk, hoeveelheid?: number) => void;
  stelMandjieHoeveelheid: (id: string, hoeveelheid: number) => void;
  verwyderUitMandjie: (id: string) => void;
  maakMandjieLeeg: () => void;

  voegByKwotasie: (produk: Produk, hoeveelheid?: number) => void;
  stelKwotasieHoeveelheid: (id: string, hoeveelheid: number) => void;
  verwyderUitKwotasie: (id: string) => void;
  maakKwotasieLeeg: () => void;
}

export const useMandjie = create<MandjieState>()(
  persist(
    (set) => ({
      mandjie: [],
      kwotasie: [],

      voegByMandjie: (produk, hoeveelheid = 1) =>
        set((s) => {
          const bestaande = s.mandjie.find((i) => i.produk.id === produk.id);
          if (bestaande) {
            return {
              mandjie: s.mandjie.map((i) =>
                i.produk.id === produk.id
                  ? { ...i, hoeveelheid: i.hoeveelheid + hoeveelheid }
                  : i,
              ),
            };
          }
          return { mandjie: [...s.mandjie, { produk, hoeveelheid }] };
        }),

      stelMandjieHoeveelheid: (id, hoeveelheid) =>
        set((s) => ({
          mandjie:
            hoeveelheid <= 0
              ? s.mandjie.filter((i) => i.produk.id !== id)
              : s.mandjie.map((i) =>
                  i.produk.id === id ? { ...i, hoeveelheid } : i,
                ),
        })),

      verwyderUitMandjie: (id) =>
        set((s) => ({ mandjie: s.mandjie.filter((i) => i.produk.id !== id) })),

      maakMandjieLeeg: () => set({ mandjie: [] }),

      voegByKwotasie: (produk, hoeveelheid = 1) =>
        set((s) => {
          const bestaande = s.kwotasie.find((i) => i.produk.id === produk.id);
          if (bestaande) {
            return {
              kwotasie: s.kwotasie.map((i) =>
                i.produk.id === produk.id
                  ? { ...i, hoeveelheid: i.hoeveelheid + hoeveelheid }
                  : i,
              ),
            };
          }
          return { kwotasie: [...s.kwotasie, { produk, hoeveelheid }] };
        }),

      stelKwotasieHoeveelheid: (id, hoeveelheid) =>
        set((s) => ({
          kwotasie:
            hoeveelheid <= 0
              ? s.kwotasie.filter((i) => i.produk.id !== id)
              : s.kwotasie.map((i) =>
                  i.produk.id === id ? { ...i, hoeveelheid } : i,
                ),
        })),

      verwyderUitKwotasie: (id) =>
        set((s) => ({
          kwotasie: s.kwotasie.filter((i) => i.produk.id !== id),
        })),

      maakKwotasieLeeg: () => set({ kwotasie: [] }),
    }),
    { name: "blits-mandjie-v1" },
  ),
);

/** Veilige hidrasie-helper sodat SSR nie met localStorage bots nie. */
export const mandjieTotaalItems = (items: { hoeveelheid: number }[]) =>
  items.reduce((som, i) => som + i.hoeveelheid, 0);

export const mandjieTotaalRand = (items: MandjieItem[]) =>
  items.reduce((som, i) => som + i.produk.prys * i.hoeveelheid, 0);
