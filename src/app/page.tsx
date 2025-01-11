'use client'
import React, { useState, useEffect } from 'react';
import AdminDashBoard from './admin/AdminDashBoard';
import AdminNavBar from './admin/AdminNavBar';
import AdminSideBar from './admin/AdminSideBar';
import UserNavBar from './pages/UserNavBar';
import UserSideBar from './pages/UserSideBar';
import UserDashBoard from './components/UserDashBoard';

const Page = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Initial state

  // Example authentication check (can be replaced with actual logic)
  useEffect(() => {
    // Replace this with your actual auth logic
    setIsAdmin(true); // Uncomment and set based on user authentication
    // setIsAdmin(false); // Uncomment this if the user is an employee
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {isAdmin ? <AdminNavBar /> : <UserNavBar />}

      <div className="flex flex-1">
        {/* Sidebar */}
        {isAdmin ? <AdminSideBar /> : <UserSideBar />}

        {/* Main dashboard area */}
        <div className="flex-1 p-6 overflow-auto">
          {isAdmin ? <AdminDashBoard /> : <UserDashBoard />}
        </div>
      </div>
    </div>
  );
};

export default Page;
