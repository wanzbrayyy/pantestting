import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCertificatesStorage } from '@/hooks/useLocalStorage';
import { generateCertificate } from '@/utils/certificateGenerator';
import { Progress } from '@/components/ui/progress';

const CertificateViewPage = () => {
  const { certificateId } = useParams();
  const { t } = useLanguage();
  const [certificates, setCertificates] = useCertificatesStorage();
  const [certificate, setCertificate] = useState(null);
  const [generatedCertUrl, setGeneratedCertUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ userName: '', profilePicUrl: '' });
  const canvasRef = useRef(null);

  useEffect(() => {
    const foundCert = certificates.find(c => c.id.toString() === certificateId);
    if (foundCert) {
      setCertificate(foundCert);
      setFormData({ userName: foundCert.userName, profilePicUrl: foundCert.profilePicUrl });
    }
  }, [certificateId, certificates]);

  const runCertificateGeneration = (name, course, picUrl) => {
    setLoading(true);
    setLoadingProgress(0);
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => (prev < 90 ? prev + 10 : 90));
    }, 150);

    generateCertificate(canvasRef.current, name, course, picUrl)
      .then(url => {
        clearInterval(progressInterval);
        setLoadingProgress(100);
        setGeneratedCertUrl(url);
        setTimeout(() => setLoading(false), 500);
      })
      .catch(err => {
        clearInterval(progressInterval);
        console.error("Certificate generation failed:", err);
        toast({ title: "Error", description: "Could not generate certificate. Check console for details.", variant: "destructive" });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (certificate && canvasRef.current) {
      runCertificateGeneration(certificate.userName, certificate.courseName, certificate.profilePicUrl);
    }
  }, [certificate]);

  const handleUpdateCertificate = () => {
    const updatedCert = { ...certificate, ...formData };
    runCertificateGeneration(formData.userName, certificate.courseName, formData.profilePicUrl);
    const updatedCertificates = certificates.map(c => c.id.toString() === certificateId ? updatedCert : c);
    setCertificates(updatedCertificates);
    setCertificate(updatedCert);
    setIsEditing(false);
    toast({ title: t('success'), description: "Certificate updated." });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `Certificate-${certificate.courseName.replace(/\s+/g, '-')}.png`;
    link.href = generatedCertUrl;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Certificate for {certificate?.courseName}</title>
      </Helmet>
      <div className="min-h-screen px-6 py-12">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="container mx-auto max-w-4xl">
          <BackButton to="/dashboard/certificates" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {loading && (
              <Card className="glass-effect border-white/20">
                <CardContent className="p-12 text-center">
                  <i className="fas fa-award text-yellow-400 text-5xl mb-4 animate-pulse"></i>
                  <h3 className="text-2xl font-bold text-white mb-4">Generating Certificate...</h3>
                  <p className="text-gray-300 mb-6">Please wait while we create your personalized certificate.</p>
                  <Progress value={loadingProgress} className="w-full" />
                  <p className="text-sm text-gray-400 mt-2">{loadingProgress}%</p>
                </CardContent>
              </Card>
            )}
            {!loading && generatedCertUrl && (
              <Card className="glass-effect border-white/20">
                <CardContent className="p-4 md:p-8">
                  <img src={generatedCertUrl} alt="Generated Certificate" className="w-full h-auto rounded-lg shadow-2xl" />
                  <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
                    <Button onClick={handleDownload} className="btn-primary"><i className="fas fa-download mr-2"></i>{t('download')}</Button>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-edit mr-2"></i>{t('edit')}</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {isEditing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                <Card className="glass-effect border-white/20">
                  <CardContent className="p-8 space-y-4">
                    <h3 className="text-xl font-bold text-white">Update Certificate Details</h3>
                    <div><label className="text-sm text-gray-300">Name on Certificate</label><Input value={formData.userName} onChange={e => setFormData({...formData, userName: e.target.value})} className="bg-white/5 border-white/20 text-white mt-1" /></div>
                    <div><label className="text-sm text-gray-300">Profile Picture URL</label><Input value={formData.profilePicUrl} onChange={e => setFormData({...formData, profilePicUrl: e.target.value})} className="bg-white/5 border-white/20 text-white mt-1" /></div>
                    <div className="flex gap-4">
                      <Button onClick={handleUpdateCertificate} className="btn-primary"><i className="fas fa-save mr-2"></i>Update Certificate</Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CertificateViewPage;