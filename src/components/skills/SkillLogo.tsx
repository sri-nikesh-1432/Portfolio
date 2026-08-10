import React from 'react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiFastapi,
  SiReact,
  SiNodedotjs,
  SiPandas,
  SiPlotly,
  SiHuggingface,
  SiGithub,
} from 'react-icons/si';
import {
  BrainCircuit,
  Network,
  Sparkles,
  LibraryBig,
  AudioWaveform,
  ScanEye,
  Bot,
  Languages,
  Rocket,
} from 'lucide-react';

type LogoSpec =
  | { kind: 'brand'; Icon: IconType; className: string }
  | { kind: 'lucide'; Icon: LucideIcon; className: string }
  | { kind: 'monogram'; letters: string; className: string };

/* Tiles are warm glass; the className drives the logo colour so each skill
   keeps a recognisable identity without breaking the parchment palette. */
const LOGO_MAP: Record<string, LogoSpec> = {
  /* ---------- Programming ---------- */
  Python: { kind: 'brand', Icon: SiPython, className: 'text-[#3572A5]' },
  TypeScript: { kind: 'brand', Icon: SiTypescript, className: 'text-[#3178C6]' },
  JavaScript: { kind: 'brand', Icon: SiJavascript, className: 'text-[#B0893F]' },
  SQL: { kind: 'monogram', letters: 'SQL', className: 'from-[#B0893F] to-[#7C5A20]' },
  Java: { kind: 'brand', Icon: SiOpenjdk, className: 'text-[#9E2B20]' },

  /* ---------- AI & ML ---------- */
  'Machine Learning': { kind: 'lucide', Icon: BrainCircuit, className: 'text-accent-gold' },
  'Deep Learning': { kind: 'lucide', Icon: Network, className: 'text-accent-copper' },
  'Generative AI': { kind: 'lucide', Icon: Sparkles, className: 'text-[#B06E2E]' },
  RAG: { kind: 'lucide', Icon: LibraryBig, className: 'text-[#6E8B4E]' },
  'Voice AI': { kind: 'lucide', Icon: AudioWaveform, className: 'text-accent-copper' },
  'Computer Vision': { kind: 'lucide', Icon: ScanEye, className: 'text-[#5E7A8C]' },
  'AI Agents': { kind: 'lucide', Icon: Bot, className: 'text-accent-gold' },
  NLP: { kind: 'lucide', Icon: Languages, className: 'text-[#6E8B4E]' },

  /* ---------- Frameworks & Stack ---------- */
  FastAPI: { kind: 'brand', Icon: SiFastapi, className: 'text-[#059669]' },
  React: { kind: 'brand', Icon: SiReact, className: 'text-[#61DAFB]' },
  'Node.js': { kind: 'brand', Icon: SiNodedotjs, className: 'text-[#5FA04E]' },
  'Pandas / NumPy': { kind: 'brand', Icon: SiPandas, className: 'text-[#8C4D9E]' },
  'Plotly / Matplotlib / Seaborn': { kind: 'brand', Icon: SiPlotly, className: 'text-[#3F7FA8]' },

  /* ---------- Cloud, Models & Tools ---------- */
  Groq: { kind: 'monogram', letters: 'GQ', className: 'from-[#B0352A] to-[#7C1F18]' },
  'OpenAI / Hugging Face': { kind: 'brand', Icon: SiHuggingface, className: 'text-[#E8930C]' },
  AWS: { kind: 'monogram', letters: 'AWS', className: 'from-[#B06E2E] to-[#7C4A1E]' },
  Deployment: { kind: 'lucide', Icon: Rocket, className: 'text-accent-gold' },
  'Git & GitHub': { kind: 'brand', Icon: SiGithub, className: 'text-ink' },
};

/* Brand icons no longer shipped by Simple Icons (removed for trademark
   reasons) fall back to a clean monogram — never a random unrelated logo. */
const FALLBACK: LogoSpec = { kind: 'monogram', letters: 'AI', className: 'from-[#B0893F] to-[#7C5A20]' };

const toInitials = (name: string) =>
  name
    .split(/[\s/&+-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const lookup = (name: string): LogoSpec => {
  const exact = LOGO_MAP[name];
  if (exact) return exact;
  // Compound names like "OpenAI / Hugging Face" → match the leading token.
  const first = name.split('/')[0].trim();
  if (LOGO_MAP[first]) return LOGO_MAP[first];
  return { ...FALLBACK, letters: toInitials(name) || FALLBACK.letters };
};

interface SkillLogoProps {
  skill: string;
  size?: 'md' | 'lg';
}

export const SkillLogo: React.FC<SkillLogoProps> = ({ skill, size = 'lg' }) => {
  const spec = lookup(skill);
  const tile = size === 'lg' ? 'h-16 w-16 rounded-2xl' : 'h-14 w-14 rounded-xl';
  const icon = size === 'lg' ? 'h-9 w-9' : 'h-7 w-7';

  return (
    <span
      aria-hidden="true"
      className={`skill-logo inline-flex ${tile} items-center justify-center border border-accent-gold/25 bg-gradient-to-br from-white/80 to-[#F1E5C9] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-6px_rgba(122,88,30,0.35)]`}
    >
      {spec.kind === 'brand' ? (
        <spec.Icon className={`${icon} ${spec.className}`} />
      ) : spec.kind === 'lucide' ? (
        <spec.Icon className={`${icon} ${spec.className}`} strokeWidth={1.6} />
      ) : (
        <span
          className={`bg-gradient-to-br bg-clip-text font-display text-[15px] font-semibold tracking-tight text-transparent ${spec.className}`}
        >
          {spec.letters}
        </span>
      )}
    </span>
  );
};
