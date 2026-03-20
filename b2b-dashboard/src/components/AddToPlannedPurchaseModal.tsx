"use client"

import * as React from "react"
import Image from "next/image"
import { X, Calendar, Check, Minus, Plus } from "lucide-react"
import { Button, Card } from "@kesko/ds-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

export interface MaterialForPurchase {
  id: string
  name: string
  nobb: string
  category: string
  calculatedQty: number
  orderedQty: number
  unit: string
  pricePerUnit: number
  remaining?: number
  imageUrl?: string
}

export interface PlannedPurchase {
  id: string
  label: string
  productCount: number
  owner: string
}

interface AddToPlannedPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  materials: MaterialForPurchase[]
  purchaseLists: PlannedPurchase[]
  onSuccess?: (payload: { listId: string; listLabel: string; productCount: number; estimatedValue: number; plannedDate: string }) => void
}

export function AddToPlannedPurchaseModal({
  isOpen,
  onClose,
  materials,
  purchaseLists,
  onSuccess,
}: AddToPlannedPurchaseModalProps) {
  const [tab, setTab] = React.useState<"existing" | "new">("existing")
  const [selectedListId, setSelectedListId] = React.useState<string>("")
  const [newListName, setNewListName] = React.useState<string>("")
  const [plannedDate, setPlannedDate] = React.useState<string>("")
  const [quantities, setQuantities] = React.useState<Record<string, number>>({})
  const [isSuccess, setIsSuccess] = React.useState(false)
  const { language } = useLanguage()
  const [successPayload, setSuccessPayload] = React.useState<{
    listLabel: string
    productCount: number
    estimatedValue: number
    plannedDate: string
  } | null>(null)

  // Initialize quantities when materials change
  React.useEffect(() => {
    const initial: Record<string, number> = {}
    materials.forEach((m) => {
      const remaining = (m.remaining ?? m.calculatedQty - m.orderedQty) || m.calculatedQty
      initial[m.id] = Math.max(0, remaining)
    })
    setQuantities(initial)
  }, [materials])

  const canSubmit =
    tab === "existing"
      ? selectedListId !== ""
      : newListName.trim() !== "" && plannedDate !== ""
  const isSubmitting = false

  const handleSubmit = () => {
    if (!canSubmit) return
    const list = purchaseLists.find((p) => p.id === selectedListId)
    const listLabel = tab === "new" ? newListName.trim() : list?.label ?? ""
    const productCount = materials.length
    const estimatedValue = materials.reduce((sum, m) => sum + (quantities[m.id] ?? 0) * m.pricePerUnit, 0)
    const dateStr = plannedDate
      ? new Date(plannedDate + "T00:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, ".")
      : new Date().toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, ".")

    setSuccessPayload({ listLabel, productCount, estimatedValue, plannedDate: dateStr })
    setIsSuccess(true)
    onSuccess?.({
      listId: selectedListId,
      listLabel,
      productCount,
      estimatedValue,
      plannedDate: dateStr,
    })
  }

  const handleClose = () => {
    setIsSuccess(false)
    setSuccessPayload(null)
    setSelectedListId("")
    setNewListName("")
    setPlannedDate("")
    setTab("existing")
    onClose()
  }

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 0
      const max = materials.find((m) => m.id === id)
      const remaining = max ? (max.remaining ?? max.calculatedQty - max.orderedQty) || max.calculatedQty : current
      const next = Math.max(0, Math.min(remaining, current + delta))
      return { ...prev, [id]: next }
    })
  }

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

  const formatUnit = (unit: string) =>
    unit === "pcs" ? "Stykk" : unit === "packs" ? "Pakke" : unit

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-text-neutral-black/50" onClick={handleClose} aria-hidden />
      <div
        className="relative z-10 w-full max-w-lg mx-4 bg-surface-base-base rounded-xl shadow-xl border border-borders-base-base overflow-hidden"
        role="dialog"
        aria-modal
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-borders-base-base">
          <h2 id="modal-title" className="text-lg font-bold text-text-neutral-black">
            {t("addToPlannedPurchaseTitle", language)}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-md text-icons-nautral-base hover:bg-surface-base-hover hover:text-icons-nautral-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isSuccess && successPayload ? (
            /* Success state */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-surface-helpers-success flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-status-success" strokeWidth={3} />
              </div>
              <p className="text-lg font-bold text-text-neutral-black mb-1">{t("productsAdded", language)}</p>
              <p className="text-sm text-text-neutral-light mb-6">
                {successPayload.productCount} {t("productsAddedDesc", language)} &apos;{successPayload.listLabel}&apos;.
              </p>
              <Card className="p-4 text-left bg-surface-base-accent border border-borders-base-base">
                <p className="text-sm font-bold text-text-neutral-light uppercase tracking-wider mb-3">{t("summary", language)}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-neutral-light">{t("purchaseList", language)}</span>
                    <span className="font-medium text-text-neutral-black">{successPayload.listLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-neutral-light">{t("productCount", language)}</span>
                    <span className="font-medium text-text-neutral-black">{successPayload.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-neutral-light">{t("estimatedValue", language)}</span>
                    <span className="font-medium text-text-neutral-black">{formatPrice(successPayload.estimatedValue)} kr</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-text-neutral-light">{t("plannedDate", language)}</span>
                    <span className="font-medium text-text-neutral-black flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {successPayload.plannedDate}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex rounded-lg overflow-hidden border border-borders-base-base">
                <button
                  type="button"
                  onClick={() => setTab("existing")}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-colors",
                    tab === "existing"
                      ? "bg-solid-primary-base text-text-neutral-white"
                      : "bg-surface-base-accent text-text-neutral-base hover:bg-surface-base-hover"
                  )}
                >
                  {t("existingPurchase", language)}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("new")}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-colors",
                    tab === "new"
                      ? "bg-solid-primary-base text-text-neutral-white"
                      : "bg-surface-base-accent text-text-neutral-base hover:bg-surface-base-hover"
                  )}
                >
                  {t("newPurchase", language)}
                </button>
              </div>

              {tab === "existing" && (
                <div>
                  <label className="block text-sm font-medium text-text-neutral-black mb-2">
                    {t("selectPlannedPurchase", language)}
                  </label>
                  <select
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                    className="w-full h-12 px-3 rounded-md border border-borders-base-base bg-surface-base-base text-sm text-text-neutral-black focus:outline-none focus:ring-2 focus:ring-status-info focus:ring-offset-2"
                  >
                    <option value="">{t("choosePurchaseList", language)}</option>
                    {purchaseLists.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.label} ({list.productCount} products · {list.owner})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {tab === "new" && (
                <div>
                  <label className="block text-sm font-medium text-text-neutral-black mb-2">
                    {t("purchaseListName", language)}
                  </label>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="e.g. Uke 24 – Innvendig arbeid"
                    className="w-full h-12 px-3 rounded-md border border-borders-base-base bg-surface-base-base text-sm text-text-neutral-black placeholder:text-text-neutral-light focus:outline-none focus:ring-2 focus:ring-status-info focus:ring-offset-2"
                  />
                </div>
              )}

              <div>
                  <label className="block text-sm font-medium text-text-neutral-black mb-2">
                    {t("plannedOrderDate", language)}
                  </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-icons-nautral-light" />
                  <input
                    type="date"
                    value={plannedDate}
                    onChange={(e) => setPlannedDate(e.target.value)}
                    placeholder="Velg dato..."
                    className="w-full h-12 pl-10 pr-4 rounded-md border border-borders-base-base bg-surface-base-base text-sm text-text-neutral-black focus:outline-none focus:ring-2 focus:ring-status-info focus:ring-offset-2"
                  />
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-sm font-medium text-text-neutral-black mb-3">
                  {t("products", language)} ({materials.length})
                </p>
                <div className="space-y-4">
                  {materials.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-borders-base-base bg-surface-base-accent"
                    >
                      {m.imageUrl ? (
                        <div className="w-12 h-12 rounded border border-borders-base-base bg-surface-base-base flex-shrink-0 overflow-hidden">
                          <Image src={m.imageUrl} alt="" width={48} height={48} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded border border-borders-base-base bg-surface-base-base flex items-center justify-center flex-shrink-0 text-icons-nautral-light">
                          <span className="text-sm font-bold text-text-neutral-light">IMG</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-text-neutral-black text-sm truncate">{m.name}</p>
                        <p className="text-sm text-text-neutral-light">NOBB: {m.nobb}</p>
                        <p className="text-sm font-medium text-text-neutral-base mt-0.5">
                          {formatPrice(m.pricePerUnit)} kr/{formatUnit(m.unit)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(m.id, -1)}
                          className="w-9 h-9 rounded-md border border-borders-base-base flex items-center justify-center text-text-neutral-base hover:bg-surface-base-hover transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={quantities[m.id] ?? 0}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10)
                            if (!Number.isNaN(v)) {
                              const max = m.remaining ?? m.calculatedQty - m.orderedQty
                              setQuantities((prev) => ({ ...prev, [m.id]: Math.max(0, Math.min(max, v)) }))
                            }
                          }}
                          className="w-20 h-9 text-center px-2 rounded-md border border-borders-base-base bg-surface-base-base text-sm focus:outline-none focus:ring-2 focus:ring-status-info focus:ring-offset-2"
                          min={0}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(m.id, 1)}
                          className="w-9 h-9 rounded-md border border-borders-base-base flex items-center justify-center text-text-neutral-base hover:bg-surface-base-hover transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-text-neutral-light ml-1.5 w-12">{formatUnit(m.unit)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-borders-base-base bg-surface-base-accent">
          {isSuccess ? (
            <Button onClick={handleClose}>{t("close", language)}</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                {t("cancel", language)}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="bg-solid-primary-base text-text-neutral-white hover:bg-solid-primary-hover"
              >
                {tab === "new" ? t("createAndAdd", language) : t("addToPurchase", language)}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
