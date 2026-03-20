"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Search, Filter, Download, ListPlus, Info } from "lucide-react"
import { Button, Checkbox, Progress, Card } from "@kesko/ds-react"
import { AddToPlannedPurchaseModal, type MaterialForPurchase, type PlannedPurchase } from "./AddToPlannedPurchaseModal"
import { CALCULATED_MATERIALS } from "@/data/byggmakker-products"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

export interface Material {
  id: string
  name: string
  nobb: string
  category: string
  calculatedQty: number
  orderedQty: number
  unit: string
  pricePerUnit: number
  imageUrl?: string
  productUrl?: string
}

const MATERIALS: Material[] = CALCULATED_MATERIALS.map((p) => ({
  id: p.id,
  name: p.name,
  nobb: p.nobb,
  category: p.category,
  calculatedQty: (p as { calculatedQty: number }).calculatedQty,
  orderedQty: (p as { orderedQty: number }).orderedQty,
  unit: p.unit,
  pricePerUnit: p.pricePerUnit,
  imageUrl: p.imageUrl,
  productUrl: p.productUrl,
}))

const PURCHASE_LISTS: PlannedPurchase[] = [
  { id: "PL1", label: "Uke 12 - Fundamentmaterialer", productCount: 3, owner: "Lars Henriksen" },
  { id: "PL2", label: "Uke 14 - Trekonstruksjon etasje 1", productCount: 4, owner: "Marte Solberg" },
  { id: "PL3", label: "Uke 16 - VVS røropplegg", productCount: 3, owner: "Lars Henriksen" },
]

function getFulfillment(m: Material) {
  const remaining = Math.max(0, m.calculatedQty - m.orderedQty)
  const pct = m.calculatedQty > 0 ? Math.round((m.orderedQty / m.calculatedQty) * 100) : 100
  return { remaining, pct }
}

function getActionState(m: Material): "add-all" | "add-remaining" | "fully-stocked" {
  const { remaining } = getFulfillment(m)
  if (remaining === 0) return "fully-stocked"
  if (m.orderedQty === 0) return "add-all"
  return "add-remaining"
}

