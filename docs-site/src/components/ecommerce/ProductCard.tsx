import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  brandName?: string
  imageUrl: string
  price: number
  unit?: string // e.g. "kpl", "m²", "pkt"
  unitPrice?: number // e.g. 14.50
  unitPriceLabel?: string // e.g. "€ / m²"
  inStock?: boolean
  badgeLabel?: string // e.g. "Kampanja"
}

export function ProductCard({
  title,
  brandName,
  imageUrl,
  price,
  unit = "kpl",
  unitPrice,
  unitPriceLabel,
  inStock = true,
  badgeLabel,
  className,
  ...props
}: ProductCardProps) {
  // Format price helper (Finnish/Norwegian style)
  const formatPrice = (p: number) => new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(p)

  return (
    <div 
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-lg border border-borders-base-base bg-surface-base-base hover:border-borders-base-hover hover:shadow-sm transition-all p-4 h-full",
        className
      )}
      {...props}
    >
      {/* Top Image Area */}
      <div className="relative aspect-square w-full mb-4 bg-surface-base-accent rounded-md overflow-hidden flex items-center justify-center">
        {badgeLabel && (
          <Badge variant="campaign" className="absolute top-2 left-2 z-10">
            {badgeLabel}
          </Badge>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-contain w-4/5 h-4/5 mix-blend-multiply transition-transform group-hover:scale-105" 
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        {brandName && (
          <span className="text-xs uppercase tracking-wide text-text-neutral-light mb-1 font-semibold">
            {brandName}
          </span>
        )}
        <h3 className="text-base font-medium text-text-neutral-black leading-snug mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="mt-auto flex flex-col gap-1 mb-4">
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-text-neutral-black leading-none">
              {formatPrice(price)}
            </span>
            <span className="text-sm font-normal text-text-neutral-base mb-0.5">/ {unit}</span>
          </div>
          
          {/* Unit Pricing (Crucial for hardware / flooring) */}
          {unitPrice && unitPriceLabel && (
            <span className="text-xs text-text-neutral-base">
              {formatPrice(unitPrice)} {unitPriceLabel}
            </span>
          )}
        </div>

        {/* Stock & Action */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-borders-base-base">
          <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", inStock ? "bg-status-success" : "bg-status-error")} />
            <span className="text-xs text-text-neutral-base font-medium">
              {inStock ? "Varastossa" : "Tilapäisesti loppu"}
            </span>
          </div>
          <Button variant="default" size="sm" disabled={!inStock} className="px-3" aria-label="Add to cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
