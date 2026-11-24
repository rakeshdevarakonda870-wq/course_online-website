import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CourseTrack } from '../types/course';

interface PathwaysBentoProps {
  onSelectTrack: (track: CourseTrack) => void;
}

export const PathwaysBento: React.FC<PathwaysBentoProps> = ({
  onSelectTrack,
}) => {
  return (
    <section
      id="pathways"
      className="mx-auto max-w-[1440px] border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-12 lg:py-16"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.04em] text-[#adc6ff]">
            Curriculum Architecture
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Three focused pathways for modern interface builders
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#c2c6d6]">
          Select any discipline below to filter the catalog directly to its
          modules and interactive craft labs.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Marquee Bento Card spanning 2 columns */}
        <article className="nexora-card flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8c909f]">
              <span className="font-display font-semibold text-[#adc6ff]">
                01. Design Systems &amp; Token Architecture
              </span>
              <span className="font-mono tabular-nums">
                2 Courses · 13h 30m
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
              Bridge Figma variables and typed frontend primitives
            </h3>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#c2c6d6]">
              Learn how production teams structure primitive-to-semantic color
              scales, dark-surface elevation contrast, and headless React
              primitives without brittle CSS overrides.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8c909f]">
              <span>Semantic tokens</span>
              <span aria-hidden="true">·</span>
              <span>Headless slots</span>
              <span aria-hidden="true">·</span>
              <span>Visual diff pipelines</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectTrack('Design Systems')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#1e293b]/70 px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:border-[#3b82f6]/60 hover:bg-[#3b82f6]/15 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Filter Design Systems</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Secondary Bento Card 1 */}
        <article className="nexora-card flex flex-col justify-between rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#8c909f]">
              <span className="font-display font-semibold text-[#d0bcff]">
                02. Frontend Motion
              </span>
              <span className="font-mono tabular-nums">2 Courses</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
              Sub-200ms Interaction Physics
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c2c6d6]">
              Calibrate exponential cubic-bezier easing, compositor-only FLIP
              transitions, and interruptible spring drawers.
            </p>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => onSelectTrack('Frontend Motion')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#1e293b]/70 px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:border-[#8b5cf6]/60 hover:bg-[#8b5cf6]/15 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Filter Frontend Motion</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Secondary Bento Card 2 */}
        <article className="nexora-card flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8c909f]">
              <span className="font-display font-semibold text-[#adc6ff]">
                03. UI Craft &amp; Swiss Grid Systems
              </span>
              <span className="font-mono tabular-nums">
                3 Courses · 12h 50m
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
              Typographic discipline, Subgrid alignment, and smoked glass depth
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c2c6d6]">
              Replace heavy card borders and inconsistent gutters with
              mathematically aligned baselines, optical rim lighting, and clean
              unboxed metadata systems.
            </p>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => onSelectTrack('UI Craft')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#1e293b]/70 px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:border-[#3b82f6]/60 hover:bg-[#3b82f6]/15 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Filter UI Craft</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Secondary Bento Card 3 */}
        <article className="nexora-card flex flex-col justify-between rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#8c909f]">
              <span className="font-display font-semibold text-[#10b981]">
                04. Accessibility Craft
              </span>
              <span className="font-mono tabular-nums">4h 20m</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
              Optical Contrast &amp; Keyboard Trees
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c2c6d6]">
              Engineer WCAG AA dark interfaces, roving focus indicators, and
              dual-coded feedback states.
            </p>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => onSelectTrack('Accessibility')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#1e293b]/70 px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:border-[#10b981]/60 hover:bg-[#10b981]/10 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Filter Accessibility</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
