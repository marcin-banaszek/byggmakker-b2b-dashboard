import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { ProductCard } from "@kesko/ds-react";

export default function ProductCardDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Product Card</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          The core Molecule used across product listings and carousels. Specially engineered for hardware stores to support dual-pricing architectures (like package price vs unit price per m²).
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Molecule
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Standard Usage</h2>
        <ComponentPreview
          name="product-card-default"
          code={`import { ProductCard } from "@kesko/ds-react"

export function FlooringProduct() {
  return (
    <div className="w-64 h-[400px]">
      <ProductCard
        title="Laminaatti Cello Tammi Luossavaara"
        brandName="Cello"
        imageUrl="https://k-rauta.fi/images/6438313467471.jpg"
        price={25.10}
        unit="pkt"
        unitPrice={12.95}
        unitPriceLabel="€ / m²"
        badgeLabel="Uutuus"
        inStock={true}
      />
    </div>
  )
}`}
        >
          {/* We define a fixed width container so the preview doesn't stretch the card across the entire screen */}
          <div className="w-64 h-[440px]">
             <ProductCard
                title="Laminaatti Cello Tammi Luossavaara"
                brandName="Cello"
                imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Wood_floor_texture.jpg/800px-Wood_floor_texture.jpg"
                price={25.10}
                unit="pkt"
                unitPrice={12.95}
                unitPriceLabel="€ / m²"
                badgeLabel="Uutuus"
                inStock={true}
              />
          </div>
        </ComponentPreview>
      </div>
      
      <div className="mt-16 bg-surface-base-accent border border-borders-base-hover rounded-xl p-8">
        <h3 className="text-lg font-bold text-text-neutral-black mb-3 text-status-warning flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
           Design Note
        </h3>
        <p className="text-text-neutral-black leading-relaxed">
           Make sure your Figma component exposes the <b>Unit Pricing</b> layers as a boolean property. Standard tools (like drills) will hide this block, but lumber, flooring, and paint will require it for legal compliance in Nordic countries.
        </p>
      </div>
    </div>
  );
}
