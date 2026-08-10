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
  credentialId?: string;
  credentialUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  fullName: string;
  category: string;
  experience: string[];
}

export interface MiniProject {
  id: string;
  title: string;
  date: string;
  organization?: string;
  overview: string;
  features: string[];
  technologies: string[];
  concepts: string[];
  skills: string[];
  githubUrl?: string;
  demoUrl?: string;
  previewImage?: string;
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success' | 'info' | 'red' | 'ascii';
  content: string;
}
