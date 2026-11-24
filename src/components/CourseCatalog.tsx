import React, { useState } from 'react';
import { RotateCcw, Search, X } from 'lucide-react';
import { CourseProgressStats } from '../hooks/useLearnerProgress';
import { Course, CourseLevel, CourseTrack } from '../types/course';
import { CourseCard } from './CourseCard';

export type CollectionFilter = 'all' | 'in-progress' | 'saved';

interface CourseCatalogProps {
  courses: Course[];
  searchQuery: string;
  selectedTrack: 'All' | CourseTrack;
  selectedLevel: 'All' | CourseLevel;
  collectionFilter: CollectionFilter;
  hasAnyProgress: boolean;
  onSearchChange: (q: string) => void;
  onTrackChange: (track: 'All' | CourseTrack) => void;
  onLevelChange: (level: 'All' | CourseLevel) => void;
  onCollectionChange: (view: CollectionFilter) => void;
  onClearFilters: () => void;
  onResetProgress: () => void;
  getCourseStats: (course: Course) => CourseProgressStats;
  onOpenCourse: (courseId: string) => void;
  onToggleBookmark: (courseId: string) => void;
}

const TRACKS: Array<'All' | CourseTrack> = [
  'All',
  'Design Systems',
  'UI Craft',
  'Frontend Motion',
  'Accessibility',
];

const LEVELS: Array<'All' | CourseLevel> = [
  'All',
  'Foundations',
  'Intermediate',
  'Advanced',
];

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  searchQuery,
  selectedTrack,
  selectedLevel,
  collectionFilter,
  hasAnyProgress,
  onSearchChange,
  onTrackChange,
  onLevelChange,
  onCollectionChange,
  onClearFilters,
  onResetProgress,
  getCourseStats,
  onOpenCourse,
  onToggleBookmark,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const stats = getCourseStats(course);

    if (selectedTrack !== 'All' && course.track !== selectedTrack) {
      return false;
    }
    if (selectedLevel !== 'All' && course.level !== selectedLevel) {
      return false;
    }
    if (collectionFilter === 'in-progress' && !stats.isEnrolled) {
      return false;
    }
    if (collectionFilter === 'saved' && !stats.isBookmarked) {
      return false;
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    const haystack = [
      course.title,
      course.subtitle,
      course.track,
      course.level,
      course.instructor.name,
      ...course.modules.flatMap((m) => [
        m.title,
        ...m.lessons.map((l) => l.title),
      ]),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedTrack !== 'All' ||
    selectedLevel !== 'All' ||
    collectionFilter !== 'all';

  return (
    <section
      id="catalog"
      className="mx-auto max-w-[1440px] border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-12 lg:py-16"
    >
      {/* Header + Pill Search Input */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.04em] text-[#adc6ff]">
            Course Catalog
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Explore UI/UX &amp; frontend engineering tracks
          </h2>
        </div>

        {/* Pill Search Bar */}
        <div className="relative w-full lg:max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#8c909f]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses, tokens, CSS Grid, motion..."
            aria-label="Search courses"
            className="w-full rounded-full border border-white/[0.1] bg-[#111827] py-2.5 pr-10 pl-11 text-sm text-white placeholder-[#64748b] transition-all duration-150 focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#8c909f] hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Discipline Tabs + Secondary Controls */}
      <div className="mt-8 flex flex-col gap-4 border-b border-white/[0.06] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Discipline Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter by discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {TRACKS.map((track) => {
              const active = selectedTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onTrackChange(track)}
                  className={`rounded-full border px-4 py-2 font-display text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border-[#3b82f6]/60 bg-[#3b82f6]/15 text-[#adc6ff] shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                      : 'border-white/[0.08] bg-[#171b26] text-[#c2c6d6] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {track === 'All' ? 'All Tracks' : track}
                </button>
              );
            })}
          </div>

          {/* Collection View Segmented Control */}
          <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#111827] p-1">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'in-progress', label: 'In Progress' },
                { id: 'saved', label: 'Saved' },
              ] as Array<{ id: CollectionFilter; label: string }>
            ).map((item) => {
              const active = collectionFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onCollectionChange(item.id)}
                  className={`rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#3b82f6] text-white'
                      : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Filter + Result Count + Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#8c909f] mr-1">
              Difficulty:
            </span>
            {LEVELS.map((level) => {
              const active = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => onLevelChange(level)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-[#8c909f] hover:bg-white/[0.04] hover:text-[#dfe2f1]'
                  }`}
                >
                  {level === 'All' ? 'All Levels' : level}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#8c909f]">
            <span aria-live="polite" className="font-mono tabular-nums">
              Showing {filteredCourses.length} of {courses.length} courses
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="font-display font-semibold text-[#adc6ff] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Clear filters
              </button>
            )}

            {hasAnyProgress && !confirmReset && (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-[#8c909f] hover:text-[#ffb4ab] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset saved progress</span>
              </button>
            )}

            {confirmReset && (
              <div className="flex items-center gap-2">
                <span className="text-[#ffb4ab]">Clear all progress?</span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="rounded-full bg-[#93000a] px-3 py-1 font-semibold text-[#ffdad6] hover:bg-[#b31412] cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-full border border-white/15 px-3 py-1 text-[#c2c6d6] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              stats={getCourseStats(course)}
              onOpenCourse={onOpenCourse}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="nexora-card mt-8 flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
          <h3 className="font-display text-lg font-semibold text-white">
            No matching courses found
          </h3>
          <p className="mt-2 max-w-md text-sm text-[#c2c6d6]">
            {collectionFilter === 'saved'
              ? 'You have not bookmarked any courses matching these filters yet.'
              : collectionFilter === 'in-progress'
                ? 'Start checking off lessons inside any course syllabus to track active progress here.'
                : 'Try adjusting your search query, discipline track, or difficulty level.'}
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 rounded-full bg-[#3b82f6] px-5 py-2.5 font-display text-xs font-semibold text-white transition-colors hover:bg-[#2563eb] cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
};
