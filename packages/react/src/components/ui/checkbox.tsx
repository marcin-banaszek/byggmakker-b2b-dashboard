import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className={cn(
          "peer h-5 w-5 cursor-pointer appearance-none rounded border border-borders-base-base bg-surface-base-base outline-none transition-all checked:border-solid-primary-base checked:bg-solid-primary-base focus:ring-2 focus:ring-solid-primary-base focus:ring-offset-2",
          className
        )}
        {...props}
      />
      <Check
        className="pointer-events-none absolute left-1 top-1 h-3 w-3 text-text-neutral-white opacity-0 transition-opacity peer-checked:opacity-100"
        strokeWidth={4}
      />
    </div>
  )
}
