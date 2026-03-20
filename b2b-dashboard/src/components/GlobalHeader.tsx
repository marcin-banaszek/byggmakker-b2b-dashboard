"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, User, ChevronDown, Menu, Store, Tag, HardHat, Wrench } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"
import { BYGGMAKKER_LOGO_SRC, LAYOUT_SHELL_CLASS, byggmakkerUrl } from "@/lib/layout"

/** Grey search / logo row — always visible (used inside fixed header shell). */
export function GlobalHeaderPrimary() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="w-full border-b border-borders-base-base bg-[#e9eff2] py-4">
      <div className={`${LAYOUT_SHELL_CLASS} py-0 flex flex-wrap items-center gap-4 lg:gap-6`}>
        <Link href={byggmakkerUrl("/")} className="flex-shrink-0 flex items-center" target="_blank" rel="noopener noreferrer">
          <Image
            src={BYGGMAKKER_LOGO_SRC}
            alt="Byggmakker"
            width={200}
            height={40}
            className="h-8 sm:h-9 w-auto"
            priority
          />
        </Link>

        <div className="flex-1 min-w-[200px] order-3 lg:order-none w-full lg:w-auto">
          <div className="relative group max-w-xl lg:max-w-none lg:mx-0">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-icons-nautral-light group-focus-within:text-solid-primary-base transition-colors" />
            </div>
            <input
              type="search"
              readOnly
              onFocus={(e) => {
                e.target.blur()
                window.open(byggmakkerUrl("/"), "_blank", "noopener,noreferrer")
              }}
              className="w-full bg-white border border-borders-base-base text-sm font-normal rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-solid-primary-base focus:ring-offset-1 cursor-pointer placeholder:text-text-neutral-light"
              placeholder={t("searchRetailPlaceholder", language)}
              aria-label={t("searchRetailPlaceholder", language)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto flex-shrink-0 flex-wrap justify-end">
          <a
            href={byggmakkerUrl("/login")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <User className="w-6 h-6 text-solid-primary-base" aria-hidden />
            <span className="hidden sm:inline">{t("minSide", language)}</span>
          </a>
          <a
            href={byggmakkerUrl("/handlekurv")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <span className="relative inline-flex shrink-0">
              <ShoppingCart className="w-6 h-6 text-solid-primary-base" aria-hidden />
              <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 bg-solid-primary-base text-text-neutral-white text-sm font-bold leading-none flex items-center justify-center rounded-full border-2 border-[#e9eff2]">
                3
              </span>
            </span>
            <span className="hidden sm:inline">{t("shoppingCartHeader", language)}</span>
          </a>
          <div
            className="flex items-center gap-0.5 border-l border-borders-base-base pl-3 sm:pl-4 ml-0 sm:ml-1"
            role="group"
            aria-label={language === "no" ? "Språk" : "Language"}
          >
            <button
              type="button"
              onClick={() => setLanguage("no")}
              className={`px-2 py-0.5 rounded text-sm font-medium transition-colors ${
                language === "no"
                  ? "bg-solid-primary-base text-text-neutral-white"
                  : "text-text-neutral-base hover:text-text-neutral-black hover:bg-white/60"
              }`}
            >
              NO
            </button>
            <span className="text-text-neutral-light text-sm" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded text-sm font-medium transition-colors ${
                language === "en"
                  ? "bg-solid-primary-base text-text-neutral-white"
                  : "text-text-neutral-base hover:text-text-neutral-black hover:bg-white/60"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** White secondary nav — collapses on scroll (lg+ only). */
export function GlobalHeaderSecondaryNav() {
  const { language } = useLanguage()

  return (
    <div className="w-full bg-white hidden lg:block">
      <div className={`${LAYOUT_SHELL_CLASS} flex items-center gap-1 py-0`}>
        <nav className="flex flex-wrap items-center gap-2 py-0" aria-label="Hovedmeny">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-normal text-text-neutral-white bg-solid-primary-base hover:bg-solid-primary-hover rounded-none transition-colors"
            onClick={() => window.open(byggmakkerUrl("/kategori"), "_blank", "noopener,noreferrer")}
          >
            <Menu className="w-4 h-4 shrink-0" aria-hidden />
            {t("products", language)}
            <ChevronDown className="w-4 h-4 shrink-0 opacity-90" aria-hidden />
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-solid-primary-base border-b-2 border-solid-primary-base transition-colors"
          >
            {t("projects", language)}
          </Link>
          <a
            href={byggmakkerUrl("/varehus")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <Store className="w-4 h-4 text-solid-primary-base shrink-0" aria-hidden />
            {t("storeOverview", language)}
          </a>
          <a
            href={byggmakkerUrl("/kampanjer")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <Tag className="w-4 h-4 text-solid-primary-base shrink-0" aria-hidden />
            {t("campaignsNav", language)}
          </a>
          <a
            href={byggmakkerUrl("/proff/tjenester")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <Wrench className="w-4 h-4 text-solid-primary-base shrink-0" aria-hidden />
            {t("services", language)}
          </a>
          <a
            href={byggmakkerUrl("/proff")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            <HardHat className="w-4 h-4 text-solid-primary-base shrink-0" aria-hidden />
            {t("proffNav", language)}
          </a>
          <a
            href={byggmakkerUrl("/rad-og-guider")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-normal text-text-neutral-black hover:text-solid-primary-base transition-colors"
          >
            {t("inspiration", language)}
          </a>
        </nav>
      </div>
    </div>
  )
}

/** Full header (primary + secondary) for non-scroll contexts. */
export function GlobalHeader() {
  return (
    <div className="w-full bg-surface-base-base border-b border-borders-base-base">
      <GlobalHeaderPrimary />
      <GlobalHeaderSecondaryNav />
    </div>
  )
}
