import React from 'react';
import { CourseTrack } from '../types/course';

interface FooterProps {
  onSelectTrack: (track: CourseTrack) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTrack,
  onNavigateSection,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0e18]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Nexora
          </span>
          <p className="mt-1 text-xs text-[#8c909f]">
            Learn beyond limits · UI/UX Design &amp; Frontend Craft
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#c2c6d6]">
          <button
            type="button"
            onClick={() => onSelectTrack('Design Systems')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Design Systems
          </button>
          <button
            type="button"
            onClick={() => onSelectTrack('UI Craft')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            UI Craft
          </button>
          <button
            type="button"
            onClick={() => onSelectTrack('Frontend Motion')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Frontend Motion
          </button>
          <button
            type="button"
            onClick={() => onSelectTrack('Accessibility')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accessibility
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('outcomes')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Outcomes
          </button>
        </div>

        <p className="text-xs text-[#8c909f]">
          © {new Date().getFullYear()} Nexora Studio
        </p>
      </div>
    </footer>
  );
};
