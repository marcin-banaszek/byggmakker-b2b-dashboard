import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, Progress } from "@kesko/ds-react"

interface ProgressWidgetProps {
  title: string
  icon: React.ReactNode
  value: string | React.ReactNode
  subtext?: string
  progress: number
  progressColor: string
  progressBg?: string
  progressLabelLeft?: string
  progressLabelRight?: string
  badgeText?: string
  badgeColor?: string
  className?: string
}

export function ProgressWidget({
  title,
  icon,
  value,
  subtext,
  progress,
  progressColor,
  progressBg,
  progressLabelLeft,
  progressLabelRight,
  badgeText,
  badgeColor,
  className
}: ProgressWidgetProps) {
  return (
    <Card className={cn("min-h-[160px] flex flex-col justify-between", className)}>
      <CardHeader className="p-6 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-text-neutral-base">{title}</span>
          </div>
          {badgeText && (
            <span className={cn("text-sm font-medium", badgeColor)}>
              {badgeText}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-text-neutral-black tracking-tight leading-none">{value}</span>
            {subtext && <span className="text-sm font-medium text-text-neutral-light">{subtext}</span>}
          </div>

          <div className="space-y-2">
            <Progress 
              value={progress} 
              indicatorClassName={progressColor} 
              className={cn("h-2", progressBg)}
            />
            
            {(progressLabelLeft || progressLabelRight) && (
              <div className="flex justify-between items-center text-sm text-text-neutral-light">
                <span>{progressLabelLeft}</span>
                <span>{progressLabelRight}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
