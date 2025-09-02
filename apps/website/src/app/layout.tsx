import "@ascnd-gg/ui/globals.css";
import type { Metadata } from "next";
import Providers from "../components/providers/providers";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

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
          <main className="container flex flex-1 flex-col items-center justify-center gap-8 border border-blue-500">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
