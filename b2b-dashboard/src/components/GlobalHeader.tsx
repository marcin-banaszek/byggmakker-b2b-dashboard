"use client"

import * as React from "react"
import { Search, ShoppingCart, User, ChevronDown, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

export function GlobalHeader() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="w-full bg-surface-base-base border-b border-borders-base-base">
      {/* Top Utility Nav */}
      <div className="w-full bg-text-neutral-black text-text-neutral-white">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-2.5 flex text-sm font-medium tracking-wide justify-between hidden md:flex">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <MapPin className="w-3.5 h-3.5" /> {t("findStore", language)}
            </a>
            <span className="text-text-neutral-light">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="w-3.5 h-3.5" /> {t("customerService", language)}
            </a>
            <span className="text-text-neutral-light">|</span>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">{t("forProfessionals", language)}</a>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage("no")}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === "no"
                  ? "bg-text-neutral-white/20 text-text-neutral-white font-semibold"
                  : "text-text-neutral-light hover:text-text-neutral-white hover:bg-text-neutral-white/10 active:bg-text-neutral-white/15"
              }`}
            >
              NO
            </button>
            <span className="text-text-neutral-light">|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === "en"
                  ? "bg-text-neutral-white/20 text-text-neutral-white font-semibold"
                  : "text-text-neutral-light hover:text-text-neutral-white hover:bg-text-neutral-white/10 active:bg-text-neutral-white/15"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-8 h-[72px]">
        
        {/* Logo Area */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-solid-primary-base rounded flex items-center justify-center text-text-neutral-white font-black italic text-xl">
            BM
          </div>
          <span className="text-xl font-bold tracking-tight text-text-neutral-black">Byggmakker</span>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-1 tracking-wide">
          <button className="px-4 py-2 hover:bg-surface-base-hover rounded-md text-sm font-semibold text-text-neutral-base flex items-center gap-1 transition-colors">
            {t("products", language)} <ChevronDown className="w-4 h-4 text-icons-nautral-light" />
          </button>
          <button className="px-4 py-2 bg-surface-primary-base text-solid-primary-base rounded-md text-sm font-semibold flex items-center gap-1 transition-colors">
            {t("projects", language)} <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 hover:bg-surface-base-hover rounded-md text-sm font-semibold text-text-neutral-base flex items-center gap-1 transition-colors">
            {t("services", language)} <ChevronDown className="w-4 h-4 text-icons-nautral-light" />
          </button>
          <button className="px-4 py-2 hover:bg-surface-base-hover rounded-md text-sm font-semibold text-text-neutral-base flex items-center gap-1 transition-colors">
            {t("inspiration", language)} <ChevronDown className="w-4 h-4 text-icons-nautral-light" />
          </button>
        </nav>

        {/* Global Search */}
        <div className="flex-1 max-w-xl relative hidden md:block group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-icons-nautral-light group-focus-within:text-solid-primary-base transition-colors" />
          </div>
          <input 
            type="text" 
            className="w-full bg-surface-base-accent border border-transparent text-sm rounded-md pl-10 pr-4 py-2.5 focus:bg-surface-base-base focus:border-solid-primary-base focus:ring-1 focus:ring-solid-primary-base outline-none transition-all placeholder:text-text-neutral-light"
            placeholder={t("searchPlaceholder", language)}
          />
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <button className="relative p-2 text-icons-nautral-base hover:text-icons-nautral-black transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 lg:-top-1 lg:-right-1 w-5 h-5 bg-solid-primary-base text-text-neutral-white text-xs font-bold leading-none flex items-center justify-center rounded-full border-2 border-surface-base-base">
              3
            </span>
          </button>
          
          <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-borders-base-base">
            <div className="w-10 h-10 rounded-full bg-surface-primary-base text-solid-primary-base flex items-center justify-center font-bold relative">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-neutral-black leading-tight">Lars Hansen</span>
              <span className="text-xs text-text-neutral-light font-medium">Hansen Bygg AS</span>
            </div>
            <ChevronDown className="w-4 h-4 text-icons-nautral-light ml-1" />
          </div>
        </div>
        
      </div>
    </div>
  )
}
