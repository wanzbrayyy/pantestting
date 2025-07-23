import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', icon: 'fas fa-th-large', label: t('dashboard') },
    { path: '/courses', icon: 'fas fa-book-open', label: t('courses') },
    { path: '/dashboard/certificates', icon: 'fas fa-award', label: t('myCertificates') },
    { path: '/dashboard/profile', icon: 'fas fa-user', label: t('profile') },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 md:hidden z-50"
    >
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 transition-colors duration-300 w-full h-full ${
                isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.i
                  className={`${item.icon} text-2xl`}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                ></motion.i>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-1 h-1 w-8 bg-blue-400 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;