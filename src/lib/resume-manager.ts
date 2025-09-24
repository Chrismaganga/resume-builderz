import type { Resume } from '../types/resume';

const RESUME_LIST_KEY = 'resume-builder-list';
const CURRENT_RESUME_KEY = 'resume-builder-current';

export interface ResumeListItem {
  id: string;
  name: string;
  template: string;
  lastModified: string;
}

export const getResumeList = (): ResumeListItem[] => {
  try {
    const stored = localStorage.getItem(RESUME_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading resume list:', error);
    return [];
  }
};

export const saveResume = (resume: Resume): string => {
  try {
    const resumeList = getResumeList();
    const existingIndex = resumeList.findIndex(item => item.id === resume.id);
    
    const resumeItem: ResumeListItem = {
      id: resume.id,
      name: `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`.trim() || 'Untitled Resume',
      template: resume.template,
      lastModified: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      resumeList[existingIndex] = resumeItem;
    } else {
      resumeList.push(resumeItem);
    }

    localStorage.setItem(RESUME_LIST_KEY, JSON.stringify(resumeList));
    localStorage.setItem(`resume-${resume.id}`, JSON.stringify(resume));
    
    return resume.id;
  } catch (error) {
    console.error('Error saving resume:', error);
    return resume.id;
  }
};

export const loadResume = (id: string): Resume | null => {
  try {
    const stored = localStorage.getItem(`resume-${id}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading resume:', error);
    return null;
  }
};

export const deleteResume = (id: string): void => {
  try {
    const resumeList = getResumeList();
    const filteredList = resumeList.filter(item => item.id !== id);
    localStorage.setItem(RESUME_LIST_KEY, JSON.stringify(filteredList));
    localStorage.removeItem(`resume-${id}`);
  } catch (error) {
    console.error('Error deleting resume:', error);
  }
};

export const duplicateResume = (id: string): string => {
  try {
    const originalResume = loadResume(id);
    if (!originalResume) {
      throw new Error('Resume not found');
    }

    const duplicatedResume: Resume = {
      ...originalResume,
      id: Date.now().toString(),
      personalInfo: {
        ...originalResume.personalInfo,
        firstName: `${originalResume.personalInfo.firstName} (Copy)`,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return saveResume(duplicatedResume);
  } catch (error) {
    console.error('Error duplicating resume:', error);
    return id;
  }
};

export const getCurrentResumeId = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_RESUME_KEY);
  } catch (error) {
    console.error('Error getting current resume ID:', error);
    return null;
  }
};

export const setCurrentResumeId = (id: string): void => {
  try {
    localStorage.setItem(CURRENT_RESUME_KEY, id);
  } catch (error) {
    console.error('Error setting current resume ID:', error);
  }
};
