import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Building } from './pages/Building';
import { Research } from './pages/Research';
import { ResearchManuscript } from './pages/ResearchManuscript';
import { Experience } from './pages/Experience';
import { Resume } from './pages/Resume';
import { Skills } from './pages/Skills';
import { Certifications } from './pages/Certifications';
import { Music } from './pages/Music';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {/* Back-compat aliases for the old /systems path */}
        <Route path="/systems" element={<Projects />} />
        <Route path="/systems/:slug" element={<ProjectDetail />} />
        <Route path="/building" element={<Building />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/manuscript" element={<ResearchManuscript />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/music" element={<Music />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
};

export default App;
