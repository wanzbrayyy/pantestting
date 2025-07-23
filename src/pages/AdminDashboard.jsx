import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminCourses from '@/components/admin/AdminCourses';
import AdminContent from '@/components/admin/AdminContent';
import AdminExams from '@/components/admin/AdminExams';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={setActiveTab} />;
      case 'courses':
        return <AdminCourses />;
      case 'exams':
        return <AdminExams />;
      case 'content':
        return <AdminContent />;
      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Learning Platform</title>
        <meta name="description" content="Admin dashboard for managing courses and content" />
      </Helmet>

      <div className="min-h-screen">
        <LanguageSwitcher />
        
        <nav className="glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold gradient-text">LearnHub Admin</Link>
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-white hover:text-blue-400 transition-colors">Dashboard</Link>
                <Link to="/courses" className="text-white hover:text-blue-400 transition-colors">Courses</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 68px)' }}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;