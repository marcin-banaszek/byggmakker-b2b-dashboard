import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { StoreHeader } from "@kesko/ds-react";

export default function StoreHeaderDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Store Header</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          The complex universal top navigation. It contains micro-navigation, branding, the main search molecule, and cart/profile actions.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Organism
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Preview</h2>
        <ComponentPreview
          name="store-header-default"
          code={`import { StoreHeader } from "@kesko/ds-react"

export function AppNavigation() {
  return (
    <StoreHeader cartItemCount={3} />
  )
}`}
        >
          <div className="w-full h-[300px] rounded-xl overflow-hidden border border-borders-base-base relative">
             <div className="absolute inset-0 bg-surface-base-accent">
                {/* Mock Page Content underlying the sticky header */}
             </div>
             <StoreHeader cartItemCount={3} />
          </div>
        </ComponentPreview>
      </div>

      <div className="mt-16 bg-surface-base-accent border border-borders-base-hover rounded-xl p-8">
        <h3 className="text-lg font-bold text-text-neutral-black mb-3 text-status-info flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
           Composition Architecture
        </h3>
        <p className="text-text-neutral-black leading-relaxed mb-4">
           Notice how this organism is built cleanly using the smaller atoms. Rather than rewriting complicated input logic and button hover states, the <code>&lt;StoreHeader&gt;</code> component simply imports <code>&lt;Input&gt;</code> and <code>&lt;Button&gt;</code>.
        </p>
        <p className="text-text-neutral-black leading-relaxed">
           This mirrors the <b>Slot Component Placeholder</b> technique that should be used in Figma to avoid Component Hell!
        </p>
      </div>
    </div>
  );
}
