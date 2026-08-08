export type ProjectStatus = 'COMPLETED' | 'IN DEVELOPMENT' | 'EXPERIMENT' | 'RESEARCH' | 'PLANNED';

export type BuildingStatus = 'IN DEVELOPMENT' | 'EXPERIMENT' | 'PLANNED' | 'RESEARCH / EXPERIMENT';

export interface CompletedSystem {
  id: string;
  slug: string;
  name: string;
  badge: string;
  secondaryBadge: string;
  tagline: string;
  description: string;
  longDescription: string;
  technology: string[];
  capabilities: string[];
  demoUrl?: string;
  githubUrl?: string;
  venue?: string;
  accent: string;
  highlights: string[];
  architecture: { stage: string; detail: string }[];
}

export interface BuildingProject {
  id: string;
  slug: string;
  name: string;
  status: BuildingStatus;
  category: string;
  shortDescription: string;
  currentStage: string;
  nextMilestone: string;
  technologies: string[];
  progress: number;
  notes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  orgUnit?: string;
  location: string;
  period: string;
  type: 'internship' | 'education' | 'work';
  current?: boolean;
  highlights: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerColor: string;
  date: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: { name: string; level?: number; note: string }[];
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success' | 'info' | 'red' | 'ascii';
  content: string;
}
