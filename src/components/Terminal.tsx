import React, { useEffect, useRef, useState } from 'react';
import { TerminalSquare, X } from 'lucide-react';
import type { TerminalEntry } from '../types';
import {
  BUILDING_PROJECTS,
  CERTIFICATIONS,
  COMPLETED_SYSTEMS,
  EXPERIENCE,
  MUSIC,
  PERSONAL,
  RESEARCH,
  SKILLS,
  TERMINAL_ASCII,
} from '../data/portfolioData';

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

const CMD_HELP = `Available commands
-------------------
  about         Who is Datta Srinikesh Chinta
  projects      The 2 completed projects
  building      Projects currently in development
  research      Pre-publication research
  experience    Internships & education
  skills        Technical skills
  certifications  Certifications
  music         Trinity College London
  contact       Email, phone & social links
  links         Portfolio / GitHub / LinkedIn
  open <name>   Open a project page
  clear         Clear the screen
  exit          Close the terminal
  help          Show this help`;

export const Terminal: React.FC<TerminalProps> = ({ open, onClose }) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootedRef = useRef(false);

  useEffect(() => {
    if (open && !bootedRef.current) {
      bootedRef.current = true;
      const boot: TerminalEntry[] = [
        { id: `b-${Date.now()}`, type: 'ascii', content: TERMINAL_ASCII },
        { id: `b-${Date.now() + 1}`, type: 'system', content: 'DATTA SRINIKESH CHINTA OS v2.0 — portfolio interface' },
        { id: `b-${Date.now() + 2}`, type: 'system', content: 'Type "help" to see available commands.' },
      ];
      setEntries(boot);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries]);

  if (!open) return null;

  const renderOutput = (cmd: string): TerminalEntry[] => {
    const out: TerminalEntry[] = [];
    const c = cmd.trim().toLowerCase();

    if (c === '' || c === 'help' || c === '?') {
      out.push({ id: 'o-help', type: 'output', content: CMD_HELP });
    } else if (c === 'about' || c === 'whoami') {
      out.push(
        { id: 'o1', type: 'output', content: PERSONAL.name },
        { id: 'o2', type: 'output', content: `${PERSONAL.role} · ${PERSONAL.location}` },
        { id: 'o3', type: 'output', content: PERSONAL.education.degree },
        { id: 'o4', type: 'output', content: `${PERSONAL.education.college} — ${PERSONAL.education.period} · CGPA ${PERSONAL.education.cgpa}` },
        { id: 'o5', type: 'info', content: PERSONAL.headline },
        { id: 'o6', type: 'info', content: PERSONAL.tagline }
      );
    } else if (c === 'systems' || c === 'projects') {
      COMPLETED_SYSTEMS.forEach((s) => {
        out.push(
          { id: `s-${s.id}`, type: 'success', content: `[${s.badge}] ${s.name}` },
          { id: `s-${s.id}-d`, type: 'output', content: `  ${s.tagline}` },
          { id: `s-${s.id}-u`, type: 'info', content: `  demo: ${s.demoUrl}` }
        );
      });
      out.push({ id: 's-count', type: 'system', content: '2 COMPLETED PROJECTS' });
    } else if (c === 'building' || c === 'building projects') {
      BUILDING_PROJECTS.forEach((p) => {
        out.push(
          { id: `b-${p.id}`, type: 'output', content: `${p.name} — ${p.status} · ${p.progress}% complete` },
          { id: `b-${p.id}-s`, type: 'info', content: `  stage: ${p.currentStage} → next: ${p.nextMilestone}` }
        );
      });
      out.push({ id: 'b-count', type: 'system', content: 'ALL OTHER PROJECTS — YET TO COMPLETE' });
    } else if (c === 'research') {
      out.push(
        { id: 'r1', type: 'red', content: '[YET TO BE PUBLISHED]' },
        { id: 'r2', type: 'output', content: RESEARCH.title },
        { id: 'r3', type: 'info', content: RESEARCH.statusLine },
        { id: 'r4', type: 'info', content: '  Open the Research Lab to view the manuscript.' }
      );
    } else if (c === 'experience') {
      EXPERIENCE.forEach((e) => {
        out.push(
          { id: `e-${e.id}`, type: 'success', content: `${e.role} — ${e.company}` },
          { id: `e-${e.id}-p`, type: 'output', content: `  ${e.period} · ${e.location}` }
        );
      });
    } else if (c === 'skills') {
      const groups: Record<string, string[]> = {};
      SKILLS.forEach((s) => {
        (groups[s.category] ??= []).push(s.name);
      });
      Object.entries(groups).forEach(([cat, names]) => {
        out.push({ id: `sk-${cat}`, type: 'success', content: `${cat}:` });
        out.push({ id: `sk-${cat}-n`, type: 'output', content: `  ${names.join(' · ')}` });
      });
    } else if (c === 'certifications') {
      CERTIFICATIONS.forEach((cert) => {
        out.push({ id: `c-${cert.id}`, type: 'success', content: `${cert.issuer} — ${cert.title}` });
      });
    } else if (c === 'music') {
      out.push(
        { id: 'm1', type: 'output', content: `${MUSIC.institution} · ${MUSIC.qualification}` },
        { id: 'm2', type: 'output', content: `${MUSIC.instrument} — Grade 4 Practical + Grade 4 Theory` },
        { id: 'm3', type: 'success', content: `${MUSIC.totalCertifications} Trinity certifications completed` }
      );
    } else if (c === 'contact') {
      out.push(
        { id: 'ct1', type: 'output', content: `email: ${PERSONAL.email}` },
        { id: 'ct2', type: 'output', content: `phone: ${PERSONAL.phone}` },
        { id: 'ct3', type: 'output', content: `github: ${PERSONAL.links.github}` },
        { id: 'ct4', type: 'output', content: `linkedin: ${PERSONAL.links.linkedin}` }
      );
    } else if (c === 'links') {
      out.push(
        { id: 'l1', type: 'output', content: `portfolio:   ${PERSONAL.links.portfolio}` },
        { id: 'l2', type: 'output', content: `github:      ${PERSONAL.links.github}` },
        { id: 'l3', type: 'output', content: `linkedin:    ${PERSONAL.links.linkedin}` },
        { id: 'l4', type: 'output', content: `voice agent: ${PERSONAL.links.voiceAgent}` },
        { id: 'l5', type: 'output', content: `rag studio:  ${PERSONAL.links.ragStudio}` }
      );
    } else if (c === 'clear') {
      setEntries([]);
      return [];
    } else if (c === 'exit' || c === 'quit') {
      onClose();
      return [];
    } else if (c.startsWith('open ')) {
      const name = c.replace('open ', '');
      const sys = COMPLETED_SYSTEMS.find((s) => s.slug.includes(name) || s.name.toLowerCase().includes(name));
      if (sys) {
        out.push({ id: 'o-sys', type: 'info', content: `Opening ${sys.name}...` });
        setTimeout(() => window.open(sys.demoUrl, '_blank'), 300);
      } else {
        out.push({ id: 'o-err', type: 'error', content: `Project "${name}" not found. Try: ${COMPLETED_SYSTEMS.map((s) => s.slug).join(', ')}` });
      }
    } else {
      out.push({ id: 'o-err', type: 'error', content: `command not found: ${cmd}. Type "help" for available commands.` });
    }
    return out;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setHistory((h) => [...h, cmd]);
    setHistIndex(-1);
    setEntries((prev) => [...prev, { id: `in-${Date.now()}`, type: 'input', content: cmd }]);
    const outputs = renderOutput(cmd);
    if (outputs.length) setEntries((prev) => [...prev, ...outputs]);
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      if (history[idx] !== undefined) {
        setHistIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex !== -1) {
        const idx = histIndex + 1;
        if (idx >= history.length) {
          setHistIndex(-1);
          setInput('');
        } else {
          setHistIndex(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  const entryStyle: Record<TerminalEntry['type'], string> = {
    input: 'text-white',
    output: 'text-slate-200',
    error: 'text-red-400',
    system: 'text-slate-400',
    success: 'text-emerald-400',
    info: 'text-cyan-300',
    red: 'text-red-400 font-semibold',
    ascii: 'text-cyan-300 whitespace-pre text-[10px] leading-tight',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex h-[min(560px,80vh)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/4 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <TerminalSquare className="h-4 w-4 text-cyan-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300">
              datta-srinikesh-chinta@portfolio ~ terminal
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="term-scroll flex-1 overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed">
          {entries.map((entry) => (
            <pre key={entry.id} className={`whitespace-pre-wrap ${entryStyle[entry.type]}`}>
              {entry.content}
            </pre>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 bg-white/4 px-4 py-3">
          <span className="font-mono text-[12px] text-cyan-300">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent font-mono text-[12px] text-white outline-none placeholder:text-slate-500"
            placeholder="type 'help' to get started"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};
