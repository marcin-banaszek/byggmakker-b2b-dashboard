import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft,
  Search,
  Bell
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Oversikt", active: true },
  { icon: Briefcase, label: "Mine Prosjekter" },
  { icon: FileText, label: "Tilbud & Ordre" },
  { icon: FileText, label: "Fakturaer" },
  { icon: ShoppingCart, label: "Handlelister" },
  { icon: Users, label: "Team" },
  { icon: Settings, label: "Innstillinger" },
]

export function DashboardSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64 bg-[#f8f8f8] border-r border-[#e5e5e5] flex flex-col h-full", className)}>
      <div className="p-6">
        <h2 className="text-xs font-bold text-text-neutral-light uppercase tracking-[1.5px] mb-6">Prosjektstyring</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                item.active 
                  ? "bg-white text-[#cf0000] shadow-sm border border-[#eeeeee]" 
                  : "text-[#555555] hover:bg-[#efefef] hover:text-[#333333]"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.active ? "text-[#cf0000]" : "text-[#888888]")} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-[#e5e5e5]">
        <div className="bg-[#333333] rounded-lg p-4 text-white">
          <p className="text-xs font-bold mb-1">Proff Support</p>
          <p className="text-xs text-text-neutral-light mb-3">Trenger du hjelp med et prosjekt?</p>
          <button className="w-full py-2 bg-[#cf0000] text-xs font-bold rounded hover:bg-[#a30000] transition-colors">
            Kontakt din KAM
          </button>
        </div>
      </div>
    </aside>
  )
}
