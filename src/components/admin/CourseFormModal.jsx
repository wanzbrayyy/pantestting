
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CourseFormModal = ({ isOpen, onClose, onSave, course }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    benefits: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        duration: course.duration || '',
        benefits: Array.isArray(course.benefits) ? course.benefits.join('\n') : '',
      });
    } else {
      setFormData({ title: '', description: '', duration: '', benefits: '' });
    }
  }, [course]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      benefits: formData.benefits.split('\n').filter(b => b.trim() !== ''),
    };
    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">{course ? t('editCourse') : t('createCourse')}</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t('courseTitle')} *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/5 border-white/20 text-white"
              placeholder="Enter course title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t('courseDescription')} *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/5 border-white/20 text-white"
              placeholder="Enter course description"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t('duration')}</label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="bg-white/5 border-white/20 text-white"
              placeholder="e.g., 4 weeks"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t('courseBenefits')} (one per line)</label>
            <Textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="bg-white/5 border-white/20 text-white"
              placeholder="Certificate of completion\nHands-on projects\nExpert support"
              rows={4}
            />
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleSubmit} className="btn-primary flex-1"><i className="fas fa-save mr-2"></i>{t('save')}</Button>
            <Button onClick={onClose} variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1"><i className="fas fa-times mr-2"></i>{t('cancel')}</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseFormModal;
