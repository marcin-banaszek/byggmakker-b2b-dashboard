import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CategoryTile } from "@kesko/ds-react";

export default function CategoryTileDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Category Tile</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          A navigational block used heavily on the front page to drive users into specific departments.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Molecule
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Grid Example</h2>
        <ComponentPreview
          name="category-tile-grid"
          code={`import { CategoryTile } from "@kesko/ds-react"

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <CategoryTile title="Rakennustarvikkeet" />
      <CategoryTile title="Työkalut" />
      <CategoryTile title="Sähkö ja valaisimet" />
      <CategoryTile title="Piha ja puutarha" />
    </div>
  )
}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4">
             <CategoryTile title="Rakennustarvikkeet" />
             <CategoryTile title="Työkalut" />
             <CategoryTile title="Sähkö ja valaisimet" />
             <CategoryTile title="Piha ja puutarha" />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}
