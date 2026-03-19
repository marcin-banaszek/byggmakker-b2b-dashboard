import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-xs font-medium text-text-neutral-light",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <ChevronRight className="h-3 w-3 text-icons-nautral-light" />}
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                "transition-colors hover:text-text-neutral-black",
                item.active && "font-semibold text-text-neutral-black"
              )}
            >
              {item.label}
            </a>
          ) : (
            <span className={cn(item.active && "font-semibold text-text-neutral-black")}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
