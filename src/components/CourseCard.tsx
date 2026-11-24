import React, { useState } from 'react';
import { Bookmark, Layers } from 'lucide-react';
import { formatDuration } from '../data/courses';
import { CourseProgressStats } from '../hooks/useLearnerProgress';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  stats: CourseProgressStats;
  onOpenCourse: (courseId: string) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  stats,
  onOpenCourse,
  onToggleBookmark,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onOpenCourse(course.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCourse(course.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open syllabus for ${course.title}`}
      className="nexora-card group flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_12px_32px_rgba(59,130,246,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] cursor-pointer"
    >
      <div>
        {/* Concentric inner media frame (outer r=16px, p=20px -> inner r=12px) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0a0e18]">
          {!imgError ? (
            <img
              src={course.imagePath}
              alt={`${course.title} studio preview`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#171b26] via-[#0f131d] to-[#1e293b] p-4 text-center">
              <Layers className="h-8 w-8 text-[#4d8eff]/70" aria-hidden="true" />
              <span className="font-display text-xs font-medium text-[#c2c6d6]">
                {course.track}
              </span>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0e18]/65 via-transparent to-transparent"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(course.id);
            }}
            aria-label={
              stats.isBookmarked
                ? `Remove ${course.title} from saved courses`
                : `Save ${course.title} to bookmarks`
            }
            aria-pressed={stats.isBookmarked}
            className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-150 cursor-pointer ${
              stats.isBookmarked
                ? 'border-[#8b5cf6]/70 bg-[#8b5cf6]/25 text-[#d0bcff] shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                : 'border-white/15 bg-[#0f131d]/75 text-[#c2c6d6] hover:border-[#3b82f6]/60 hover:text-white'
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${stats.isBookmarked ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Unboxed Zero-Pill Metadata Line */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8c909f]">
          <span className="font-display font-semibold text-[#adc6ff]">
            {course.track}
          </span>
          <span aria-hidden="true">·</span>
          <span>{course.level}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {formatDuration(course.totalMinutes)}
          </span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-[#adc6ff]">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#c2c6d6]">
          {course.subtitle}
        </p>
      </div>

      {/* Bottom Instructor & Progress Track */}
      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="truncate text-[#c2c6d6]">
            {course.instructor.name}
          </span>
          <span className="shrink-0 font-mono tabular-nums text-[#8c909f]">
            {stats.isCompleted ? (
              <span className="font-medium text-[#10b981]">Completed</span>
            ) : stats.completedCount > 0 ? (
              <span className="text-[#dfe2f1]">
                {stats.percent}% ({stats.completedCount}/{stats.totalCount})
              </span>
            ) : (
              <span>{stats.totalCount} lessons</span>
            )}
          </span>
        </div>

        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="nexora-progress-fill h-full rounded-full transition-all duration-300"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
      </div>
    </article>
  );
};
