import "@ascnd-gg/ui/globals.css";
import type { Metadata } from "next";
import Providers from "../components/providers/providers";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { UsernameDialog } from "../components/dialogs/username-dialog";
import CustomToaster from "../components/layout/custom-toaster";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ascnd GG",
  description: "Ascnd GG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`bg-background flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <Header />
          <main className="container flex min-h-[calc(100vh-96px)] flex-1 flex-col justify-center gap-8 md:min-h-0">
            {children}
          </main>
          <Footer />
          <UsernameDialog />
          <Suspense>
            <CustomToaster />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
