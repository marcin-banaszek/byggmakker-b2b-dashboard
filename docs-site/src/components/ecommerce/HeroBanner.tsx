import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export interface HeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string
  subheadline?: string
  ctaText: string
  ctaLink?: string
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
        className={cn("relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm flex items-center", className)}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-surface-base-darker/40" />
        
        <div className="relative z-10 p-8 md:p-16 max-w-2xl text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-neutral-white mb-4 tracking-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-lg md:text-xl text-text-neutral-white/90 mb-8 max-w-lg">
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

  // Split layout (Default for hardware stores indicating clear product focus)
  return (
    <div 
      className={cn("flex flex-col md:flex-row w-full rounded-xl overflow-hidden shadow-sm bg-surface-base-base border border-borders-base-base", className)}
      {...props}
    >
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
        <h1 className="text-3xl md:text-5xl font-extrabold text-text-neutral-black mb-4 tracking-tight leading-tight">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-base md:text-lg text-text-neutral-base mb-8 max-w-md leading-relaxed">
            {subheadline}
          </p>
        )}
        <div className="mt-auto md:mt-0">
          <Button size="lg" variant="default">
            {ctaText}
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-[300px] bg-surface-base-accent relative order-1 md:order-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
