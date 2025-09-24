export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string; // Added missing property
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string; // Added missing property
  endDate?: string; // Added missing property
  current?: boolean; // Added missing property
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  date?: string; // Added as alias for issueDate
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

// Changed to string union type instead of interface
export type TemplateLayout = 'modern' | 'classic' | 'minimalist' | 'creative';

export interface TemplateFonts {
  heading: string;
  body: string;
}

export interface TemplateSections {
  personalInfo: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  colors: TemplateColors;
  layout: TemplateLayout;
  preview?: string;
  fonts: TemplateFonts; // Added missing property
  spacing: 'compact' | 'standard' | 'spacious'; // Added missing property
  sections: TemplateSections; // Added missing property
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  template: string;
  createdAt: string;
  updatedAt: string;
  themeConfig?: any; // Added missing property
}
