import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Plus, Trash2, GraduationCap, Calendar, MapPin, Building, Award } from 'lucide-react';
import type { Education, Resume } from '../../types/resume';

interface EducationFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ resume, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Education>({
    defaultValues: {
      id: '',
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: '',
    },
  });

  const onSubmit = (data: Education) => {
    if (editingId) {
      // Update existing education
      const updatedEducation = resume.education.map(edu =>
        edu.id === editingId ? { ...data, id: editingId } : edu
      );
      onUpdate({
        ...resume,
        education: updatedEducation,
      });
      setEditingId(null);
    } else {
      // Add new education
      const newEducation = {
        ...data,
        id: Date.now().toString(),
      };
      onUpdate({
        ...resume,
        education: [...resume.education, newEducation],
      });
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (education: Education) => {
    reset(education);
    setEditingId(education.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate({
      ...resume,
      education: resume.education.filter(edu => edu.id !== id),
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
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Education</h2>
            <p className="text-gray-600">Add your educational background</p>
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
          <span>Add Education</span>
        </motion.button>
      </motion.div>

      {/* Education List */}
      <motion.div variants={containerVariants} className="space-y-4">
        <AnimatePresence>
          {resume.education.map((edu) => (
            <motion.div
              key={edu.id}
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
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-600 font-medium">{edu.institution}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                          </span>
                        </span>
                        {edu.gpa && (
                          <span className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>GPA: {edu.gpa}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(edu.id)}
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
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Education' : 'Add New Education'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Degree *</span>
                  </label>
                  <input
                    {...register('degree', { required: 'Degree is required' })}
                    className="input-field"
                    placeholder="Bachelor of Science"
                  />
                  {errors.degree && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.degree.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="label flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Field of Study *</span>
                  </label>
                  <input
                    {...register('field', { required: 'Field of study is required' })}
                    className="input-field"
                    placeholder="Computer Science"
                  />
                  {errors.field && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.field.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Institution *</span>
                </label>
                <input
                  {...register('institution', { required: 'Institution is required' })}
                  className="input-field"
                  placeholder="University of California"
                />
                {errors.institution && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.institution.message}
                  </motion.p>
                )}
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
                    placeholder="Berkeley, CA"
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
                    <Award className="w-4 h-4" />
                    <span>GPA</span>
                  </label>
                  <input
                    {...register('gpa')}
                    className="input-field"
                    placeholder="3.8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    I am currently studying here
                  </span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="label">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Relevant coursework, achievements, or activities..."
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
                  {editingId ? 'Update' : 'Add'} Education
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EducationForm;
