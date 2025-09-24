import type { Resume } from '../types/resume';

const STORAGE_KEY = 'resume-builder-data';

export const getStoredResume = (): Resume | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading resume from storage:', error);
    return null;
  }
};

export const saveResumeToStorage = (resume: Resume): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  } catch (error) {
    console.error('Error saving resume to storage:', error);
  }
};

export const createEmptyResume = (): Resume => {
  return {
    id: Date.now().toString(),
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    template: 'modern',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
