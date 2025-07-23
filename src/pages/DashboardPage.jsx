import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from "@/components/ui/progress";

const DashboardPage = () => {
  const { t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();

  const stats = [
    { title: 'Courses Enrolled', value: '3', icon: 'fas fa-book-open', color: 'text-blue-400' },
    { title: 'Certificates Earned', value: '1', icon: 'fas fa-award', color: 'text-yellow-400' },
    { title: 'Hours Learned', value: '24', icon: 'fas fa-clock', color: 'text-green-400' },
    { title: t('yourPoints'), value: user?.points || 0, icon: 'fas fa-star', color: 'text-purple-400' }
  ];

  const recentCourses = [
    { id: 1, title: 'JavaScript Fundamentals', progress: 75, lastAccessed: '2 hours ago' },
    { id: 2, title: 'React Development', progress: 45, lastAccessed: '1 day ago' },
    { id: 3, title: 'Node.js Backend', progress: 20, lastAccessed: '3 days ago' }
  ];

  return (
    <>
      <Helmet>
        <title>{t('dashboard')} - Learning Platform</title>
        <meta name="description" content="Your learning dashboard with progress and courses" />
      </Helmet>
      <div className="min-h-screen">
        <LanguageSwitcher />
        <nav className="glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold gradient-text">LearnHub</Link>
              <div className="flex items-center space-x-6">
                <Link to="/courses" className="text-white hover:text-blue-400 transition-colors"><i className="fas fa-chalkboard-teacher mr-2"></i>{t('courses')}</Link>
                {isAdmin && <Link to="/admin" className="text-white hover:text-blue-400 transition-colors"><i className="fas fa-user-shield mr-2"></i>{t('admin')}</Link>}
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard/profile"><Button variant="outline" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-user mr-2"></i>{t('profile')}</Button></Link>
                  <Button onClick={logout} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10"><i className="fas fa-sign-out-alt mr-2"></i>{t('logout')}</Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Welcome back, {user?.name}!</h1>
              <p className="text-xl text-gray-300">Continue your learning journey and achieve your goals</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="glass-effect border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <i className={`${stat.icon} ${stat.color} text-3xl`}></i>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="glass-effect border-white/20">
                  <CardHeader><CardTitle className="text-2xl text-white">Recent Courses</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-2">{course.title}</h3>
                            <div className="flex items-center space-x-4">
                              <Progress value={course.progress} className="w-[80%]" />
                              <span className="text-sm text-gray-400">{course.progress}%</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{course.lastAccessed}</p>
                          </div>
                          <Button className="btn-primary ml-4"><i className="fas fa-play mr-2"></i>Continue</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="glass-effect border-white/20">
                  <CardHeader><CardTitle className="text-xl text-white">Quick Actions</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link to="/courses" className="block"><Button className="w-full btn-primary"><i className="fas fa-book-open mr-2"></i>Browse Courses</Button></Link>
                      <Link to="/dashboard/certificates" className="block"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10"><i className="fas fa-award mr-2"></i>{t('myCertificates')}</Button></Link>
                      <Link to="/dashboard/profile" className="block"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10"><i className="fas fa-cog mr-2"></i>Settings</Button></Link>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20 mt-6">
                  <CardHeader><CardTitle className="text-xl text-white">Recent Achievement</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <i className="fas fa-award text-yellow-400 text-5xl mx-auto mb-3"></i>
                      <h3 className="font-semibold text-white mb-2">JavaScript Master</h3>
                      <p className="text-sm text-gray-400">Completed JavaScript Fundamentals course</p>
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

export default DashboardPage;