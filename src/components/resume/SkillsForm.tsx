import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Plus, Trash2, Wrench, Code } from 'lucide-react';
import type { Resume, Skill } from '../../types/resume';

interface SkillsFormProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ resume, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Skill>({
    defaultValues: {
      id: '',
      name: '',
      level: 'intermediate',
    },
  });

  const onSubmit = (data: Skill) => {
    if (editingId) {
      // Update existing skill
      const updatedSkills = resume.skills.map(skill =>
        skill.id === editingId ? { ...data, id: editingId } : skill
      );
      onUpdate({
        ...resume,
        skills: updatedSkills,
      });
      setEditingId(null);
    } else {
      // Add new skill
      const newSkill = {
        ...data,
        id: Date.now().toString(),
      };
      onUpdate({
        ...resume,
        skills: [...resume.skills, newSkill],
      });
    }
    reset();
    setIsAdding(false);
  };

  const handleEdit = (skill: Skill) => {
    reset(skill);
    setEditingId(skill.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate({
      ...resume,
      skills: resume.skills.filter(skill => skill.id !== id),
    });
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setIsAdding(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Skills</h2>
            <p className="text-gray-600">Add your technical and soft skills</p>
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
          <span>Add Skill</span>
        </motion.button>
      </motion.div>

      {/* Skills List */}
      <motion.div variants={containerVariants} className="space-y-4">
        <AnimatePresence>
          {resume.skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {skill.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(skill.id)}
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
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="label flex items-center space-x-2">
                  <Wrench className="w-4 h-4" />
                  <span>Skill Name *</span>
                </label>
                <input
                  {...register('name', { required: 'Skill name is required' })}
                  className="input-field"
                  placeholder="React, JavaScript, Python, etc."
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
                <label className="label">Proficiency Level *</label>
                <select
                  {...register('level', { required: 'Level is required' })}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                {errors.level && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {errors.level.message}
                  </motion.p>
                )}
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
                  {editingId ? 'Update' : 'Add'} Skill
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkillsForm;
