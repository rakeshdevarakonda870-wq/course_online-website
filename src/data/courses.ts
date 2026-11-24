import { Course } from '../types/course';

export const HERO_ARTWORK_PATH =
  '/src/assets/images/hero_design_systems_1795488517269.jpg';

export const COURSES: Course[] = [
  {
    id: 'ds-token-architecture',
    title: 'Design Systems & Semantic Token Architecture',
    subtitle:
      'Build multi-tier color, elevation, and spacing token pipelines that stay synchronized between Figma variables and production CSS.',
    track: 'Design Systems',
    level: 'Intermediate',
    instructor: {
      name: 'Elena Rostova',
      role: 'Staff Design Systems Architect, LinearCraft',
    },
    totalMinutes: 390,
    imagePath: '/src/assets/images/course_design_tokens_1795488517764.jpg',
    featured: true,
    craftLabKind: 'tokens',
    craftLabTitle: 'Interactive Surface & Elevation Token Inspector',
    outcomes: [
      'Structure primitive, semantic, and component token tiers without circular overrides',
      'Automate dark-surface luminance delta checks and optical border tokens',
      'Ship zero-runtime CSS custom property bundles with strict TypeScript contracts',
    ],
    modules: [
      {
        id: 'ds-m1',
        title: '01. Semantic Token Foundations',
        lessons: [
          {
            id: 'ds-l1',
            title: 'Primitive Scales vs. Intent-Driven Semantics',
            durationMinutes: 28,
            type: 'Video',
            summary:
              'Why raw palette keys fail across dark surfaces and how to name surface-to-ink pairs.',
          },
          {
            id: 'ds-l2',
            title: 'Dark Canvas Luminance & Hairline Border Math',
            durationMinutes: 34,
            type: 'Lab',
            summary:
              'Calibrate 6%–12% elevation deltas and directional top-rim highlights in CSS.',
          },
          {
            id: 'ds-l3',
            title: 'Audit: Refactoring a Legacy SaaS Palette',
            durationMinutes: 32,
            type: 'Critique',
            summary:
              'Collapse 42 conflicting gray hex codes into 6 governed slate surface tokens.',
          },
        ],
      },
      {
        id: 'ds-m2',
        title: '02. Multi-Theme & Concentric Geometry',
        lessons: [
          {
            id: 'ds-l4',
            title: 'Concentric Radius Formulas & Padding Ratios',
            durationMinutes: 26,
            type: 'Video',
            summary:
              'Maintain optical alignment between nested cards, avatars, and media frames.',
          },
          {
            id: 'ds-l5',
            title: 'Building a Zero-Flicker Theme Variable Layer',
            durationMinutes: 42,
            type: 'Lab',
            summary:
              'Map Tailwind v4 @theme tokens directly to Figma Variable JSON exports.',
          },
          {
            id: 'ds-l6',
            title: 'Component API Contracts & Slot Composition',
            durationMinutes: 38,
            type: 'Video',
            summary:
              'Design variant props that constrain misuse without blocking product velocity.',
          },
        ],
      },
      {
        id: 'ds-m3',
        title: '03. Governance & Release Pipelines',
        lessons: [
          {
            id: 'ds-l7',
            title: 'Automated Visual Diffing & Token Changelogs',
            durationMinutes: 40,
            type: 'Lab',
            summary:
              'Catch contrast regressions and spacing drift in pull request previews.',
          },
          {
            id: 'ds-l8',
            title: 'Adoption Playbook for Product Engineering Teams',
            durationMinutes: 30,
            type: 'Critique',
            summary:
              'Run weekly design-engineering office hours and deprecation timelines.',
          },
        ],
      },
    ],
  },
  {
    id: 'motion-choreography-physics',
    title: 'Frontend Motion Choreography & Interaction Physics',
    subtitle:
      'Design sub-200ms compositor transitions, spring-damped drawers, and interruptible micro-interactions that feel physically grounded.',
    track: 'Frontend Motion',
    level: 'Advanced',
    instructor: {
      name: 'Marcus Vance',
      role: 'Principal Design Engineer, Framehouse',
    },
    totalMinutes: 340,
    imagePath: '/src/assets/images/course_motion_craft_1795488518191.jpg',
    featured: true,
    craftLabKind: 'motion',
    craftLabTitle: 'Cubic-Bezier & Settling Curve Sandbox',
    outcomes: [
      'Author custom exponential ease-out curves that eliminate sluggish UI transitions',
      'Keep animations strictly on transform and opacity for locked 120fps frame pacing',
      'Implement reduced-motion fallbacks that preserve spatial state clarity',
    ],
    modules: [
      {
        id: 'mc-m1',
        title: '01. Timing Curves & Perceptual Latency',
        lessons: [
          {
            id: 'mc-l1',
            title: 'Deconstructing cubic-bezier(0.16, 1, 0.3, 1)',
            durationMinutes: 25,
            type: 'Video',
            summary:
              'Why fast initial velocity with long asymptotic settling feels instant.',
          },
          {
            id: 'mc-l2',
            title: 'Spring Stiffness, Damping & Mass Calibration',
            durationMinutes: 38,
            type: 'Lab',
            summary:
              'Tune tactile press depth and drawer entry springs without overshoot bounce.',
          },
        ],
      },
      {
        id: 'mc-m2',
        title: '02. Compositor-Safe State Transitions',
        lessons: [
          {
            id: 'mc-l3',
            title: 'FLIP Layout Animations Without Layout Thrash',
            durationMinutes: 44,
            type: 'Lab',
            summary:
              'Animate filter tab indicators and card re-ordering using GPU transforms.',
          },
          {
            id: 'mc-l4',
            title: 'Choreographing Staggered Disclosure & Focus',
            durationMinutes: 32,
            type: 'Video',
            summary:
              'Direct user attention across multi-panel inspectors without artificial delays.',
          },
          {
            id: 'mc-l5',
            title: 'Critique: Auditing Motion Overload in Dashboards',
            durationMinutes: 28,
            type: 'Critique',
            summary:
              'Identify and strip decorative animations that compete with real data changes.',
          },
        ],
      },
      {
        id: 'mc-m3',
        title: '03. Reduced Motion & Tactile Feedback',
        lessons: [
          {
            id: 'mc-l6',
            title: 'Cross-Dissolve Alternatives for Prefers-Reduced-Motion',
            durationMinutes: 30,
            type: 'Lab',
            summary:
              'Replace spatial translations with instant opacity shifts when requested.',
          },
        ],
      },
    ],
  },
  {
    id: 'swiss-grids-css-architecture',
    title: 'Swiss Grid Systems & Modern CSS Architecture',
    subtitle:
      'Master CSS Subgrid, container queries, fluid clamp typography, and editorial asymmetric layouts for high-density web apps.',
    track: 'UI Craft',
    level: 'Intermediate',
    instructor: {
      name: 'Clara Lindqvist',
      role: 'Design Technologist, Nordik Studio',
    },
    totalMinutes: 310,
    imagePath: '/src/assets/images/course_css_grids_1795488518322.jpg',
    featured: true,
    craftLabKind: 'grid',
    craftLabTitle: 'Interactive Fluid Grid & Gutter Proportion Lab',
    outcomes: [
      'Architect 12-column fluid grids that collapse gracefully across 1440px, 768px, and 375px',
      'Align heterogeneous card internals effortlessly using CSS Subgrid',
      'Eliminate media-query sprawl with container-driven component responsiveness',
    ],
    modules: [
      {
        id: 'sg-m1',
        title: '01. Editorial Grids & Typographic Measure',
        lessons: [
          {
            id: 'sg-l1',
            title: '8pt Rhythm, Gutters & Maximum Line Measure',
            durationMinutes: 26,
            type: 'Video',
            summary:
              'Balance 65–75ch reading lanes inside wide 1440px application viewports.',
          },
          {
            id: 'sg-l2',
            title: 'Fluid Type Scales with clamp() and text-wrap: balance',
            durationMinutes: 32,
            type: 'Lab',
            summary:
              'Prevent orphan headline words across split-column hero compositions.',
          },
        ],
      },
      {
        id: 'sg-m2',
        title: '02. Subgrid & Container Query Patterns',
        lessons: [
          {
            id: 'sg-l3',
            title: 'Synchronizing Multi-Card Baselines with Subgrid',
            durationMinutes: 36,
            type: 'Lab',
            summary:
              'Lock card titles, metadata rows, and footers across variable copy lengths.',
          },
          {
            id: 'sg-l4',
            title: 'Asymmetric Bento Spans Without Overflow Bugs',
            durationMinutes: 35,
            type: 'Video',
            summary:
              'Build 2:1 editorial feature grids with safe min-width truncation rules.',
          },
          {
            id: 'sg-l5',
            title: 'Critique: Fixing Breakpoint Jumps in Catalog Grids',
            durationMinutes: 28,
            type: 'Critique',
            summary:
              'Transition smoothly from 4-column desktop tracks to touch carousels.',
          },
        ],
      },
    ],
  },
  {
    id: 'accessibility-contrast-craft',
    title: 'Accessible Interface Craft & Optical Contrast',
    subtitle:
      'Engineer WCAG AA/AAA dark-mode interfaces, keyboard roving tabindex trees, and color-blind-safe semantic systems.',
    track: 'Accessibility',
    level: 'Foundations',
    instructor: {
      name: 'Devon Okafor',
      role: 'Accessibility Lead, CivicWeb',
    },
    totalMinutes: 260,
    imagePath: '/src/assets/images/course_accessibility_craft_1795488519901.jpg',
    craftLabKind: 'contrast',
    craftLabTitle: 'Live WCAG Contrast & Dark Surface Lab',
    outcomes: [
      'Verify 4.5:1 body text and 3:1 UI component contrast across layered dark surfaces',
      'Build keyboard-navigable syllabus trees, segmented tabs, and focus-trapped drawers',
      'Replace hue-only state dots with dual-coded icons and explicit semantic text',
    ],
    modules: [
      {
        id: 'ac-m1',
        title: '01. Optical Contrast & Dark Mode Legibility',
        lessons: [
          {
            id: 'ac-l1',
            title: 'APCA vs. WCAG 2.1 Contrast on Obsidian Surfaces',
            durationMinutes: 24,
            type: 'Video',
            summary:
              'Avoid halation from pure #FFFFFF on #000000 while keeping crisp legibility.',
          },
          {
            id: 'ac-l2',
            title: 'Dual-Coded Status & Error Systems',
            durationMinutes: 30,
            type: 'Lab',
            summary:
              'Pair emerald, amber, and crimson signals with clear labels and SVG glyphs.',
          },
        ],
      },
      {
        id: 'ac-m2',
        title: '02. Keyboard Mechanics & Screen Reader Semantics',
        lessons: [
          {
            id: 'ac-l3',
            title: 'Focus Rings, Escape Handlers & Drawer Restoration',
            durationMinutes: 34,
            type: 'Lab',
            summary:
              'Return keyboard focus cleanly to the triggering course card on drawer close.',
          },
          {
            id: 'ac-l4',
            title: 'Accessible Filter Tabs & Live Result Announcements',
            durationMinutes: 28,
            type: 'Critique',
            summary:
              'Ensure aria-live counts update clearly when filtering large course grids.',
          },
        ],
      },
    ],
  },
  {
    id: 'glassmorphic-depth-surfaces',
    title: 'Depth, Glass Optics & Directional Rim Lighting',
    subtitle:
      'Replace muddy drop shadows with layered slate elevations, calibrated backdrop blurs, and hairline edge lighting.',
    track: 'UI Craft',
    level: 'Intermediate',
    instructor: {
      name: 'Sora Takahashi',
      role: 'Senior Product Designer, Kanso Labs',
    },
    totalMinutes: 245,
    imagePath: '/src/assets/images/course_spatial_interfaces_1795488519941.jpg',
    craftLabKind: 'tokens',
    craftLabTitle: 'Glass Blur & Rim Light Calibration Studio',
    outcomes: [
      'Compose 3-layer surface hierarchies without heavy opaque shadows',
      'Tune backdrop-filter blur radii so underlying text never muddies foreground copy',
      'Craft directional top-rim CSS pseudo-element highlights with zero DOM bloat',
    ],
    modules: [
      {
        id: 'gd-m1',
        title: '01. Physics of Dark UI Elevation',
        lessons: [
          {
            id: 'gd-l1',
            title: 'Why Light Comes from Above in Dark Interfaces',
            durationMinutes: 22,
            type: 'Video',
            summary:
              'Use subtle top edge gradients instead of uniform 1px gray boxes.',
          },
          {
            id: 'gd-l2',
            title: 'Backdrop Blur Performance & Scrim Opacity Math',
            durationMinutes: 32,
            type: 'Lab',
            summary:
              'Balance 75%–85% surface translucency with 24px blur for crisp readability.',
          },
          {
            id: 'gd-l3',
            title: 'Single-Elevation Discipline on Complex Dashboards',
            durationMinutes: 28,
            type: 'Critique',
            summary:
              'Remove nested card-inside-card borders using whitespace and hairlines.',
          },
        ],
      },
    ],
  },
  {
    id: 'editorial-typography-interfaces',
    title: 'Editorial Typography & Tabular UI Discipline',
    subtitle:
      'Pair expressive geometric display faces with legible interface copy, tabular numerals, and balanced micro-labels.',
    track: 'UI Craft',
    level: 'Foundations',
    instructor: {
      name: 'Julian Mercer',
      role: 'Type & Interface Director, Typefoundry',
    },
    totalMinutes: 215,
    imagePath: '/src/assets/images/course_css_grids_1795488518322.jpg',
    craftLabKind: 'contrast',
    craftLabTitle: 'Type Scale & Tabular Alignment Inspector',
    outcomes: [
      'Select high-character display and body font pairings that scale cleanly at 12px and 56px',
      'Eliminate numeric jitter in timers, progress counters, and pricing matrices with tabular-nums',
      'Replace noisy capsule badges with clean typographic metadata separators',
    ],
    modules: [
      {
        id: 'et-m1',
        title: '01. Geometric Pairing & Optical Tracking',
        lessons: [
          {
            id: 'et-l1',
            title: 'Negative Display Tracking vs. Positive Body Tracking',
            durationMinutes: 26,
            type: 'Video',
            summary:
              'Adjust letter-spacing dynamically from -0.03em heroes to +0.02em micro-labels.',
          },
          {
            id: 'et-l2',
            title: 'Tabular Numerals & Monospace Rhythm in Product UI',
            durationMinutes: 24,
            type: 'Lab',
            summary:
              'Align duration columns, completion percentages, and lesson indices vertically.',
          },
          {
            id: 'et-l3',
            title: 'Metadata Without Pill Clutter',
            durationMinutes: 22,
            type: 'Critique',
            summary:
              'Convert tag-heavy cards into scannable typographic lines.',
          },
        ],
      },
    ],
  },
  {
    id: 'headless-component-engineering',
    title: 'Headless React Primitives & State Machines',
    subtitle:
      'Architect composable dialogs, comboboxes, and multi-select filter bars with clean keyboard handling and zero style lock-in.',
    track: 'Design Systems',
    level: 'Advanced',
    instructor: {
      name: 'Nadia Benali',
      role: 'Principal Frontend Engineer, RelayUI',
    },
    totalMinutes: 420,
    imagePath: '/src/assets/images/course_design_tokens_1795488517764.jpg',
    craftLabKind: 'grid',
    craftLabTitle: 'Composable Slot & Focus-Trap Blueprint',
    outcomes: [
      'Separate state orchestration hooks from visual presentation layers cleanly',
      'Implement deterministic focus management and Escape-to-close layers for drawers',
      'Handle optimistic local persistence and schema-safe hydration without flicker',
    ],
    modules: [
      {
        id: 'hc-m1',
        title: '01. Compound Patterns & Inversion of Control',
        lessons: [
          {
            id: 'hc-l1',
            title: 'Designing Predictable Controlled & Uncontrolled APIs',
            durationMinutes: 36,
            type: 'Video',
            summary:
              'Build components that scale from quick prototypes to full design system primitives.',
          },
          {
            id: 'hc-l2',
            title: 'Building a Zero-Dependency Slide-Over Inspector',
            durationMinutes: 48,
            type: 'Lab',
            summary:
              'Handle scroll locking, backdrop clicks, and keyboard focus traps cleanly.',
          },
        ],
      },
      {
        id: 'hc-m2',
        title: '02. Persistent Client State & Filtering Engines',
        lessons: [
          {
            id: 'hc-l3',
            title: 'Multi-Facet Search & URL/Storage Synchronization',
            durationMinutes: 42,
            type: 'Lab',
            summary:
              'Combine text queries, discipline tabs, and saved toggles without stale state.',
          },
          {
            id: 'hc-l4',
            title: 'Code Review: Eliminating Prop Drilling in Catalogs',
            durationMinutes: 34,
            type: 'Critique',
            summary:
              'Refactor tangled filter callbacks into crisp typed reducer actions.',
          },
        ],
      },
    ],
  },
  {
    id: 'interactive-prototyping-code',
    title: 'Interactive Prototyping in React & Tailwind CSS',
    subtitle:
      'Bridge static Figma frames and shipping software by prototyping real data flows, responsive viewports, and micro-interactions in code.',
    track: 'Frontend Motion',
    level: 'Foundations',
    instructor: {
      name: 'Liam Gallagher-Kerr',
      role: 'Design Engineer, Studio Vector',
    },
    totalMinutes: 275,
    imagePath: '/src/assets/images/course_spatial_interfaces_1795488519941.jpg',
    craftLabKind: 'motion',
    craftLabTitle: 'Interactive Transition & State Timing Lab',
    outcomes: [
      'Translate static layout specs into working React components within one afternoon',
      'Validate edge cases like empty search states, long titles, and mobile touch targets early',
      'Use Tailwind v4 utility composition with custom CSS tokens for rapid iteration',
    ],
    modules: [
      {
        id: 'ip-m1',
        title: '01. From Static Mockup to Living Prototype',
        lessons: [
          {
            id: 'ip-l1',
            title: 'Stress-Testing Copy Lengths & Responsive Viewports',
            durationMinutes: 28,
            type: 'Video',
            summary:
              'Catch wrapped buttons and overflow bugs before handoff.',
          },
          {
            id: 'ip-l2',
            title: 'Rapid State Prototyping with LocalStorage Persistence',
            durationMinutes: 36,
            type: 'Lab',
            summary:
              'Give stakeholder critiques real stateful persistence across refreshes.',
          },
          {
            id: 'ip-l3',
            title: 'Polishing Hover Lift & Focus Halo Timing',
            durationMinutes: 26,
            type: 'Critique',
            summary:
              'Align interactive feedback curves across cards, inputs, and buttons.',
          },
        ],
      },
    ],
  },
];

export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getCourseLessonIds(course: Course): string[] {
  return course.modules.flatMap((m) => m.lessons.map((l) => l.id));
}
