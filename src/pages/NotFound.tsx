import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-accent-blue">
        error 404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink md:text-5xl">
        Nothing found here
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-muted">
        The page you're looking for doesn't exist — or has been moved or renamed.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
};
