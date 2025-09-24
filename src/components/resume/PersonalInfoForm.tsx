import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, FileText } from 'lucide-react';
import type { PersonalInfo, Resume } from '../../types/resume';

interface PersonalInfoFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ resume, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues: resume.personalInfo,
  });

  const onSubmit = (data: PersonalInfo) => {
    onUpdate({
      ...resume,
      personalInfo: data,
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold gradient-text mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself to get started</p>
      </motion.div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Fields */}
        <motion.div 
          variants={inputVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>First Name *</span>
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              className="input-field"
              placeholder="John"
            />
            {errors.firstName && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium"
              >
                {errors.firstName.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Last Name *</span>
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              className="input-field"
              placeholder="Doe"
            />
            {errors.lastName && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium"
              >
                {errors.lastName.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Contact Fields */}
        <motion.div 
          variants={inputVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email *</span>
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="input-field"
              placeholder="john.doe@email.com"
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone *</span>
            </label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div variants={inputVariants} className="space-y-2">
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
        </motion.div>

        {/* Social Links */}
        <motion.div 
          variants={inputVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </label>
            <input
              {...register('website')}
              className="input-field"
              placeholder="https://johndoe.com"
            />
          </div>

          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </label>
            <input
              {...register('linkedin')}
              className="input-field"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <label className="label flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </label>
            <input
              {...register('github')}
              className="input-field"
              placeholder="https://github.com/johndoe"
            />
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div variants={inputVariants} className="space-y-2">
          <label className="label flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Professional Summary *</span>
          </label>
          <textarea
            {...register('summary', { required: 'Summary is required' })}
            rows={4}
            className="input-field resize-none"
            placeholder="Brief description of your professional background and key achievements..."
          />
          {errors.summary && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm font-medium"
            >
              {errors.summary.message}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          variants={inputVariants}
          className="flex justify-end pt-6"
        >
          <motion.button
            type="submit"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PersonalInfoForm;
