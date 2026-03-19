"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Calendar, Search, User, Package, Plus, ShoppingCart, Pencil, Copy, Trash2 } from "lucide-react"
import { Card, Accordion, Badge, Button } from "@kesko/ds-react"
import { PLANNED_PURCHASE_PRODUCTS } from "@/data/byggmakker-products"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

type PurchaseStatus = "utkast" | "klar" | "delvis" | "bestilt"

const STATUS_STYLES: Record<PurchaseStatus, string> = {
  utkast: "bg-text-neutral-black text-text-neutral-white border-0",
  klar: "bg-status-success text-text-neutral-white border-0",
  delvis: "bg-status-warning text-text-neutral-black border-0 font-semibold",
  bestilt: "bg-status-success text-text-neutral-white border-0",
}

const MILESTONES = [
  { id: "start", label: "Oppstart", week: null, status: "completed" as const, icon: "P" },
  { id: "u12", label: "Uke 12", week: "Fundamentmaterialer", status: "klar" as const },
  { id: "u14", label: "Uke 14", week: null, status: "utkast" as const },
  { id: "u16", label: "Uke 16", week: "VVS", status: "delvis" as const },
  { id: "u18", label: "Uke 18", week: null, status: "bestilt" as const },
  { id: "end", label: "Ferdig", week: null, status: "pending" as const, icon: "flag" },
]

interface PurchaseList {
  id: string
  title: string
  status: PurchaseStatus
  owner: string
  plannedDate: string
  productCount: number
  estimatedSum: number
  note?: string
  products: (typeof PLANNED_PURCHASE_PRODUCTS)[0]
}

const PURCHASE_LISTS: PurchaseList[] = [
  {
    id: "PL1",
    title: "Uke 12 – Fundamentmaterialer",
    status: "klar",
    owner: "Lars Henriksen",
    plannedDate: "27.03.26",
    productCount: PLANNED_PURCHASE_PRODUCTS[0].length,
    estimatedSum: PLANNED_PURCHASE_PRODUCTS[0].reduce((s, p) => s + p.sum, 0),
    note: "Alt til fundamentstøp, bestilles mandag morgen.",
    products: PLANNED_PURCHASE_PRODUCTS[0],
  },
  {
    id: "PL2",
    title: "Uke 14 – Trekonstruksjon etasje 1",
    status: "utkast",
    owner: "Marte Solberg",
    plannedDate: "31.03.26",
    productCount: PLANNED_PURCHASE_PRODUCTS[1].length,
    estimatedSum: PLANNED_PURCHASE_PRODUCTS[1].reduce((s, p) => s + p.sum, 0),
    products: PLANNED_PURCHASE_PRODUCTS[1],
  },
  {
    id: "PL3",
    title: "Uke 16 – VVS røropplegg",
    status: "delvis",
    owner: "Lars Henriksen",
    plannedDate: "14.04.26",
    productCount: PLANNED_PURCHASE_PRODUCTS[2].length,
    estimatedSum: PLANNED_PURCHASE_PRODUCTS[2].reduce((s, p) => s + p.sum, 0),
    products: PLANNED_PURCHASE_PRODUCTS[2],
  },
]


