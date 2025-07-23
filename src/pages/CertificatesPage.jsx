import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/BackButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCertificatesStorage } from '@/hooks/useLocalStorage';

const CertificatesPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [certificates] = useCertificatesStorage();
  const [userCertificates, setUserCertificates] = useState([]);

  useEffect(() => {
    if (user && certificates) {
      setUserCertificates(certificates.filter(c => c.userId === user.id));
    }
  }, [user, certificates]);

  return (
    <>
      <Helmet>
        <title>{t('myCertificates')} - Learning Platform</title>
        <meta name="description" content="View and manage your earned certificates" />
      </Helmet>

      <div className="min-h-screen px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <BackButton to="/dashboard" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">{t('myCertificates')}</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Congratulations on your achievements! Here are the certificates you've earned.</p>
            </div>

            {userCertificates.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userCertificates.map((cert, index) => (
                  <motion.div key={cert.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="course-card h-full">
                      <CardHeader>
                        <i className="fas fa-award text-yellow-400 text-4xl mb-4"></i>
                        <CardTitle className="text-xl text-white">{cert.courseName}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col">
                        <p className="text-gray-400 text-sm mb-4">Issued on: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                        <Link to={`/certificate/${cert.id}`} className="block mt-auto">
                          <Button className="w-full btn-primary"><i className="fas fa-eye mr-2"></i>{t('viewCertificate')}</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-effect rounded-lg">
                <i className="fas fa-certificate text-gray-400 text-6xl mx-auto mb-6"></i>
                <h3 className="text-2xl font-semibold text-white mb-4">No Certificates Yet</h3>
                <p className="text-gray-300 mb-6">Complete courses and pass the final exams to earn your certificates.</p>
                <Link to="/courses">
                  <Button className="btn-primary"><i className="fas fa-book-open mr-2"></i>Browse Courses</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CertificatesPage;