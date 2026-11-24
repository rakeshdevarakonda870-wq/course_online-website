import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';
import { CraftLabKind } from '../types/course';

interface CraftLabPreviewProps {
  kind: CraftLabKind;
  title: string;
}

const SURFACE_LAYERS = [
  {
    name: 'Layer 0 Canvas',
    bg: '#0f131d',
    border: 'none',
    note: 'Root obsidian background with zero elevation.',
    css: `background: #0f131d;\nborder: none;`,
  },
  {
    name: 'Layer 1 Card',
    bg: '#171b26',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    note: 'Elevated container with 1px hairline top rim highlight.',
    css: `background: #171b26;\nborder: 1px solid rgba(255, 255, 255, 0.08);`,
  },
  {
    name: 'Layer 2 Glass',
    bg: 'rgba(30, 41, 59, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    note: 'Floating drawer or overlay with 24px backdrop blur.',
    css: `background: rgba(30, 41, 59, 0.75);\nbackdrop-filter: blur(24px);\nborder: 1px solid rgba(255, 255, 255, 0.15);`,
  },
];

const EASING_PRESETS = [
  {
    name: 'Nexora Settling',
    bezier: 'cubic-bezier(0.16, 1, 0.3, 1)',
    description: 'Fast initial response with smooth asymptotic deceleration.',
  },
  {
    name: 'Standard Ease',
    bezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
    description: 'Symmetric acceleration curve for neutral state shifts.',
  },
  {
    name: 'Linear',
    bezier: 'linear',
    description: 'Constant velocity useful only for continuous progress scrubs.',
  },
];

function hexToLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return (
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  );
}

