import { useCallback, useState } from 'react';
import { CollectionFilter, CourseCatalog } from './components/CourseCatalog';
import { CourseSyllabusDrawer } from './components/CourseSyllabusDrawer';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { OutcomesSection } from './components/OutcomesSection';
import { PathwaysBento } from './components/PathwaysBento';
import { TopBar } from './components/TopBar';
import { COURSES } from './data/courses';
import { useLearnerProgress } from './hooks/useLearnerProgress';
import { CourseLevel, CourseTrack } from './types/course';

export default function App() {
  const {
    progress,
    summary,
    getCourseStats,
    toggleLesson,
    toggleModuleComplete,
    toggleBookmark,
    enrollCourse,
    setLastActiveCourse,
    resetProgress,
  } = useLearnerProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'All' | CourseTrack>(
    'All'
  );
  const [selectedLevel, setSelectedLevel] = useState<'All' | CourseLevel>(
    'All'
  );
  const [collectionFilter, setCollectionFilter] =
    useState<CollectionFilter>('all');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleOpenCourse = useCallback(
    (courseId: string) => {
      setLastActiveCourse(courseId);
      setActiveCourseId(courseId);
    },
    [setLastActiveCourse]
  );

  const handleSelectTrackAndScroll = useCallback(
    (track: CourseTrack) => {
      setSelectedTrack(track);
      setCollectionFilter('all');
      scrollToSection('catalog');
    },
    [scrollToSection]
  );

  const handleOpenSaved = useCallback(() => {
    setCollectionFilter('saved');
    setSelectedTrack('All');
    setSelectedLevel('All');
    scrollToSection('catalog');
  }, [scrollToSection]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTrack('All');
    setSelectedLevel('All');
    setCollectionFilter('all');
  }, []);

  const hasActiveProgress =
    progress.completedLessons.length > 0 ||
    progress.enrolledCourses.length > 0 ||
    progress.bookmarkedCourses.length > 0;

  const activeCourse =
    COURSES.find((c) => c.id === activeCourseId) ?? null;
  const activeCourseStats = activeCourse
    ? getCourseStats(activeCourse)
    : null;

  const lastActiveStats = getCourseStats(summary.lastActiveCourse);

  return (
    <div className="min-h-screen bg-[#0f131d] text-[#dfe2f1]">
      <TopBar
        hasActiveProgress={summary.activeCoursesCount > 0}
        onNavigateSection={scrollToSection}
        onOpenSaved={handleOpenSaved}
        onPrimaryAction={() => {
          if (summary.activeCoursesCount > 0) {
            handleOpenCourse(summary.lastActiveCourse.id);
          } else {
            scrollToSection('catalog');
          }
        }}
      />

      <main>
        <HeroSection
          lastActiveCourse={summary.lastActiveCourse}
          lastActiveStats={lastActiveStats}
          summary={summary}
          onBrowseCatalog={() => scrollToSection('catalog')}
          onOpenCourse={handleOpenCourse}
        />

        <PathwaysBento onSelectTrack={handleSelectTrackAndScroll} />

        <CourseCatalog
          courses={COURSES}
          searchQuery={searchQuery}
          selectedTrack={selectedTrack}
          selectedLevel={selectedLevel}
          collectionFilter={collectionFilter}
          hasAnyProgress={hasActiveProgress}
          onSearchChange={setSearchQuery}
          onTrackChange={setSelectedTrack}
          onLevelChange={setSelectedLevel}
          onCollectionChange={setCollectionFilter}
          onClearFilters={handleClearFilters}
          onResetProgress={resetProgress}
          getCourseStats={getCourseStats}
          onOpenCourse={handleOpenCourse}
          onToggleBookmark={toggleBookmark}
        />

        <OutcomesSection />
      </main>

      <Footer
        onSelectTrack={handleSelectTrackAndScroll}
        onNavigateSection={scrollToSection}
      />

      <CourseSyllabusDrawer
        course={activeCourse}
        stats={activeCourseStats}
        completedLessons={progress.completedLessons}
        onClose={() => setActiveCourseId(null)}
        onToggleLesson={toggleLesson}
        onToggleModuleComplete={toggleModuleComplete}
        onToggleBookmark={toggleBookmark}
        onEnrollCourse={enrollCourse}
      />
    </div>
  );
}
