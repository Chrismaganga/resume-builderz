import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import type { Resume } from '../../types/resume';
import { getTemplateConfig } from '../../lib/templates';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const templateConfig = getTemplateConfig(resume.template);

  const getTemplateStyles = () => {
    const baseStyles = {
      fontFamily: templateConfig.fonts.body,
      color: templateConfig.colors.text,
      backgroundColor: templateConfig.colors.background,
    };

    const headerStyles = {
      borderBottomColor: templateConfig.colors.primary,
      color: templateConfig.colors.text,
    };

    const sectionTitleStyles = {
      color: templateConfig.colors.primary,
      borderBottomColor: templateConfig.colors.secondary,
    };

    const nameStyles = {
      color: templateConfig.colors.text,
      fontFamily: templateConfig.fonts.heading,
    };

    return { baseStyles, headerStyles, sectionTitleStyles, nameStyles };
  };

  const { baseStyles } = getTemplateStyles();

  const handleDownload = () => {
    // Create a simple HTML version for download
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resume.personalInfo.firstName} ${resume.personalInfo.lastName} - Resume</title>
        <style>
          body {
            font-family: ${templateConfig.fonts.body}, Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: ${templateConfig.colors.text};
            background-color: ${templateConfig.colors.background};
          }
          .header {
            text-align: center;
            border-bottom: 2px solid ${templateConfig.colors.primary};
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .name {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
            color: ${templateConfig.colors.text};
            font-family: ${templateConfig.fonts.heading}, Arial, sans-serif;
          }
          .contact {
            color: ${templateConfig.colors.secondary};
            font-size: 1.1em;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 1.5em;
            font-weight: bold;
            color: ${templateConfig.colors.primary};
            border-bottom: 1px solid ${templateConfig.colors.secondary};
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: ${templateConfig.fonts.heading}, Arial, sans-serif;
          }
          .item {
            margin-bottom: 20px;
          }
          .item-title {
            font-weight: bold;
            font-size: 1.1em;
            color: ${templateConfig.colors.text};
          }
          .item-subtitle {
            color: ${templateConfig.colors.secondary};
            font-style: italic;
          }
          .item-date {
            color: ${templateConfig.colors.primary};
            font-size: 0.9em;
          }
          .item-description {
            margin-top: 5px;
            color: ${templateConfig.colors.text};
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .skill-tag {
            background-color: ${templateConfig.colors.primary}20;
            color: ${templateConfig.colors.primary};
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9em;
          }
          .technologies {
            margin-top: 10px;
          }
          .tech-tag {
            background-color: ${templateConfig.colors.secondary}20;
            color: ${templateConfig.colors.secondary};
            padding: 3px 8px;
            border-radius: 15px;
            font-size: 0.8em;
            margin-right: 5px;
          }
          @media print {
            body { margin: 0; padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${resume.personalInfo.firstName} ${resume.personalInfo.lastName}</div>
          <div class="contact">
            ${resume.personalInfo.email} • ${resume.personalInfo.phone} • ${resume.personalInfo.location}
            ${resume.personalInfo.website ? `<br>Website: ${resume.personalInfo.website}` : ''}
            ${resume.personalInfo.linkedin ? `<br>LinkedIn: ${resume.personalInfo.linkedin}` : ''}
            ${resume.personalInfo.github ? `<br>GitHub: ${resume.personalInfo.github}` : ''}
          </div>
        </div>

        ${resume.personalInfo.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="item-description">${resume.personalInfo.summary}</div>
        </div>
        ` : ''}

        ${resume.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${resume.experience.map(exp => `
            <div class="item">
              <div class="item-title">${exp.position}</div>
              <div class="item-subtitle">${exp.company} • ${exp.location}</div>
              <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
              <div class="item-description">${exp.description}</div>
              ${exp.technologies.length > 0 ? `
                <div class="technologies">
                  <strong>Technologies:</strong>
                  ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resume.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${resume.education.map(edu => `
            <div class="item">
              <div class="item-title">${edu.degree} in ${edu.field}</div>
              <div class="item-subtitle">${edu.institution} • ${edu.location}</div>
              <div class="item-date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
              ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resume.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${resume.skills.map(skill => `
              <span class="skill-tag">${skill.name} (${skill.level})</span>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${resume.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${resume.projects.map(project => `
            <div class="item">
              <div class="item-title">${project.name}</div>
              <div class="item-description">${project.description}</div>
              ${project.technologies.length > 0 ? `
                <div class="technologies">
                  <strong>Technologies:</strong>
                  ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
              ` : ''}
              ${project.url ? `<div class="item-date">Live Demo: ${project.url}</div>` : ''}
              ${project.github ? `<div class="item-date">GitHub: ${project.github}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resume.certifications.length > 0 ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          ${resume.certifications.map(cert => `
            <div class="item">
              <div class="item-title">${cert.name}</div>
              <div class="item-subtitle">${cert.issuer}</div>
              <div class="item-date">Issued: ${cert.issueDate}</div>
              ${cert.url ? `<div class="item-date">Credential: ${cert.url}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getTemplateLayout = () => {
    switch (templateConfig.layout) {
      case 'classic':
        return 'text-left';
      case 'minimalist':
        return 'text-center';
      case 'creative':
        return 'text-center';
      default:
        return 'text-center';
    }
  };

  const getTemplateSpacing = () => {
    switch (templateConfig.spacing) {
      case 'compact':
        return 'space-y-4';
      case 'spacious':
        return 'space-y-8';
      default:
        return 'space-y-6';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <p className="text-sm text-gray-600 mt-1">
            Template: <span className="font-semibold text-primary-600">{templateConfig.name}</span>
          </p>
        </div>
        <motion.button 
          onClick={handleDownload}
          className="btn-primary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          <span>Download Resume</span>
        </motion.button>
      </div>

      <div 
        className={`bg-white border border-gray-200 rounded-lg p-6 sm:p-8 max-w-4xl mx-auto shadow-sm ${getTemplateLayout()} ${getTemplateSpacing()}`}
        style={baseStyles}
      >
        {/* Header */}
        <div 
          className="mb-6 pb-4 border-b-2 text-center"
          style={{ borderBottomColor: templateConfig.colors.primary }}
        >
          <h1 
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ 
              color: templateConfig.colors.text,
              fontFamily: templateConfig.fonts.heading 
            }}
          >
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </h1>
          <div 
            className="text-sm sm:text-base"
            style={{ color: templateConfig.colors.secondary }}
          >
            <p>{resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.location}</p>
            {resume.personalInfo.website && <p>Website: {resume.personalInfo.website}</p>}
            {resume.personalInfo.linkedin && <p>LinkedIn: {resume.personalInfo.linkedin}</p>}
            {resume.personalInfo.github && <p>GitHub: {resume.personalInfo.github}</p>}
          </div>
        </div>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-2 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Professional Summary
            </h2>
            <p style={{ color: templateConfig.colors.text }}>{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-3 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Professional Experience
            </h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 
                  className="font-semibold"
                  style={{ color: templateConfig.colors.text }}
                >
                  {exp.position}
                </h3>
                <p style={{ color: templateConfig.colors.secondary }}>
                  {exp.company} • {exp.location}
                </p>
                <p 
                  className="text-sm mb-2"
                  style={{ color: templateConfig.colors.primary }}
                >
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p style={{ color: templateConfig.colors.text }}>{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: `${templateConfig.colors.primary}20`,
                          color: templateConfig.colors.primary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-3 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Education
            </h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 
                  className="font-semibold"
                  style={{ color: templateConfig.colors.text }}
                >
                  {edu.degree} in {edu.field}
                </h3>
                <p style={{ color: templateConfig.colors.secondary }}>
                  {edu.institution} • {edu.location}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: templateConfig.colors.primary }}
                >
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
                {edu.description && (
                  <p className="mt-1" style={{ color: templateConfig.colors.text }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-3 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: `${templateConfig.colors.primary}20`,
                    color: templateConfig.colors.primary
                  }}
                >
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-3 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Projects
            </h2>
            {resume.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 
                  className="font-semibold"
                  style={{ color: templateConfig.colors.text }}
                >
                  {project.name}
                </h3>
                <p 
                  className="mb-2"
                  style={{ color: templateConfig.colors.text }}
                >
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: `${templateConfig.colors.accent}20`,
                          color: templateConfig.colors.accent
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.url && (
                  <p 
                    className="text-sm"
                    style={{ color: templateConfig.colors.primary }}
                  >
                    Live Demo: {project.url}
                  </p>
                )}
                {project.github && (
                  <p 
                    className="text-sm"
                    style={{ color: templateConfig.colors.secondary }}
                  >
                    GitHub: {project.github}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div className="mb-6">
            <h2 
              className="text-lg font-semibold mb-3 uppercase tracking-wide"
              style={{ 
                color: templateConfig.colors.primary,
                fontFamily: templateConfig.fonts.heading 
              }}
            >
              Certifications
            </h2>
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="mb-3">
                <h3 
                  className="font-semibold"
                  style={{ color: templateConfig.colors.text }}
                >
                  {cert.name}
                </h3>
                <p style={{ color: templateConfig.colors.secondary }}>{cert.issuer}</p>
                <p 
                  className="text-sm"
                  style={{ color: templateConfig.colors.primary }}
                >
                  Issued: {cert.issueDate}
                </p>
                {cert.url && (
                  <p 
                    className="text-sm"
                    style={{ color: templateConfig.colors.primary }}
                  >
                    Credential: {cert.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {resume.experience.length === 0 && 
         resume.education.length === 0 && 
         resume.skills.length === 0 && 
         resume.projects.length === 0 && 
         resume.certifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Resume</h3>
            <p className="text-gray-600 mb-4">
              Add your experience, education, skills, and projects to see them here.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Go to Personal Info to add your contact details</p>
              <p>• Add your work experience in the Experience section</p>
              <p>• Include your education and skills</p>
              <p>• Showcase your projects and certifications</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumePreview;