export function CalculatedMaterialsView() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [modalOpen, setModalOpen] = React.useState(false)
  const { language } = useLanguage()

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selectedIds.size === MATERIALS.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(MATERIALS.map((m) => m.id)))
  }

  const clearSelection = () => setSelectedIds(new Set())

  const openModal = () => setModalOpen(true)
  const closeModal = () => {
    setModalOpen(false)
    clearSelection()
  }

  const selectedMaterials = MATERIALS.filter((m) => selectedIds.has(m.id))
  const materialsForModal: MaterialForPurchase[] = selectedMaterials.map((m) => {
    const { remaining } = getFulfillment(m)
    return {
      id: m.id,
      name: m.name,
      nobb: m.nobb,
      category: m.category,
      calculatedQty: m.calculatedQty,
      orderedQty: m.orderedQty,
      unit: m.unit,
      pricePerUnit: m.pricePerUnit,
      remaining,
      imageUrl: m.imageUrl,
    }
  })

  return (
    <div className="space-y-6">
      <Card className="p-0 overflow-hidden rounded-lg">
        {/* Toolbar */}
        <div className="p-4 border-b border-borders-base-base flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-base-accent">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-icons-nautral-light" />
            <input
              type="text"
              placeholder={t("searchMaterials", language)}
              className="w-full pl-10 pr-4 py-2 bg-surface-base-base border border-borders-base-base rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-solid-primary-base focus:ring-offset-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-neutral-light hidden sm:inline">
              {t("showingMaterials", language)} {MATERIALS.length} {t("ofMaterials", language)} {MATERIALS.length} {t("materialsUnit", language)}
            </span>
            <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
              <Filter className="w-4 h-4" />
              {t("filter", language)}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
              <Download className="w-4 h-4" />
              {t("export", language)}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
              {t("importProduct", language)}
            </Button>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-surface-base-hover border-b border-borders-base-base flex items-center justify-between">
            <span className="text-sm font-medium text-text-neutral-base">
              {selectedIds.size} {t("materialsSelected", language)}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearSelection}
                className="text-sm font-medium text-text-neutral-light hover:text-text-neutral-black transition-colors"
              >
                {t("clear", language)}
              </button>
              <Button size="sm" onClick={openModal} className="h-9">
                <ListPlus className="w-4 h-4" />
                {t("addToPlannedPurchase", language)}
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-base-base border-b border-borders-base-base">
                <th className="p-4 w-10">
                  <Checkbox
                    checked={selectedIds.size === MATERIALS.length && MATERIALS.length > 0}
                    onChange={selectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase">
                  {t("productDetails", language)}
                </th>
                <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-24 text-right">
                  {t("calculatedQty", language)}
                </th>
                <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-24 text-right">
                  {t("orderedQty", language)}
                </th>
                <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-[200px]">
                  {t("status", language)}
                </th>
                <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-44 text-right">
                  {t("action", language)}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders-base-base">
              {MATERIALS.map((material) => {
                const { remaining, pct } = getFulfillment(material)
                const actionState = getActionState(material)
                const isSelected = selectedIds.has(material.id)
                return (
                  <tr
                    key={material.id}
                    className="hover:bg-surface-base-hover transition-colors group"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelect(material.id)}
                        aria-label={`Select ${material.name}`}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-4">
                        {material.imageUrl ? (
                          <a href={material.productUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-base flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image src={material.imageUrl} alt="" width={40} height={40} className="object-cover w-full h-full" />
                          </a>
                        ) : (
                          <div className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-accent flex items-center justify-center flex-shrink-0 text-icons-nautral-light" />
                        )}
                        <div>
                          <p className="font-bold text-text-neutral-black text-sm mb-0.5">
                            {material.name}
                          </p>
                          <p className="text-sm text-text-neutral-light">
                            NOBB: {material.nobb}{" "}
                            <span className="mx-1.5">•</span> {material.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-text-neutral-black">
                          {material.calculatedQty}
                        </span>
                        <span className="text-sm text-text-neutral-light">{material.unit}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={cn(
                          "font-bold",
                          pct === 0
                            ? "text-status-error"
                            : pct === 100
                              ? "text-status-success"
                              : "text-status-warning"
                        )}
                      >
                        {material.orderedQty}
                      </span>
                      <span className="text-sm text-text-neutral-light ml-1">{material.unit}</span>
                    </td>
                    <td className="p-4">
                      {pct === 100 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-surface-helpers-success text-status-success">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                          {t("completed", language)}
                        </span>
                      ) : pct > 0 ? (
                        <div className="w-full max-w-[140px] space-y-1">
                          <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-status-warning">{remaining} {material.unit} {t("remaining", language)}</span>
                            <span className="text-text-neutral-light">{pct}%</span>
                          </div>
                          <Progress
                            value={pct}
                            indicatorClassName="bg-status-warning"
                            className="h-1.5"
                          />
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-status-error">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-error" />
                          {t("notStarted", language)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {actionState === "fully-stocked" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-sm font-bold border-borders-base-disabled text-text-neutral-disabled cursor-not-allowed"
                          disabled
                        >
                          {t("fullyStocked", language)}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-sm font-bold text-solid-primary-base hover:bg-surface-primary-base"
                          onClick={() => {
                            setSelectedIds(new Set([material.id]))
                            setModalOpen(true)
                          }}
                        >
                          <ListPlus className="w-3.5 h-3.5" />
                          {actionState === "add-all" ? t("addAll", language) : t("addRemaining", language)}
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <AddToPlannedPurchaseModal
        isOpen={modalOpen}
        onClose={closeModal}
        materials={materialsForModal}
        purchaseLists={PURCHASE_LISTS}
        onSuccess={() => {
          // Could refresh data or show toast
        }}
      />

      {/* BIM Sync Info Footer */}
      <div className="flex items-center justify-between p-4 bg-surface-helpers-info border border-borders-color-info rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-surface-base-base rounded-full border border-borders-color-info">
            <Info className="w-4 h-4 text-status-info" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-neutral-black">{t("bimSynced", language)}</p>
            <p className="text-sm text-text-helpers-info">
              {t("bimSyncedDesc", language)}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="bg-surface-base-base h-9 font-medium">
          {t("refreshData", language)}
        </Button>
      </div>
    </div>
  )
}
