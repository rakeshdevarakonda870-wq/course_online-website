import React from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Before Nexora, our Figma variable exports broke whenever engineers touched dark-surface borders. After completing the Token Architecture track, we unified 140 components onto 6 governed surface tokens in three weeks.',
    name: 'Hannah Lindstrom',
    role: 'Staff Product Designer, LatticeFlow',
  },
  {
    quote:
      'The motion physics syllabus replaced guesswork with concrete cubic-bezier settling rules. Our dashboard drawer transitions dropped frame drops to zero and passed our internal 120fps audit.',
    name: 'Tariq Al-Mansoor',
    role: 'Lead Frontend Engineer, Vektor Pay',
  },
  {
    quote:
      'Learning CSS Subgrid and APCA dark-mode contrast together changed how I review every PR. We cut layout regression tickets by 48% across our Q3 redesign.',
    name: 'Mei-Ling Chen',
    role: 'Design Technologist, Kestrel Cloud',
  },
];

export const OutcomesSection: React.FC = () => {
  return (
    <section
      id="outcomes"
      className="mx-auto max-w-[1440px] border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-12 lg:py-16"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.04em] text-[#d0bcff]">
            Practitioner Outcomes
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Built for shipping production interfaces
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[#8c909f] tabular-nums">
          <span>36 structured lessons</span>
          <span aria-hidden="true">·</span>
          <span>4 interactive craft labs</span>
          <span aria-hidden="true">·</span>
          <span>100% browser-persisted progress</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <blockquote
            key={item.name}
            className="nexora-card flex flex-col justify-between rounded-2xl p-6"
          >
            <p className="text-sm leading-relaxed text-[#dfe2f1]">
              “{item.quote}”
            </p>
            <footer className="mt-6 border-t border-white/[0.06] pt-4">
              <p className="font-display text-sm font-semibold text-white">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs text-[#8c909f]">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};
