'use client'
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import axios from 'axios'; // Import axios for API calls

const UserDashBoard = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Tasks assigned to the user
  const [notifications, setNotifications] = useState<any[]>([]); // User notifications
  const [pendingTasks, setPendingTasks] = useState<number>(0); // Number of pending tasks
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0); // Number of unread notifications

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });

    // Fetch tasks assigned to the user and notifications
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');  // Get the stored JWT token
        if (token) {
          const tasksResponse = await axios.get('http://localhost:8000/api/auth/task/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTasks(tasksResponse.data.tasks);
          setPendingTasks(tasksResponse.data.pendingTasks);
          
          const notificationsResponse = await axios.get('/api/notifications', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotifications(notificationsResponse.data.notifications);
          setUnreadNotifications(notificationsResponse.data.unreadCount);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);  // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="p-4">
      {/* Dashboard Header */}
      <div
        className="text-center font-bold text-xl text-blue-600 mb-6"
        data-aos="fade-up"
      >
        User Dashboard
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div
          className="p-4 rounded-lg shadow-md text-white bg-blue-500"
          data-aos="fade-up"
        >
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">{tasks.length}</p>
        </div>

        {/* Tasks Completed */}
        <div
          className="p-4 rounded-lg shadow-md text-white bg-green-500"
          data-aos="fade-up"
        >
          <h3 className="text-lg font-semibold">Tasks Completed</h3>
          <p className="text-2xl font-bold mt-2">
            {tasks.filter((task) => task.status === "completed").length}
          </p>
        </div>

        {/* Pending Tasks */}
        <div
          className="p-4 rounded-lg shadow-md text-white bg-yellow-500"
          data-aos="fade-up"
        >
          <h3 className="text-lg font-semibold">Pending Tasks</h3>
          <p className="text-2xl font-bold mt-2">{pendingTasks}</p>
        </div>

        {/* Overdue Tasks */}
        <div
          className="p-4 rounded-lg shadow-md text-white bg-red-500"
          data-aos="fade-up"
        >
          <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          <p className="text-2xl font-bold mt-2">
            {tasks.filter((task) => new Date(task.due_date) < new Date()).length}
          </p>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-8">
        <h2
          className="text-lg font-bold mb-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          Additional Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div
            className="p-4 rounded-lg shadow-md bg-purple-500 text-white"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
            <p className="text-2xl font-bold mt-2">
              {tasks.filter((task) => new Date(task.due_date) > new Date()).length}
            </p>
            <p className="mt-1 text-sm">Due within the next week</p>
          </div>

          {/* Notifications */}
          <div
            className="p-4 rounded-lg shadow-md bg-indigo-500 text-white"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-2xl font-bold mt-2">{unreadNotifications}</p>
            <p className="mt-1 text-sm">Unread notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
