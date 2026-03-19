"use client"

import * as React from "react"

export type Language = "no" | "en"

const LanguageContext = React.createContext<{
  language: Language
  setLanguage: (lang: Language) => void
}>({ language: "no", setLanguage: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("no")
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return React.useContext(LanguageContext)
}
