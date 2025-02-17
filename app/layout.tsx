import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { MainNav } from "@/components/ui/main-nav";
import { Metadata } from "next";
import { metadata as meta } from "./metadata";
import { Providers } from "./providers";
import { TransactionModal } from "@/components/reusable/TransactionModal";
import { Suspense } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", roboto.className)}
      >
        <Providers>
          <main className="flex flex-col min-h-screen items-center">
            <Suspense>
              <div className="flex relative max-w-screen-md w-full justify-start box-border pt-8">
                <MainNav className="mx-4 flex-1 max-w-screen-md" />
              </div>
              {children}
              <Footer />
            </Suspense>
          </main>
          <TransactionModal />
        </Providers>
      </body>
    </html>
  );
}
