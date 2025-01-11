import React, { useEffect } from "react";
import { FaTasks, FaUsers, FaChartBar, FaCogs, FaCog } from "react-icons/fa"; // Import relevant icons
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const AdminDashBoard: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the duration of the animation
      easing: "ease-in-out", // You can customize the easing function
    });
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md" data-aos="fade-left">
          Add New Task
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="p-4 rounded-lg shadow-md bg-blue-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>

        {/* Users */}
        <div className="p-4 rounded-lg shadow-md bg-green-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold mt-2">50</p>
        </div>

        {/* Pending Requests */}
        <div className="p-4 rounded-lg shadow-md bg-yellow-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Pending Requests</h3>
          <p className="text-2xl font-bold mt-2">15</p>
        </div>

        {/* Overdue Tasks */}
        <div className="p-4 rounded-lg shadow-md bg-red-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Progress Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white" data-aos="fade-left">
          <h3 className="text-lg font-semibold mb-2">Task Progress</h3>
          <div className="h-64 bg-gray-200 rounded-md flex justify-center items-center text-gray-500">
            {/* You can integrate a chart here */}
            <FaChartBar className="w-16 h-16" />
          </div>
        </div>

        {/* Active Users */}
        <div className="p-4 rounded-lg shadow-md bg-white" data-aos="fade-left">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <div className="h-64 bg-gray-200 rounded-md flex justify-center items-center text-gray-500">
            {/* Active users chart or count */}
            <FaUsers className="w-16 h-16" />
          </div>
        </div>

        {/* System Settings */}
        <div className="p-4 rounded-lg shadow-md bg-white" data-aos="fade-left">
          <h3 className="text-lg font-semibold mb-2">System Settings</h3>
          <div className="h-64 bg-gray-200 rounded-md flex justify-center items-center text-gray-500">
            <FaCogs className="w-16 h-16" />
            {/* Link to system settings or manage configurations */}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 rounded-lg shadow-md bg-white" data-aos="fade-up">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaTasks className="text-blue-500 w-5 h-5 mr-3" />
            <span>New task created by user: Evan Chimwaza</span>
          </li>
          <li className="flex items-center">
            <FaUsers className="text-green-500 w-5 h-5 mr-3" />
            <span>User "John Doe" has been added to the system</span>
          </li>
          <li className="flex items-center">
            <FaCog className="text-gray-500 w-5 h-5 mr-3" />
            <span>System settings updated by admin</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashBoard;
