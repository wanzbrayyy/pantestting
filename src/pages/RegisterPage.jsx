import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RegisterPage = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const [users, setUsers] = useLocalStorage('users', []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({ title: t('error'), description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: t('error'), description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (formData.password.length < 6) {
      toast({ title: t('error'), description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    const newUser = register({
      name: formData.fullName,
      email: formData.email,
      password: formData.password
    });

    const referralCode = query.get('ref');
    if (referralCode) {
      let referrerFound = false;
      const updatedUsers = users.map(u => {
        if (u.referralCode === referralCode) {
          referrerFound = true;
          return { ...u, points: (u.points || 0) + 10 };
        }
        return u;
      });

      if (referrerFound) {
        newUser.points = 10;
        toast({ title: t('success'), description: 'You and your friend have received 10 points!' });
      }
      setUsers([...updatedUsers, newUser]);
    } else {
      setUsers([...users, newUser]);
    }
    
    toast({ title: t('success'), description: 'Registration successful!' });
    navigate('/dashboard/profile');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{t('registerTitle')} - Learning Platform</title>
        <meta name="description" content="Create a new account to start learning" />
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
                {t('registerTitle')}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t('fullName')}</label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="pl-10 bg-white/5 border-white/20 text-white" placeholder="Your full name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t('email')}</label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 bg-white/5 border-white/20 text-white" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t('password')}</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="pl-10 pr-10 bg-white/5 border-white/20 text-white" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t('confirmPassword')}</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <Input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="pl-10 pr-10 bg-white/5 border-white/20 text-white" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-primary">
                  <i className="fas fa-user-plus mr-2"></i>{t('register')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {t('alreadyHaveAccount')}{' '}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                    {t('login')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;