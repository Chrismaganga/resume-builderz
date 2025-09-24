import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Plus, Trash2, Award, Calendar, ExternalLink, Building } from 'lucide-react';
import type { Certification, Resume } from '../../types/resume';

interface CertificationsFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ resume, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Certification>({
    defaultValues: {
      id: '',
      name: '',
      issuer: '',
      date: '',
      url: '',
    },
  });

  const onSubmit = (data: Certification) => {
    if (editingId) {
      // Update existing certification
      const updatedCertifications = resume.certifications.map(cert =>
        cert.id === editingId ? { ...data, id: editingId } : cert
      );
      onUpdate({
        ...resume,
        certifications: updatedCertifications,
      });
      setEditingId(null);
    } else {
      // Add new certification
      const newCertification = {
        ...data,
        id: Date.now().toString(),
      };
      onUpdate({
        ...resume,
        certifications: [...resume.certifications, newCertification],
      });
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (certification: Certification) => {
    reset(certification);
    setEditingId(certification.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate({
      ...resume,
      certifications: resume.certifications.filter(cert => cert.id !== id),
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
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Certifications</h2>
            <p className="text-gray-600">Add your professional certifications</p>
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
          <span>Add Certification</span>
        </motion.button>
      </motion.div>

      {/* Certifications List */}
      <motion.div variants={containerVariants} className="space-y-4">
        <AnimatePresence>
          {resume.certifications.map((cert) => (
            <motion.div
              key={cert.id}
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
                      <Award className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 font-medium">{cert.issuer}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Issued: {cert.date}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {cert.url && (
                    <div className="flex space-x-4">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Credential
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleEdit(cert)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(cert.id)}
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
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Certification' : 'Add New Certification'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Certification Name *</span>
                </label>
                <input
                  {...register('name', { required: 'Certification name is required' })}
                  className="input-field"
                  placeholder="AWS Certified Solutions Architect"
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
                <label className="label flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Issuing Organization *</span>
                </label>
                <input
                  {...register('issuer', { required: 'Issuer is required' })}
                  className="input-field"
                  placeholder="Amazon Web Services"
                />
                {errors.issuer && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.issuer.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Issue Date *</span>
                </label>
                <input
                  {...register('date', { required: 'Issue date is required' })}
                  type="date"
                  className="input-field"
                />
                {errors.date && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.date.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Credential URL</span>
                </label>
                <input
                  {...register('url')}
                  type="url"
                  className="input-field"
                  placeholder="https://aws.amazon.com/verification"
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
                  {editingId ? 'Update' : 'Add'} Certification
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CertificationsForm;
