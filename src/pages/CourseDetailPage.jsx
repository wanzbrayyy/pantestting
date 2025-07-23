import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCoursesStorage } from '@/hooks/useLocalStorage';
import PDFViewer from '@/components/PDFViewer';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses] = useCoursesStorage();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courses) {
      const foundCourse = courses.find(c => c.slug === slug);
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [slug, courses]);

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      toast({
        title: t('error'),
        description: 'Please login to start the quiz',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: t('success'),
      description: 'Redirecting to quiz...'
    });
    navigate(`/quiz/${course.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-5xl text-white"></i>
          <p className="text-gray-300 mt-4">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <i className="fas fa-book-open text-gray-400 text-6xl mx-auto mb-4"></i>
          <h2 className="text-2xl font-bold text-white mb-2">Course not found</h2>
          <p className="text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button className="btn-primary">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} - Learning Platform</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="min-h-screen px-6 py-12">
        <LanguageSwitcher />
        
        <div className="container mx-auto max-w-6xl">
          <BackButton to="/courses" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <img 
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                    alt={`${course.title} course banner`} src="https://images.unsplash.com/photo-1641772063406-fba515758ded" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="glass-effect border-white/20"><CardContent className="p-6 text-center"><i className="fas fa-clock text-blue-400 text-3xl mx-auto mb-3"></i><h3 className="font-semibold text-white mb-1">{t('duration')}</h3><p className="text-gray-300">{course.duration}</p></CardContent></Card>
                  <Card className="glass-effect border-white/20"><CardContent className="p-6 text-center"><i className="fas fa-award text-purple-400 text-3xl mx-auto mb-3"></i><h3 className="font-semibold text-white mb-1">Certificate</h3><p className="text-gray-300">Included</p></CardContent></Card>
                  <Card className="glass-effect border-white/20"><CardContent className="p-6 text-center"><i className="fas fa-book-open text-pink-400 text-3xl mx-auto mb-3"></i><h3 className="font-semibold text-white mb-1">Level</h3><p className="text-gray-300">Beginner</p></CardContent></Card>
                </div>

                <Card className="glass-effect border-white/20 mb-8">
                  <CardHeader><CardTitle className="text-2xl text-white flex items-center"><i className="fas fa-star text-yellow-400 w-6 h-6 mr-2"></i>{t('benefits')}</CardTitle></CardHeader>
                  <CardContent><div className="space-y-3">{course.benefits?.map((benefit, index) => (<div key={index} className="flex items-center space-x-3"><i className="fas fa-check-circle text-green-400 w-5 h-5 flex-shrink-0"></i><span className="text-gray-300">{benefit}</span></div>))}</div></CardContent>
                </Card>

                <PDFViewer pdfUrl="/sample.pdf" title="Course Materials" />
              </div>

              <div className="lg:col-span-1">
                <Card className="glass-effect border-white/20 sticky top-6">
                  <CardContent className="p-8">
                    <div className="text-center mb-8"><div className="text-3xl font-bold text-white mb-2">Free</div><p className="text-gray-400">Full access to all content</p></div>
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <Button onClick={handleStartQuiz} className="w-full btn-primary mb-2"><i className="fas fa-play w-4 h-4 mr-2"></i>{t('startCourse')}</Button>
                        <Link to={`/exam/${course.id}`} className="block">
                          <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"><i className="fas fa-graduation-cap w-4 h-4 mr-2"></i>{t('finalExam')}</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4 mb-6">
                        <Link to="/register" className="block"><Button className="w-full btn-primary">{t('register')} to Start</Button></Link>
                        <Link to="/login" className="block"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">{t('login')}</Button></Link>
                      </div>
                    )}
                    <div className="mt-6 space-y-4 text-sm">
                      <div className="flex items-center justify-between"><span className="text-gray-400">Duration:</span><span className="text-white">{course.duration}</span></div>
                      <div className="flex items-center justify-between"><span className="text-gray-400">Language:</span><span className="text-white">English</span></div>
                      <div className="flex items-center justify-between"><span className="text-gray-400">Certificate:</span><span className="text-white">Yes</span></div>
                      <div className="flex items-center justify-between"><span className="text-gray-400">Access:</span><span className="text-white">Lifetime</span></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;