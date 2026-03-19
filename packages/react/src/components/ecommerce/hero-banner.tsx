import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

export interface HeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string
  subheadline?: string
  ctaText: string
  imageUrl: string
  imageAlt?: string
  layout?: "split" | "overlay"
}

export function HeroBanner({
  headline,
  subheadline,
  ctaText,
  imageUrl,
  imageAlt = "Campaign image",
  layout = "split",
  className,
  ...props
}: HeroBannerProps) {
  if (layout === "overlay") {
    return (
      <div
        className={cn(
          "relative flex h-[400px] w-full items-center overflow-hidden rounded-xl shadow-sm md:h-[500px]",
          className
        )}
        {...props}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-surface-base-darker/40" />
        <div className="relative z-10 max-w-2xl p-8 text-left md:p-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-text-neutral-white md:text-5xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mb-8 max-w-lg text-lg text-text-neutral-white/90 md:text-xl">
              {subheadline}
            </p>
          )}
          <Button size="lg" variant="default">
            {ctaText}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-borders-base-base bg-surface-base-base shadow-sm md:flex-row",
        className
      )}
      {...props}
    >
      <div className="order-2 flex flex-1 flex-col justify-center p-8 md:order-1 md:p-16">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-text-neutral-black md:text-5xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mb-8 max-w-md text-base leading-relaxed text-text-neutral-base md:text-lg">
            {subheadline}
          </p>
        )}
        <div className="mt-auto md:mt-0">
          <Button size="lg" variant="default">
            {ctaText}
          </Button>
        </div>
      </div>
      <div className="relative order-1 min-h-[300px] flex-1 bg-surface-base-accent md:order-2">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
