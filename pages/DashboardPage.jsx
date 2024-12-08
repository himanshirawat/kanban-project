"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingIndicator } from "@/utils/LoadingIndicator";
import { ErrorIndicator } from "@/utils/ErrorIndicator";
import TaskBoard from "@/components/TaskBoard";
import NavPanel from "@/components/NavPanel";
import Navbar from "@/components/Navbar";

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
        <Navbar user={user} />
        <NavPanel userId={user?._id} tasks={tasks} setTasks={setTasks} />
        <TaskBoard tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}
