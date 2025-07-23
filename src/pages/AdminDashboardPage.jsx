
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <Link to="/" className="absolute top-4 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center my-6">Dasbor Admin</h1>
        <p className="text-center text-gray-400">Alat admin untuk mengelola kursus, kuis, dan lainnya akan ada di sini.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
  