'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from 'next/link';

const UsersToAssignTask: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("http://localhost:8000/api/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data); // Debug response
          setUsers(response.data.users || []); // Adjust based on response
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAssignTask = (userId: number) => {
    router.push(`/usersWork/`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
      <div className="grid grid-cols-1 gap-4">
        {users.length === 0 ? (
          <p>No users found or failed to fetch users.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow"
            >
              <div className="flex items-center">
                <img
                  src="/evan.jpg"
                  alt={`${user.name || user.first_name}'s profile`}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="font-medium">{user.name || user.first_name}</span>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => handleAssignTask(user.id)}
              >
                <Link href="/usersWork" className="text-white">
                    Add New Task
                </Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersToAssignTask;
