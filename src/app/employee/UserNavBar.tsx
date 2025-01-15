'use client'
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Import notification icon
import { FiUser } from 'react-icons/fi'; // Import user icon

const UserNavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <a href="/" className="text-xl font-bold text-blue-600">
          Company Logo
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search here..."
          className=" px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Profile and Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
          aria-label="Notifications"
        >
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FiUser className="w-8 h-8 text-gray-700" />
            <span className="text-gray-700">Evan Chimwaza</span>
          </button>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute right-0 w-48 p-2 mt-2 bg-white border rounded-lg shadow-md">
              <li>
                <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  View Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Settings
                </a>
              </li>
              <li>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
