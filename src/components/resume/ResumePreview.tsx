import React from 'react';
import { Download } from 'lucide-react';
import type { Resume } from '../../types/resume';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
        <button className="btn-primary inline-flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b-2 border-blue-500">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </h1>
          <div className="text-gray-600 text-sm">
            <p>{resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.location}</p>
            {resume.personalInfo.website && <p>Website: {resume.personalInfo.website}</p>}
            {resume.personalInfo.linkedin && <p>LinkedIn: {resume.personalInfo.linkedin}</p>}
            {resume.personalInfo.github && <p>GitHub: {resume.personalInfo.github}</p>}
          </div>
        </div>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 uppercase tracking-wide text-blue-600">
              Professional Summary
            </h2>
            <p className="text-gray-700">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-blue-600">
              Professional Experience
            </h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-blue-600 mb-2">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-blue-600">
              Education
            </h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                <p className="text-sm text-blue-600">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-blue-600">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700"
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
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-blue-600">
              Projects
            </h2>
            {resume.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700"
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

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-blue-600">
              Certifications
            </h2>
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-blue-600">
                  {cert.issueDate}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
