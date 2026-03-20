"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ExternalLink, Trash2, ArrowRight, Package, CreditCard, Receipt, MinusCircle, PlusCircle } from "lucide-react"
import { Button, Checkbox, Card, Badge } from "@kesko/ds-react"
import { BYGGMAKKER_PRODUCTS } from "@/data/byggmakker-products"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"
import { LAYOUT_SHELL_CLASS } from "@/lib/layout"

const PRODUCT_LIST = BYGGMAKKER_PRODUCTS.slice(0, 3).map((p, i) => {
  const qty = [2, 1, 4][i] as number
  const discountPct = [0.85, 0.9, 0.95][i] as number
  return {
    id: p.id,
    name: p.name,
    sku: p.nobb,
    price: p.pricePerUnit,
    qty,
    discount: ["B2B Gold -15%", "Project Rate -10%", "Volume Discount"][i] as string,
    total: Math.round(p.pricePerUnit * qty * discountPct),
    imageUrl: p.imageUrl,
    productUrl: p.productUrl,
  }
})

export function ProductsView() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set(PRODUCT_LIST.map((p) => p.id)))
  const { language } = useLanguage()

  const allSelected = selectedIds.size === PRODUCT_LIST.length
  const selectAll = () => {
    if (allSelected) setSelectedIds(new Set())
    else setSelectedIds(new Set(PRODUCT_LIST.map((p) => p.id)))
  }
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const clearSelection = () => setSelectedIds(new Set())

  return (
    <div className="relative pb-32">
      <div className="space-y-6">
        
        <Card className="p-0 overflow-hidden rounded-lg">
          <div className="p-4 bg-surface-base-accent border-b border-borders-base-base flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-neutral-black uppercase tracking-wider">{t("projectProductNeeds", language)}</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-neutral-light font-medium">{selectedIds.size} {t("itemsSelected", language)}</span>
              <Button variant="ghost" size="sm" className="text-sm font-bold text-solid-primary-base p-0 h-auto" onClick={clearSelection}>{t("clearSelection", language)}</Button>
            </div>
          </div>
          
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-base-base border-b border-borders-base-base">
                  <th className="p-4 w-10 text-center">
                    <Checkbox checked={allSelected} onChange={selectAll} aria-label="Select all" />
                  </th>
                  <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase">{t("product", language)}</th>
                  <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-32 text-right">{t("price", language)}</th>
                  <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-32 text-center">{t("qty", language)}</th>
                  <th className="p-4 text-sm font-medium tracking-wider text-text-neutral-light uppercase w-32 text-right">{t("total", language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders-base-base">
                {PRODUCT_LIST.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-base-hover transition-colors">
                    <td className="p-4 text-center">
                      <Checkbox checked={selectedIds.has(product.id)} onChange={() => toggleSelect(product.id)} aria-label={`Select ${product.name}`} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-4">
                        {product.imageUrl ? (
                          <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded border border-borders-base-base bg-surface-base-base flex-shrink-0 overflow-hidden">
                            <Image src={product.imageUrl} alt="" width={48} height={48} className="object-cover w-full h-full" />
                          </a>
                        ) : (
                          <div className="w-12 h-12 rounded bg-surface-base-accent border border-borders-base-base flex items-center justify-center text-icons-nautral-light">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-text-neutral-black leading-tight mb-1">{product.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-text-neutral-light">SKU: {product.sku}</span>
                            <Badge variant="outline" className="border-status-info bg-surface-helpers-info text-status-info normal-case tracking-normal font-semibold">{product.discount}</Badge>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-text-neutral-black">{product.price}</p>
                      <p className="text-sm text-text-neutral-light">{t("exVat", language)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-icons-nautral-light hover:text-icons-nautral-black"><MinusCircle className="w-4 h-4" /></Button>
                        <span className="font-bold text-text-neutral-black w-4 text-center">{product.qty}</span>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-icons-nautral-light hover:text-icons-nautral-black"><PlusCircle className="w-4 h-4" /></Button>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-text-neutral-black">{product.total}</p>
                      <p className="text-sm text-status-success font-medium">{t("saving", language)} 15%</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Returned Items Alert */}
        <div className="p-4 bg-surface-helpers-warning border border-borders-color-warning rounded-lg flex items-start gap-4">
          <div className="p-2 bg-surface-base-base rounded-md border border-borders-color-warning">
            <Trash2 className="w-5 h-5 text-status-warning" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-text-neutral-black">{t("returnsPending", language)}</h4>
              <Button variant="ghost" size="sm" className="text-sm font-bold text-text-neutral-base p-0 h-auto">{t("history", language)}</Button>
            </div>
            <p className="text-sm text-text-neutral-base leading-relaxed max-w-2xl">
              {t("returnsDesc", language)}
            </p>
          </div>
        </div>

      </div>

      {/* Cart Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-base-base/80 backdrop-blur-md border-t border-borders-base-base p-6 z-40 shadow-lg">
        <div className={`${LAYOUT_SHELL_CLASS} flex items-center justify-between`}>
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-sm text-text-neutral-light mb-1">{t("totalProjectPrice", language)}</span>
              <span className="text-3xl font-bold text-text-neutral-black tracking-tight flex items-baseline gap-2">
                NOK 7,313 
                <span className="text-sm font-medium text-text-neutral-light">{t("exVat", language)}</span>
              </span>
            </div>
            <div className="h-10 w-[1px] bg-borders-base-base hidden md:block" />
            <div className="hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-3.5 h-3.5 text-status-info" />
                <span className="text-text-neutral-base">{t("limit", language)}: <span className="font-bold text-text-neutral-black">250,000</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Receipt className="w-3.5 h-3.5 text-status-success" />
                <span className="text-text-neutral-base">{t("discount", language)}: <span className="font-bold text-text-neutral-black">-12.5%</span></span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg" className="h-14">
              {t("save", language)}
            </Button>
            <Button size="lg" className="h-14 px-10 flex items-center gap-3">
              {t("createQuote", language)}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
