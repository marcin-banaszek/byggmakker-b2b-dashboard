import * as React from "react"
import { cn } from "@/lib/utils"
import { LAYOUT_SHELL_CLASS } from "@/lib/layout"

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface ProjectTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}

export function ProjectTabs({ tabs, activeTab, onTabChange, className }: ProjectTabsProps) {
  return (
    <div className={cn("w-full border-b border-borders-base-base bg-surface-base-base", className)}>
      <div className={`${LAYOUT_SHELL_CLASS} flex items-center overflow-x-auto hide-scrollbar`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-6 py-4 text-base font-normal flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "border-solid-primary-base text-solid-primary-base"
                : "border-transparent text-text-neutral-black hover:text-solid-primary-base hover:border-borders-base-hover"
            )}
          >
            {tab.icon && (
              <span className={cn(
                "w-6 h-6 flex items-center justify-center shrink-0", 
                activeTab === tab.id ? "text-solid-primary-base" : "text-icons-nautral-light"
              )}>
                {React.cloneElement(
                  tab.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>,
                  { size: 24, strokeWidth: 1.5 }
                )}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
