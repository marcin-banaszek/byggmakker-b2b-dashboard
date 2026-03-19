import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export interface StoreHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  cartItemCount?: number
}

export function StoreHeader({ logo, cartItemCount = 0, className, ...props }: StoreHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-borders-base-base bg-surface-base-base", className)} {...props}>
      {/* Top Utility Bar (Micro-nav) */}
      <div className="hidden bg-surface-base-accent px-4 py-2 text-xs text-text-neutral-base md:flex justify-end gap-6 container mx-auto">
        <a href="#" className="hover:text-text-link-hover">Asiakaspalvelu</a>
        <a href="#" className="hover:text-text-link-hover">Myymälät</a>
        <a href="#" className="hover:text-text-link-hover font-medium">B2B-Kirjaudu</a>
      </div>

      {/* Main Header Area */}
      <div className="container mx-auto flex h-20 items-center gap-4 md:gap-8 px-4">
        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center h-full">
          {logo ? logo : <div className="text-2xl font-black tracking-tighter text-text-neutral-black">BRAND<span className="text-icons-primary-default">.</span></div>}
        </div>

        {/* Search Bar (Molecule) */}
        <div className="hidden md:flex flex-1 max-w-2xl relative items-center ml-4">
          <Input 
            placeholder="Mitä etsit? Etsi tuotteita tai merkkejä..." 
            className="w-full pl-4 pr-12 rounded-full border-borders-base-hover bg-surface-base-base shadow-inner h-12"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 text-icons-nautral-base hover:bg-transparent rounded-full active:scale-95 transition-transform h-10 w-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          {/* Profile */}
          <Button variant="ghost" className="hidden lg:flex flex-col gap-1 h-auto py-2 px-3 text-text-neutral-black hover:bg-surface-base-accent rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-xs font-medium leading-none">Kirjaudu</span>
          </Button>

          {/* Cart */}
          <Button variant="ghost" className="relative flex flex-col gap-1 h-auto py-2 px-3 text-text-neutral-black hover:bg-surface-base-accent rounded-lg">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-xs font-bold text-text-neutral-white ring-2 ring-surface-base-base">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium leading-none hidden md:block">Ostoskori</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden p-3 border-t border-borders-base-base bg-surface-base-accent/30">
        <div className="relative flex items-center">
          <Input 
            placeholder="Etsi tuotteita..." 
            className="w-full pl-4 pr-10 rounded-full h-10 text-sm border-borders-base-hover shadow-inner"
          />
          <svg className="absolute right-3 text-icons-nautral-base" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>
    </header>
  )
}
