import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-surface-base-base",
  {
    variants: {
      variant: {
        // These map directly to the CSS tokens we generated.
        default: "bg-solid-primary-base text-text-neutral-white hover:bg-solid-primary-hover active:bg-solid-primary-pressed",
        secondary: "bg-solid-secondary-base text-text-neutral-white hover:bg-solid-secondary-hover active:bg-solid-secondary-pressed",
        outline: "border-2 border-borders-base-hover bg-transparent text-text-neutral-black hover:bg-surface-base-hover hover:border-borders-base-pressed",
        ghost: "bg-transparent text-text-neutral-black hover:bg-surface-base-hover",
      },
      size: {
        default: "h-12 py-2 px-6 text-base", // Tappable area for mobile E-com
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg font-bold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
