import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  brandName?: string
  imageUrl: string
  price: number
  unit?: string
  unitPrice?: number
  unitPriceLabel?: string
  inStock?: boolean
  badgeLabel?: string
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
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("fi-FI", {
      style: "currency",
      currency: "EUR",
    }).format(value)

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-borders-base-base bg-surface-base-base p-4 transition-all hover:border-borders-base-hover hover:shadow-sm",
        className
      )}
      {...props}
    >
      <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-surface-base-accent">
        {badgeLabel && (
          <Badge variant="campaign" className="absolute left-2 top-2 z-10">
            {badgeLabel}
          </Badge>
        )}
        <img
          src={imageUrl}
          alt={title}
          className="h-4/5 w-4/5 object-contain mix-blend-multiply transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col">
        {brandName && (
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-neutral-light">
            {brandName}
          </span>
        )}
        <h3 className="mb-3 line-clamp-2 text-base font-medium leading-snug text-text-neutral-black">
          {title}
        </h3>

        <div className="mb-4 mt-auto flex flex-col gap-1">
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold leading-none text-text-neutral-black">
              {formatPrice(price)}
            </span>
            <span className="mb-0.5 text-sm font-normal text-text-neutral-base">
              / {unit}
            </span>
          </div>

          {unitPrice && unitPriceLabel && (
            <span className="text-xs text-text-neutral-base">
              {formatPrice(unitPrice)} {unitPriceLabel}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-borders-base-base pt-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                inStock ? "bg-status-success" : "bg-status-error"
              )}
            />
            <span className="text-xs font-medium text-text-neutral-base">
              {inStock ? "Varastossa" : "Tilapäisesti loppu"}
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            disabled={!inStock}
            className="px-3"
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
