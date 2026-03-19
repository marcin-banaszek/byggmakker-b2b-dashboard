import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { HeroBanner } from "@kesko/ds-react";

export default function HeroBannerDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Hero Banner</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          The primary landing page component used to drive major campaigns and promotions.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Organism
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Split Layout (Default)</h2>
        <p className="text-text-neutral-base mb-6">The standard layout for hardware stores, providing a clean separation between lifestyle imagery and promotional copy.</p>
        <ComponentPreview
          name="hero-banner-split"
          code={`import { HeroBanner } from "@kesko/ds-react"

export function CampaignHero() {
  return (
    <HeroBanner 
      headline="Kevään pihatyöt alkavat nyt"
      subheadline="Kaikki tarvikkeet terassin tekoon ja puutarhan hoitoon. Tutustu laajaan valikoimaan ja hyödynnä huipputarjoukset!"
      ctaText="Selaa tarjouksia"
      imageUrl="https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2674&auto=format&fit=crop"
    />
  )
}`}
        >
          <div className="w-full px-4">
            <HeroBanner 
               headline="Kevään pihatyöt alkavat nyt"
               subheadline="Kaikki tarvikkeet terassin tekoon ja puutarhan hoitoon. Tutustu laajaan valikoimaan ja hyödynnä huipputarjoukset!"
               ctaText="Selaa tarjouksia"
               imageUrl="https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2674&auto=format&fit=crop"
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Overlay Layout</h2>
        <p className="text-text-neutral-base mb-6">An alternative variant useful for more editorial or brand-focused campaigns.</p>
        <ComponentPreview
          name="hero-banner-overlay"
          code={`<HeroBanner 
  layout="overlay"
  headline="Makkerdager on täällä"
  ctaText="Katso myymälät"
  imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2684&auto=format&fit=crop"
/>`}
        >
          <div className="w-full px-4">
            <HeroBanner 
               layout="overlay"
               headline="Makkerdager on täällä"
               ctaText="Katso myymälät"
               imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2684&auto=format&fit=crop"
            />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}
