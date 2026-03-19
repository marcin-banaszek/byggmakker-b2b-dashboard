"use client";

import React from 'react';

const TokenSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6 text-text-neutral-black border-b border-borders-base-base pb-2">{title}</h2>
    {children}
  </section>
);

const ColorGrid = ({ colors, prefix }: { colors: string[], prefix: string }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
    {colors.map(weight => (
      <div key={weight} className="flex flex-col">
        <div 
          className="h-16 rounded-lg mb-2 border border-borders-base-base" 
          style={{ backgroundColor: `var(--${prefix}-${weight})` }}
        />
        <span className="text-xs font-medium text-text-neutral-black">{weight}</span>
        <span className="text-xs text-text-neutral-light font-mono">var(--{prefix}-{weight})</span>
      </div>
    ))}
  </div>
);

const SemanticRow = ({ name, description, varName }: { name: string, description: string, varName: string }) => (
  <div className="flex items-center py-3 border-b border-borders-base-base last:border-0">
    <div className="w-12 h-12 rounded-lg border border-borders-base-base shrink-0 mr-4" style={{ backgroundColor: `var(${varName})` }} />
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-text-neutral-black">{name}</h4>
      <p className="text-xs text-text-neutral-light">{description}</p>
    </div>
    <code className="text-xs bg-surface-base-accent px-2 py-1 rounded font-mono text-text-neutral-black">{varName}</code>
  </div>
);

export default function DesignTokensPage() {
  const weights = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200'];
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-text-neutral-black">Design Tokens</h1>
        <p className="text-lg text-text-neutral-light">
          The foundation of the Kesko Design System. These tokens map primitive values to semantic meanings across all brands.
        </p>
      </header>

      <TokenSection title="Color Primitives">
        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Brand Orange</h3>
            <ColorGrid colors={weights} prefix="colors-brand-orange" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Brand Purple</h3>
            <ColorGrid colors={weights} prefix="colors-brand-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Brand Teal</h3>
            <ColorGrid colors={weights} prefix="colors-brand-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Neutrals</h3>
            <ColorGrid colors={weights} prefix="colors-neutrals" />
          </div>
        </div>
      </TokenSection>

      <TokenSection title="Semantic Tokens">
        <div className="bg-surface-base-base rounded-xl border border-borders-base-base p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Brand Specifics (Primary)</h3>
          <div className="space-y-1">
            <SemanticRow name="Solid Primary Base" description="The primary brand color for the current theme." varName="--solid-primary-base" />
            <SemanticRow name="Solid Primary Hover" description="Hover state for primary elements." varName="--solid-primary-hover" />
            <SemanticRow name="Surface Primary Base" description="Subtle background for primary-themed blocks." varName="--surface-primary-base" />
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4 text-text-neutral-black">Common Semantics</h3>
          <div className="space-y-1">
            <SemanticRow name="Base Border" description="Standard border color for components." varName="--borders-base-base" />
            <SemanticRow name="Neutral Text" description="Default text color for body copy." varName="--text-neutral-base" />
            <SemanticRow name="Success Status" description="Color used to represent success states." varName="--status-success" />
            <SemanticRow name="Error Status" description="Color used to represent error states." varName="--status-error" />
          </div>
        </div>
      </TokenSection>

      <TokenSection title="Spacing & Layout">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-base-base rounded-xl border border-borders-base-base p-6">
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Spacing Scale</h3>
            <div className="space-y-4">
              {[
                { name: 'XXS', size: '4px', var: '--spacing-spacing-xxs' },
                { name: 'XS', size: '8px', var: '--spacing-spacing-xs' },
                { name: 'S', size: '12px', var: '--spacing-spacing-s' },
                { name: 'M', size: '16px', var: '--spacing-spacing-m' },
                { name: 'L', size: '24px', var: '--spacing-spacing-l' },
                { name: 'XL', size: '32px', var: '--spacing-spacing-xl' },
              ].map(s => (
                <div key={s.name} className="flex items-center group">
                  <div className="w-12 text-xs font-bold text-text-neutral-black">{s.name}</div>
                  <div className="flex-1 bg-surface-base-pressed h-4 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-solid-primary-base opacity-50 transition-all group-hover:opacity-100" style={{ width: s.size }} />
                  </div>
                  <div className="w-24 text-right text-xs text-text-neutral-light font-mono">{s.var}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-base-base rounded-xl border border-borders-base-base p-6">
            <h3 className="text-lg font-semibold mb-4 text-text-neutral-black">Corner Radius</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'XXS', radius: '4px', var: '--corner-radius-corner-radius-xxs' },
                { name: 'S', radius: '12px', var: '--corner-radius-corner-radius-s' },
                { name: 'L', radius: '24px', var: '--corner-radius-corner-radius-l' },
              ].map(r => (
                <div key={r.name} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-surface-base-pressed border border-borders-base-base mb-2" style={{ borderRadius: r.radius }} />
                  <span className="text-xs font-bold text-text-neutral-black">{r.name}</span>
                  <span className="text-xs text-text-neutral-light font-mono text-center">{r.var}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TokenSection>
    </div>
  );
}
