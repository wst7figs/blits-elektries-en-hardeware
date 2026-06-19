# Blits Elektries en Hardeware — E-handel Werf

Produksie-gereed e-handelswerf vir **Blits Elektries en Hardeware** (Villieria, Pretoria) — &apos;n
familiebestuurde hardeware-winkel en elektriese kontrakteur wat die Moot sedert 1970 bedien.

Die werf is **in Afrikaans** met &apos;n industrieel-professionele rooi/swart/wit palet.

## Tegnologie

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (industriële temastelsel in `globals.css`)
- **Zustand** met `persist` → mandjie & kwotasie-mandjie bly in `localStorage`

## Begin

```bash
npm install
npm run dev      # ontwikkeling op http://localhost:3000
npm run build    # produksie-bou
npm run start    # bedien die produksie-bou
```

## Bladsye / roetes

| Roete | Beskrywing |
|-------|------------|
| `/` | Tuisblad — heritage-hero, dubbele roetes (koop vs. kwotasie), dienste, kategorieë, topverkopers |
| `/winkel` | Produkkatalogus — filter per kategorie, soek, sorteer, "laai meer" paginasie |
| `/kwotasie` | Kwotasie-enjin ("Kry &apos;n Kwotasie") — vorm + kwotasie-mandjie |
| `/mandjie` | Aanlyn winkelmandjie + betaling (15% BTW-opbreking, kollekteer/koerier) |
| `/dienste/elektries` | Elektriese dienste — 3 ECA-spanne + terreinkonsultasie-bespreking |
| `/kontak` | Ligging, ure, kontak, ingebedde kaart |

## Struktuur

```
src/
├── app/                  # roetes (App Router)
├── components/           # Header, Footer, ProductCard, katalogus, mandjie, vorms
└── lib/
    ├── store-info.ts     # sentrale besigheidsinligting (adres, ure, tel.)
    ├── products.ts       # mock-katalogus (6 kategorieë, ZAR-pryse, SKU's)
    ├── format.ts         # Rand-formaat + BTW-berekening
    └── winkelmandjie.ts  # Zustand-winkel (mandjie + kwotasie)
```

## Volgende stappe vir regte produksie

- Vervang mock-katalogus (`src/lib/products.ts`) met &apos;n regte produk-API / CMS.
- Koppel &apos;n betaalpoort (bv. PayFast / Yoco) en koerier-API in `/mandjie`.
- Stuur kwotasie- en bespreking-vorms na &apos;n backend / e-pos (tans demonstrasie).
- Voeg regte produkfoto&apos;s by (huidige kaarte gebruik vinnige gradiënt-plekhouers).
