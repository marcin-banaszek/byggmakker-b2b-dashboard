"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Search, Calendar, Package } from "lucide-react"
import { Card, Accordion, Badge, Button } from "@kesko/ds-react"
import { BYGGMAKKER_PRODUCTS } from "@/data/byggmakker-products"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

interface OrderProduct {
  id: string
  name: string
  nobb: string
  imageUrl?: string
  productUrl?: string
  qty: number
  unit: string
  unitPrice: number
  lineTotal: number
}

interface Order {
  id: string
  projectName: string
  storeName: string
  status: "quoted" | "order_confirmed" | "order_started" | "under_review"
  orderDate: string
  deliveryDate: string
  requisitionNo: string
  contact: string
  netSum: number
  products: OrderProduct[]
}

const STATUS_STYLES: Record<Order["status"], string> = {
  quoted: "bg-solid-primary-base text-text-neutral-white border-0",
  order_confirmed: "bg-status-success text-text-neutral-white border-0",
  order_started: "bg-status-warning text-text-neutral-black border-0 font-semibold",
  under_review: "bg-text-neutral-black text-text-neutral-white border-0",
}

const ORDERS: Order[] = [
  {
    id: "14812355",
    projectName: "Villa Solbakken Renovation",
    storeName: "Byggmakker Larvik",
    status: "quoted",
    orderDate: "08.12.2023",
    deliveryDate: "08.12.2023",
    requisitionNo: "12345678",
    contact: "Johannes Tonnessen",
    netSum: 238984,
    products: [
      { ...BYGGMAKKER_PRODUCTS[0], qty: 120, unit: "m²", unitPrice: 351.2, lineTotal: 42144 },
      { ...BYGGMAKKER_PRODUCTS[1], qty: 84, unit: "Spann", unitPrice: 399, lineTotal: 33516 },
      { ...BYGGMAKKER_PRODUCTS[2], qty: 150, unit: "m²", unitPrice: 199, lineTotal: 29850 },
      { ...BYGGMAKKER_PRODUCTS[4], qty: 2, unit: "pkts", unitPrice: 292, lineTotal: 584 },
    ],
  },
  {
    id: "14812490",
    projectName: "Villa Solbakken Renovation",
    storeName: "Byggmakker Larvik",
    status: "order_confirmed",
    orderDate: "10.12.2023",
    deliveryDate: "12.12.2023",
    requisitionNo: "12345679",
    contact: "Johannes Tonnessen",
    netSum: 45200,
    products: [
      { ...BYGGMAKKER_PRODUCTS[5], qty: 6, unit: "Spann", unitPrice: 299, lineTotal: 1794 },
      { ...BYGGMAKKER_PRODUCTS[3], qty: 42, unit: "m²", unitPrice: 549, lineTotal: 23058 },
    ],
  },
  {
    id: "14811203",
    projectName: "Villa Solbakken Renovation",
    storeName: "Byggmakker Drammen",
    status: "order_started",
    orderDate: "15.03.2026",
    deliveryDate: "18.03.2026",
    requisitionNo: "12345680",
    contact: "Lars Henriksen",
    netSum: 18500,
    products: [
      { ...BYGGMAKKER_PRODUCTS[5], qty: 40, unit: "sekk", unitPrice: 189, lineTotal: 7560 },
      { ...BYGGMAKKER_PRODUCTS[4], qty: 120, unit: "stk", unitPrice: 45, lineTotal: 5400 },
    ],
  },
  {
    id: "14810877",
    projectName: "Villa Solbakken Renovation",
    storeName: "Byggmakker Larvik",
    status: "under_review",
    orderDate: "05.03.2026",
    deliveryDate: "—",
    requisitionNo: "12345681",
    contact: "Marte Solberg",
    netSum: 8900,
    products: [],
  },
]

