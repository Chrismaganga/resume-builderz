import React, { useState } from 'react';
import { FileText, User, Briefcase, GraduationCap, Wrench, Code, Award } from 'lucide-react';
import type { Resume } from '../../types/resume';
import { createEmptyResume } from '../../lib/resume-storage';

const ResumeBuilder: React.FC = () => {
  const [resume, setResume] = useState<Resume>(createEmptyResume());
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const handlePersonalInfoChange = (field: keyof typeof resume.personalInfo, value: string) => {
    setResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">First Name *</label>
          <input
            type="text"
            value={resume.personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            className="input-field"
            placeholder="John"
          />
        </div>
        
        <div>
          <label className="label">Last Name *</label>
          <input
            type="text"
            value={resume.personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            className="input-field"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            value={resume.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            className="input-field"
            placeholder="john.doe@email.com"
          />
        </div>
        
        <div>
          <label className="label">Phone *</label>
          <input
            type="tel"
            value={resume.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="label">Location *</label>
        <input
          type="text"
          value={resume.personalInfo.location}
          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
          className="input-field"
          placeholder="San Francisco, CA"
        />
      </div>

      <div>
        <label className="label">Professional Summary *</label>
        <textarea
          value={resume.personalInfo.summary}
          onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
          className="input-field"
          rows={4}
          placeholder="Brief description of your professional background and key achievements..."
        />
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label} Section
            </h3>
            <p className="text-gray-600">
              This section is coming soon. Start with your personal information.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-gray-600">Create a professional resume in minutes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
