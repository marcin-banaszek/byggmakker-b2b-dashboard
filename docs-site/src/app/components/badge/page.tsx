import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { Badge } from "@kesko/ds-react";

export default function BadgeDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Badge</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          Displays a small indicator or label. Essential for highlighting product states like &quot;Sale&quot;, &quot;New&quot;, or campaign statuses.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Atom
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Variants</h2>
        <ComponentPreview
          name="badge-variants"
          code={`import { Badge } from "@kesko/ds-react"

export function BadgeDemo() {
  return (
    <div className="flex gap-4">
       <Badge variant="default">Uutuus</Badge>
       <Badge variant="secondary">Ale</Badge>
       <Badge variant="campaign">Kampanja</Badge>
       <Badge variant="outline">Poistuva</Badge>
    </div>
  )
}`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="default">Uutuus</Badge>
            <Badge variant="secondary">Ale</Badge>
            <Badge variant="campaign">Kampanja</Badge>
            <Badge variant="outline">Poistuva</Badge>
          </div>
        </ComponentPreview>
      </div>
      
      <div className="mt-16 bg-surface-base-accent border border-borders-base-hover rounded-xl p-8">
        <h3 className="text-lg font-bold text-text-neutral-black mb-3 text-status-info flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
           Usage Guidelines
        </h3>
        <p className="text-text-neutral-black leading-relaxed">
           Use the <code className="font-mono bg-surface-base-darker px-1 rounded mx-1">campaign</code> variant (which hooks into the &quot;warning/yellow&quot; status token) specifically for major marketing pushes like &quot;Black Friday&quot; or &quot;Makkerdager&quot;. Standard product flags should use the default or secondary branded badges.
        </p>
      </div>
    </div>
  );
}
