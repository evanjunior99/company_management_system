'use client';

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
} from "chart.js";
import { Card } from "@/app/components/uid/card";
import { Loader2, CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

interface TaskStats {
  name: string;
  role: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  first_name?: string;
}

export default function UserDashboard({ userId }: { userId: string }) {
  const [user, setUser] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const userIdInt = parseInt(userId, 10);
        if (isNaN(userIdInt)) {
          throw new Error("Invalid user ID");
        }

        const response = await axios.get(
          `http://localhost:8000/api/auth/user/${userIdInt}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const chartData = useMemo(() => ({
    labels: ["Completed", "In Progress", "Pending", "Overdue"],
    datasets: [
      {
        label: "Task Progress",
        data: user
          ? [user.completedTasks, user.inProgressTasks, user.pendingTasks, user.overdueTasks]
          : [0, 0, 0, 0],
        backgroundColor: [
          "rgba(34, 197, 94, 0.9)",  // Green
          "rgba(250, 204, 21, 0.9)", // Yellow
          "rgba(59, 130, 246, 0.9)", // Blue
          "rgba(239, 68, 68, 0.9)",  // Red
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  }), [user]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
      },
    },
    cutout: '60%',
  }), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-lg border border-red-200">
          <AlertCircle className="h-6 w-6 mb-2 mx-auto" />
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="p-8 shadow-xl rounded-xl bg-white border-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src={`https://api.dicebear.com/7.x/avatars/svg?seed=${user.name}`}
                alt={`${user.name || user.first_name}'s profile`}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-lg text-gray-600 font-medium">{user.role}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <ListTodo className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-sm font-medium text-purple-900 mb-1">Total Tasks</h3>
                  <p className="text-3xl font-bold text-purple-700">{user.totalTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-900 mb-1">Completed</h3>
                  <p className="text-3xl font-bold text-green-700">{user.completedTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-1">Pending</h3>
                  <p className="text-3xl font-bold text-blue-700">{user.pendingTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-sm font-medium text-red-900 mb-1">Overdue</h3>
                  <p className="text-3xl font-bold text-red-700">{user.overdueTasks}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 shadow-lg rounded-xl bg-white border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Task Progress Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative h-[400px] flex flex-col items-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-6">Distribution</h4>
                <div className="w-full h-full flex items-center justify-center">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="relative h-[400px] flex flex-col items-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-6">Progress</h4>
                <div className="w-full h-full flex items-center justify-center">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}