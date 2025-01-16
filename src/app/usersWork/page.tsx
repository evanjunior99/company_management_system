'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "../components/uid/card";
import { Loader2 } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function TaskDetailsPage({
  params
}: {
  params: { userId: string }
}) {
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
        const userIdInt = parseInt(params.userId, 10);
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
  }, [params.userId]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">User not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
            <Image
              src={`https://api.dicebear.com/7.x/avatars/svg?seed=${user.name}`}
              alt={`${user.name || user.first_name}'s profile`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-primary/10">
            <h3 className="text-sm font-medium mb-1">Total Tasks</h3>
            <p className="text-2xl font-bold">{user.totalTasks}</p>
          </Card>
          <Card className="p-4 bg-green-500/10">
            <h3 className="text-sm font-medium mb-1">Completed</h3>
            <p className="text-2xl font-bold">{user.completedTasks}</p>
          </Card>
          <Card className="p-4 bg-yellow-500/10">
            <h3 className="text-sm font-medium mb-1">Pending</h3>
            <p className="text-2xl font-bold">{user.pendingTasks}</p>
          </Card>
          <Card className="p-4 bg-red-500/10">
            <h3 className="text-sm font-medium mb-1">Overdue</h3>
            <p className="text-2xl font-bold">{user.overdueTasks}</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Task Progress Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square relative">
              <h4 className="text-lg font-semibold text-center mb-4">Distribution</h4>
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="aspect-square relative">
              <h4 className="text-lg font-semibold text-center mb-4">Progress</h4>
              <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}