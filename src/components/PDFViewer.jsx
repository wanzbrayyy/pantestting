import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const PDFViewer = ({ pdfUrl, title = 'Course Material' }) => {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: t('success'),
        description: 'PDF download started!'
      });
    } else {
      toast({
        title: t('notImplemented'),
        description: 'No PDF file available for download.'
      });
    }
  };

  const handlePreview = () => {
    if (pdfUrl) {
      setIsFullscreen(true);
    } else {
      toast({
        title: t('notImplemented'),
        description: 'No PDF file available for preview.'
      });
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white flex items-center">
              <i className="fas fa-file-pdf w-5 h-5 mr-2 text-blue-400"></i>
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="pdf-viewer bg-white/5 rounded-lg overflow-hidden p-8 text-center">
            <i className="fas fa-file-pdf text-blue-400 text-6xl mx-auto mb-4"></i>
            <h3 className="text-xl font-semibold text-white mb-2">PDF Preview</h3>
            <p className="text-gray-300 mb-6">
              Course materials and resources are available for download.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button onClick={handleDownload} className="btn-primary">
                <i className="fas fa-download w-4 h-4 mr-2"></i>
                {t('downloadPDF')}
              </Button>
              <Button 
                onClick={handlePreview}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <i className="fas fa-eye w-4 h-4 mr-2"></i>
                Full Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2 items-center glass-effect p-1 rounded-full">
                <Button onClick={handleZoomOut} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full"><ZoomOut className="w-5 h-5" /></Button>
                <span className="text-white text-sm font-mono w-12 text-center">{zoom}%</span>
                <Button onClick={handleZoomIn} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full"><ZoomIn className="w-5 h-5" /></Button>
              </div>
              <Button onClick={() => setIsFullscreen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></Button>
            </div>
          </div>
          
          <div className="flex-1 bg-black rounded-lg">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=${zoom}`}
              className="w-full h-full border-0 rounded-lg"
              title={title}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PDFViewer;