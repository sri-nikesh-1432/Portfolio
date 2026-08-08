import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { PERSONAL } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-semibold text-ink">Datta Srinikesh Chinta</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              AI Systems Engineer {'·'} Hyderabad, India
            </p>
            <button
              onClick={onOpenTerminal}
              className="mt-3 font-mono text-[11px] text-accent-blue underline-offset-4 hover:underline"
            >
              $ try my terminal →
            </button>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: PERSONAL.links.github, icon: Github, label: 'GitHub' },
              { href: PERSONAL.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email' },
              { href: `tel:${PERSONAL.phone.replace(/\s/g, '')}`, icon: Phone, label: 'Phone' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/60 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:text-accent-blue"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {'©'} {year} Datta Srinikesh Chinta {'·'} Building intelligence, not just software
          </p>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            <Link to="/projects" className="hover:text-accent-blue">02 Projects</Link>
            <Link to="/building" className="hover:text-accent-blue">Building</Link>
            <Link to="/research" className="hover:text-accent-blue">Research</Link>
            <Link to="/music" className="hover:text-accent-blue">Music</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
