export type KategorieSleutel =
  | "elektries"
  | "hardeware"
  | "konstruksie"
  | "verf"
  | "loodgieter"
  | "gas";

export interface Kategorie {
  sleutel: KategorieSleutel;
  naam: string;
  beskrywing: string;
  ikoon: string; // emoji as ligte, vinnige plekhouer-ikoon
}

export interface Produk {
  id: string;
  sku: string;
  naam: string;
  kategorie: KategorieSleutel;
  handelsmerk: string;
  prys: number; // BTW-ingesluit, in ZAR
  voorraad: boolean;
  topverkoper?: boolean;
  beskrywing: string;
}

export const KATEGORIEE: Kategorie[] = [
  {
    sleutel: "elektries",
    naam: "Elektries",
    beskrywing: "Kabels, kragpunte, beligting, kragpaneel-toebehore en voorafbetaalde meters.",
    ikoon: "⚡",
  },
  {
    sleutel: "hardeware",
    naam: "Hardeware",
    beskrywing: "Skroewe, boute, slotte, skarniere en alledaagse hardewareware.",
    ikoon: "🔩",
  },
  {
    sleutel: "konstruksie",
    naam: "Konstruksie & DHS",
    beskrywing: "Sement, gips, hout en alles vir die doen-dit-self projek.",
    ikoon: "🧱",
  },
  {
    sleutel: "verf",
    naam: "Verf & Gereedskap",
    beskrywing: "Verfmenging op bestelling, kwaste, rollers en kragtoerusting.",
    ikoon: "🎨",
  },
  {
    sleutel: "loodgieter",
    naam: "Loodgieter",
    beskrywing: "Pype, koppelstukke, krane en geyser-toebehore.",
    ikoon: "🚰",
  },
  {
    sleutel: "gas",
    naam: "Gasprodukte",
    beskrywing: "LP-gas hervullings, reguleerders, pype en gastoestelle.",
    ikoon: "🔥",
  },
];

export const kategorieNaam = (s: KategorieSleutel) =>
  KATEGORIEE.find((k) => k.sleutel === s)?.naam ?? s;

