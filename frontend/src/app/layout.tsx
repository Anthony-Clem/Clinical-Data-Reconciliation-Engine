import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinical System",
  description: "Data Reconciliation Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("font-sans h-full overflow-hidden", inter.variable)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 antialiased h-full overflow-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
