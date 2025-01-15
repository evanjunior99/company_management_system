import React from 'react';
import AdminDashBoard from './AdminDashBoard';
import AdminNavBar from './AdminNavBar';
import AdminSideBar from './AdminSideBar';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Navbar */}
      <AdminNavBar />

      {/* Main content area: Sidebar and Dashboard */}
      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <AdminSideBar />

        {/* Admin Dashboard */}
        <div className="flex-1 p-6 overflow-auto">
          <AdminDashBoard />
        </div>
      </div>
    </div>
  );
};

export default Page;
