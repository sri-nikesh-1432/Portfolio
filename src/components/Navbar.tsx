import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, TerminalSquare, X } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/building', label: 'BUILDING' },
  { to: '/research', label: 'RESEARCH' },
  { to: '/experience', label: 'EXPERIENCE' },
  { to: '/resume', label: 'RESUME' },
  { to: '/skills', label: 'SKILLS' },
  { to: '/certifications', label: 'CERTIFICATIONS' },
  { to: '/music', label: 'MUSIC' },
  { to: '/contact', label: 'CONTACT' },
];

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
      isActive ? 'text-[#F4D98E]' : 'text-[#D9C3A0] hover:bg-white/8 hover:text-[#F4EBDC]'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`wood-plank rounded-2xl px-4 py-3 transition-shadow duration-500 sm:px-5 ${
            scrolled ? 'shadow-lift' : ''
          }`}
        >
          {/* Row 1 — brand + actions */}
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="group flex items-center gap-3">
              <span className="brass relative flex h-10 w-10 items-center justify-center rounded-xl font-display text-[15px] font-semibold text-[#3A2A10] shadow-brass transition-transform duration-300 group-hover:scale-105">
                DS
                <span className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-[#F4D98E]/50" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[16px] font-semibold tracking-tight text-[#F4EBDC]">
                  Datta Srinikesh Chinta
                </span>
                <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#C9A24B]">
                  AI Systems Engineer
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTerminal}
                className="brass holo-sheen group flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <TerminalSquare className="h-3.5 w-3.5 text-[#3A2A10]" />
                <span className="hidden sm:inline">~/Terminal</span>
                <span className="sm:hidden">~</span>
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A24B]/40 bg-white/5 text-[#F4EBDC] lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Row 2 — full navigation strip (desktop) */}
          <div className="mt-3 hidden flex-wrap items-center gap-x-0.5 gap-y-1 border-t border-[#C9A24B]/25 pt-2.5 lg:flex">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-2 -bottom-[3px] h-[2px] rounded-full bg-gradient-to-r from-[#C9A24B] to-[#E3BC6E]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="mt-3 grid grid-cols-2 gap-1 border-t border-[#C9A24B]/25 pt-3 lg:hidden">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
                      isActive ? 'bg-[#C9A24B]/15 text-[#F4D98E]' : 'text-[#D9C3A0] hover:bg-white/8'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
