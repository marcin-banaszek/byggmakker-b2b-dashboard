import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { Button } from "@kesko/ds-react";

export default function ButtonDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-neutral-black mb-4">Button</h1>
        <p className="text-lg text-text-neutral-base leading-relaxed">
          The Button component is an interactive element triggered by users to perform an action. It uses our <b>Atomic</b> class-variance-authority setup allowing for easy variant switching.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <span className="inline-flex items-center rounded-md bg-surface-base-pressed px-2 py-1 text-xs font-medium text-text-neutral-black border border-borders-base-base">
          Atom
        </span>
        <button className="text-sm font-medium text-text-neutral-base hover:text-text-neutral-black underline decoration-borders-base-base underline-offset-4">
          View Figma Source
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Variants</h2>
        <p className="text-text-neutral-base mb-6">Buttons come in four distinct visual styles mapped to our multi-brand token system.</p>
        <ComponentPreview
          name="button-variants"
          code={`import { Button } from "@kesko/ds-react"

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </ComponentPreview>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Sizes</h2>
        <p className="text-text-neutral-base mb-6">Four distinct sizes ensuring touch-target compliance specifically for mobile e-commerce.</p>
        <ComponentPreview
          name="button-sizes"
          code={`<Button size="sm">Small</Button>
<Button size="default">Default (48px)</Button>
<Button size="lg">Large</Button>`}
        >
          <div className="flex items-center gap-6">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </ComponentPreview>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">Props Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-borders-base-base">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-base-accent text-text-neutral-black font-semibold">
              <tr>
                <th className="px-4 py-3 border-b border-borders-base-base">Prop</th>
                <th className="px-4 py-3 border-b border-borders-base-base">Type</th>
                <th className="px-4 py-3 border-b border-borders-base-base">Default</th>
                <th className="px-4 py-3 border-b border-borders-base-base">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders-base-base bg-surface-base-base text-text-neutral-base">
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold">variant</td>
                <td className="px-4 py-3 font-mono text-xs">&quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;ghost&quot;</td>
                <td className="px-4 py-3 font-mono text-xs">&quot;default&quot;</td>
                <td className="px-4 py-3">The visual style of the button mapped to theme tokens.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold">size</td>
                <td className="px-4 py-3 font-mono text-xs">&quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; | &quot;icon&quot;</td>
                <td className="px-4 py-3 font-mono text-xs">&quot;default&quot;</td>
                <td className="px-4 py-3">Controls the height and padding.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold">asChild</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
                <td className="px-4 py-3">Changes the root node. Useful for wrapping <code>{'<a>'}</code> tags for Next.js routing.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
