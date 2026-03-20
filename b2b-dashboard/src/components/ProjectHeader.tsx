"use client"

import * as React from "react"
import { Settings, FileText, MapPin, Calendar, Users } from "lucide-react"
import { Breadcrumbs, Button, Badge } from "@kesko/ds-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"
import { LAYOUT_SHELL_CLASS } from "@/lib/layout"

export function ProjectHeader() {
  const { language } = useLanguage()

  const breadcrumbs = [
    { label: t("projects", language), href: "#" },
    { label: t("active", language), href: "#" },
    { label: "Villa Solbakken Renovation", active: true },
  ]

  return (
    <div className="w-full bg-surface-base-base border-b border-borders-base-base">
      <div className={`${LAYOUT_SHELL_CLASS} pt-6 pb-2 flex flex-col gap-4`}>
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Title & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-text-neutral-black">
                Villa Solbakken Renovation
              </h1>
              <Badge variant="outline" className="bg-surface-helpers-success text-text-helpers-success border-borders-color-success normal-case">
                {t("active", language)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-5 text-sm font-medium text-text-neutral-base">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-icons-nautral-light" />
                Storgata 12, Oslo
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-icons-nautral-light" />
                {t("started", language)} Jan 15, 2026
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-icons-nautral-light" />
                Hansen Bygg AS
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap h-10">
              <Settings className="w-4 h-4" />
              {t("projectSettings", language)}
            </Button>
            <Button size="sm" className="flex items-center gap-2 whitespace-nowrap h-10">
              <FileText className="w-4 h-4" />
              {t("generateQuote", language)}
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
