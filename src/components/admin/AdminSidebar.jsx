import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', icon: 'fa-tachometer-alt', label: 'Overview' },
    { id: 'courses', icon: 'fa-book-open', label: 'Manage Courses' },
    { id: 'exams', icon: 'fa-graduation-cap', label: 'Manage Exams' },
    { id: 'content', icon: 'fa-upload', label: 'Upload Content' },
  ];

  return (
    <div className="w-64 admin-sidebar min-h-screen p-6 flex-shrink-0">
      <div className="space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
              activeTab === item.id 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <i className={`fas ${item.icon} w-5 h-5 mr-3`}></i>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;