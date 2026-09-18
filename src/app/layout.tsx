import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.scss";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // opcional
});

export const metadata: Metadata = {
  title: "Fresh Stock",
  description: "Welcome to Fresh Stock!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.className}>
      <body>{children}</body>
    </html>
  );
}
