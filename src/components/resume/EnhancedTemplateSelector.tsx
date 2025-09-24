import React from 'react';
import { Layout, Palette, Type, Check, Eye } from 'lucide-react';
import { templates } from '../../lib/templates';
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

  const getTemplatePreview = (template: any) => {
    return (
      <div 
        className="w-full h-32 sm:h-40 rounded-md relative overflow-hidden border"
        style={{ 
          background: `linear-gradient(135deg, ${template.colors.background} 0%, ${template.colors.primary}10 100%)`,
          borderColor: template.colors.primary + '30'
        }}
      >
        {/* Template Preview Content */}
        <div className="absolute inset-0 p-3">
          {/* Header Preview */}
          <div 
            className="h-2 rounded mb-2"
            style={{ backgroundColor: template.colors.primary }}
          ></div>
          <div 
            className="h-1 rounded mb-1 w-3/4"
            style={{ backgroundColor: template.colors.text }}
          ></div>
          <div 
            className="h-1 rounded mb-3 w-1/2"
            style={{ backgroundColor: template.colors.secondary }}
          ></div>
          
          {/* Section Preview */}
          <div 
            className="h-1 rounded mb-1 w-1/3"
            style={{ backgroundColor: template.colors.primary }}
          ></div>
          <div 
            className="h-1 rounded mb-1 w-full"
            style={{ backgroundColor: template.colors.text + '60' }}
          ></div>
          <div 
            className="h-1 rounded mb-1 w-2/3"
            style={{ backgroundColor: template.colors.text + '40' }}
          ></div>
          
          {/* Skills Preview */}
          <div className="flex gap-1 mt-2">
            <div 
              className="h-1 w-8 rounded"
              style={{ backgroundColor: template.colors.primary + '40' }}
            ></div>
            <div 
              className="h-1 w-6 rounded"
              style={{ backgroundColor: template.colors.accent + '40' }}
            ></div>
            <div 
              className="h-1 w-10 rounded"
              style={{ backgroundColor: template.colors.secondary + '40' }}
            ></div>
          </div>
        </div>
        
        {/* Template Name Overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div 
            className="text-xs font-medium px-2 py-1 rounded text-center"
            style={{ 
              backgroundColor: template.colors.primary + '20',
              color: template.colors.primary
            }}
          >
            {template.name}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template & Design</h2>
          <p className="text-gray-600 mt-1">Choose a template to customize your resume's appearance</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              resume.template === template.id
                ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => handleTemplateChange(template.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              {resume.template === template.id && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            {/* Template Preview */}
            {getTemplatePreview(template)}
            
            <div className="space-y-3 mt-4">
              <p className="text-gray-600 text-sm">{template.description || `Professional ${template.name.toLowerCase()} design`}</p>
              
              {/* Color palette preview */}
              <div className="flex space-x-1">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300" 
                  style={{ backgroundColor: template.colors.primary }}
                  title="Primary"
                ></div>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300" 
                  style={{ backgroundColor: template.colors.secondary }}
                  title="Secondary"
                ></div>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300" 
                  style={{ backgroundColor: template.colors.accent }}
                  title="Accent"
                ></div>
              </div>
              
              {/* Template features */}
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center space-x-1">
                  <Layout className="w-3 h-3" />
                  <span className="capitalize">{template.layout}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Type className="w-3 h-3" />
                  <span>{template.fonts.heading}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Palette className="w-3 h-3" />
                  <span className="capitalize">{template.spacing}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Template Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Responsive design for all devices</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Professional typography</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Customizable colors</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>ATS-optimized layout</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Print-ready output</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Real-time preview</span>
          </div>
        </div>
      </div>

      {/* Selected Template Details */}
      {resume.template && (
        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Selected Template: {templates.find(t => t.id === resume.template)?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Color Scheme</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300" 
                    style={{ backgroundColor: templates.find(t => t.id === resume.template)?.colors.primary }}
                  ></div>
                  <span className="text-sm text-gray-600">Primary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300" 
                    style={{ backgroundColor: templates.find(t => t.id === resume.template)?.colors.secondary }}
                  ></div>
                  <span className="text-sm text-gray-600">Secondary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300" 
                    style={{ backgroundColor: templates.find(t => t.id === resume.template)?.colors.accent }}
                  ></div>
                  <span className="text-sm text-gray-600">Accent</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Typography</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Heading: {templates.find(t => t.id === resume.template)?.fonts.heading}</div>
                <div>Body: {templates.find(t => t.id === resume.template)?.fonts.body}</div>
                <div>Layout: {templates.find(t => t.id === resume.template)?.layout}</div>
                <div>Spacing: {templates.find(t => t.id === resume.template)?.spacing}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTemplateSelector;
