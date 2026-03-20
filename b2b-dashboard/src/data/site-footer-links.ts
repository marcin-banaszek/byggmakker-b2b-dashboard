import type { Language } from "@/contexts/LanguageContext"
import { byggmakkerUrl } from "@/lib/layout"

export type FooterLink = { href: string; label: Record<Language, string> }

export type FooterColumn = { title: Record<Language, string>; links: FooterLink[] }

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: { no: "Kundeservice", en: "Customer service" },
    links: [
      { href: "/varehus", label: { no: "Butikker og åpningstider", en: "Stores & opening hours" } },
      { href: "/side/kontakt-oss", label: { no: "Kontakt oss", en: "Contact us" } },
      { href: "/side/betingelser", label: { no: "Betingelser", en: "Terms & conditions" } },
      { href: "/login", label: { no: "Min Side", en: "My account" } },
      { href: "/side/personvern", label: { no: "Personvern", en: "Privacy" } },
      {
        href: "/side/viktig-informasjon-om-elektriske-produkter",
        label: { no: "Informasjon om elektriske produkter", en: "Electrical product information" },
      },
      { href: "/info/informasjonskapsler", label: { no: "Informasjonskapsler", en: "Cookies" } },
      { href: "/side/postnummer-koordinater", label: { no: "Postnummer koordinater", en: "Postcode coordinates" } },
      { href: "/info/tilgjengelighetserklaering", label: { no: "Tilgjengelighetserklæring", en: "Accessibility statement" } },
    ],
  },
  {
    title: { no: "Tjenester", en: "Services" },
    links: [
      { href: "/proff/tjenester", label: { no: "Tjenester", en: "Services" } },
      { href: "/tjenester/fiks-ferdig", label: { no: "Fiks Ferdig", en: "Fiks Ferdig" } },
      { href: "/tjenester/gavekort", label: { no: "Gavekort", en: "Gift card" } },
      { href: "/rad-og-guider", label: { no: "Inspirasjon", en: "Inspiration" } },
    ],
  },
  {
    title: { no: "Byggmakker", en: "Byggmakker" },
    links: [
      { href: "/info/om-byggmakker", label: { no: "Om Byggmakker", en: "About Byggmakker" } },
      { href: "/info/miljo-og-baerekraft", label: { no: "Miljø- og bærekraft", en: "Environment & sustainability" } },
      { href: "/side/bli-medlem-i-byggmakker-kjeden", label: { no: "Bli medlem", en: "Become a member" } },
      { href: "/side/ledige-stillinger", label: { no: "Ledige stillinger", en: "Careers" } },
      { href: "/proff", label: { no: "Bli proff kunde", en: "Become a pro customer" } },
      { href: "/side/for-leverandor", label: { no: "For leverandører", en: "For suppliers" } },
    ],
  },
]

export function resolveFooterHref(href: string) {
  return byggmakkerUrl(href)
}
