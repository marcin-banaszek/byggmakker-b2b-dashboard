import Link from "next/link";
import { Button } from "@kesko/ds-react";

export default function Home() {
  return (
    <div className="max-w-4xl pb-24">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tight text-text-neutral-black mb-6">Kesko Elements</h1>
        <p className="text-xl text-text-neutral-base leading-relaxed max-w-2xl">
          Beautifully designed components built with Tailwind CSS and Radix UI. 
          Accessible, code-ready, and dynamically themeable for K-Rauta, K-Bygg, and Byggmakker.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/components/button">
            <Button size="lg" className="font-bold">Browse Components</Button>
          </Link>
          <Button size="lg" variant="outline" className="font-bold">Tokens System</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
         <div className="p-6 rounded-xl border border-borders-base-base bg-surface-base-base shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icons-primary-default mb-4"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            <h3 className="text-lg font-bold text-text-neutral-black mb-2">Code Ready</h3>
            <p className="text-sm text-text-neutral-base leading-relaxed">
              Every component is built exactly as it exists in Figma, utilizing the Class Variance Authority (CVA) pattern and Tailwind utility classes for perfect synchronization.
            </p>
         </div>
         <div className="p-6 rounded-xl border border-borders-base-base bg-surface-base-base shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-status-info mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h3 className="text-lg font-bold text-text-neutral-black mb-2">Multi-Brand Architecture</h3>
            <p className="text-sm text-text-neutral-base leading-relaxed">
              Applying a single CSS class like <code className="bg-surface-base-darker px-1 py-0.5 rounded font-mono text-xs">.theme-byggmakker</code> to your app&apos;s root instantly restyles every button, input, and card to match the brand tokens without changing a single line of React.
            </p>
         </div>
      </div>
      
      <div className="prose prose-neutral">
         <h2 className="text-2xl font-bold tracking-tight text-text-neutral-black border-b border-borders-base-base pb-2 mb-6">How it works</h2>
         <p className="text-text-neutral-base mb-4 leading-relaxed">
           This system is <b>not</b> installed via NPM. Following the Shadcn philosophy, you own the code. You simply copy and paste the components you need directly into your codebase.
         </p>
         <div className="bg-[#111111] p-4 rounded-lg text-text-neutral-white font-mono text-sm border border-borders-base-disabled overflow-x-auto">
            <span className="text-status-warning">1.</span> Update your <span className="text-helpers-blue-500">globals.css</span> with our Tokens Studio JSON output.<br/><br/>
            <span className="text-status-warning">2.</span> Add the <span className="text-helpers-blue-500">tailwind-theme.js</span> to your config.<br/><br/>
            <span className="text-status-warning">3.</span> Create <span className="text-helpers-blue-500">src/components/ui/button.tsx</span> and paste our component!
         </div>
      </div>
    </div>
  );
}
