import * as React from "react"
import { cn } from "../../lib/utils"

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
        "group flex h-full min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-borders-base-base bg-surface-base-base p-6 text-center transition-all hover:-translate-y-1 hover:border-borders-base-pressed hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-base-accent text-icons-primary-default transition-transform duration-300 group-hover:scale-110">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-10 w-10 object-contain mix-blend-multiply"
          />
        ) : icon ? (
          icon
        ) : (
          <div className="h-8 w-8 rounded-sm bg-borders-base-disabled" />
        )}
      </div>
      <h3 className="text-sm font-semibold text-text-neutral-black md:text-base">
        {title}
      </h3>
    </div>
  )
}
