'use client'
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

import {
  FaTachometerAlt,
  FaTasks,
  FaProjectDiagram,
  FaCalendarAlt,
  FaUser,
  FaCogs,
  FaBook,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
} from "react-icons/fa";

const UserSideBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false); // Added this line to manage task dropdown visibility

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className={`${
        isMenuOpen ? "w-64" : "w-20"
      } h-screen bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center py-4 px-4 border-b border-gray-700">
        <img
          src="/evan.jpg"
          alt="User Profile"
          className="w-12 h-12 rounded-full mb-2"
          data-aos="fade-down"
        />
        {isMenuOpen && (
          <div className="text-center">
            <p className="text-sm font-semibold">Evan Chimwaza</p>
            <p className="text-xs text-gray-400">Software Engineer</p>
            <button className="mt-2 text-xs text-blue-400 hover:underline">
              Profile Settings
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-4 space-y-2 px-2">
        <a
          href="/dashboard"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaTachometerAlt className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Dashboard</span>}
        </a>

        {/* Tasks Section */}
         {/* Tasks Section */}
         <div>
          <button
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => setIsTasksOpen(!isTasksOpen)} // Toggle the task section visibility
            data-aos="fade-right"
          >
            <div className="flex items-center">
              <FaTasks className="w-5 h-5" />
              {isMenuOpen && <span className="ml-4">Tasks</span>}
            </div>
            {isMenuOpen && (
              <div>{isTasksOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
            )}
          </button>
          {isTasksOpen && (
            <ul className="ml-8 list-disc space-y-2" data-aos="fade-right" data-aos-delay="200">
              <li className="p-2 rounded-lg bg-blue-500 text-white">
                <span className="font-semibold">Total Tasks:</span> 120
              </li>
              <li className="p-2 rounded-lg bg-green-500 text-white">
                <span className="font-semibold">Tasks Completed:</span> 90
              </li>
              <li className="p-2 rounded-lg bg-yellow-500 text-white">
                <span className="font-semibold">Pending Tasks:</span> 30
              </li>
              <li className="p-2 rounded-lg bg-red-500 text-white">
                <span className="font-semibold">Overdue Tasks:</span> 5
              </li>
            </ul>
          )}
        </div>

        {/* Collapsible Projects Section */}
        <div>
          <button
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            data-aos="fade-right"
          >
            <div className="flex items-center">
              <FaProjectDiagram className="w-5 h-5" />
              {isMenuOpen && <span className="ml-4">Projects</span>}
            </div>
            {isMenuOpen && (
              <div>{isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
            )}
          </button>
          {isProjectsOpen && (
            <div className="ml-8">
              <a
                href="/projects/project1"
                className="block px-4 py-2 text-sm hover:bg-gray-700 rounded"
                data-aos="fade-right"
              >
                Project 1
              </a>
              <a
                href="/projects/project2"
                className="block px-4 py-2 text-sm hover:bg-gray-700 rounded"
                data-aos="fade-right"
              >
                Project 2
              </a>
            </div>
          )}
        </div>

        <a
          href="/attendance"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaCalendarAlt className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Attendance</span>}
        </a>
        <a
          href="/messages"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaEnvelope className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Messages</span>}
        </a>

        {/* Personal Section */}
        <a
          href="/profile"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaUser className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Profile</span>}
        </a>
        <a
          href="/performance"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaCogs className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Performance</span>}
        </a>
        <a
          href="/resources"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaBook className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Resources</span>}
        </a>
        <a
          href="/help"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaQuestionCircle className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Help Center</span>}
        </a>
      </nav>

      {/* Quick Links/Widgets */}
      <div className="flex flex-col mt-auto px-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded mb-2"
          data-aos="fade-up"
        >
          New Task
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded"
          data-aos="fade-up"
        >
          Submit Leave
        </button>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-2 border-t border-gray-700">
        {isMenuOpen && (
          <div className="text-xs text-gray-400">
            <p>v1.0.0</p>
            <p>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSideBar;
