'use client';

import { db } from '@/db';
import { skills } from '@/db/schema';

interface TechItem {
  name: string;
  icon?: string;
}

interface TechMarqueeProps {
  items: TechItem[];
}

export function TechMarquee({ items }: TechMarqueeProps) {
  // Double the items for seamless infinite loop
  const doubled = [...items, ...items];

  // Helper to get a consistent placeholder image
  const getPlaceholder = (item: TechItem) => {
    if (item.icon) return item.icon;
    // Using placehold.co with dark theme colors (bg: #1e1e1e, text: #00f0ff)
    // to match the site's aesthetic roughly until user replaces them
    return `https://placehold.co/120x60/1e1e1e/00f0ff/png?text=${encodeURIComponent(item.name)}&font=montserrat`;
  };

  return (
    <div className="relative overflow-hidden py-10">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex marquee-track">
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex-shrink-0 mx-6 transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <div className="relative group p-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 border border-border/20 backdrop-blur-sm hover:border-primary/50 hover:bg-neutral-300 dark:hover:bg-neutral-700 neon-border transition-all flex flex-col items-center gap-2 min-w-[120px]">
              {/* Image Placeholder */}
              <img 
                src={getPlaceholder(item)} 
                alt={item.name}
                className="h-12 w-12 object-contain transition-transform"
                width={48}
                height={48}
              />
              <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors text-center font-medium">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
