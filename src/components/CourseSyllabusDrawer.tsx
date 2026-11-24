import React, { useEffect, useState } from 'react';
import { Bookmark, Check, X } from 'lucide-react';
import { formatDuration } from '../data/courses';
import { CourseProgressStats } from '../hooks/useLearnerProgress';
import { Course } from '../types/course';
import { CraftLabPreview } from './CraftLabPreview';

interface CourseSyllabusDrawerProps {
  course: Course | null;
  stats: CourseProgressStats | null;
  completedLessons: string[];
  onClose: () => void;
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onToggleModuleComplete: (courseId: string, lessonIds: string[]) => void;
  onToggleBookmark: (courseId: string) => void;
  onEnrollCourse: (courseId: string) => void;
}

export const CourseSyllabusDrawer: React.FC<CourseSyllabusDrawerProps> = ({
  course,
  stats,
  completedLessons,
  onClose,
  onToggleLesson,
  onToggleModuleComplete,
  onToggleBookmark,
  onEnrollCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'lab'>('syllabus');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setActiveTab('syllabus');
    setImgError(false);
  }, [course?.id]);

  useEffect(() => {
    if (!course) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [course, onClose]);

  if (!course || !stats) return null;

  const completedSet = new Set(completedLessons);
  const firstUnfinishedId = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => !completedSet.has(l.id))?.id;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-course-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070a10]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Studio Panel */}
      <aside className="nexora-glass relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden shadow-2xl">
        {/* Top Sticky Drawer Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-[#adc6ff]">
            <span className="font-display font-semibold">{course.track}</span>
            <span aria-hidden="true" className="text-[#8c909f]">
              ·
            </span>
            <span className="text-[#c2c6d6]">{course.level}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(course.id)}
              aria-pressed={stats.isBookmarked}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                stats.isBookmarked
                  ? 'border-[#8b5cf6]/70 bg-[#8b5cf6]/20 text-[#d0bcff]'
                  : 'border-white/15 bg-[#171b26] text-[#c2c6d6] hover:text-white'
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${stats.isBookmarked ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
              <span>{stats.isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close syllabus inspector"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#171b26] text-[#c2c6d6] transition-colors hover:border-white/25 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          {/* Cover + Title */}
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0e18]">
            {!imgError ? (
              <img
                src={course.imagePath}
                alt={course.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-44 w-full object-cover sm:h-52"
              />
            ) : (
              <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-[#171b26] to-[#0f131d] text-sm text-[#adc6ff]">
                {course.track}
              </div>
            )}
          </div>

          <h2
            id="drawer-course-title"
            className="mt-5 font-display text-2xl font-bold tracking-tight text-white"
          >
            {course.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#c2c6d6]">
            {course.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8c909f]">
            <span>
              Instructor:{' '}
              <strong className="font-medium text-[#dfe2f1]">
                {course.instructor.name}
              </strong>{' '}
              ({course.instructor.role})
            </span>
            <span className="font-mono tabular-nums">
              {formatDuration(course.totalMinutes)} total
            </span>
          </div>

          {/* Progress Box */}
          <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#171b26] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-xs font-semibold text-white">
                {stats.isCompleted
                  ? 'Track Completed'
                  : stats.isEnrolled
                    ? 'Saved Progress'
                    : 'Not Yet Started'}
              </span>
              <span className="font-mono text-xs tabular-nums text-[#adc6ff]">
                {stats.completedCount} / {stats.totalCount} lessons (
                {stats.percent}%)
              </span>
            </div>

            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="nexora-progress-fill h-full rounded-full transition-all duration-300"
                style={{ width: `${stats.percent}%` }}
              />
            </div>

            {!stats.isEnrolled && (
              <button
                type="button"
                onClick={() => onEnrollCourse(course.id)}
                className="mt-3 rounded-full bg-[#3b82f6] px-4 py-1.5 font-display text-xs font-semibold text-white hover:bg-[#2563eb] cursor-pointer"
              >
                Start Track
              </button>
            )}
          </div>

          {/* Segmented View Switcher: Syllabus vs Interactive Craft Lab */}
          <div className="mt-6 flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#111827] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('syllabus')}
              className={`flex-1 rounded-full py-2 font-display text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-[#8c909f] hover:text-white'
              }`}
            >
              Syllabus &amp; Progress
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lab')}
              className={`flex-1 rounded-full py-2 font-display text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-[#8c909f] hover:text-white'
              }`}
            >
              Interactive Craft Lab
            </button>
          </div>

          {activeTab === 'lab' ? (
            <div className="mt-5">
              <CraftLabPreview
                kind={course.craftLabKind}
                title={course.craftLabTitle}
              />
            </div>
          ) : (
            <>
              {/* Key Outcomes */}
              <div className="mt-6">
                <h3 className="font-display text-sm font-semibold text-white">
                  What you will build &amp; master
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#c2c6d6]">
                  {course.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2.5 leading-relaxed"
                    >
                      <Check
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-[#10b981]"
                        aria-hidden="true"
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Syllabus Modules */}
              <div className="mt-7 space-y-5">
                {course.modules.map((mod) => {
                  const modLessonIds = mod.lessons.map((l) => l.id);
                  const modCompletedCount = modLessonIds.filter((id) =>
                    completedSet.has(id)
                  ).length;
                  const modAllDone = modCompletedCount === modLessonIds.length;

                  return (
                    <div
                      key={mod.id}
                      className="rounded-xl border border-white/[0.08] bg-[#111827] overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
                        <h4 className="font-display text-sm font-semibold text-white">
                          {mod.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            onToggleModuleComplete(course.id, modLessonIds)
                          }
                          className="font-display text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors cursor-pointer"
                        >
                          {modAllDone
                            ? 'Unmark module'
                            : 'Mark module complete'}
                        </button>
                      </div>

                      <div className="divide-y divide-white/[0.06]">
                        {mod.lessons.map((lesson) => {
                          const isDone = completedSet.has(lesson.id);
                          const isNextUp = lesson.id === firstUnfinishedId;

                          return (
                            <div
                              key={lesson.id}
                              onClick={() =>
                                onToggleLesson(course.id, lesson.id)
                              }
                              role="checkbox"
                              aria-checked={isDone}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  onToggleLesson(course.id, lesson.id);
                                }
                              }}
                              className={`relative flex items-start gap-3.5 px-4 py-3.5 transition-colors cursor-pointer ${
                                isNextUp
                                  ? 'bg-[#3b82f6]/[0.06]'
                                  : 'hover:bg-white/[0.03]'
                              }`}
                            >
                              {/* Electric blue indicator bar on next active lesson */}
                              {isNextUp && (
                                <span
                                  className="absolute top-2.5 bottom-2.5 left-1 w-[3px] rounded-full bg-[#3b82f6]"
                                  aria-hidden="true"
                                />
                              )}

                              {/* Custom Nexora Squircle Checkbox */}
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  isDone
                                    ? 'border-[#3b82f6] bg-[#3b82f6] text-white shadow-[0_0_12px_rgba(59,130,246,0.45)]'
                                    : 'border-white/20 bg-[#0f131d]'
                                }`}
                              >
                                {isDone && (
                                  <Check
                                    className="h-3.5 w-3.5 stroke-[2.5]"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <p
                                    className={`text-sm font-medium ${
                                      isDone
                                        ? 'text-[#8c909f] line-through'
                                        : 'text-[#dfe2f1]'
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <span className="shrink-0 font-mono text-xs tabular-nums text-[#8c909f]">
                                    {lesson.type} · {lesson.durationMinutes}m
                                  </span>
                                </div>
                                <p className="mt-1 text-xs leading-relaxed text-[#8c909f]">
                                  {lesson.summary}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};
