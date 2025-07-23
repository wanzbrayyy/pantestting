import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCoursesStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import CourseFormModal from '@/components/admin/CourseFormModal';

const AdminCourses = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useCoursesStorage();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleSaveCourse = (courseData) => {
    const slug = courseData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    if (editingCourse) {
      const updatedCourses = courses.map(c => c.id === editingCourse.id ? { ...c, ...courseData, slug } : c);
      setCourses(updatedCourses);
      toast({ title: t('success'), description: 'Course updated successfully!' });
    } else {
      const newCourse = { ...courseData, id: Date.now(), slug, createdAt: new Date().toISOString() };
      setCourses([...courses, newCourse]);
      toast({ title: t('success'), description: 'Course created successfully!' });
    }
    setEditingCourse(null);
    setShowModal(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
      toast({ title: t('success'), description: 'Course deleted successfully!' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold gradient-text">{t('manageCourses')}</h1>
        <Button onClick={() => { setEditingCourse(null); setShowModal(true); }} className="btn-primary">
          <i className="fas fa-plus mr-2"></i>{t('createCourse')}
        </Button>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center"><i className="fas fa-clock mr-1"></i>{course.duration}</span>
                      <span className="flex items-center"><i className="fas fa-award mr-1"></i>Certificate</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/courses/${course.slug}`}>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-eye"></i></Button>
                    </Link>
                    <Button onClick={() => handleEdit(course)} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10"><i className="fas fa-edit"></i></Button>
                    <Button onClick={() => handleDelete(course.id)} variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10"><i className="fas fa-trash-alt"></i></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <CourseFormModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditingCourse(null); }}
          onSave={handleSaveCourse}
          course={editingCourse}
        />
      )}
    </div>
  );
};

export default AdminCourses;