import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCoursesStorage } from '@/hooks/useLocalStorage';

const CoursesPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useCoursesStorage();

  useEffect(() => {
    if (courses.length === 0) {
      const demoCourses = [
        {
          id: 1,
          title: 'JavaScript Fundamentals',
          slug: 'javascript-fundamentals',
          description: 'Learn the basics of JavaScript programming language',
          duration: '4 weeks',
          benefits: ['Certificate of completion', 'Hands-on projects', 'Expert support'],
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
          createdAt: new Date().toISOString(),
          examId: 1
        },
        {
          id: 2,
          title: 'React Development',
          slug: 'react-development',
          description: 'Master React.js for building modern web applications',
          duration: '6 weeks',
          benefits: ['Industry certification', 'Real-world projects', 'Job placement assistance'],
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
          createdAt: new Date().toISOString(),
          examId: 2
        }
      ];
      setCourses(demoCourses);
    }
  }, [courses, setCourses]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>{t('allCourses')} - Learning Platform</title>
        <meta name="description" content="Browse all available courses and start learning today" />
      </Helmet>

      <div className="min-h-screen px-6 py-12">
        <LanguageSwitcher />
        
        <div className="container mx-auto max-w-6xl">
          <BackButton to="/" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                {t('allCourses')}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover our comprehensive collection of courses designed to help you master new skills
              </p>
            </div>

            <div className="mb-12">
              <div className="relative max-w-md mx-auto">
                <i className="fas fa-search absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="course-card h-full">
                    <div className="relative">
                      <img 
                        className="w-full h-48 object-cover rounded-t-lg"
                        alt={`${course.title} course thumbnail`} src="https://images.unsplash.com/photo-1677696795233-5ef097695f12" />
                      <div className="absolute top-4 right-4">
                        <div className="glass-effect rounded-full px-3 py-1 text-sm font-medium">
                          <i className="fas fa-clock w-4 h-4 inline mr-1"></i>
                          {course.duration}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        {course.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-gray-300 mb-4 flex-1">
                        {course.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <i className="fas fa-award w-4 h-4"></i>
                          <span>Certificate included</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <i className="fas fa-book-open w-4 h-4"></i>
                          <span>Interactive content</span>
                        </div>
                        
                        <Link to={`/courses/${course.slug}`} className="block">
                          <Button className="w-full btn-primary">
                            <i className="fas fa-eye mr-2"></i>{t('courseDetails')}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-book-open w-16 h-16 text-gray-400 mx-auto mb-4 text-5xl"></i>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or browse all available courses
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;