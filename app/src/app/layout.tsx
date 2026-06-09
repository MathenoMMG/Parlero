import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppInitializer } from "../components/AppInitializer";

export const metadata: Metadata = {
  title: "Parleró — Studio CLA Italiano A2 PoliTo",
  description: "Webapp mobile per lo studio della lingua italiana A2 (CLA - Politecnico di Torino) basata su Dieci A2.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full bg-background flex justify-center items-start overflow-y-auto">
        {/* Frame container to simulate mobile app on desktop */}
        <div className="w-full max-w-[430px] min-h-screen bg-surface flex flex-col relative shadow-2xl border-x border-border/30">
          <AppInitializer>
            {children}
          </AppInitializer>
        </div>
      </body>
    </html>
  );
}

