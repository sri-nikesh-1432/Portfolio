import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PianoStudio } from '../components/music/PianoStudio';

export const Music: React.FC = () => {
  return (
    <div className="space-y-16">
      <SectionHeading
        eyebrow="Music"
        title={<>Engineer by day, pianist by training.</>}
        description="Trinity College London certified piano training — the discipline, pattern recognition and structure that quietly shows up in everything I build."
      />

      <PianoStudio />
    </div>
  );
};
