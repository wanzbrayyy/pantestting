
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-gray-900 to-purple-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Selamat Datang di Platform Kursus Kami
        </h1>
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
          Tingkatkan keahlian Anda dengan kursus interaktif, kuis menantang, dan materi pembelajaran yang komprehensif.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/courses">Lihat Kursus</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">Masuk</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
  