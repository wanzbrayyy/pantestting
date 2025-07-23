import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCoursesStorage, useExamsStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminOverview = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [courses] = useCoursesStorage();
  const [exams] = useExamsStorage();

  const stats = [
    { title: 'Total Courses', value: courses.length, icon: 'fa-book-open', color: 'text-blue-400' },
    { title: 'Total Students', value: '156', icon: 'fa-users', color: 'text-green-400' },
    { title: t('manageExams'), value: exams.length, icon: 'fa-graduation-cap', color: 'text-purple-400' },
    { title: 'Videos Uploaded', value: '8', icon: 'fa-video', color: 'text-pink-400' }
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text mb-8">{t('adminDashboard')}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <i className={`fas ${stat.icon} ${stat.color} text-3xl`}></i>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="glass-effect border-white/20">
        <CardHeader><CardTitle className="text-2xl text-white">Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={() => setActiveTab('courses')} className="btn-primary h-20 text-lg"><i className="fas fa-plus mr-2"></i>{t('createCourse')}</Button>
            <Button onClick={() => setActiveTab('exams')} variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 text-lg"><i className="fas fa-file-alt mr-2"></i>{t('createExam')}</Button>
            <Button onClick={() => setActiveTab('content')} variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 text-lg"><i className="fas fa-video mr-2"></i>{t('uploadVideo')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;