import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  chevronPosition?: "left" | "right"
}

export function Accordion({
  title,
  children,
  isOpen,
  onToggle,
  chevronPosition = "right",
  className,
  ...props
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isExpanded = isOpen !== undefined ? isOpen : internalOpen
  const toggle = onToggle !== undefined ? onToggle : () => setInternalOpen(!internalOpen)

  const chevron = (
    <ChevronDown
      className={cn(
        "h-5 w-5 shrink-0 text-icons-nautral-light transition-transform duration-200",
        isExpanded && "rotate-180"
      )}
    />
  )

  return (
    <div className={cn("last:border-0 border-b border-borders-base-base", className)} {...props}>
      <button
        onClick={toggle}
        className="group flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-surface-base-hover"
      >
        {chevronPosition === "left" && chevron}
        <div className="flex-1 min-w-0">{title}</div>
        {chevronPosition === "right" && chevron}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isExpanded ? "max-h-[3000px] px-4 pb-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}
