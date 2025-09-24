import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { createEmptyResume } from '../../lib/resume-storage';
import { deleteResume, duplicateResume, getResumeList, loadResume, saveResume } from '../../lib/resume-manager';
import type { Resume } from '../../types/resume';

interface ResumeManagerProps {
  onResumeSelect: (resume: Resume) => void;
  currentResume: Resume | null;
}

const ResumeManager: React.FC<ResumeManagerProps> = ({ onResumeSelect, currentResume }) => {
  const queryClient = useQueryClient();
  const [showNewResumeForm, setShowNewResumeForm] = useState(false);
  const [newResumeName, setNewResumeName] = useState('');

  const { data: resumeList = [] } = useQuery({
    queryKey: ['resumeList'],
    queryFn: getResumeList,
  });

  const createResumeMutation = useMutation({
    mutationFn: async (name: string) => {
      const emptyResume = createEmptyResume();
      emptyResume.personalInfo.firstName = name;
      return saveResume(emptyResume);
    },
    onSuccess: (resumeId) => {
      queryClient.invalidateQueries({ queryKey: ['resumeList'] });
      const newResume = loadResume(resumeId);
      if (newResume) {
        onResumeSelect(newResume);
      }
      setShowNewResumeForm(false);
      setNewResumeName('');
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      deleteResume(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumeList'] });
      if (currentResume) {
        const updatedList = getResumeList();
        if (updatedList.length > 0) {
          const newResume = loadResume(updatedList[0].id);
          if (newResume) {
            onResumeSelect(newResume);
          }
        } else {
          onResumeSelect(createEmptyResume());
        }
      }
    },
  });

  const duplicateResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      return duplicateResume(id);
    },
    onSuccess: (resumeId) => {
      queryClient.invalidateQueries({ queryKey: ['resumeList'] });
      const duplicatedResume = loadResume(resumeId);
      if (duplicatedResume) {
        onResumeSelect(duplicatedResume);
      }
    },
  });

  const handleResumeSelect = (resumeId: string) => {
    const resume = loadResume(resumeId);
    if (resume) {
      onResumeSelect(resume);
    }
  };

  const handleCreateResume = () => {
    if (newResumeName.trim()) {
      createResumeMutation.mutate(newResumeName.trim());
    }
  };

  const handleDeleteResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      deleteResumeMutation.mutate(resumeId);
    }
  };

  const handleDuplicateResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateResumeMutation.mutate(resumeId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
        <button
          onClick={() => setShowNewResumeForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Resume
        </button>
      </div>

      {showNewResumeForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Create New Resume</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newResumeName}
              onChange={(e) => setNewResumeName(e.target.value)}
              placeholder="Enter resume name..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateResume()}
            />
            <button
              onClick={handleCreateResume}
              disabled={!newResumeName.trim() || createResumeMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowNewResumeForm(false);
                setNewResumeName('');
              }}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {resumeList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No resumes yet. Create your first resume to get started!</p>
          </div>
        ) : (
          resumeList.map((resume) => (
            <div
              key={resume.id}
              onClick={() => handleResumeSelect(resume.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                currentResume && resume.id === currentResume.personalInfo.firstName + ' ' + currentResume.personalInfo.lastName
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{resume.template} Template</p>
                  <p className="text-xs text-gray-500">
                    Last modified: {new Date(resume.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleDuplicateResume(resume.id, e)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteResume(resume.id, e)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeManager;
