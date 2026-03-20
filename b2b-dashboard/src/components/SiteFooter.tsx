"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Headphones, RotateCcw, Truck, Facebook, Youtube, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"
import { buttonVariants } from "@kesko/ds-react"
import { cn } from "@/lib/utils"
import { FOOTER_BM_ICON_SRC, LAYOUT_SHELL_CLASS, byggmakkerUrl } from "@/lib/layout"
import { FOOTER_COLUMNS, resolveFooterHref } from "@/data/site-footer-links"

/** Three-tier footer band colors, matching retail footer structure */
const FOOTER_BG_PREFOOTER = "#242424"
const FOOTER_BG_MAIN = "#242424"
const FOOTER_BG_BOTTOM = "#202020"
const FOOTER_BG_BOTTOM_INNER = "#202020"

export function SiteFooter() {
  const { language } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="w-full mt-auto text-text-neutral-white">
      {/* Tier 1 — pre-footer promise row */}
      <div className="w-full" style={{ backgroundColor: FOOTER_BG_PREFOOTER }}>
        <div
          className={`${LAYOUT_SHELL_CLASS} pt-12 pb-8 md:pb-10`}
          style={{ background: "unset" }}
        >
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 list-none p-0 m-0">
            <li>
              <a
                href={byggmakkerUrl("/side/kontakt-oss")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Headphones className="w-10 h-10 shrink-0 text-solid-primary-base" aria-hidden />
                <h2 className="text-base font-bold text-text-neutral-white m-0">
                  {t("footerTileSupportTitle", language)}
                </h2>
                <p className="text-sm font-normal text-white/85 m-0 max-w-sm">{t("footerTileSupportDesc", language)}</p>
              </a>
            </li>
            <li>
              <a
                href={byggmakkerUrl("/side/betingelser")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center gap-3 hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-10 h-10 shrink-0 text-solid-primary-base" aria-hidden />
                <h2 className="text-base font-bold text-text-neutral-white m-0">
                  {t("footerTileReturnTitle", language)}
                </h2>
                <p className="text-sm font-normal text-white/85 m-0 max-w-sm">{t("footerTileReturnDesc", language)}</p>
              </a>
            </li>
            <li>
              <a
                href={byggmakkerUrl("/varehus")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Truck className="w-10 h-10 shrink-0 text-solid-primary-base" aria-hidden />
                <h2 className="text-base font-bold text-text-neutral-white m-0">
                  {t("footerTileDeliveryTitle", language)}
                </h2>
                <p className="text-sm font-normal text-white/85 m-0 max-w-sm">{t("footerTileDeliveryDesc", language)}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tier 2 — BM icon + link columns + newsletter (darker gray, no borders) */}
      <div className="w-full" style={{ backgroundColor: FOOTER_BG_MAIN }}>
        <div className="flex justify-center pt-6 pb-8">
          <Link
            href={byggmakkerUrl("/")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-solid-primary-base rounded-none"
            aria-label="Byggmakker"
          >
            <Image
              src={FOOTER_BM_ICON_SRC}
              alt=""
              width={82}
              height={75}
              className="h-[52px] w-auto"
              unoptimized
            />
          </Link>
        </div>

        <div className={`${LAYOUT_SHELL_CLASS} pb-12 lg:pb-14`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title.no}>
                  <h3 className="text-sm font-bold text-text-neutral-white mb-4 normal-case tracking-normal">
                    {col.title[language]}
                  </h3>
                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {col.links.map((link) => (
                      <li key={link.href + link.label.no}>
                        <a
                          href={resolveFooterHref(link.href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-normal text-white/90 hover:text-text-neutral-white underline-offset-2 hover:underline inline-flex items-start gap-2"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-solid-primary-base mt-1.5 shrink-0" />
                          <span className="normal-case">{link.label[language]}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lg:col-span-4 pt-8 lg:pt-0 lg:pl-8">
              <h3 className="text-sm font-bold text-text-neutral-white mb-3 normal-case tracking-normal">
                {t("footerNewsletterTitle", language)}
              </h3>
              <p className="text-sm font-normal text-white/85 mb-4">{t("footerNewsletterDesc", language)}</p>
              <a
                href={byggmakkerUrl("/siste/nyhetsbrev")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                {t("footerNewsletterCta", language)}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3 — copyright + social */}
      <div className="w-full" style={{ backgroundColor: FOOTER_BG_BOTTOM }}>
        <div
          className={`${LAYOUT_SHELL_CLASS} py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6`}
          style={{ backgroundColor: FOOTER_BG_BOTTOM_INNER }}
        >
          <div className="text-sm font-normal text-white/80 order-2 sm:order-1 normal-case">
            © {year} Byggmakker Handel AS
          </div>
          <div className="order-1 sm:order-2 flex items-center justify-center sm:justify-end gap-3">
            <a
              href="https://www.facebook.com/byggmakker"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-solid-primary-base"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/c/byggmakker"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-solid-primary-base"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/byggmakker/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-solid-primary-base"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/byggmakker/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-solid-primary-base"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
