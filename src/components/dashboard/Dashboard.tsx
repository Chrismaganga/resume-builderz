import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Layout, Settings, LogOut, User, Search, Grid, List, Menu, X, Briefcase, GraduationCap, Wrench, Code, Award } from 'lucide-react';
import type { Resume } from '../../types/resume';
import ResumeBuilder from '../resume/ResumeBuilder';
import EnhancedTemplateSelector from '../resume/EnhancedTemplateSelector';
import ResumePreview from '../resume/ResumePreview';
import PersonalInfoForm from '../resume/PersonalInfoForm';
import ExperienceForm from '../resume/ExperienceForm';
import EducationForm from '../resume/EducationForm';
import SkillsForm from '../resume/SkillsForm';
import ProjectsForm from '../resume/ProjectsForm';
import CertificationsForm from '../resume/CertificationsForm';

interface DashboardProps {
  user: { name: string; email: string; avatar?: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedResume, setSelectedResume] = React.useState<Resume | null>(null);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Create a sample resume for demonstration
  const sampleResume: Resume = {
    id: '1',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 5+ years of experience in full-stack development.',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    template: 'modern',
    themeConfig: {
      id: 'modern',
      name: 'Modern',
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleUpdateResume = (updatedResume: Resume) => {
    setSelectedResume(updatedResume);
  };

  const renderContent = () => {
    const currentResume = selectedResume || sampleResume;

    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Dashboard Overview</h2>
            <p className="text-gray-700 mb-6">Welcome back, {user.name}! Here's a summary of your resumes.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Resumes</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{currentResume.experience.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{currentResume.projects.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Certifications</p>
                    <p className="text-2xl font-bold text-gray-900">{currentResume.certifications.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'personal':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PersonalInfoForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExperienceForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EducationForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SkillsForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectsForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'certifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CertificationsForm resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'templates':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Choose Your Template</h2>
            <EnhancedTemplateSelector resume={currentResume} onUpdate={handleUpdateResume} />
          </motion.div>
        );
      case 'preview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Resume Preview</h2>
            <ResumePreview resume={currentResume} />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Settings</h2>
            <p className="text-gray-700">Manage your account settings here.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'preview', label: 'Preview', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on desktop */}
      <div className="hidden lg:block w-72 bg-gray-800 text-white flex flex-col h-screen">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold">ResumeBuilder</h1>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                href="#"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center p-4 rounded-lg transition-colors text-base ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center p-4 rounded-lg transition-colors hover:bg-gray-700 w-full text-base text-gray-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`lg:hidden fixed z-40 w-72 bg-gray-800 text-white flex flex-col h-full ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold">ResumeBuilder</h1>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                href="#"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center p-4 rounded-lg transition-colors text-base ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Sidebar Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onLogout();
              setSidebarOpen(false);
            }}
            className="flex items-center p-4 rounded-lg transition-colors hover:bg-gray-700 w-full text-base text-gray-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {activeTab === 'overview' && (
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
              {(activeTab === 'overview' || activeTab === 'templates') && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          </header>

          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
