import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  indicatorClassName?: string
}

export function Progress({
  value = 0,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-surface-base-pressed",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full w-full flex-1 transition-all duration-500", indicatorClassName)}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
}
