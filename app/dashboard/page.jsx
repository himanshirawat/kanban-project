"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingIndicator } from "@/utils/LoadingIndicator";
import { ErrorIndicator } from "@/utils/ErrorIndicator";
import TaskBoard from "@/components/TaskBoard";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const userResponse = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        setUser(userData);
        console.log(userData);

        if (userData.tasks && userData.tasks.length > 0) {
          setTasks(userData.tasks);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  return (
    <div>
      <LoadingIndicator isLoading={isLoading} message="Fetching data..." />
      <ErrorIndicator error={error} />
      <div className="p-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {user && (
          <div>
            <p className="text-lg">Welcome, {user?.username}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>
        )}
        <TaskBoard tasks={tasks}  setTasks={setTasks}/>
      </div>
    </div>
  );
}
