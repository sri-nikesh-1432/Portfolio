import React from 'react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';
import {
  SiPython,
  SiFastapi,
  SiReact,
  SiMysql,
  SiClaude,
  SiGooglecolab,
  SiGithub,
  SiMongodb,
  SiDatabricks,
  SiKaggle,
  SiJupyter,
  SiLangchain,
  SiHuggingface,
} from 'react-icons/si';
import {
  BrainCircuit,
  Network,
  Sparkles,
  AudioWaveform,
  ScanEye,
  Bot,
  Languages,
  Rocket,
  BarChart3,
  LineChart,
  PieChart,
  Database,
  GitBranch,
  Workflow,
  Sigma,
  Cpu,
  GraduationCap,
  Users,
  Search,
  Boxes,
  Layers,
  ScatterChart,
  Binary,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

type LogoSpec =
  | { kind: 'brand'; Icon: IconType; className: string }
  | { kind: 'lucide'; Icon: LucideIcon; className: string }
  | { kind: 'monogram'; letters: string; className: string };

/* Warm-glass tiles; className drives the logo colour so each skill keeps a
   recognisable identity without breaking the parchment palette. */
const LOGO_MAP: Record<string, LogoSpec> = {
  /* ---------- Programming ---------- */
  Python: { kind: 'brand', Icon: SiPython, className: 'text-[#3572A5]' },
  FastAPI: { kind: 'brand', Icon: SiFastapi, className: 'text-[#059669]' },
  'React.js': { kind: 'brand', Icon: SiReact, className: 'text-[#61DAFB]' },
  SQL: { kind: 'monogram', letters: 'SQL', className: 'from-[#B0893F] to-[#7C5A20]' },
  MySQL: { kind: 'brand', Icon: SiMysql, className: 'text-[#2E6E9E]' },
  'Data Structures': { kind: 'lucide', Icon: Binary, className: 'text-[#5E7A8C]' },

  /* ---------- AI & ML ---------- */
  'Artificial Intelligence': { kind: 'lucide', Icon: BrainCircuit, className: 'text-accent-gold' },
  'Machine Learning': { kind: 'lucide', Icon: Cpu, className: 'text-[#8C5A9E]' },
  'Deep Learning': { kind: 'lucide', Icon: Network, className: 'text-accent-copper' },
  'Generative AI': { kind: 'lucide', Icon: Sparkles, className: 'text-[#B06E2E]' },
  'Natural Language Processing': { kind: 'lucide', Icon: Languages, className: 'text-[#6E8B4E]' },
  'Computer Vision': { kind: 'lucide', Icon: ScanEye, className: 'text-[#5E7A8C]' },
  'Conversational AI': { kind: 'lucide', Icon: Bot, className: 'text-accent-gold' },
  'Multi-Lingual Voice Agents': { kind: 'lucide', Icon: AudioWaveform, className: 'text-accent-copper' },
  'AI Agentic Automation': { kind: 'lucide', Icon: Workflow, className: 'text-[#8C5A9E]' },
  'Claude Skills': { kind: 'brand', Icon: SiClaude, className: 'text-[#D97706]' },
  'Prediction System': { kind: 'lucide', Icon: Rocket, className: 'text-accent-gold' },
  'AI & ML Engineering': { kind: 'lucide', Icon: GraduationCap, className: 'text-accent-gold' },

  /* ---------- Data & Analytics ---------- */
  'Data Science': { kind: 'lucide', Icon: Database, className: 'text-accent-gold' },
  'Data Analytics': { kind: 'lucide', Icon: BarChart3, className: 'text-accent-copper' },
  'Exploratory Data Analysis': { kind: 'lucide', Icon: PieChart, className: 'text-[#6E8B4E]' },
  'Scatter Plot': { kind: 'lucide', Icon: ScatterChart, className: 'text-[#3F7FA8]' },
  'Feature Engineering': { kind: 'lucide', Icon: Layers, className: 'text-[#8C5A9E]' },
  'Data Splitting': { kind: 'lucide', Icon: GitBranch, className: 'text-accent-copper' },
  'Model Evaluation': { kind: 'lucide', Icon: CheckCircle2, className: 'text-status-green' },
  'Linear Regression': { kind: 'lucide', Icon: LineChart, className: 'text-[#3F7FA8]' },
  Matplotlib: { kind: 'monogram', letters: 'plt', className: 'from-[#B0893F] to-[#7C5A20]' },
  'Foundations of Data Science': { kind: 'lucide', Icon: Sigma, className: 'text-accent-copper' },

  /* ---------- Professional & Tools ---------- */
  'Google Colab': { kind: 'brand', Icon: SiGooglecolab, className: 'text-[#E8930C]' },
  'GitHub Fundamentals': { kind: 'brand', Icon: SiGithub, className: 'text-ink' },
  'Team Coordination': { kind: 'lucide', Icon: Users, className: 'text-[#6E8B4E]' },
  Engineering: { kind: 'lucide', Icon: Boxes, className: 'text-accent-copper' },
  'Soft Skill Development': { kind: 'lucide', Icon: Lightbulb, className: 'text-accent-gold' },
};

/* Brand icons no longer shipped by Simple Icons fall back to a clean monogram —
   never a random unrelated logo. */
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
