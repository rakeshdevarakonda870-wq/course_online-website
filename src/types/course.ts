export type CourseTrack =
  | 'Design Systems'
  | 'UI Craft'
  | 'Frontend Motion'
  | 'Accessibility';

export type CourseLevel = 'Foundations' | 'Intermediate' | 'Advanced';

export type LessonType = 'Video' | 'Lab' | 'Critique';

export type CraftLabKind = 'tokens' | 'motion' | 'grid' | 'contrast';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: LessonType;
  summary: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  track: CourseTrack;
  level: CourseLevel;
  instructor: {
    name: string;
    role: string;
  };
  totalMinutes: number;
  imagePath: string;
  featured?: boolean;
  craftLabKind: CraftLabKind;
  craftLabTitle: string;
  outcomes: string[];
  modules: CourseModule[];
}

export interface LearnerProgressState {
  completedLessons: string[];
  bookmarkedCourses: string[];
  enrolledCourses: string[];
  lastActiveCourseId: string | null;
}
