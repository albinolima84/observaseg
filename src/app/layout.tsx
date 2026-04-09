import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anuário Segurança Pública — Dados e Insights",
    template: "%s · Anuário Segurança Pública",
  },
  description:
    "Visualizações interativas dos dados do Anuário Brasileiro de Segurança Pública. " +
    "Fonte: Fórum Brasileiro de Segurança Pública.",
  openGraph: {
    siteName: "Anuário Segurança Pública",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