function formatPrice(n: number) {
  return new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

const FILTER_KEYS = ["alle", "utkast", "klar", "delvis", "bestilt"] as const

export function PlannedPurchasesView() {
  const [openId, setOpenId] = React.useState<string | null>(PURCHASE_LISTS[0]?.id ?? null)
  const [statusFilter, setStatusFilter] = React.useState<string>("alle")
  const { language } = useLanguage()

  const getStatusLabel = (status: PurchaseStatus) => {
    switch (status) {
      case "utkast": return t("utkast", language)
      case "klar": return t("klarTilBestilling", language)
      case "delvis": return t("delvisBestilt", language)
      case "bestilt": return t("bestilt", language)
      default: return status
    }
  }

  const filterOptions = FILTER_KEYS.map((k) => ({ key: k, label: t(k, language) }))

  const totalEstimated = PURCHASE_LISTS.reduce((s, p) => s + p.estimatedSum, 0)

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-neutral-black tracking-tight">
            {t("plannedPurchasesTitle", language)}
          </h2>
          <p className="text-sm text-text-neutral-base mt-0.5">
            {PURCHASE_LISTS.length} {t("purchaseListsCount", language)} · {t("estimatedTotal", language)}: {formatPrice(totalEstimated)} kr
          </p>
        </div>
        <Button size="sm" className="h-10 shrink-0">
          <Plus className="w-4 h-4" />
          {t("newPurchaseList", language)}
        </Button>
      </div>

      {/* Timeline Stepper */}
      <Card className="p-6">
        <div className="relative flex items-center justify-between gap-2 mb-2">
          {MILESTONES.map((m, i) => (
            <React.Fragment key={m.id}>
              <div className="flex flex-col items-center gap-1.5 relative z-10">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold",
                    m.status === "completed" && "bg-status-success border-surface-helpers-success text-text-neutral-white",
                    m.status === "klar" && "bg-surface-base-base border-status-warning text-status-warning",
                    m.status === "utkast" && "bg-surface-base-base border-surface-base-pressed text-text-neutral-disabled",
                    m.status === "delvis" && "bg-surface-base-base border-status-warning text-status-warning",
                    m.status === "bestilt" && "bg-status-success border-surface-helpers-success text-text-neutral-white",
                    m.status === "pending" && "bg-surface-base-base border-surface-base-pressed text-text-neutral-disabled"
                  )}
                >
                  {(m.status === "completed" || m.status === "bestilt") && "✓"}
                  {m.status === "delvis" && "−"}
                  {(m.status === "klar" || m.status === "utkast") && <span className="w-2 h-2 rounded-full bg-current" />}
                  {m.status === "pending" && (m.icon === "flag" ? "🏁" : <span className="w-2 h-2 rounded-full bg-current" />)}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-text-neutral-black">{m.label}</p>
                  {m.week && <p className="text-xs text-text-neutral-light">{m.week}</p>}
                  {m.status === "klar" && <Badge className={cn("text-xs px-1.5 py-0 mt-0.5 normal-case", STATUS_STYLES.klar)}>{t("klarTilBestilling", language)}</Badge>}
                  {m.status === "utkast" && <Badge className={cn("text-xs px-1.5 py-0 mt-0.5 normal-case", STATUS_STYLES.utkast)}>{t("utkast", language)}</Badge>}
                  {m.status === "delvis" && <Badge className={cn("text-xs px-1.5 py-0 mt-0.5 normal-case", STATUS_STYLES.delvis)}>{t("delvisBestilt", language)}</Badge>}
                  {m.status === "bestilt" && <Badge className={cn("text-xs px-1.5 py-0 mt-0.5 normal-case", STATUS_STYLES.bestilt)}>{t("bestilt", language)}</Badge>}
                </div>
              </div>
              {i < MILESTONES.length - 1 && (
                <div className="flex-1 h-0.5 bg-surface-base-pressed -mx-1 min-w-[16px]" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 h-2 rounded-full bg-surface-base-accent overflow-hidden flex">
          <div className="bg-status-success flex-[6]" />
          <div className="bg-status-warning flex-[2]" />
          <div className="bg-surface-base-pressed flex-[4]" />
        </div>
        <p className="text-xs text-text-neutral-light mt-2">{t("todayDate", language)} 9 mars 2026</p>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-icons-nautral-light" />
          <input
            type="text"
            placeholder={t("searchPurchaseList", language)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-borders-base-base bg-surface-base-base text-sm focus:outline-none focus:ring-2 focus:ring-solid-primary-base focus:ring-offset-2"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatusFilter(key)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                statusFilter === key
                  ? "bg-solid-primary-base text-text-neutral-white"
                  : "bg-surface-base-accent text-text-neutral-base hover:bg-surface-base-hover"
              )}
            >
              {label}
            </button>
          ))}
          <Button variant="outline" size="sm" className="h-10 ml-auto">
            <Calendar className="w-4 h-4" />
            {t("filterByDate", language)}
          </Button>
        </div>
      </div>

      {/* Purchase List Accordions */}
      <Card className="p-0 overflow-hidden rounded-lg">
        {PURCHASE_LISTS.map((list) => (
          <Accordion
            key={list.id}
            chevronPosition="left"
            title={
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-text-neutral-black truncate">{list.title}</span>
                      <Badge className={cn("shrink-0 text-xs normal-case", STATUS_STYLES[list.status])}>
                        {getStatusLabel(list.status)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mt-1 text-xs text-text-neutral-light">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {list.owner}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {t("planlagt", language)}: {list.plannedDate}
                      </span>
                      <span>{list.productCount} {t("produkter", language)}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-text-neutral-black shrink-0">
                  {t("estimertSum", language)} {formatPrice(list.estimatedSum)} kr
                </span>
              </div>
            }
            isOpen={openId === list.id}
            onToggle={() => setOpenId(openId === list.id ? null : list.id)}
          >
            <div className="space-y-4 pt-2">
              {list.note && (
                <div className="p-4 rounded-lg border border-borders-base-base bg-surface-base-accent text-sm text-text-neutral-base">
                  {t("notat", language)}: {list.note}
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-borders-base-base">
                      <th className="pb-3 text-xs font-medium text-text-neutral-light uppercase">{t("product", language)}</th>
                      <th className="pb-3 text-xs font-medium text-text-neutral-light uppercase w-28">NOBB</th>
                      <th className="pb-3 text-xs font-medium text-text-neutral-light uppercase w-24 text-right">{t("antall", language)}</th>
                      <th className="pb-3 text-xs font-medium text-text-neutral-light uppercase w-24 text-right">{t("enhetspris", language)}</th>
                      <th className="pb-3 text-xs font-medium text-text-neutral-light uppercase w-28 text-right">{t("sum", language)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.products.map((p) => (
                      <tr key={p.id} className="border-b border-borders-base-base last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            {"imageUrl" in p && p.imageUrl ? (
                              <a href={"productUrl" in p ? p.productUrl : "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-base flex-shrink-0 overflow-hidden">
                                <Image src={p.imageUrl} alt="" width={40} height={40} className="object-cover w-full h-full" />
                              </a>
                            ) : (
                              <div className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-base flex items-center justify-center flex-shrink-0 text-icons-nautral-light">
                                <Package className="w-5 h-5" />
                              </div>
                            )}
                            <span className="font-medium text-text-neutral-black">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-text-neutral-light">{p.nobb}</td>
                        <td className="py-3 text-sm text-right">{p.qty} {p.unit}</td>
                        <td className="py-3 text-sm text-right">{formatPrice(p.unitPrice)} kr</td>
                        <td className="py-3 text-sm font-medium text-right">{formatPrice(p.sum)} kr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="h-9">
                    <ShoppingCart className="w-4 h-4" />
                    {t("leggIHandelkurv", language)}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9">
                    <Pencil className="w-4 h-4" />
                    {t("rediger", language)}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9">
                    <Copy className="w-4 h-4" />
                    {t("dupliser", language)}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 text-status-error hover:text-status-error hover:bg-surface-helpers-error">
                    <Trash2 className="w-4 h-4" />
                    {t("slett", language)}
                  </Button>
                </div>
                <p className="text-sm font-bold text-text-neutral-black">
                  {t("totalsumExMva", language)} {formatPrice(list.estimatedSum)} kr
                </p>
              </div>
            </div>
          </Accordion>
        ))}
      </Card>
    </div>
  )
}
