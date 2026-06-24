import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STORE, adresEenReel } from "@/lib/store-info";

export const metadata: Metadata = {
  title: {
    default: `${STORE.naam} | ${STORE.slagspreuk}`,
    template: `%s | ${STORE.naam}`,
  },
  description: `${STORE.naam} — ${STORE.slagspreuk}. Aanlyn hardeware-winkel, elektriese kontrakteurswerk, verfmenging, sleutelsny en LP-gas hervullings in ${STORE.adres.voorstad}, Pretoria. Bedien die Moot sedert ${STORE.sedert}.`,
  keywords: [
    "hardeware Pretoria",
    "elektrisiën Villieria",
    "Blits Elektries",
    "LP gas hervulling Moot",
    "verfmenging",
    "ECA elektriese kontrakteur",
  ],
  openGraph: {
    title: STORE.naam,
    description: STORE.slagspreuk,
    locale: "af_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="af">
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Blits Handyman klets-widget */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a3bc3285ccb4c81af5fc70b"
          strategy="lazyOnload"
        />
        {/* Plaaslike SEO: gestruktureerde data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HardwareStore",
              name: STORE.naam,
              telephone: STORE.telefoon,
              email: STORE.epos,
              address: {
                "@type": "PostalAddress",
                streetAddress: STORE.adres.straat,
                addressLocality: STORE.adres.voorstad,
                addressRegion: "Gauteng",
                postalCode: STORE.adres.kode,
                addressCountry: "ZA",
              },
              description: adresEenReel,
              foundingDate: String(STORE.sedert),
            }),
          }}
        />
      </body>
    </html>
  );
}
