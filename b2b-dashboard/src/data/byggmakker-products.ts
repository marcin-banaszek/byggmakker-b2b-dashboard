/**
 * Real product data from byggmakker.no (prices and names as of March 2026)
 * Product images use Byggmakker's Keskofiles CDN
 */

const IMAGE_BASE = "https://public.keskofiles.com/f/btt"
/** Use fit=contain to show full product without cropping - prioritizes actual product over lifestyle crop */
const imageUrl = (assetId: string, w = 215, h = 152) =>
  `${IMAGE_BASE}/${assetId}?auto=format&bg=fff&dpr=1&fit=contain&h=${h}&q=80&w=${w}`

export interface ByggmakkerProduct {
  id: string
  name: string
  nobb: string
  category: string
  unit: string
  pricePerUnit: number
  imageUrl: string
  productUrl: string
}

/** Products for Calculated Materials, Planned Purchases, Documents */
export const BYGGMAKKER_PRODUCTS: ByggmakkerProduct[] = [
  {
    id: "7052870166945",
    name: "Laminatgulv 1-stav Original Elegant Eik Natur - BerryAlloc",
    nobb: "7052870166945",
    category: "Laminatgulv",
    unit: "m²",
    pricePerUnit: 351.2,
    imageUrl: imageUrl("ASSET_MISC_23177358"),
    productUrl: "https://www.byggmakker.no/produkt/laminatgulv-1-stav-original-elegant-eik-natur-berryalloc/7052870166945",
  },
  {
    id: "20108",
    name: "Maling Lady Wonderwall Matt 2,7L - Jotun",
    nobb: "20108",
    category: "Interiørmaling",
    unit: "Spann",
    pricePerUnit: 399,
    imageUrl: imageUrl("ASSET_MISC_43799218"),
    productUrl: "https://www.byggmakker.no/produkt/maling-lady-wonderwall-matt-27l-jotun/20108",
  },
  {
    id: "9007022640284",
    name: "Laminatgulv 1-stav Torino Aqua - Cello",
    nobb: "9007022640284",
    category: "Laminatgulv",
    unit: "m²",
    pricePerUnit: 199,
    imageUrl: imageUrl("ASSET_MISC_24892821"),
    productUrl: "https://www.byggmakker.no/produkt/laminatgulv-1-stav-torino-aqua-cello/9007022640284",
  },
  {
    id: "7331041141234",
    name: "Vinylgulv Maxwear eik raw 10mm - Golvabia",
    nobb: "7331041141234",
    category: "Vinylgulv",
    unit: "m²",
    pricePerUnit: 549,
    imageUrl: imageUrl("ASSET_MISC_24892823"),
    productUrl: "https://www.byggmakker.no/produkt/vinylgulv-maxwear-eik-raw-10mm-golvabia/7331041141234",
  },
  {
    id: "7070838006102",
    name: "Smartpanel MDF - Skygge Bomull",
    nobb: "7070838006102",
    category: "Takpanel",
    unit: "m²",
    pricePerUnit: 135.2,
    imageUrl: imageUrl("ASSET_MISC_24892824"),
    productUrl: "https://www.byggmakker.no/produkt/smartpanel-mdf-skygge-bomull/7070838006102",
  },
  {
    id: "811",
    name: "Maling Lady Essence 2,7L - Jotun",
    nobb: "811",
    category: "Interiørmaling",
    unit: "Spann",
    pricePerUnit: 299,
    imageUrl: imageUrl("ASSET_MISC_24892826"),
    productUrl: "https://www.byggmakker.no/produkt/maling-lady-essence-27l-jotun/811",
  },
  {
    id: "166",
    name: "Maling Lady Balance 2,7L - Jotun",
    nobb: "166",
    category: "Interiørmaling",
    unit: "Spann",
    pricePerUnit: 399,
    imageUrl: imageUrl("ASSET_MISC_30938917"),
    productUrl: "https://www.byggmakker.no/produkt/maling-lady-balance-27l-jotun/166",
  },
  {
    id: "88381826433",
    name: "Borskrutrekker DDF484RTJ 18V - Makita",
    nobb: "88381826433",
    category: "Verktøy",
    unit: "Stykk",
    pricePerUnit: 3690,
    imageUrl: imageUrl("ASSET_MISC_32701339"),
    productUrl: "https://www.byggmakker.no/produkt/borskrutrekker-ddf484rtj-18v-makita/88381826433",
  },
  {
    id: "88381741316",
    name: "Multiverktøy DTM52Z Starlock Max - Makita",
    nobb: "88381741316",
    category: "Verktøy",
    unit: "Stykk",
    pricePerUnit: 2490,
    imageUrl: imageUrl("ASSET_JPEG_49184270"),
    productUrl: "https://www.byggmakker.no/produkt/multiverktoy-dtm52z-starlock-max-makita/88381741316",
  },
  {
    id: "6411501437204",
    name: "Snømåke snølett classic 0855 - Fiskars",
    nobb: "6411501437204",
    category: "Snøredskap",
    unit: "Stykk",
    pricePerUnit: 299,
    imageUrl: imageUrl("ASSET_JPEG_49184267"),
    productUrl: "https://www.byggmakker.no/produkt/snomake-snolett-classic-0855-fiskars/6411501437204",
  },
]

