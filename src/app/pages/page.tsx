'use client'; // Required for client-side features

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashBoard from '../admin/AdminDashBoard'; // Ensure correct path
import AdminNavBar from '../admin/AdminNavBar'; // Ensure correct path
import AdminSideBar from '../admin/AdminSideBar'; // Ensure correct path
import UserDashBoard from '../employee/UserDashBoard'; // Ensure correct path
import UserNavBar from '../employee/UserNavBar'; // Ensure correct path
import UserSideBar from '../employee/UserSideBar'; // Ensure correct path

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login'); // Redirect to login if no token
          return;
        }

        const response = await fetch('/api/user-role/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }

        const data = await response.json();
        const userRole = data.role;

        if (userRole === 'admin') {
          router.push('/admin'); // Redirect to admin dashboard
        } else if (userRole === 'employee') {
          router.push('/employee-dashboard'); // Redirect to employee dashboard
        } else {
          throw new Error('Invalid role');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        router.push('/login'); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return null; // No rendering needed since redirection happens
};

export default Page;
