/** Shared max-width + horizontal padding for header, footer, project header, and main content */
export const LAYOUT_SHELL_CLASS = "max-w-[1600px] mx-auto px-4 lg:px-8"

export const BYGGMAKKER_ORIGIN = "https://www.byggmakker.no"

/** Retail site logo (SVG) — used in header */
export const BYGGMAKKER_LOGO_SRC = `${BYGGMAKKER_ORIGIN}/static/images/logo.svg`

/** BM teardrop icon (local asset) — footer divider between pre-footer and link columns */
export const FOOTER_BM_ICON_SRC = "/images/byggmakker-bm-icon.svg"

export function byggmakkerUrl(path: string) {
  if (path.startsWith("http")) return path
  return `${BYGGMAKKER_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`
}
