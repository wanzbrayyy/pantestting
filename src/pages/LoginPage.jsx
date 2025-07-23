import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: t('error'),
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const isAdminLogin = formData.email === 'wanzofc' && formData.password === 'wanz0103';

    const userData = {
      id: 1,
      email: isAdminLogin ? 'admin@wanzofc.com' : formData.email,
      name: isAdminLogin ? 'Wanz OFC' : 'Demo User',
      role: isAdminLogin ? 'admin' : 'student'
    };

    login(userData);
    toast({
      title: t('success'),
      description: 'Login successful!'
    });
    
    navigate('/dashboard/profile');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('loginTitle')} - Learning Platform</title>
        <meta name="description" content="Login to access your learning dashboard" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <LanguageSwitcher />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <BackButton to="/" />
          
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold gradient-text">
                {t('loginTitle')}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {t('email')} / Username
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 border-white/20 text-white"
                      placeholder="your@email.com or username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-primary">
                  <i className="fas fa-sign-in-alt mr-2"></i>{t('login')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {t('dontHaveAccount')}{' '}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                    {t('register')}
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300 text-center">
                  Admin: Use username <strong>wanzofc</strong> & password <strong>wanz0103</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;