function getContrastRatio(fg: string, bg: string): number {
  const l1 = hexToLuminance(fg);
  const l2 = hexToLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export const CraftLabPreview: React.FC<CraftLabPreviewProps> = ({
  kind,
  title,
}) => {
  // Tokens lab state
  const [layerIdx, setLayerIdx] = useState(1);
  const [copied, setCopied] = useState(false);

  // Motion lab state
  const [easingIdx, setEasingIdx] = useState(0);
  const [durationMs, setDurationMs] = useState(200);
  const [motionPos, setMotionPos] = useState<'start' | 'end'>('start');

  // Grid lab state
  const [columns, setColumns] = useState(3);
  const [gapPx, setGapPx] = useState(16);

  // Contrast lab state
  const [fgHex, setFgHex] = useState('#dfe2f1');
  const [bgHex, setBgHex] = useState('#171b26');

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (kind === 'tokens') {
    const active = SURFACE_LAYERS[layerIdx];
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0e18] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-sm font-semibold text-white">
            {title}
          </h4>
          <button
            type="button"
            onClick={() => handleCopy(active.css)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#171b26] px-3 py-1 text-xs text-[#c2c6d6] hover:text-white cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#10b981]" aria-hidden="true" />
                <span className="text-[#10b981]">Copied CSS</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy CSS</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {SURFACE_LAYERS.map((layer, idx) => (
            <button
              key={layer.name}
              type="button"
              onClick={() => setLayerIdx(idx)}
              className={`rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                idx === layerIdx
                  ? 'bg-[#3b82f6] text-white'
                  : 'border border-white/10 bg-[#171b26] text-[#c2c6d6] hover:text-white'
              }`}
            >
              {layer.name}
            </button>
          ))}
        </div>

        <div
          className="mt-4 rounded-xl p-5 transition-all duration-200"
          style={{
            background: active.bg,
            border: active.border,
          }}
        >
          <p className="font-display text-sm font-semibold text-white">
            {active.name}
          </p>
          <p className="mt-1 text-xs text-[#c2c6d6]">{active.note}</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-[#070a10] p-3 font-mono text-xs text-[#adc6ff]">
            {active.css}
          </pre>
        </div>
      </div>
    );
  }

  if (kind === 'motion') {
    const preset = EASING_PRESETS[easingIdx];
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0e18] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-sm font-semibold text-white">
            {title}
          </h4>
          <button
            type="button"
            onClick={() =>
              setMotionPos((prev) => (prev === 'start' ? 'end' : 'start'))
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6] px-3.5 py-1.5 font-display text-xs font-semibold text-white hover:bg-[#2563eb] cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Trigger Motion</span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {EASING_PRESETS.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setEasingIdx(idx)}
              className={`rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                idx === easingIdx
                  ? 'bg-[#8b5cf6] text-white'
                  : 'border border-white/10 bg-[#171b26] text-[#c2c6d6] hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-[#c2c6d6]">
            <label htmlFor="duration-slider">Transition Duration</label>
            <span className="font-mono tabular-nums text-[#adc6ff]">
              {durationMs}ms
            </span>
          </div>
          <input
            id="duration-slider"
            type="range"
            min={120}
            max={520}
            step={20}
            value={durationMs}
            onChange={(e) => setDurationMs(Number(e.target.value))}
            className="mt-2 w-full accent-[#3b82f6] cursor-pointer"
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#171b26] p-4">
          <div className="relative h-10 w-full rounded-full bg-[#0f131d] p-1">
            <div
              className="h-8 w-24 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] shadow-[0_0_20px_rgba(59,130,246,0.45)]"
              style={{
                transform:
                  motionPos === 'end'
                    ? 'translateX(calc(100% + 48px))'
                    : 'translateX(0px)',
                transitionProperty: 'transform',
                transitionDuration: `${durationMs}ms`,
                transitionTimingFunction: preset.bezier,
              }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-[#adc6ff]">
            transition: transform {durationMs}ms {preset.bezier};
          </p>
          <p className="mt-1 text-xs text-[#8c909f]">{preset.description}</p>
        </div>
      </div>
    );
  }

  if (kind === 'grid') {
    const outerRadius = 20;
    const innerRadius = Math.max(4, outerRadius - Math.round(gapPx / 2));
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0e18] p-4 sm:p-5">
        <h4 className="font-display text-sm font-semibold text-white">
          {title}
        </h4>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="text-xs text-[#c2c6d6]">Columns</span>
            <div className="mt-2 flex gap-2">
              {[2, 3, 4].map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setColumns(col)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold cursor-pointer ${
                    columns === col
                      ? 'bg-[#3b82f6] text-white'
                      : 'border border-white/10 bg-[#171b26] text-[#c2c6d6]'
                  }`}
                >
                  {col} col
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#c2c6d6]">
              <label htmlFor="grid-gap-slider">Gutter Spacing</label>
              <span className="font-mono tabular-nums text-[#adc6ff]">
                {gapPx}px
              </span>
            </div>
            <input
              id="grid-gap-slider"
              type="range"
              min={8}
              max={28}
              step={4}
              value={gapPx}
              onChange={(e) => setGapPx(Number(e.target.value))}
              className="mt-2.5 w-full accent-[#3b82f6] cursor-pointer"
            />
          </div>
        </div>

        <div
          className="mt-4 border border-white/[0.08] bg-[#171b26] p-3"
          style={{
            borderRadius: `${outerRadius}px`,
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${gapPx}px`,
          }}
        >
          {Array.from({ length: columns }).map((_, idx) => (
            <div
              key={idx}
              className="flex h-16 items-center justify-center border border-[#3b82f6]/30 bg-[#0f131d] font-mono text-xs text-[#adc6ff] tabular-nums"
              style={{ borderRadius: `${innerRadius}px` }}
            >
              Cell 0{idx + 1}
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-xs text-[#8c909f] tabular-nums">
          grid-template-columns: repeat({columns}, 1fr) · gap: {gapPx}px ·
          inner-radius: {innerRadius}px
        </p>
      </div>
    );
  }

  // Contrast lab
  const ratio = getContrastRatio(fgHex, bgHex);
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7.0;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0e18] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-display text-sm font-semibold text-white">
          {title}
        </h4>
        <span
          className={`font-mono text-xs font-semibold tabular-nums ${
            passesAA ? 'text-[#10b981]' : 'text-[#ffb4ab]'
          }`}
        >
          {ratio.toFixed(2)}:1 ·{' '}
          {passesAAA ? 'AAA Pass' : passesAA ? 'AA Pass' : 'Below 4.5:1 AA'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[#c2c6d6]">Foreground Ink</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { hex: '#ffffff', label: 'Pure' },
              { hex: '#dfe2f1', label: 'Ink' },
              { hex: '#adc6ff', label: 'Blue' },
              { hex: '#8c909f', label: 'Muted' },
            ].map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => setFgHex(swatch.hex)}
                className={`rounded-full border px-3 py-1 text-xs font-medium cursor-pointer ${
                  fgHex === swatch.hex
                    ? 'border-[#3b82f6] bg-[#3b82f6]/20 text-white'
                    : 'border-white/10 bg-[#171b26] text-[#c2c6d6]'
                }`}
              >
                {swatch.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-[#c2c6d6]">Dark Surface</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { hex: '#0f131d', label: 'Canvas' },
              { hex: '#171b26', label: 'Card' },
              { hex: '#262a35', label: 'Elevated' },
            ].map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => setBgHex(swatch.hex)}
                className={`rounded-full border px-3 py-1 text-xs font-medium cursor-pointer ${
                  bgHex === swatch.hex
                    ? 'border-[#3b82f6] bg-[#3b82f6]/20 text-white'
                    : 'border-white/10 bg-[#171b26] text-[#c2c6d6]'
                }`}
              >
                {swatch.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-4 rounded-xl border border-white/10 p-4"
        style={{ backgroundColor: bgHex, color: fgHex }}
      >
        <p className="font-display text-base font-semibold">
          Sample Interface Copy on Obsidian Slate
        </p>
        <p className="mt-1 text-xs opacity-90">
          Testing body copy legibility ({fgHex} on {bgHex}) for multi-hour
          reading comfort.
        </p>
      </div>
    </div>
  );
};
