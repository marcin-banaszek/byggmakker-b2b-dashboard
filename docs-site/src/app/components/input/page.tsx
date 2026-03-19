import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { Input, Button } from "@kesko/ds-react";

export default function InputDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Input</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          Displays a form input field or a component that allows a user to enter text. Crucial for checkout flows and the main store search.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Atom
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Default Rendering</h2>
        <ComponentPreview
          name="input-default"
          code={`import { Input } from "@kesko/ds-react"

export function InputDemo() {
  return (
      <Input type="email" placeholder="Sähköposti" className="max-w-sm" />
  )
}`}
        >
          <div className="w-full max-w-sm">
            <Input type="email" placeholder="Sähköposti" />
          </div>
        </ComponentPreview>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">With Button Molecule</h2>
        <p className="text-text-neutral-base mb-6">How the Input behaves when paired closely with a Button in an email subscription or search molecule.</p>
        <ComponentPreview
          name="input-with-button"
          code={`import { Input, Button } from "@kesko/ds-react"

export function SearchMolecule() {
  return (
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="text" placeholder="Hae tuotteita..." />
        <Button>Hae</Button>
      </div>
  )
}`}
        >
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="text" placeholder="Hae tuotteita..." />
            <Button>Hae</Button>
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}
