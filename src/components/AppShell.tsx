import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Terminal } from './Terminal';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background atmosphere — warm wood workshop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-birch" />
        <div className="absolute inset-0 bg-grain opacity-70" />
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] animate-drift rounded-full bg-accent-gold/20 blur-[110px]" />
        <div className="absolute top-1/3 -right-48 h-[420px] w-[420px] animate-drift rounded-full bg-accent-copper/16 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] animate-drift rounded-full bg-accent-rosewood/12 blur-[110px] [animation-delay:-12s]" />
        <div className="absolute inset-0 opacity-[0.4] dot-grid" />
      </div>

      <Navbar onOpenTerminal={openTerminal} />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6">{children}</main>

      <Footer onOpenTerminal={openTerminal} />

      <Terminal open={terminalOpen} onClose={closeTerminal} />
    </div>
  );
};
