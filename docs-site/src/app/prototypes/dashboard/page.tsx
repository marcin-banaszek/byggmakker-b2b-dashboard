"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ByggmakkerHeader } from "@/components/ecommerce/ByggmakkerHeader"
import { ByggmakkerFooter } from "@/components/ecommerce/ByggmakkerFooter"
import { DashboardSidebar } from "@/components/docs/DashboardSidebar"
import { StatsCard } from "@/components/docs/StatsCard"
import { DashboardTable } from "@/components/docs/DashboardTable"
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Briefcase, 
  FileText, 
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react"

// Mock Data for the B2B Dashboard
const projectData = [
  { id: "P-45021", name: "Oppussing Storgata 4", customer: "Bergen Boligutleie", status: "Aktiv", budget: "450 000 NOK", progress: 65 },
  { id: "P-45025", name: "Garasjebygging - Askøy", customer: "Privat - Hans Nilsen", status: "Planlagt", budget: "120 000 NOK", progress: 0 },
  { id: "P-45019", name: "Nytt bad - Fana", customer: "Fana Kommune", status: "Fullført", budget: "85 000 NOK", progress: 100 },
  { id: "P-45030", name: "Takskifte - Sotra", customer: "Privat - Kari Jensen", status: "Aktiv", budget: "210 000 NOK", progress: 20 },
]

const recentOrders = [
  { id: "ORD-9921", date: "16.03.2026", project: "Storgata 4", amount: "14 200 NOK", status: "Levert" },
  { id: "ORD-9915", date: "14.03.2026", project: "Fana", amount: "3 500 NOK", status: "Under behandling" },
  { id: "ORD-9899", date: "10.03.2026", project: "Storgata 4", amount: "22 100 NOK", status: "Levert" },
]

export default function B2BDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
      {/* Global Brand Header */}
      <ByggmakkerHeader />

      {/* Main Dashboard Layout */}
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full pt-6 px-4 gap-6 pb-20">
        {/* Navigation Sidebar */}
        <DashboardSidebar className="hidden lg:flex" />

        {/* Content Area */}
        <main className="flex-1 space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#333333] tracking-tight uppercase">Oversikt: Prosjektledelse</h1>
              <p className="text-sm text-[#888888]">Velkommen tilbake, Snekker Jensen AS</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e5e5] text-xs font-bold uppercase tracking-wider text-[#333333] rounded-sm hover:bg-[#f8f8f8] transition-colors shadow-sm">
                <Calendar className="h-4 w-4" />
                Rapport
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#cf0000] text-xs font-bold uppercase tracking-wider text-white rounded-sm hover:bg-[#a30000] transition-colors shadow-sm">
                <Plus className="h-4 w-4 text-white" />
                Nytt Prosjekt
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Aktive Prosjekter" 
              value="8" 
              description="2 over tidsfrist" 
              icon={Briefcase} 
              trend={{ value: "15%", positive: true }}
            />
            <StatsCard 
              title="Månedens Omsetning" 
              value="842 500 NOK" 
              description="Mars 2026" 
              icon={FileText} 
              trend={{ value: "4%", positive: true }}
            />
            <StatsCard 
              title="Ubetalte Fakturaer" 
              value="12" 
              description="Totalt: 145 000 NOK" 
              icon={AlertCircle} 
            />
            <StatsCard 
              title="Team Medlemmer" 
              value="24" 
              description="6 på omlogging" 
              icon={CheckCircle2} 
            />
          </div>

          {/* Projects Table */}
          <DashboardTable 
            title="Mine Siste Prosjekter"
            data={projectData}
            columns={[
              { header: "ID", accessor: "id" },
              { 
                header: "Prosjektnavn", 
                accessor: "name",
                cell: (item) => (
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-xs text-text-neutral-light">{item.customer}</span>
                  </div>
                )
              },
              { 
                header: "Status", 
                accessor: "status",
                cell: (item) => (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-bold uppercase",
                    item.status === "Aktiv" ? "bg-blue-50 text-blue-700" : 
                    item.status === "Fullført" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                  )}>
                    {item.status}
                  </span>
                )
              },
              { header: "Budsjett", accessor: "budget" },
              { 
                header: "Fremdrift", 
                accessor: "progress",
                cell: (item) => (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-24">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          item.progress === 100 ? "bg-green-500" : "bg-[#cf0000]"
                        )} 
                        style={{ width: `${item.progress}%` }} 
                      />
                    </div>
                    <span className="text-xs font-bold w-8">{item.progress}%</span>
                  </div>
                )
              }
            ]}
          />

          {/* Bottom Grid: Recent Orders & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardTable 
              title="Siste Ordre"
              data={recentOrders}
              columns={[
                { header: "Ordre ID", accessor: "id" },
                { header: "Prosjekt", accessor: "project" },
                { header: "Beløp", accessor: "amount" },
                { 
                  header: "Status", 
                  accessor: "status",
                  cell: (item) => (
                    <div className="flex items-center gap-1.5 italic text-[#888888]">
                      {item.status === "Levert" ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <Clock className="h-3 w-3" />}
                      {item.status}
                    </div>
                  )
                }
              ]}
            />
            
            <div className="bg-[#333333] rounded-sm p-8 text-white flex flex-col justify-center items-center text-center">
              <Plus className="h-12 w-12 text-[#cf0000] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Opprett handleliste</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-sm">
                Samle alle varene du trenger til ditt neste prosjekt på ett sted for enklere bestilling.
              </p>
              <button className="px-8 py-3 bg-[#cf0000] hover:bg-[#a30000] text-sm font-black uppercase tracking-widest transition-colors rounded-sm shadow-xl shadow-red-900/20">
                Gå til handlelister
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Global Brand Footer */}
      <ByggmakkerFooter />
    </div>
  )
}
