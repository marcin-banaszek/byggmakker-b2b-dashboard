import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, description, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-sm border border-[#e5e5e5] shadow-sm", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-text-neutral-light uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-black text-[#333333]">{value}</h3>
        </div>
        <div className="p-2 bg-[#f8f8f8] rounded-sm">
          <Icon className="h-5 w-5 text-[#333333]" />
        </div>
      </div>
      
      {(description || trend) && (
        <div className="flex items-center gap-2">
          {trend && (
            <span className={cn(
              "text-xs font-bold px-1.5 py-0.5 rounded-full",
              trend.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}>
              {trend.positive ? "+" : "-"}{trend.value}
            </span>
          )}
          {description && <p className="text-xs text-text-neutral-light font-medium">{description}</p>}
        </div>
      )}
    </div>
  )
}
