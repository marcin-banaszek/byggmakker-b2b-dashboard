import * as React from "react"
import { cn } from "@/lib/utils"

export interface CategoryTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon?: React.ReactNode
  imageUrl?: string
}

export function CategoryTile({
  title,
  icon,
  imageUrl,
  className,
  ...props
}: CategoryTileProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-center p-6 text-center cursor-pointer rounded-xl border border-borders-base-base bg-surface-base-base transition-all hover:border-borders-base-pressed hover:shadow-md hover:-translate-y-1 h-full min-h-[160px]",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-base-accent text-icons-primary-default group-hover:scale-110 transition-transform duration-300">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-10 w-10 object-contain mix-blend-multiply" />
        ) : icon ? (
          icon
        ) : (
          <div className="h-8 w-8 bg-borders-base-disabled rounded-sm" /> // fallback
        )}
      </div>
      <h3 className="text-sm md:text-base font-semibold text-text-neutral-black">
        {title}
      </h3>
    </div>
  )
}
