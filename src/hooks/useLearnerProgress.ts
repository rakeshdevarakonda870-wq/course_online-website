import { useCallback, useEffect, useMemo, useState } from 'react';
import { COURSES, getCourseLessonIds } from '../data/courses';
import { Course, LearnerProgressState } from '../types/course';

const STORAGE_KEY = 'nexora_learner_progress_v1';

const DEFAULT_PROGRESS: LearnerProgressState = {
  completedLessons: ['ds-l1', 'ds-l2', 'sg-l1'],
  bookmarkedCourses: ['ds-token-architecture', 'motion-choreography-physics'],
  enrolledCourses: ['ds-token-architecture', 'swiss-grids-css-architecture'],
  lastActiveCourseId: 'ds-token-architecture',
};

function readInitialProgress(): LearnerProgressState {
  if (typeof window === 'undefined') {
    return DEFAULT_PROGRESS;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw) as Partial<LearnerProgressState>;
    return {
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      bookmarkedCourses: Array.isArray(parsed.bookmarkedCourses)
        ? parsed.bookmarkedCourses
        : [],
      enrolledCourses: Array.isArray(parsed.enrolledCourses)
        ? parsed.enrolledCourses
        : [],
      lastActiveCourseId:
        typeof parsed.lastActiveCourseId === 'string'
          ? parsed.lastActiveCourseId
          : null,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export interface CourseProgressStats {
  completedCount: number;
  totalCount: number;
  percent: number;
  isEnrolled: boolean;
  isBookmarked: boolean;
  isCompleted: boolean;
  completedMinutes: number;
}

export function useLearnerProgress() {
  const [progress, setProgress] = useState<LearnerProgressState>(
    readInitialProgress
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [progress]);

  const toggleLesson = useCallback((courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const completedLessons = alreadyDone
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      const enrolledCourses = prev.enrolledCourses.includes(courseId)
        ? prev.enrolledCourses
        : [...prev.enrolledCourses, courseId];

      return {
        ...prev,
        completedLessons,
        enrolledCourses,
        lastActiveCourseId: courseId,
      };
    });
  }, []);

  const toggleModuleComplete = useCallback(
    (courseId: string, lessonIds: string[]) => {
      setProgress((prev) => {
        const allDone = lessonIds.every((id) =>
          prev.completedLessons.includes(id)
        );
        const completedLessons = allDone
          ? prev.completedLessons.filter((id) => !lessonIds.includes(id))
          : Array.from(new Set([...prev.completedLessons, ...lessonIds]));

        const enrolledCourses = prev.enrolledCourses.includes(courseId)
          ? prev.enrolledCourses
          : [...prev.enrolledCourses, courseId];

        return {
          ...prev,
          completedLessons,
          enrolledCourses,
          lastActiveCourseId: courseId,
        };
      });
    },
    []
  );

  const toggleBookmark = useCallback((courseId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedCourses.includes(courseId);
      return {
        ...prev,
        bookmarkedCourses: exists
          ? prev.bookmarkedCourses.filter((id) => id !== courseId)
          : [...prev.bookmarkedCourses, courseId],
      };
    });
  }, []);

  const enrollCourse = useCallback((courseId: string) => {
    setProgress((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.includes(courseId)
        ? prev.enrolledCourses
        : [...prev.enrolledCourses, courseId],
      lastActiveCourseId: courseId,
    }));
  }, []);

  const setLastActiveCourse = useCallback((courseId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastActiveCourseId: courseId,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const empty: LearnerProgressState = {
      completedLessons: [],
      bookmarkedCourses: [],
      enrolledCourses: [],
      lastActiveCourseId: null,
    };
    setProgress(empty);
  }, []);

  const getCourseStats = useCallback(
    (course: Course): CourseProgressStats => {
      const lessonIds = getCourseLessonIds(course);
      const completedSet = new Set(progress.completedLessons);
      const completedCount = lessonIds.filter((id) =>
        completedSet.has(id)
      ).length;
      const totalCount = lessonIds.length;
      const percent =
        totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
      const completedMinutes = course.modules
        .flatMap((m) => m.lessons)
        .filter((l) => completedSet.has(l.id))
        .reduce((acc, l) => acc + l.durationMinutes, 0);

      return {
        completedCount,
        totalCount,
        percent,
        isEnrolled:
          progress.enrolledCourses.includes(course.id) || completedCount > 0,
        isBookmarked: progress.bookmarkedCourses.includes(course.id),
        isCompleted: totalCount > 0 && completedCount === totalCount,
        completedMinutes,
      };
    },
    [progress]
  );

  const summary = useMemo(() => {
    const completedSet = new Set(progress.completedLessons);
    let activeCoursesCount = 0;
    let completedLessonsCount = 0;
    let studyMinutesLogged = 0;

    COURSES.forEach((course) => {
      const ids = getCourseLessonIds(course);
      const doneInCourse = ids.filter((id) => completedSet.has(id)).length;
      if (doneInCourse > 0 || progress.enrolledCourses.includes(course.id)) {
        activeCoursesCount += 1;
      }
      completedLessonsCount += doneInCourse;
      studyMinutesLogged += course.modules
        .flatMap((m) => m.lessons)
        .filter((l) => completedSet.has(l.id))
        .reduce((sum, l) => sum + l.durationMinutes, 0);
    });

    const lastActiveCourse =
      COURSES.find((c) => c.id === progress.lastActiveCourseId) ||
      COURSES.find((c) => progress.enrolledCourses.includes(c.id)) ||
      COURSES[0];

    return {
      activeCoursesCount,
      completedLessonsCount,
      savedCoursesCount: progress.bookmarkedCourses.length,
      studyMinutesLogged,
      lastActiveCourse,
    };
  }, [progress]);

  return {
    progress,
    summary,
    getCourseStats,
    toggleLesson,
    toggleModuleComplete,
    toggleBookmark,
    enrollCourse,
    setLastActiveCourse,
    resetProgress,
  };
}
