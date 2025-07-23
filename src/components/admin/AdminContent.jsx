
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdminContent = () => {
  const { t } = useLanguage();

  const handleUpload = (type) => {
    toast({
      title: t('notImplemented'),
      description: `Uploading ${type} is not yet implemented.`,
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text mb-8">Upload Content</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-effect border-white/20">
          <CardHeader><CardTitle className="text-xl text-white">{t('uploadPDF')}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <i className="fas fa-file-pdf text-blue-400 text-5xl mb-4"></i>
              <p className="text-gray-300 mb-6">Upload PDF materials for your courses.</p>
              <Button onClick={() => handleUpload('PDF')} className="btn-primary">
                <i className="fas fa-upload mr-2"></i>{t('uploadPDF')}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-white/20">
          <CardHeader><CardTitle className="text-xl text-white">{t('uploadVideo')}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <i className="fas fa-video text-purple-400 text-5xl mb-4"></i>
              <p className="text-gray-300 mb-6">Upload video content for lessons.</p>
              <Button onClick={() => handleUpload('Video')} className="btn-primary">
                <i className="fas fa-upload mr-2"></i>{t('uploadVideo')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminContent;
