"use client"

import * as React from "react"
import { 
  TrendingUp, 
  Leaf, 
  Package, 
  LayoutDashboard, 
  Box, 
  ShoppingCart, 
  CalendarDays, 
  Clock, 
  FileText 
} from "lucide-react"

import { ProgressWidget } from "@/components/ProgressWidget"
import { ProjectTabs } from "@/components/ProjectTabs"
import { CalculatedMaterialsView } from "@/components/CalculatedMaterialsView"
import { OverviewWidgets } from "@/components/OverviewWidgets"
import { ProductsView } from "@/components/ProductsView"
import { PlannedPurchasesView } from "@/components/PlannedPurchasesView"
import { OrderHistoryView } from "@/components/OrderHistoryView"
import { DocumentsView } from "@/components/DocumentsView"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"
import { LAYOUT_SHELL_CLASS } from "@/lib/layout"

// Define the available application views
type ViewState = 'overview' | 'materials' | 'products' | 'planned' | 'history' | 'documents'

export default function DashboardPage() {
  const [activeView, setActiveView] = React.useState<ViewState>('overview')
  const { language } = useLanguage()

  const tabs = [
    { id: 'overview', label: t("overview", language), icon: <LayoutDashboard /> },
    { id: 'materials', label: t("calculatedMaterials", language), icon: <Box /> },
    { id: 'products', label: t("products", language), icon: <ShoppingCart /> },
    { id: 'planned', label: t("plannedPurchases", language), icon: <CalendarDays /> },
    { id: 'history', label: t("orderHistory", language), icon: <Clock /> },
    { id: 'documents', label: t("documents", language), icon: <FileText /> },
  ]

  return (
    <div className="w-full pb-20">
      
      {/* Top KPI Widgets */}
      <div className="w-full bg-surface-base-base">
        <div className={`${LAYOUT_SHELL_CLASS} py-6 grid grid-cols-1 md:grid-cols-3 gap-6`}>
          <ProgressWidget 
          title={t("totalBudgetSpent", language)}
          icon={<TrendingUp className="w-4 h-4 text-status-error" />}
          value={
            <div className="flex items-baseline gap-1">
              <span>€45 000</span>
              <span className="text-text-neutral-light font-medium text-lg">/ €80 000</span>
            </div>
          }
          progress={56}
          progressColor="bg-solid-primary-base"
          progressLabelLeft={`€35,000 ${t("remaining", language)}`}
          progressLabelRight={t("budget", language)}
          badgeText="56%"
          badgeColor="text-text-neutral-light"
        />

        <ProgressWidget 
          title={t("estimatedCO2Footprint", language)}
          icon={<Leaf className="w-4 h-4 text-status-success" />}
          value={
            <div className="flex items-baseline gap-1">
              <span>1,2</span>
              <span className="text-sm font-medium text-text-neutral-base">{t("tonnesCO2", language)}</span>
            </div>
          }
          progress={33}
          progressColor="bg-status-success"
          progressLabelLeft={t("belowIndustryAverage", language)}
          progressLabelRight={`● ${t("ecoFriendly", language)}`}
          badgeText="Low"
          badgeColor="text-status-success"
        />

        <ProgressWidget 
          title={t("materialFulfillment", language)}
          icon={<Package className="w-4 h-4 text-status-warning" />}
          value="65%"
          subtext={t("complete", language)}
          progress={65}
          progressColor="bg-status-warning"
          progressLabelLeft={`4 ${t("itemsPending", language)}`}
          progressLabelRight={`● ${t("inProgress", language)}`}
          badgeText={t("itemsCountBadge", language)}
          badgeColor="text-text-neutral-light"
        />
        </div>
      </div>

      {/* Navigation Tabs */}
      <ProjectTabs 
        tabs={tabs} 
        activeTab={activeView} 
        onTabChange={(id) => setActiveView(id as ViewState)} 
      />

      {/* Main Content Area based on active view */}
      <div className={`${LAYOUT_SHELL_CLASS} py-8 w-full`}>
        
        {activeView === 'overview' && (
          <div className="animate-in fade-in duration-300">
             <OverviewWidgets />
          </div>
        )}

        {activeView === 'materials' && (
          <div className="animate-in fade-in duration-300">
             <CalculatedMaterialsView />
          </div>
        )}

        {activeView === 'products' && (
          <div className="animate-in fade-in duration-300">
             <ProductsView />
          </div>
        )}
        
        {activeView === 'planned' && (
          <div className="animate-in fade-in duration-300">
             <PlannedPurchasesView />
          </div>
        )}

        {activeView === 'history' && (
          <div className="animate-in fade-in duration-300">
             <OrderHistoryView />
          </div>
        )}

        {activeView === 'documents' && (
          <div className="animate-in fade-in duration-300">
            <DocumentsView />
          </div>
        )}

      </div>

    </div>
  )
}
