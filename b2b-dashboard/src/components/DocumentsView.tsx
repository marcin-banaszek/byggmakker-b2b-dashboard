"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FileText } from "lucide-react"
import { Card, Checkbox, Button } from "@kesko/ds-react"
import { getProductsForDocuments } from "@/data/byggmakker-products"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

const DOC_PRODUCTS = getProductsForDocuments()

const DOC_TYPE_KEYS = ["docTypeHse", "docTypeEpd", "docTypeTechnical", "docTypeAll"] as const

export function DocumentsView() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [docType, setDocType] = React.useState<(typeof DOC_TYPE_KEYS)[number]>(DOC_TYPE_KEYS[0])
  const [combineDocs, setCombineDocs] = React.useState(false)
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
    if (selectedIds.size === DOC_PRODUCTS.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(DOC_PRODUCTS.map((p) => p.id)))
  }

  const allSelected = selectedIds.size === DOC_PRODUCTS.length

  return (
    <div className="space-y-6 pb-24">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={allSelected}
            onChange={selectAll}
            aria-label="Select all"
          />
          <span className="text-sm font-medium text-text-neutral-base">
            {t("selectAllProducts", language)} ({DOC_PRODUCTS.length} {t("productsLower", language)})
          </span>
        </label>
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOC_PRODUCTS.map((product) => {
          const isSelected = selectedIds.has(product.id)
          return (
            <Card
              key={product.id}
              className={cn(
                "rounded-lg p-4 cursor-pointer transition-all border-2",
                isSelected
                  ? "border-solid-primary-base bg-surface-primary-base"
                  : "border-borders-base-base hover:border-borders-base-hover hover:bg-surface-base-hover"
              )}
              onClick={() => toggleSelect(product.id)}
            >
              <div className="flex gap-4">
                <div className="shrink-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleSelect(product.id)}
                    aria-label={`Select ${product.name}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="w-12 h-12 rounded border border-borders-base-base bg-surface-base-accent flex items-center justify-center text-icons-nautral-base mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium text-text-neutral-light mb-1">{product.nobb}</p>
                  <p className="text-sm font-bold text-text-neutral-black mb-3 line-clamp-2">{product.name}</p>
                  {product.badges && product.badges.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {product.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded text-xs font-medium bg-solid-primary-base text-text-neutral-white uppercase"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-text-neutral-light">{t("noDocumentation", language)}</p>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Sticky Footer Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-base-base border-t border-borders-base-base shadow-lg">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as (typeof DOC_TYPE_KEYS)[number])}
                className="h-10 px-4 rounded-md border border-borders-base-base bg-surface-base-base text-sm focus:outline-none focus:ring-2 focus:ring-solid-primary-base"
              >
                {DOC_TYPE_KEYS.map((key) => (
                  <option key={key} value={key}>{t(key, language)}</option>
                ))}
              </select>
              <span className="text-sm text-text-neutral-base">
                {selectedIds.size} of {DOC_PRODUCTS.length} {t("productsSelected", language)}
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={combineDocs}
                  onChange={(e) => setCombineDocs(e.target.checked)}
                  className="rounded border-borders-base-base"
                />
                <span className="text-sm text-text-neutral-base">{t("createCombinedDoc", language)}</span>
              </label>
            </div>
            <Button size="sm" className="h-10 shrink-0">
              {t("generateFile", language)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
