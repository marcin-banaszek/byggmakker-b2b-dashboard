"use client";

import React from 'react';
import { StoreHeader } from '@/components/ecommerce/StoreHeader';
import { HeroBanner } from '@/components/ecommerce/HeroBanner';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { CategoryTile } from '@/components/ecommerce/CategoryTile';
import { Badge } from '@/components/ui/badge';

export default function ByggmakkerPrototype() {
  return (
    <div className="min-h-screen bg-surface-base-accent pb-20">
      {/* Brand Specific Theme Overrides */}
      <style jsx global>{`
        :root {
          --brand-primary: #cf0000; /* Byggmakker Official Red */
          --brand-primary-hover: #a30000;
        }
      `}</style>

      <StoreHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">Live Prototype</Badge>
          <h1 className="text-4xl font-bold text-text-neutral-black mb-4">Byggmakker Storefront</h1>
          <p className="text-lg text-text-neutral-light max-w-2xl">
            This is a high-fidelity prototype built using the Kesko Design System components. 
            All interactions, components, and tokens are production-ready.
          </p>
        </div>

        <section className="mb-12">
          <HeroBanner 
            headline="Oppdag vårens nyheter"
            subheadline="Klar for hage- og terrassesesongen? Vi har alt du trenger for å komme i gang."
            ctaText="Se alle hageprodukter"
            imageUrl="https://images.unsplash.com/photo-1599615303222-115042456073?q=80&w=2070&auto=format&fit=crop"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Populære kategorier</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryTile title="Maling" />
            <CategoryTile title="Hage & Uteområde" />
            <CategoryTile title="Verktøy" />
            <CategoryTile title="Byggevarer" />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Anbefalt for deg</h2>
            <button className="text-solid-primary-base font-medium hover:underline">Se mer</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              title="Lady Wonderwall 2.7L"
              price={549}
              imageUrl="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop"
              brandName="Jotun"
            />
            <ProductCard 
              title="Bosch Drill GSB 18V-55"
              price={1499}
              imageUrl="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1000&auto=format&fit=crop"
              brandName="Bosch"
            />
            <ProductCard 
              title="Terassebord Furu"
              price={24}
              unit="m"
              imageUrl="https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=1000&auto=format&fit=crop"
              brandName="Moelven"
            />
            <ProductCard 
              title="Weber Grill Original"
              price={2999}
              imageUrl="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop"
              brandName="Weber"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
