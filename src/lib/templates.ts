import type { TemplateConfig } from '../types/resume';

export const templates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design perfect for tech professionals',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#8b5cf6',
      text: '#1f2937',
      background: '#ffffff',
    },
    layout: {
      headerStyle: 'left',
      sectionSpacing: 'normal',
      fontFamily: 'Inter',
      fontSize: 'medium',
    },
    preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Bold and authoritative layout for senior positions',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#dc2626',
      text: '#111827',
      background: '#ffffff',
    },
    layout: {
      headerStyle: 'center',
      sectionSpacing: 'spacious',
      fontFamily: 'Georgia',
      fontSize: 'large',
    },
    preview: 'bg-gradient-to-br from-gray-800 to-red-600',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful and artistic design for creative professionals',
    colors: {
      primary: '#ec4899',
      secondary: '#6b7280',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff',
    },
    layout: {
      headerStyle: 'center',
      sectionSpacing: 'normal',
      fontFamily: 'Poppins',
      fontSize: 'medium',
    },
    preview: 'bg-gradient-to-br from-pink-500 to-orange-500',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant layout with focus on content',
    colors: {
      primary: '#374151',
      secondary: '#9ca3af',
      accent: '#6366f1',
      text: '#111827',
      background: '#ffffff',
    },
    layout: {
      headerStyle: 'left',
      sectionSpacing: 'compact',
      fontFamily: 'Helvetica',
      fontSize: 'small',
    },
    preview: 'bg-gradient-to-br from-gray-600 to-indigo-600',
  },
];

export const getTemplateConfig = (templateId: string): TemplateConfig => {
  const template = templates.find(t => t.id === templateId);
  return template || templates[0];
};
