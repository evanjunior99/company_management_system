'use client'
import React, { useEffect, useState } from "react";
import { FaTasks, FaUsers, FaChartBar, FaCogs } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import axios from 'axios'; // Import axios for API calls
import Link from 'next/link';

const AdminDashBoard: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });

    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/auth/tasks"); // Adjust the API endpoint
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Task assignment form (for demo purposes)
  const handleAssignTask = () => {
    // Logic to open task assignment modal or form
    alert("Assign Task");
  };

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');  // Get the stored JWT token
        if (token) {
          const response = await axios.get('http://localhost:8000/api/auth/users/', {
            headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the request header
            },
          });
          console.log('Users data:', response.data);
          setTotalUsers(response.data.total_users); // Set the total users
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);  // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
        <button
  className="px-4 py-2 bg-blue-600 text-white rounded-md"
  data-aos="fade-left"
>
  <Link href="/usersToAssignTasks" className="text-white">
    Add New Task
  </Link>
</button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="p-4 rounded-lg shadow-md bg-blue-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">{tasks.length}</p>
        </div>

        {/* Total Users */}
        <div className="p-4 rounded-lg shadow-md bg-green-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{totalUsers}</p> {/* Display dynamic total users */}
        </div>

        {/* Pending Requests */}
        <div className="p-4 rounded-lg shadow-md bg-yellow-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Pending Tasks</h3>
          <p className="text-2xl font-bold mt-2">
            {tasks.filter((task) => task.status === "pending").length}
          </p>
        </div>

        {/* Overdue Tasks */}
        <div className="p-4 rounded-lg shadow-md bg-red-500 text-white" data-aos="fade-up">
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          <p className="text-2xl font-bold mt-2">
            {tasks.filter((task) => new Date(task.due_date) < new Date()).length}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Progress Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white" data-aos="fade-left">
          <h3 className="text-lg font-semibold mb-2">Task Progress</h3>
          <div className="h-64 bg-gray-200 rounded-md flex justify-center items-center text-gray-500">
            {/* Integrate chart here */}
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
          {tasks.slice(0, 5).map((task) => (
            <li className="flex items-center" key={task.id}>
              <FaTasks className="text-blue-500 w-5 h-5 mr-3" />
              <span>{task.title} assigned to {task.assigned_to}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashBoard;
