export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  address: string;
  cgpa: number;
  year: string;
}

export type Theme = 'dark' | 'light';