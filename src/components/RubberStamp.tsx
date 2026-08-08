import React from 'react';

interface RubberStampProps {
  text: string;
  heavy?: boolean;
  className?: string;
}

export const RubberStamp: React.FC<RubberStampProps> = ({ text, heavy = false, className = '' }) => {
  return (
    <span className={`rubber-stamp ${heavy ? 'stamp-heavy' : ''} ${className}`} aria-label={text}>
      {text}
    </span>
  );
};
