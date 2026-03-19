import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export interface StoreHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  cartItemCount?: number
}

export function StoreHeader({
  logo,
  cartItemCount = 0,
  className,
  ...props
}: StoreHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-borders-base-base bg-surface-base-base",
        className
      )}
      {...props}
    >
      <div className="container mx-auto hidden justify-end gap-6 bg-surface-base-accent px-4 py-2 text-xs text-text-neutral-base md:flex">
        <a href="#" className="hover:text-text-link-hover">
          Asiakaspalvelu
        </a>
        <a href="#" className="hover:text-text-link-hover">
          Myymalat
        </a>
        <a href="#" className="font-medium hover:text-text-link-hover">
          B2B-Kirjaudu
        </a>
      </div>

      <div className="container mx-auto flex h-20 items-center gap-4 px-4 md:gap-8">
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>

        <div className="flex h-full flex-shrink-0 items-center">
          {logo ? (
            logo
          ) : (
            <div className="text-2xl font-black tracking-tighter text-text-neutral-black">
              BRAND<span className="text-icons-primary-default">.</span>
            </div>
          )}
        </div>

        <div className="relative ml-4 hidden max-w-2xl flex-1 items-center md:flex">
          <Input
            placeholder="Mita etsit? Etsi tuotteita tai merkkeja..."
            className="h-12 w-full rounded-full border-borders-base-hover bg-surface-base-base pl-4 pr-12 shadow-inner"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 h-10 w-10 rounded-full text-icons-nautral-base transition-transform active:scale-95 hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            className="hidden h-auto flex-col gap-1 rounded-lg px-3 py-2 text-text-neutral-black hover:bg-surface-base-accent lg:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs font-medium leading-none">Kirjaudu</span>
          </Button>

          <Button
            variant="ghost"
            className="relative flex h-auto flex-col gap-1 rounded-lg px-3 py-2 text-text-neutral-black hover:bg-surface-base-accent"
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-xs font-bold text-text-neutral-white ring-2 ring-surface-base-base">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden text-xs font-medium leading-none md:block">
              Ostoskori
            </span>
          </Button>
        </div>
      </div>

      <div className="border-t border-borders-base-base bg-surface-base-accent/30 p-3 md:hidden">
        <div className="relative flex items-center">
          <Input
            placeholder="Etsi tuotteita..."
            className="h-10 w-full rounded-full border-borders-base-hover pl-4 pr-10 text-sm shadow-inner"
          />
          <svg
            className="absolute right-3 text-icons-nautral-base"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
    </header>
  )
}
