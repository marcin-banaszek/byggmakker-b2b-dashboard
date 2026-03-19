"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  code: string;
}

export function ComponentPreview({
  name,
  code,
  children,
  className,
  ...props
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <div
      className={cn("group flex flex-col space-y-4 my-8 rounded-lg border border-borders-base-base bg-surface-base-base relative", className)}
      {...props}
    >
      <div className="flex border-b border-borders-base-base bg-surface-base-accent px-4 py-2 rounded-t-lg">
        <div className="flex space-x-2">
            <button 
                onClick={() => setTab("preview")}
                className={cn("text-sm px-3 py-1 rounded-md transition-colors", tab === "preview" ? "bg-surface-base-base shadow-sm text-text-neutral-black font-medium" : "text-text-neutral-base hover:text-text-neutral-black")}
            >
                Preview
            </button>
            <button 
                onClick={() => setTab("code")}
                className={cn("text-sm px-3 py-1 rounded-md transition-colors", tab === "code" ? "bg-surface-base-base shadow-sm text-text-neutral-black font-medium" : "text-text-neutral-base hover:text-text-neutral-black")}
            >
                Code
            </button>
        </div>
      </div>
      
      {tab === "preview" ? (
        <div className="p-10 flex min-h-[350px] w-full justify-center items-center bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center bg-surface-base-base relative">
          <div className="absolute inset-0 bg-surface-base-base/80 z-0"></div>
          <div className="relative z-10 w-full flex justify-center">{children}</div>
        </div>
      ) : (
        <div className="p-4 bg-[var(--colors-black-black)] rounded-b-lg overflow-x-auto text-sm">
            <pre className="text-[var(--colors-neutrals-300)] font-mono leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
      )}
    </div>
  )
}
