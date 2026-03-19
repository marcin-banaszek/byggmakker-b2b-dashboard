"use client";

import React, { useState } from 'react';
import { IconLibrary, IconName } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { X, Copy, Check } from 'lucide-react';

type Tab = 'React' | 'JavaScript' | 'Source';

export default function IconsPage() {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('React');
  const [copied, setCopied] = useState(false);

  const iconNames = Object.keys(IconLibrary) as IconName[];
  
  const filteredIcons = iconNames.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCode = () => {
    if (!selectedIcon) return '';
    const iconData = IconLibrary[selectedIcon];
    const component = iconData.component;
    const name =
      typeof component === 'string'
        ? component
        : ((component as { name?: string; displayName?: string }).name ??
            (component as { name?: string; displayName?: string }).displayName ??
            'Icon');

    switch (activeTab) {
      case 'React':
        return `import { ${name} } from "@/components/ui/icons";\n\n<${name} size={24} color="currentColor" />`;
      case 'JavaScript':
        return `const ${name} = require("@kesko/iconography");\n\n// Use in your layout\n<${name} />`;
      case 'Source':
        return iconData.raw;
      default:
        return '';
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-base-base">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-text-neutral-black">Icon Library</h1>
            <p className="text-lg text-text-neutral-light mb-8">
              Discover and use the Kesko Design System iconography. 
              Click an icon to view implementation details.
            </p>
            
            <div className="max-w-md">
              <Input 
                placeholder="Search icons..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredIcons.map(name => {
              const iconData = IconLibrary[name as IconName];
              const IconComponent = iconData.component;
              return (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedIcon(name as IconName);
                    setActiveTab('React');
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 border rounded-xl transition-all group relative",
                    selectedIcon === name 
                      ? "border-solid-primary-base bg-surface-primary-base ring-1 ring-solid-primary-base" 
                      : "border-borders-base-base hover:border-solid-primary-base hover:bg-surface-base-hover"
                  )}
                >
                  <div className={cn(
                    "transition-colors mb-3",
                    selectedIcon === name ? "text-solid-primary-base" : "text-icons-nautral-base group-hover:text-solid-primary-base"
                  )}>
                    <IconComponent size={32} />
                  </div>
                  <span className="text-xs text-text-neutral-light text-center truncate w-full px-1">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="text-center py-20 bg-surface-base-accent rounded-2xl border border-dashed border-borders-base-base">
              <p className="text-text-neutral-light">No icons found matching &quot;{search}&quot;</p>
            </div>
          )}
        </div>
      </div>

      {/* Side Panel (Refactored to be non-overlapping) */}
      {selectedIcon && (
        <div className="w-[380px] border-l border-borders-base-base bg-surface-base-accent flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-borders-base-base bg-surface-base-base">
            <div>
              <h2 className="text-lg font-bold text-text-neutral-black capitalize">{selectedIcon.replace(/[_-]/g, ' ')}</h2>
              <span className="text-xs text-text-neutral-light">Component Details</span>
            </div>
            <button 
              onClick={() => setSelectedIcon(null)}
              className="p-2 hover:bg-surface-base-hover rounded-full transition-colors text-text-neutral-light"
            >
              <X size={18} />
            </button>
          </div>

          {/* Preview Box */}
          <div className="flex items-center justify-center p-12 bg-surface-base-base border-b border-borders-base-base">
            <div className="text-text-neutral-black p-8 bg-surface-base-accent rounded-2xl border border-borders-base-base/50 shadow-sm">
              {React.createElement(IconLibrary[selectedIcon].component, { size: 64 })}
            </div>
          </div>

          {/* Code Section */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-neutral-light mb-4 px-1">Usage Snippet</h3>
              
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-surface-base-pressed rounded-lg mb-4">
                {(['React', 'JavaScript', 'Source'] as Tab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      activeTab === tab 
                        ? "bg-surface-base-base text-text-neutral-black shadow-sm" 
                        : "text-text-neutral-light hover:text-text-neutral-base"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="relative group">
                <pre className="bg-[#121214] p-5 rounded-xl text-xs font-mono text-zinc-300 overflow-x-auto min-h-[140px] border border-white/5 leading-relaxed">
                  {getCode()}
                </pre>
                <button 
                  onClick={() => handleCopy(getCode())}
                  className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all flex items-center gap-2 group/btn"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-zinc-400 group-hover/btn:text-white" />}
                  <span className="text-xs font-medium text-zinc-400 group-hover/btn:text-white">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Assets Section */}
            <div className="pt-6 border-t border-borders-base-base">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-neutral-light mb-4 px-1">Source Assets</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-borders-base-base bg-surface-base-base hover:bg-surface-primary-base hover:border-solid-primary-base transition-all group/item">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-base-accent rounded-lg text-text-neutral-light group-hover/item:text-solid-primary-base">
                      <Copy size={16} />
                    </div>
                    <span className="text-xs font-medium text-text-neutral-black">Figma Design File</span>
                  </div>
                  <span className="text-xs text-text-neutral-light">PRO ↗</span>
                </a>
                
                <button 
                  onClick={() => handleCopy(IconLibrary[selectedIcon!].raw)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-borders-base-base bg-surface-base-base hover:bg-surface-primary-base hover:border-solid-primary-base transition-all group/item text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-base-accent rounded-lg text-text-neutral-light group-hover/item:text-solid-primary-base">
                      <Copy size={16} />
                    </div>
                    <span className="text-xs font-medium text-text-neutral-black">Download SVG Code</span>
                  </div>
                  <span className="text-xs text-text-neutral-light">XML</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
