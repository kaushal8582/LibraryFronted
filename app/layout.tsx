import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast";
import AppInitializer from "@/components/AppInitializer";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LibTrack - Library Management",
  description: "Manage your library, students, payments, and reminders",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>
          <AppInitializer>{children}</AppInitializer>
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
        </Providers>
      </body>
    </html>
  );
}
