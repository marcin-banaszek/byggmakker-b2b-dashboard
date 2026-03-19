import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/docs/Sidebar";
import { Button } from "@kesko/ds-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kesko Design System",
  description: "Documentation for the Kesko multi-brand design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-base-base text-text-neutral-base antialiased min-h-screen flex flex-col`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-borders-base-base bg-surface-base-base/95 backdrop-blur supports-[backdrop-filter]:bg-surface-base-base/60">
          <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 md:px-8">
            <div className="mr-4 flex flex-1">
               <span className="font-bold sm:inline-block">Kesko Elements</span>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <nav className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Figma Variables</Button>
                <Button variant="default" size="sm">GitHub</Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 md:px-8">
          <Sidebar />
          <main className="relative py-6 lg:gap-10 lg:py-8 w-full max-w-4xl mx-auto xl:max-w-5xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
