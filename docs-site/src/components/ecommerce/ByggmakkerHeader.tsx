import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, User, ShoppingCart, Menu, Heart } from "lucide-react"
import { Button } from "../ui/button"

export function ByggmakkerHeader() {
  return (
    <header className="w-full bg-white border-b border-borders-base-base">
      {/* Top utility bar */}
      <div className="bg-[#333333] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end gap-6 uppercase tracking-wider font-semibold">
          <a href="#" className="hover:text-primary-base">Proff</a>
          <a href="#" className="hover:text-primary-base">Kundeservice</a>
          <a href="#" className="hover:text-primary-base">Våre varehus</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Menu className="md:hidden h-6 w-6 text-text-neutral-black" />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-[#cf0000] leading-none uppercase">
              Bygg<span className="text-[#333333]">Makker</span>
            </span>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-grow max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Søk i tusenvis av varer..."
            className="w-full h-11 pl-4 pr-12 rounded-sm border-2 border-[#333333] focus:outline-none focus:border-[#cf0000] transition-colors"
          />
          <button className="absolute right-0 top-0 h-11 w-12 bg-[#333333] flex items-center justify-center text-white hover:bg-[#cf0000] transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-2 md:gap-5">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-xs text-text-neutral-light uppercase font-bold">Logget inn som</span>
            <span className="text-xs font-bold text-text-neutral-black">Snekker Jensen AS</span>
          </div>
          <button className="p-2 hover:bg-surface-base-pressed rounded-full transition-colors relative group">
            <User className="h-6 w-6 text-text-neutral-black" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#333333] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Min side</span>
          </button>
          <button className="p-2 hover:bg-surface-base-pressed rounded-full transition-colors relative hidden sm:block">
            <Heart className="h-6 w-6 text-text-neutral-black" />
          </button>
          <button className="p-2 hover:bg-surface-base-pressed rounded-full transition-colors relative">
            <ShoppingCart className="h-6 w-6 text-text-neutral-black" />
            <span className="absolute top-1 right-1 bg-[#cf0000] text-white text-xs font-bold h-4 w-4 rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav className="border-t border-borders-base-base hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-8 text-sm font-bold uppercase tracking-tight text-[#333333]">
          <a href="#" className="hover:text-[#cf0000] transition-colors flex items-center gap-1">Produkter</a>
          <a href="#" className="hover:text-[#cf0000] transition-colors">Tjenester</a>
          <a href="#" className="hover:text-[#cf0000] transition-colors">Kampanjer</a>
          <a href="#" className="text-[#cf0000] border-b-2 border-[#cf0000] h-12 flex items-center">Mitt Prosjekt</a>
          <a href="#" className="hover:text-[#cf0000] transition-colors">Inspirasjon</a>
        </div>
      </nav>
    </header>
  )
}
