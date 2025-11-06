import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast"; // <-- import Toaster

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LibTrack - Library Management",
  description: "Manage your library, students, payments, and reminders",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "14px",
              borderRadius: "8px",
            },
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
