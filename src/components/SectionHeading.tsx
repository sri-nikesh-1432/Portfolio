import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
}) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <p className="eyebrow text-[#8A5A2B] flex items-center gap-2">
        <span className="inline-block h-px w-8 bg-[#8A5A2B]/60" />
        {eyebrow}
        {align === 'center' && <span className="inline-block h-px w-8 bg-[#8A5A2B]/60" />}
      </p>
      <h2 className="mt-4 font-display text-3xl md:text-[2.6rem] font-medium leading-[1.1] tracking-tight text-balance text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted text-balance">{description}</p>
      )}
    </Reveal>
  );
};
