
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdminExams = () => {
  const { t } = useLanguage();

  const handleCreateExam = () => {
    toast({
      title: t('notImplemented'),
      description: 'Creating exams is not yet implemented.',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold gradient-text">{t('manageExams')}</h1>
        <Button onClick={handleCreateExam} className="btn-primary">
          <i className="fas fa-plus mr-2"></i>{t('createExam')}
        </Button>
      </div>
      <Card className="glass-effect border-white/20">
        <CardContent className="p-12 text-center">
          <i className="fas fa-graduation-cap text-purple-400 text-5xl mb-4"></i>
          <h3 className="text-xl font-semibold text-white mb-2">Exam Management</h3>
          <p className="text-gray-300">This feature is coming soon. You will be able to create and manage final exams for your courses here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminExams;
