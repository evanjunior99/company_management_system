'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center"
        data-aos="fade-up" // AOS animation for the entire card
      >
        {/* Company Name */}
        <h1
          className="text-4xl font-bold text-blue-600 mb-8"
          data-aos="zoom-in" // AOS animation for the title
        >
          TechVack
        </h1>

        {/* Admin Section */}
        <div className="mb-6" data-aos="fade-right"> {/* AOS animation */}
          <Link
            href="/admin/login"
            className="block py-4 px-6 bg-blue-500 text-white text-xl font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Admin
          </Link>
        </div>

        {/* Employee Section */}
        <div data-aos="fade-left"> {/* AOS animation */}
          <Link
            href="/employee/login"
            className="block py-4 px-6 bg-green-500 text-white text-xl font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Employee
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
