import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import QuizPage from '@/pages/QuizPage';
import ExamPage from '@/pages/ExamPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import CertificatesPage from '@/pages/CertificatesPage';
import AdminDashboard from '@/pages/AdminDashboard';
import CertificateViewPage from '@/pages/CertificateViewPage';
import BottomNav from '@/components/BottomNav';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const location = useLocation();
  const showBottomNav = ['/dashboard', '/dashboard/profile', '/courses', '/dashboard/certificates'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 pb-20">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/exam/:courseId" element={<ExamPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/certificates" element={<CertificatesPage />} />
          <Route path="/certificate/:certificateId" element={<CertificateViewPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
      {showBottomNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;