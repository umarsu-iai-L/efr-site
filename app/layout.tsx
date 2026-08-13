import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import SpaceParticles from "./components/SpaceParticles";

const urbanist = localFont({
  src: [
    {
      path: "../public/urbanist-var.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/urbanist-italic.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "EFR - Next-Generation Facial Recognition for Security",
  description:
    "EFR delivers cutting-edge biometric facial recognition solutions to enhance security, streamline services, and revolutionize industries.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} relative min-h-screen antialiased`}>
        <SpaceParticles />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <PageTransition />
      </body>
    </html>
  );
}
