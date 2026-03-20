"use client"

import * as React from "react"
import { GlobalHeaderPrimary, GlobalHeaderSecondaryNav } from "@/components/GlobalHeader"

const SCROLL_THRESHOLD = 12
const SCROLL_DELTA = 4

export function SiteHeaderScroll() {
  const primaryRef = React.useRef<HTMLDivElement>(null)
  const secondaryMeasureRef = React.useRef<HTMLDivElement>(null)
  const [primaryH, setPrimaryH] = React.useState(0)
  const [secondaryH, setSecondaryH] = React.useState(0)
  const [secondaryNavVisible, setSecondaryNavVisible] = React.useState(true)
  const lastY = React.useRef(0)
  const ticking = React.useRef(false)

  React.useEffect(() => {
    const primary = primaryRef.current
    const secondary = secondaryMeasureRef.current
    if (!primary || !secondary) return

    const ro = new ResizeObserver(() => {
      setPrimaryH(primary.offsetHeight)
      setSecondaryH(secondary.offsetHeight)
    })
    ro.observe(primary)
    ro.observe(secondary)
    setPrimaryH(primary.offsetHeight)
    setSecondaryH(secondary.offsetHeight)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        ticking.current = false
        const y = window.scrollY
        const delta = y - lastY.current
        lastY.current = y

        if (y < SCROLL_THRESHOLD) {
          setSecondaryNavVisible(true)
        } else if (delta > SCROLL_DELTA) {
          setSecondaryNavVisible(false)
        } else if (delta < -SCROLL_DELTA) {
          setSecondaryNavVisible(true)
        }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const spacerHeight = primaryH + (secondaryNavVisible ? secondaryH : 0)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-base-base border-b border-borders-base-base">
        <div ref={primaryRef}>
          <GlobalHeaderPrimary />
        </div>
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none"
          style={{ maxHeight: secondaryNavVisible ? secondaryH : 0 }}
        >
          <div ref={secondaryMeasureRef}>
            <GlobalHeaderSecondaryNav />
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="shrink-0 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
        style={{ height: spacerHeight }}
      />
    </>
  )
}
