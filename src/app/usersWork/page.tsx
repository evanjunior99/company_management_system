"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskDetailsPage: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get(`http://localhost:8000/api/auth/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const chartData = {
    labels: ["Completed", "In Progress", "Pending", "Overdue"],
    datasets: [
      {
        label: "Task Progress",
        data: user
          ? [user.completedTasks, user.inProgressTasks, user.pendingTasks, user.overdueTasks]
          : [0, 0, 0, 0],
        backgroundColor: ["#22c55e", "#facc15", "#3b82f6", "#ef4444"],
        hoverBackgroundColor: ["#16a34a", "#eab308", "#2563eb", "#dc2626"],
      },
    ],
  };

  return user ? (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img src={user.profilePicture} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-500 text-white rounded-md shadow">
          <h3>Total Tasks</h3>
          <p>{user.totalTasks}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-md shadow">
          <h3>Completed Tasks</h3>
          <p>{user.completedTasks}</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded-md shadow">
          <h3>Pending Tasks</h3>
          <p>{user.pendingTasks}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-md shadow">
          <h3>Overdue Tasks</h3>
          <p>{user.overdueTasks}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-md shadow">
        <h3 className="text-xl font-bold mb-4">Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="h-64">
            <h4 className="text-lg font-semibold text-center mb-2">Pie Chart</h4>
            <Pie data={chartData} />
          </div>
          {/* Doughnut Chart */}
          <div className="h-64">
            <h4 className="text-lg font-semibold text-center mb-2">Doughnut Chart</h4>
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskDetailsPage;
