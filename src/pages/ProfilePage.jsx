import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({ title: t('success'), description: 'Profile updated successfully!' });
  };
  
  const handleCancel = () => {
    setFormData({ name: user?.name || '', email: user?.email || '', profilePicture: user?.profilePicture || '' });
    setIsEditing(false);
  };
  
  const handleCopyReferral = () => {
    const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({ title: t('copied'), description: 'Referral link copied to clipboard!' });
  };

  const achievements = [
    { title: 'JavaScript Master', description: 'Completed JavaScript Fundamentals', date: '2025-01-15', icon: 'fas fa-award' },
    { title: 'Quick Learner', description: 'Completed first course in under a week', date: '2025-01-10', icon: 'fas fa-rocket' }
  ];

  return (
    <>
      <Helmet>
        <title>{t('profile')} - Learning Platform</title>
        <meta name="description" content="Manage your profile and view your achievements" />
      </Helmet>
      <div className="min-h-screen px-6 py-12">
        <LanguageSwitcher />
        <div className="container mx-auto max-w-4xl">
          <BackButton to="/dashboard" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="glass-effect border-white/20 mb-8">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl text-white">Profile Information</CardTitle>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-edit mr-2"></i>Edit</Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} className="btn-primary"><i className="fas fa-save mr-2"></i>Save</Button>
                        <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-times mr-2"></i>Cancel</Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img src={formData.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover"/>
                          {isEditing && (
                            <label htmlFor="profile-pic-upload" className="absolute -bottom-1 -right-1 bg-blue-500 p-1.5 rounded-full cursor-pointer hover:bg-blue-600"><i className="fas fa-camera text-white text-xs"></i></label>
                          )}
                        </div>
                        <div className="flex-1">
                          {isEditing ? <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="text-xl font-semibold bg-white/5 border-white/20 text-white" /> : <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>}
                          <p className="text-gray-400 capitalize">{user?.role}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center"><i className="fas fa-envelope mr-2"></i>Email</label>
                          {isEditing ? <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/20 text-white" /> : <p className="text-white">{user?.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center"><i className="fas fa-calendar-alt mr-2"></i>Member Since</label>
                          <p className="text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      {isEditing && <div><label className="text-sm font-medium text-gray-300">Profile Picture URL</label><Input value={formData.profilePicture} onChange={(e) => setFormData({...formData, profilePicture: e.target.value})} className="bg-white/5 border-white/20 text-white mt-1"/></div> }
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20">
                  <CardHeader><CardTitle className="text-2xl text-white">Achievements</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">{achievements.map((a, i) => <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"><div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"><i className={`${a.icon} text-white text-xl`}></i></div><div className="flex-1"><h3 className="font-semibold text-white">{a.title}</h3><p className="text-gray-400 text-sm">{a.description}</p><p className="text-gray-500 text-xs">{new Date(a.date).toLocaleDateString()}</p></div></motion.div>)}</div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="glass-effect border-white/20 mb-6">
                  <CardHeader><CardTitle className="text-xl text-white">{t('yourPoints')}</CardTitle></CardHeader>
                  <CardContent className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">{user?.points || 0}</div>
                    <p className="text-gray-400">Points</p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20 mb-6">
                  <CardHeader><CardTitle className="text-xl text-white">{t('referralSystem')}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{t('referralInfo')}</p>
                    <Button onClick={handleCopyReferral} className="w-full btn-primary"><i className="fas fa-copy mr-2"></i>{t('copyLink')}</Button>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/20">
                  <CardHeader><CardTitle className="text-xl text-white">{t('discussionGroup')}</CardTitle></CardHeader>
                  <CardContent>
                    <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white"><i className="fab fa-telegram-plane mr-2"></i>{t('joinCommunity')}</Button>
                    </a>
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

export default ProfilePage;