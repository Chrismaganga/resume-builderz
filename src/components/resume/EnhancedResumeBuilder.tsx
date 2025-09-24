import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Crown } from 'lucide-react';
import { createEmptyResume, getStoredResume } from '../../lib/resume-storage';
import { getCurrentResumeId, loadResume, saveResume, setCurrentResumeId } from '../../lib/resume-manager';
import { getTheme, type PremiumTheme } from '../../lib/themes';
import AnimatedBackground from '../3d/AnimatedBackground';
import AnimatedCard from '../ui/AnimatedCard';
import AnimatedButton from '../ui/AnimatedButton';
import ThemeSelector from '../premium/ThemeSelector';
import CertificationsForm from './CertificationsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PersonalInfoForm from './PersonalInfoForm';
import ProjectsForm from './ProjectsForm';
import ResumeManager from './ResumeManager';
import ResumePreview from './ResumePreview';
import SkillsForm from './SkillsForm';
import type { Resume } from '../../types/resume';

const EnhancedResumeBuilder: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('personal');
  const [showResumeManager, setShowResumeManager] = useState(false);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<PremiumTheme>(getTheme('free-modern'));
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Load current resume
  const { data: resume, isLoading } = useQuery({
    queryKey: ['resume', currentResume?.personalInfo.firstName],
    queryFn: () => {
      const currentId = getCurrentResumeId();
      if (currentId) {
        const loadedResume = loadResume(currentId);
        if (loadedResume) {
          setCurrentResume(loadedResume);
          return loadedResume;
        }
      }
      const stored = getStoredResume();
      const resume = stored || createEmptyResume();
      setCurrentResume(resume);
      return resume;
    },
  });

  const saveResumeMutation = useMutation({
    mutationFn: async (resumeData: Resume) => {
      setIsAutoSaving(true);
      const resumeId = saveResume(resumeData);
      setCurrentResumeId(resumeId);
      setCurrentResume(resumeData);
      return resumeData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] });
      queryClient.invalidateQueries({ queryKey: ['resumeList'] });
      setTimeout(() => setIsAutoSaving(false), 1000);
    },
    onError: () => {
      setIsAutoSaving(false);
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (currentResume && currentResume.personalInfo.firstName) {
      const timeoutId = setTimeout(() => {
        saveResumeMutation.mutate(currentResume);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentResume]);

  const handleResumeUpdate = (updatedResume: Resume) => {
    setCurrentResume(updatedResume);
    saveResumeMutation.mutate(updatedResume);
  };

  const handleResumeSelect = (resume: Resume) => {
    setCurrentResume(resume);
    setShowResumeManager(false);
  };

  const handleThemeChange = (theme: PremiumTheme) => {
    setCurrentTheme(theme);
    setIsPremium(theme.isPremium);
  };

  const handleUpgrade = () => {
    // In a real app, this would integrate with payment processing
    console.log('Upgrading to premium...');
    // For demo purposes, we'll just enable premium
    setIsPremium(true);
  };

  if (isLoading || !resume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'template', label: 'Themes', icon: '🎨' },
    { id: 'preview', label: 'Preview', icon: '👁️' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'experience':
        return <ExperienceForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'education':
        return <EducationForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'skills':
        return <SkillsForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'projects':
        return <ProjectsForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'certifications':
        return <CertificationsForm resume={resume} onUpdate={handleResumeUpdate} />;
      case 'template':
        return (
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            onUpgrade={handleUpgrade}
          />
        );
      case 'preview':
        return <ResumePreview resume={resume} />;
      default:
        return <PersonalInfoForm resume={resume} onUpdate={handleResumeUpdate} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      {isPremium && <AnimatedBackground />}
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: currentTheme.gradients.background }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <motion.h1
                  className="text-4xl font-bold mb-2"
                  style={{ color: currentTheme.colors.text }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Resume Builder
                </motion.h1>
                <motion.p
                  className="text-lg"
                  style={{ color: currentTheme.colors.textSecondary }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Create stunning resumes with AI-powered templates
                </motion.p>
              </div>
              
              <div className="flex items-center space-x-3">
                {isAutoSaving && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center text-sm"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                    />
                    Auto-saving...
                  </motion.div>
                )}
                
                <AnimatedButton
                  theme={currentTheme}
                  variant="secondary"
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  glow={currentTheme.effects.glow}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Themes
                </AnimatedButton>
                
                <AnimatedButton
                  theme={currentTheme}
                  variant="primary"
                  onClick={() => setShowResumeManager(!showResumeManager)}
                  glow={currentTheme.effects.glow}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage
                </AnimatedButton>
              </div>
            </div>
          </motion.div>

          {/* Theme Selector Modal */}
          <AnimatePresence>
            {showThemeSelector && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowThemeSelector(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-2xl p-8 max-w-6xl mx-4 max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Choose Your Theme</h2>
                    <AnimatedButton
                      theme={currentTheme}
                      variant="secondary"
                      onClick={() => setShowThemeSelector(false)}
                    >
                      Close
                    </AnimatedButton>
                  </div>
                  <ThemeSelector
                    currentTheme={currentTheme}
                    onThemeChange={handleThemeChange}
                    onUpgrade={handleUpgrade}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {showResumeManager ? (
              <motion.div
                key="manager"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCard
                  theme={currentTheme}
                  glow={currentTheme.effects.glow}
                  glassmorphism={currentTheme.effects.glassmorphism}
                >
                  <ResumeManager onResumeSelect={handleResumeSelect} currentResume={currentResume} />
                </AnimatedCard>
              </motion.div>
            ) : (
              <motion.div
                key="builder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row gap-8"
              >
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                  <AnimatedCard
                    theme={currentTheme}
                    glow={currentTheme.effects.glow}
                    glassmorphism={currentTheme.effects.glassmorphism}
                    className="p-4"
                  >
                    <nav className="space-y-1">
                      {tabs.map((tab, index) => (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                            w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300
                            ${activeTab === tab.id
                              ? 'text-white shadow-lg'
                              : 'hover:opacity-80'
                            }
                          `}
                          style={{
                            background: activeTab === tab.id ? currentTheme.gradients.primary : 'transparent',
                            color: activeTab === tab.id ? currentTheme.colors.text : currentTheme.colors.textSecondary,
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-3 text-lg">{tab.icon}</span>
                          {tab.label}
                        </motion.button>
                      ))}
                    </nav>
                  </AnimatedCard>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <AnimatedCard
                    theme={currentTheme}
                    glow={currentTheme.effects.glow}
                    glassmorphism={currentTheme.effects.glassmorphism}
                    className="p-8"
                  >
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderActiveTab()}
                    </motion.div>
                  </AnimatedCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EnhancedResumeBuilder;
