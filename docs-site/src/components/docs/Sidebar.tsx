"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Design Tokens", href: "/design-tokens" },
      { title: "Icon Library", href: "/components/icons" }
    ]
  },
  {
    title: "Atomic Components",
    items: [
      { title: "Button", href: "/components/button" },
      { title: "Badge", href: "/components/badge" },
      { title: "Input", href: "/components/input" }
    ]
  },
  {
    title: "E-Commerce Molecules",
    items: [
      { title: "Product Card", href: "/components/product-card" },
      { title: "Category Tile", href: "/components/category-tile" }
    ]
  },
  {
    title: "E-Commerce Organisms",
    items: [
      { title: "Hero Banner", href: "/components/hero-banner" },
      { title: "Store Header", href: "/components/store-header" }
    ]
  },
  {
    title: "Prototypes",
    items: [
      { title: "Byggmakker Store", href: "/prototypes/byggmakker" },
      { title: "B2B Dashboard", href: "/prototypes/dashboard" }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 pb-12 pt-8 pr-6 hidden md:block border-r border-borders-base-base min-h-screen">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold tracking-tight text-text-neutral-black">Kesko DS</h2>
        <p className="text-sm text-text-neutral-light mt-1 w-fit"><span className="bg-surface-base-pressed px-2 py-0.5 rounded text-xs font-medium text-text-neutral-black">v2.2</span></p>
      </div>
      <div className="w-full">
        {navigation.map((section, i) => (
          <div key={i} className="mb-6">
            <h4 className="mb-2 rounded-md px-4 py-1.5 text-sm font-semibold text-text-neutral-black">
              {section.title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item, j) => (
                <Link
                  key={j}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-4 py-1.5 hover:underline text-text-neutral-base",
                    pathname === item.href
                      ? "font-medium text-text-neutral-black bg-surface-base-pressed"
                      : "transparent"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
