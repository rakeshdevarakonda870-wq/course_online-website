import React from 'react';

interface TopBarProps {
  hasActiveProgress: boolean;
  onNavigateSection: (sectionId: string) => void;
  onOpenSaved: () => void;
  onPrimaryAction: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  hasActiveProgress,
  onNavigateSection,
  onOpenSaved,
  onPrimaryAction,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0f131d]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-12">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b82f6] rounded"
        >
          Nexora
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#c2c6d6]"
        >
          <button
            type="button"
            onClick={() => onNavigateSection('pathways')}
            className="hover:text-white hover:underline underline-offset-8 decoration-[#3b82f6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pathways
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-white hover:underline underline-offset-8 decoration-[#3b82f6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={onOpenSaved}
            className="hover:text-white hover:underline underline-offset-8 decoration-[#3b82f6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Saved
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('outcomes')}
            className="hover:text-white hover:underline underline-offset-8 decoration-[#3b82f6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Outcomes
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="rounded-full bg-[#3b82f6] px-5 py-2.5 font-display text-xs sm:text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#2563eb] hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {hasActiveProgress ? 'Resume Learning' : 'Explore Catalog'}
          </button>
        </div>
      </div>
    </header>
  );
};
