import * as React from "react"
import { SiteHeaderScroll } from "@/components/SiteHeaderScroll"
import { ProjectHeader } from "@/components/ProjectHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

export const metadata = {
  title: "Byggmakker B2B Dashboard",
  description: "Project management dashboard for Byggmakker B2B customers.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="theme-byggmakker min-h-screen bg-surface-base-accent flex flex-col font-sans antialiased text-base">
        <LanguageProvider>
          <SiteHeaderScroll />
          <ProjectHeader />
          
          {/* Page Content injected here */}
          <main className="flex-1 w-full">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  )
}

