import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Plus, Trash2, Briefcase, Calendar, MapPin, Building, Code } from 'lucide-react';
import type { Experience, Resume } from '../../types/resume';

interface ExperienceFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ resume, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm<Experience>({
    defaultValues: {
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: [],
    },
  });

  const technologiesString = watch('technologies') || '';

  const onSubmit = (data: Experience) => {
    // Convert technologies string to array
    const technologiesArray = data.technologies 
      ? data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
      : [];

    const experienceData = {
      ...data,
      technologies: technologiesArray,
    };

    if (editingId) {
      // Update existing experience
      const updatedExperience = resume.experience.map(exp =>
        exp.id === editingId ? { ...experienceData, id: editingId } : exp
      );
      onUpdate({
        ...resume,
        experience: updatedExperience,
      });
      setEditingId(null);
    } else {
      // Add new experience
      const newExperience = {
        ...experienceData,
        id: Date.now().toString(),
      };
      onUpdate({
        ...resume,
        experience: [...resume.experience, newExperience],
      });
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (experience: Experience) => {
    reset({
      ...experience,
      technologies: experience.technologies.join(', '),
    });
    setEditingId(experience.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate({
      ...resume,
      experience: resume.experience.filter(exp => exp.id !== id),
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
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Work Experience</h2>
            <p className="text-gray-600">Add your professional experience</p>
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
          <span>Add Experience</span>
        </motion.button>
      </motion.div>

      {/* Experience List */}
      <motion.div variants={containerVariants} className="space-y-4">
        <AnimatePresence>
          {resume.experience.map((exp) => (
            <motion.div
              key={exp.id}
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
                      <Building className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                        <Code className="w-4 h-4" />
                        <span>Technologies:</span>
                      </span>
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(exp.id)}
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
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Position *</span>
                  </label>
                  <input
                    {...register('position', { required: 'Position is required' })}
                    className="input-field"
                    placeholder="Senior Software Engineer"
                  />
                  {errors.position && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.position.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Company *</span>
                  </label>
                  <input
                    {...register('company', { required: 'Company is required' })}
                    className="input-field"
                    placeholder="Tech Corp"
                  />
                  {errors.company && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.company.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location *</span>
                  </label>
                  <input
                    {...register('location', { required: 'Location is required' })}
                    className="input-field"
                    placeholder="San Francisco, CA"
                  />
                  {errors.location && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.location.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Start Date *</span>
                  </label>
                  <input
                    {...register('startDate', { required: 'Start date is required' })}
                    type="date"
                    className="input-field"
                  />
                  {errors.startDate && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.startDate.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="flex items-center space-x-4 pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      {...register('current')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I currently work here
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="label">Description *</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Describe your role and key responsibilities..."
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

              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Technologies (comma-separated)</span>
                </label>
                <input
                  {...register('technologies')}
                  className="input-field"
                  placeholder="React, TypeScript, Node.js, Python"
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
                  {editingId ? 'Update' : 'Add'} Experience
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExperienceForm;