/** Mock-katalogus — verteenwoordigend van 'n tipiese SA hardeware-winkel se rakke. */
export const PRODUKTE: Produk[] = [
  // ── Elektries ──
  { id: "e1", sku: "EL-CAB-25", naam: "Surfix Kabel 2.5mm² (per meter)", kategorie: "elektries", handelsmerk: "Aberdare", prys: 18.5, voorraad: true, topverkoper: true, beskrywing: "Twin & earth surfix kabel vir huishoudelike bedrading." },
  { id: "e2", sku: "EL-DB-8W", naam: "Verdeelbord 8-Weg Oppervlak", kategorie: "elektries", handelsmerk: "CBI", prys: 489.0, voorraad: true, beskrywing: "8-weg verdeelbord met hoofskakelaar, SABS goedgekeur." },
  { id: "e3", sku: "EL-PLUG-16", naam: "Muurprop 16A Enkel met Skakelaar", kategorie: "elektries", handelsmerk: "Crabtree", prys: 129.9, voorraad: true, topverkoper: true, beskrywing: "Wit enkel kragpunt, 4x4 met skakelaar." },
  { id: "e4", sku: "EL-LED-9W", naam: "LED Gloeilamp 9W B22 (Koel Wit)", kategorie: "elektries", handelsmerk: "Eurolux", prys: 39.95, voorraad: true, beskrywing: "Energiebesparende LED-lamp, 6500K, 806 lumen." },
  { id: "e5", sku: "EL-PPM-STS6", naam: "Voorafbetaalde Meter STS (Enkele Fase)", kategorie: "elektries", handelsmerk: "Conlog", prys: 1899.0, voorraad: false, beskrywing: "STS-voldoende voorafbetaalde kragmeter — installasie aanbeveel." },
  { id: "e6", sku: "EL-EXT-10", naam: "Verlengkoord 10m 3-Punt", kategorie: "elektries", handelsmerk: "Waco", prys: 219.0, voorraad: true, beskrywing: "Swaardiens verlengkoord met oorlading-beskerming." },
  { id: "e7", sku: "EL-EARTH-LK", naam: "Aardlek-eenheid 30mA 2-Pool", kategorie: "elektries", handelsmerk: "CBI", prys: 349.0, voorraad: true, beskrywing: "Aardlek-beskermingseenheid vir verdeelbord." },
  { id: "e8", sku: "EL-FLOOD-30", naam: "LED Spuitlig 30W met Sensor", kategorie: "elektries", handelsmerk: "Eurolux", prys: 279.0, voorraad: true, beskrywing: "Buitemuur spuitlig met PIR bewegingsensor." },

  // ── Hardeware ──
  { id: "h1", sku: "HW-SCR-4X40", naam: "Spaanplaatskroewe 4x40mm (200 pak)", kategorie: "hardeware", handelsmerk: "Vermeer", prys: 89.9, voorraad: true, topverkoper: true, beskrywing: "Gegalvaniseerde spaanplaatskroewe, Pozi-kop." },
  { id: "h2", sku: "HW-HINGE-100", naam: "Skarnier 100mm Vlinder (Paar)", kategorie: "hardeware", handelsmerk: "Yale", prys: 64.5, voorraad: true, beskrywing: "Vlekvrye staal skarniere vir binnedeure." },
  { id: "h3", sku: "HW-PAD-50", naam: "Hangslot 50mm Gehard", kategorie: "hardeware", handelsmerk: "Yale", prys: 149.0, voorraad: true, beskrywing: "Geharde staal hangslot met 3 sleutels." },
  { id: "h4", sku: "HW-CHAIN-6", naam: "Kettingdraad 6mm (per meter)", kategorie: "hardeware", handelsmerk: "Generies", prys: 32.0, voorraad: true, beskrywing: "Gegalvaniseerde ketting, verkoop per meter." },
  { id: "h5", sku: "HW-LOCK-3L", naam: "3-Hefboom Insteekslot", kategorie: "hardeware", handelsmerk: "Union", prys: 219.0, voorraad: true, beskrywing: "Insteekslot vir houtdeure, SABS goedgekeur." },
  { id: "h6", sku: "HW-TAPE-PTFE", naam: "PTFE Verseëlband (Wit)", kategorie: "hardeware", handelsmerk: "Generies", prys: 9.95, voorraad: true, beskrywing: "Draadverseëlband vir loodgieterswerk." },

  // ── Konstruksie & DHS ──
  { id: "c1", sku: "CN-CEM-50", naam: "Sement PPC 50kg Sak", kategorie: "konstruksie", handelsmerk: "PPC", prys: 119.0, voorraad: true, topverkoper: true, beskrywing: "CEM II 32.5N algemene-doel sement." },
  { id: "c2", sku: "CN-RIVER-40", naam: "Riviersand 40kg Sak", kategorie: "konstruksie", handelsmerk: "Generies", prys: 49.0, voorraad: true, beskrywing: "Gewaste riviersand vir messelwerk en pleister." },
  { id: "c3", sku: "CN-BRICK-CLAY", naam: "Stockbaksteen (per 100)", kategorie: "konstruksie", handelsmerk: "Generies", prys: 365.0, voorraad: true, beskrywing: "Standaard kleisteen, NHBRC voldoende." },
  { id: "c4", sku: "CN-PLAS-25", naam: "Gipspleister 25kg", kategorie: "konstruksie", handelsmerk: "Cretestone", prys: 139.0, voorraad: false, beskrywing: "Binnemuur gipspleister vir gladde afwerking." },
  { id: "c5", sku: "CN-RHEEM-38", naam: "Rheinzink Plafonboard 6.4mm", kategorie: "konstruksie", handelsmerk: "Gyproc", prys: 189.0, voorraad: true, beskrywing: "Gipsplafonbord, 3.0m x 1.2m vel." },
  { id: "c6", sku: "CN-PINE-38", naam: "Greinhout Plank 38x38mm (per meter)", kategorie: "konstruksie", handelsmerk: "Generies", prys: 28.5, voorraad: true, beskrywing: "Gedroogde grenehout, geskaaf." },

  // ── Verf & Gereedskap ──
  { id: "v1", sku: "VF-PVA-20", naam: "PVA Muurverf 20L (Wit)", kategorie: "verf", handelsmerk: "Dulux", prys: 749.0, voorraad: true, topverkoper: true, beskrywing: "Binnemuur PVA — vra ons oor kleurmenging op bestelling." },
  { id: "v2", sku: "VF-ENAM-5", naam: "Emaljeverf 5L (Hoogglans)", kategorie: "verf", handelsmerk: "Plascon", prys: 689.0, voorraad: true, beskrywing: "Universele emaljeverf vir hout en metaal." },
  { id: "v3", sku: "VF-BRUSH-75", naam: "Verfkwas 75mm", kategorie: "verf", handelsmerk: "Harris", prys: 79.9, voorraad: true, beskrywing: "Sintetiese vesel kwas vir glad afwerking." },
  { id: "v4", sku: "VF-ROLL-230", naam: "Rollerstel 230mm met Bak", kategorie: "verf", handelsmerk: "Academy", prys: 119.0, voorraad: true, beskrywing: "Verfrollerstel met handvatsel en bak." },
  { id: "v5", sku: "VF-DRILL-650", naam: "Slagboor 650W", kategorie: "verf", handelsmerk: "Ingco", prys: 649.0, voorraad: true, topverkoper: true, beskrywing: "13mm slagboor met snelheidsbeheer — Ingco." },
  { id: "v6", sku: "VF-GRIND-115", naam: "Hoekslyper 115mm 750W", kategorie: "verf", handelsmerk: "Ingco", prys: 549.0, voorraad: true, beskrywing: "Kompakte hoekslyper vir sny en slyp." },

  // ── Loodgieter ──
  { id: "l1", sku: "LG-PVC-110", naam: "PVC Rioolpyp 110mm (per 6m)", kategorie: "loodgieter", handelsmerk: "Marley", prys: 389.0, voorraad: true, beskrywing: "Swaar-diens rioolpyp, SABS gemerk." },
  { id: "l2", sku: "LG-TAP-MX", naam: "Mengkraan Wastafel Chroom", kategorie: "loodgieter", handelsmerk: "Cobra", prys: 549.0, voorraad: true, topverkoper: true, beskrywing: "Enkelhefboom mengkraan, 5 jaar waarborg." },
  { id: "l3", sku: "LG-GEY-150", naam: "Geyser-element 2kW (Universeel)", kategorie: "loodgieter", handelsmerk: "Kwikot", prys: 219.0, voorraad: true, beskrywing: "Vervangingselement vir 150L geyser." },
  { id: "l4", sku: "LG-FLEX-15", naam: "Buigpyp 15mm x 600mm", kategorie: "loodgieter", handelsmerk: "Cobra", prys: 89.0, voorraad: true, beskrywing: "Vlekvrye staal gevlegte verbindingspyp." },
  { id: "l5", sku: "LG-TRAP-40", naam: "Bottelstrik 40mm", kategorie: "loodgieter", handelsmerk: "Marley", prys: 69.9, voorraad: false, beskrywing: "PVC bottelstrik vir wasbak afvoer." },

  // ── Gasprodukte ──
  { id: "g1", sku: "GS-REF-9", naam: "LP-Gas Hervulling 9kg", kategorie: "gas", handelsmerk: "Afrox / Totalgaz", prys: 399.0, voorraad: true, topverkoper: true, beskrywing: "9kg gasbottel hervulling — bring jou leë bottel in." },
  { id: "g2", sku: "GS-REF-19", naam: "LP-Gas Hervulling 19kg", kategorie: "gas", handelsmerk: "Afrox / Totalgaz", prys: 799.0, voorraad: true, beskrywing: "19kg gasbottel hervulling vir groter verbruik." },
  { id: "g3", sku: "GS-REG-LP", naam: "Gasreguleerder Laagdruk", kategorie: "gas", handelsmerk: "Cadac", prys: 159.0, voorraad: true, beskrywing: "Laagdruk reguleerder met klembeslag." },
  { id: "g4", sku: "GS-HOSE-2M", naam: "Gaspyp 2m met Klemme", kategorie: "gas", handelsmerk: "Cadac", prys: 119.0, voorraad: true, beskrywing: "SABS gemerkte gaspyp met twee slangklemme." },
  { id: "g5", sku: "GS-2PLATE", naam: "Gasstofie 2-Plaat Tafel", kategorie: "gas", handelsmerk: "Totai", prys: 749.0, voorraad: true, beskrywing: "2-plaat gasstofie met veiligheidsklep." },
];

export const topVerkopers = () => PRODUKTE.filter((p) => p.topverkoper);
