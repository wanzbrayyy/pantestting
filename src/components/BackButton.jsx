
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const BackButton = ({ to = -1 }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleBack = () => {
    if (typeof to === 'string') {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">{t('back')}</span>
    </motion.button>
  );
};

export default BackButton;
