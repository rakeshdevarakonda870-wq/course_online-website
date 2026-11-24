import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { formatDuration, HERO_ARTWORK_PATH } from '../data/courses';
import { CourseProgressStats } from '../hooks/useLearnerProgress';
import { Course } from '../types/course';

interface HeroSectionProps {
  lastActiveCourse: Course;
  lastActiveStats: CourseProgressStats;
  summary: {
    activeCoursesCount: number;
    completedLessonsCount: number;
    savedCoursesCount: number;
    studyMinutesLogged: number;
  };
  onBrowseCatalog: () => void;
  onOpenCourse: (courseId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lastActiveCourse,
  lastActiveStats,
  summary,
  onBrowseCatalog,
  onOpenCourse,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="mx-auto max-w-[1440px] px-4 pt-10 pb-12 sm:px-6 lg:px-12 lg:pt-14 lg:pb-16"
    >
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left column: Focal Proposition */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-4">
          <p className="font-display text-sm font-semibold tracking-[0.02em] text-[#adc6ff]">
            UI/UX Design &amp; Frontend Craft
          </p>

          <h1
            className="mt-4 font-display font-extrabold tracking-[-0.03em] text-white text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.12 }}
          >
            Learn interface craft beyond limits.
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#c2c6d6]">
            Master production design systems, sub-200ms motion choreography,
            modern CSS grid architecture, and high-contrast accessibility with
            interactive labs and saved module progress.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-6 py-3 font-display text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#2563eb] hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Browse Course Catalog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onOpenCourse(lastActiveCourse.id)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#1e293b]/70 px-6 py-3 font-display text-sm font-semibold text-[#f8fafc] transition-all duration-200 hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {lastActiveStats.completedCount > 0
                  ? 'Continue Active Track'
                  : 'Inspect Flagship Syllabus'}
              </span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#8c909f]">
            <span>8 studio courses</span>
            <span aria-hidden="true">·</span>
            <span>4 core craft disciplines</span>
            <span aria-hidden="true">·</span>
            <span>Progress saved locally in browser</span>
          </div>
        </div>

        {/* Right column: 16:9 Architectural Hero Frame + Active Course Spotlight */}
        <div className="lg:col-span-6 flex">
          <div className="nexora-card group relative w-full overflow-hidden rounded-2xl min-h-[340px] lg:h-full">
            {!imgError ? (
              <img
                src={HERO_ARTWORK_PATH}
                alt="Dark-mode UI design system wireframes and component grids arranged on a matte obsidian desk"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#171b26] via-[#0f131d] to-[#1e293b]">
                <BookOpen className="h-12 w-12 text-[#4d8eff]/60" aria-hidden="true" />
              </div>
            )}

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-[#0a0e18]/65 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="nexora-glass rounded-xl p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#adc6ff]">
                      <span className="font-display font-semibold">
                        {lastActiveStats.completedCount > 0
                          ? 'In Progress'
                          : 'Flagship Track'}
                      </span>
                      <span aria-hidden="true" className="text-[#8c909f]">
                        ·
                      </span>
                      <span className="text-[#c2c6d6]">
                        {lastActiveCourse.track}
                      </span>
                      <span aria-hidden="true" className="text-[#8c909f]">
                        ·
                      </span>
                      <span className="font-mono tabular-nums text-[#c2c6d6]">
                        {lastActiveStats.completedCount}/{lastActiveStats.totalCount} lessons
                      </span>
                    </div>
                    <h2 className="mt-1.5 font-display text-base sm:text-lg font-semibold text-white">
                      {lastActiveCourse.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenCourse(lastActiveCourse.id)}
                    className="rounded-full bg-[#3b82f6] px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:bg-[#2563eb] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open Syllabus
                  </button>
                </div>

                <div className="mt-3.5">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="nexora-progress-fill h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(lastActiveStats.percent, 4)}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#8c909f] font-mono tabular-nums">
                    <span>{lastActiveStats.percent}% complete</span>
                    <span>
                      {formatDuration(lastActiveCourse.totalMinutes)} total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column Learner Telemetry Strip */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="nexora-card rounded-xl px-5 py-4">
          <p className="text-xs font-medium text-[#8c909f]">Active Courses</p>
          <p className="mt-1.5 font-display text-2xl font-bold text-white tabular-nums">
            {summary.activeCoursesCount}
          </p>
        </div>
        <div className="nexora-card rounded-xl px-5 py-4">
          <p className="text-xs font-medium text-[#8c909f]">
            Lessons Completed
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-white tabular-nums">
            {summary.completedLessonsCount}
          </p>
        </div>
        <div className="nexora-card rounded-xl px-5 py-4">
          <p className="text-xs font-medium text-[#8c909f]">Saved Tracks</p>
          <p className="mt-1.5 font-display text-2xl font-bold text-white tabular-nums">
            {summary.savedCoursesCount}
          </p>
        </div>
        <div className="nexora-card rounded-xl px-5 py-4">
          <p className="text-xs font-medium text-[#8c909f]">
            Study Time Logged
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-[#d0bcff] tabular-nums">
            {formatDuration(summary.studyMinutesLogged)}
          </p>
        </div>
      </div>
    </section>
  );
};