/** Materials for construction project (calculated from BIM) - uses real Byggmakker products */
export const CALCULATED_MATERIALS = BYGGMAKKER_PRODUCTS.slice(0, 5).map((p, i) => ({
  ...p,
  calculatedQty: [500, 200, 20, 6, 142][i] as number,
  orderedQty: [300, 200, 0, 2, 142][i] as number,
}))

/** Get product by id */
export function getProductById(id: string) {
  return BYGGMAKKER_PRODUCTS.find((p) => p.id === id)
}

/** Products for Documents tab with doc badges */
export function getProductsForDocuments() {
  return BYGGMAKKER_PRODUCTS.map((p, i) => ({
    ...p,
    badges: i < 7 ? ["pb", "yte", "fdv", "epd", "hms"].slice(0, 2 + (i % 4)) : null,
  }))
}

/** Planned purchase list products - real Byggmakker products with quantities */
export const PLANNED_PURCHASE_PRODUCTS = [
  [
    { ...BYGGMAKKER_PRODUCTS[5], qty: 40, unit: "sekk", unitPrice: 189 },
    { ...BYGGMAKKER_PRODUCTS[3], qty: 120, unit: "stk", unitPrice: 45 },
    { ...BYGGMAKKER_PRODUCTS[0], qty: 200, unit: "m²", unitPrice: 351.2 },
    { ...BYGGMAKKER_PRODUCTS[4], qty: 50, unit: "m", unitPrice: 128 },
    { ...BYGGMAKKER_PRODUCTS[6], qty: 8, unit: "rulle", unitPrice: 2861 },
  ],
  [
    { ...BYGGMAKKER_PRODUCTS[1], qty: 200, unit: "Stykk", unitPrice: 399 },
    { ...BYGGMAKKER_PRODUCTS[3], qty: 20, unit: "Pakke", unitPrice: 549 },
    { ...BYGGMAKKER_PRODUCTS[6], qty: 142, unit: "stk", unitPrice: 299 },
    { ...BYGGMAKKER_PRODUCTS[7], qty: 4, unit: "pkts", unitPrice: 3690 },
  ],
  [
    { ...BYGGMAKKER_PRODUCTS[4], qty: 120, unit: "m", unitPrice: 135.2 },
    { ...BYGGMAKKER_PRODUCTS[5], qty: 24, unit: "stk", unitPrice: 399 },
    { ...BYGGMAKKER_PRODUCTS[6], qty: 1, unit: "stk", unitPrice: 22064 },
  ],
].map((list) =>
  list.map((p) => ({ ...p, sum: p.qty * p.unitPrice }))
)
