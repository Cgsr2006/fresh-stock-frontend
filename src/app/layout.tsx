import type { Metadata } from "next";
import { Tinos, Arimo } from "next/font/google";
import "./globals.scss";

export const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tinos",
  display: "swap",
});

export const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fresh Stock",
  description: "Welcome to Fresh Stock!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${tinos.variable} ${arimo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
