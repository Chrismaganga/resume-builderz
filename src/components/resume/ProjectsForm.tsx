import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Plus, Trash2, Code, Calendar, ExternalLink, Github } from 'lucide-react';
import type { Project, Resume } from '../../types/resume';


interface ProjectFormData extends Omit<Project, "technologies"> {
  technologies: string;
}
interface ProjectsFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ resume, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      technologies: "",
      url: '',
      github: '',
      startDate: '',
      endDate: '',
      current: false,
    },
  });


  const onSubmit = (data: ProjectFormData) => {
    // Convert technologies string to array
    const technologiesArray = data.technologies 
      ? data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
      : [];

    const projectData = {
      ...data,
      technologies: technologiesArray,
    };

    if (editingId) {
      // Update existing project
      const updatedProjects = resume.projects.map(project =>
        project.id === editingId ? { ...projectData, id: editingId } : project
      );
      onUpdate({
        ...resume,
        projects: updatedProjects,
      });
      setEditingId(null);
    } else {
      // Add new project
      const newProject = {
        ...projectData,
        id: Date.now().toString(),
      };
      onUpdate({
        ...resume,
        projects: [...resume.projects, newProject],
      });
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (project: Project) => {
    reset({
      ...project,
      technologies: project.technologies.join(', '),
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate({
      ...resume,
      projects: resume.projects.filter(project => project.id !== id),
    });
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setIsAdding(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Projects</h2>
            <p className="text-gray-600">Showcase your work and achievements</p>
          </div>
        </div>
        
        <motion.button
          onClick={() => {
            reset();
            setEditingId(null);
            setIsAdding(true);
          }}
          className="btn-primary inline-flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </motion.button>
      </motion.div>

      {/* Projects List */}
      <motion.div variants={containerVariants} className="space-y-4">
        <AnimatePresence>
          {resume.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        {project.startDate && (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {project.startDate} - {project.current ? 'Present' : project.endDate}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                        <Code className="w-4 h-4" />
                        <span>Technologies:</span>
                      </span>
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card-premium"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Project Name *</span>
                </label>
                <input
                  {...register('name', { required: 'Project name is required' })}
                  className="input-field"
                  placeholder="E-commerce Website"
                />
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="label">Description *</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Describe your project, its purpose, and key features..."
                />
                {errors.description && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.description.message}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live URL</span>
                  </label>
                  <input
                    {...register('url')}
                    type="url"
                    className="input-field"
                    placeholder="https://myproject.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub URL</span>
                  </label>
                  <input
                    {...register('github')}
                    type="url"
                    className="input-field"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Start Date</span>
                  </label>
                  <input
                    {...register('startDate')}
                    type="date"
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>End Date</span>
                  </label>
                  <input
                    {...register('endDate')}
                    type="date"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('current')}
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    This is an ongoing project
                  </span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Technologies (comma-separated)</span>
                </label>
                <input
                  {...register('technologies')}
                  className="input-field"
                  placeholder="React, Node.js, MongoDB, Express"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editingId ? 'Update' : 'Add'} Project
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsForm;
