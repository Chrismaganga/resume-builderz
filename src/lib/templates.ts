import type { TemplateConfig } from '../types/resume';

export const templates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold typography',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#d946ef',
      text: '#1e293b',
      background: '#f8fafc',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'modern',
    spacing: 'standard',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout with timeless appeal',
    colors: {
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#ef4444',
      text: '#111827',
      background: '#f9fafb',
    },
    fonts: {
      heading: 'Georgia',
      body: 'Times New Roman',
    },
    layout: 'classic',
    spacing: 'standard',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant with maximum readability',
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#0ea5e9',
      text: '#0f172a',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Helvetica Neue',
      body: 'Arial',
    },
    layout: 'minimalist',
    spacing: 'compact',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and vibrant design for creative professionals',
    colors: {
      primary: '#7e22ce',
      secondary: '#db2777',
      accent: '#facc15',
      text: '#1e293b',
      background: '#fdf2f8',
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Open Sans',
    },
    layout: 'creative',
    spacing: 'spacious',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  },
];

export const getTemplateConfig = (templateId: string): TemplateConfig => {
  const template = templates.find(t => t.id === templateId);
  return template || templates[0]; // Return default if not found
};

// Premium themes (can be expanded)
export const premiumThemes = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      primary: '#00f5ff',
      secondary: '#ff00ff',
      accent: '#00ff88',
      surface: '#1a001a',
      text: '#e0e0e0',
    },
    fonts: {
      heading: 'Cyberpunk',
      body: 'Roboto Mono',
    },
    animations: {
      duration: 0.3,
      easing: 'easeOutExpo',
    },
    effects: {
      glow: true,
      glassmorphism: false,
    },
    layout: 'expert',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    colors: {
      primary: '#80bfff',
      secondary: '#c0c0c0',
      accent: '#ff80ff',
      surface: '#ffffff1a',
      text: '#e0e0e0',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans',
    },
    animations: {
      duration: 0.5,
      easing: 'easeOutQuad',
    },
    effects: {
      glow: false,
      glassmorphism: true,
    },
    layout: 'spacious',
  },
  {
    id: 'holographic',
    name: 'Holographic',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      surface: '#0a0a0a',
      text: '#ffffff',
    },
    fonts: {
      heading: 'Orbitron',
      body: 'Rajdhani',
    },
    animations: {
      duration: 0.4,
      easing: 'easeInOutSine',
    },
    effects: {
      glow: true,
      glassmorphism: false,
    },
    layout: 'creative',
  },
  {
    id: 'royal',
    name: 'Royal',
    colors: {
      primary: '#8a2be2',
      secondary: '#4b0082',
      accent: '#ffd700',
      surface: '#f0f0f0',
      text: '#2c3e50',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
    animations: {
      duration: 0.6,
      easing: 'easeOutCubic',
    },
    effects: {
      glow: false,
      glassmorphism: false,
    },
    layout: 'classic',
  },
];

export const getTheme = (themeId: string) => {
  return premiumThemes.find(theme => theme.id === themeId) || premiumThemes[0];
};
