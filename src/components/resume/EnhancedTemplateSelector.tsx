import React from 'react';
import { Layout, Palette, Type } from 'lucide-react';
import { getTemplateConfig, templates } from '../../lib/templates';
import type { Resume } from '../../types/resume';

interface EnhancedTemplateSelectorProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const EnhancedTemplateSelector: React.FC<EnhancedTemplateSelectorProps> = ({ resume, onUpdate }) => {
  const handleTemplateChange = (templateId: string) => {
    onUpdate({
      ...resume,
      template: templateId,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Template & Design</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              resume.template === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTemplateChange(template.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              {resume.template === template.id && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className={`w-full h-32 rounded-md ${template.preview} mb-4 flex items-center justify-center`}>
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">📄</span>
                </div>
                <p className="text-sm font-medium">Preview</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{template.description}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Template Features</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Responsive design that works on all devices</li>
          <li>• Professional typography and spacing</li>
          <li>• Easy to customize colors and fonts</li>
          <li>• Optimized for ATS (Applicant Tracking Systems)</li>
          <li>• Print-ready PDF output</li>
          <li>• Real-time preview updates</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedTemplateSelector;