function formatPrice(n: number) {
  return new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function getOrderStatusLabel(status: Order["status"], lang: "no" | "en") {
  const labels = {
    quoted: { no: "Tilbud", en: "Quoted" },
    order_confirmed: { no: "Ordre bekreftet", en: "Order Confirmed" },
    order_started: { no: "Ordre startet", en: "Order Started" },
    under_review: { no: "Til vurdering", en: "Under Review" },
  }
  return labels[status][lang]
}

export function OrderHistoryView() {
  const [openId, setOpenId] = React.useState<string | null>(ORDERS[0]?.id ?? null)
  const { language } = useLanguage()

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-icons-nautral-light" />
          <input
            type="text"
            placeholder={t("searchOrders", language)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-borders-base-base bg-surface-base-base text-sm focus:outline-none focus:ring-2 focus:ring-solid-primary-base focus:ring-offset-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10">
            <Calendar className="w-4 h-4" />
            {t("dateFilter", language)}
          </Button>
          <label className="flex items-center gap-2 text-sm text-text-neutral-base cursor-pointer">
            <input type="checkbox" className="rounded border-borders-base-base" />
            {t("showOrdersFromStore", language)}
          </label>
          <select className="h-10 px-3 rounded-md border border-borders-base-base bg-surface-base-base text-sm focus:outline-none focus:ring-2 focus:ring-solid-primary-base">
            <option>Status</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-text-neutral-base">{ORDERS.length} {t("ordersCount", language)}</p>

      {/* Order Accordions */}
      <Card className="p-0 overflow-hidden rounded-lg">
        {ORDERS.map((order) => {
          const productTotal = order.products.reduce((s, p) => s + p.lineTotal, 0)
          return (
            <Accordion
              key={order.id}
              chevronPosition="left"
              title={
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 w-full pr-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-solid-primary-base">#{order.id}</span>
                      <span className="text-text-neutral-base">{order.projectName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-neutral-light">{order.storeName}</span>
                      <Badge className={cn("shrink-0 text-sm normal-case", STATUS_STYLES[order.status])}>
                        {getOrderStatusLabel(order.status, language)}
                      </Badge>
                    </div>
                  </div>
                  <span className="font-bold text-text-neutral-black shrink-0">{formatPrice(order.netSum)} kr</span>
                </div>
              }
              isOpen={openId === order.id}
              onToggle={() => setOpenId(openId === order.id ? null : order.id)}
            >
              <div className="space-y-4 pt-2">
                {/* Summary row */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-neutral-base">
                  <span><strong className="text-text-neutral-light">{t("orderDate", language)}:</strong> {order.orderDate}</span>
                  <span><strong className="text-text-neutral-light">{t("deliveryDate", language)}:</strong> {order.deliveryDate}</span>
                  <span><strong className="text-text-neutral-light">{t("requisitionNumber", language)}:</strong> {order.requisitionNo}</span>
                  <span><strong className="text-text-neutral-light">{t("contact", language)}:</strong> {order.contact}</span>
                  <span className="ml-auto font-bold text-text-neutral-black">{t("netSum", language)}: {formatPrice(order.netSum)} kr</span>
                </div>

                {order.products.length > 0 && (
                  <>
                    <div className="flex items-center justify-between py-2 px-4 bg-surface-base-accent rounded-lg">
                      <span className="text-sm font-bold text-text-neutral-light uppercase tracking-wider">{t("product", language)} ({order.products.length})</span>
                      <span className="text-sm font-bold text-text-neutral-black">{t("total", language)}: {formatPrice(productTotal)} kr</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-borders-base-base">
                            <th className="pb-3 pr-4 text-sm font-medium text-text-neutral-light uppercase">{t("product", language)}</th>
                            <th className="pb-3 pr-4 text-sm font-medium text-text-neutral-light uppercase w-24">NOBB</th>
                            <th className="pb-3 pr-4 text-sm font-medium text-text-neutral-light uppercase w-20 text-right">{t("qty", language)}</th>
                            <th className="pb-3 pr-4 text-sm font-medium text-text-neutral-light uppercase w-24 text-right">{t("unitPrice", language)}</th>
                            <th className="pb-3 text-sm font-medium text-text-neutral-light uppercase w-28 text-right">{t("lineTotal", language)}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((p) => (
                            <tr key={p.id} className="border-b border-borders-base-base last:border-0">
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-3">
                                  {p.imageUrl ? (
                                    <a href={p.productUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-base flex-shrink-0 overflow-hidden">
                                      <Image src={p.imageUrl} alt="" width={40} height={40} className="object-cover w-full h-full" />
                                    </a>
                                  ) : (
                                    <div className="w-10 h-10 rounded border border-borders-base-base bg-surface-base-base flex items-center justify-center flex-shrink-0 text-icons-nautral-light">
                                      <Package className="w-5 h-5" />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-medium text-text-neutral-black">{p.name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 pr-4 text-sm text-text-neutral-light">{p.nobb}</td>
                              <td className="py-3 pr-4 text-sm text-right">{p.qty} {p.unit}</td>
                              <td className="py-3 pr-4 text-sm text-right">{formatPrice(p.unitPrice)}</td>
                              <td className="py-3 text-sm font-medium text-right">{formatPrice(p.lineTotal)} kr</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {order.products.length === 0 && (
                  <p className="text-sm text-text-neutral-light py-4">{t("noProductsInOrder", language)}</p>
                )}
              </div>
            </Accordion>
          )
        })}
      </Card>
    </div>
  )
}
