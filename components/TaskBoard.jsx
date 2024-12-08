"use client";
import React, { useState } from "react";
import Filter from "./Filter";
import TaskCard from "./TaskCard";
import Cookies from "js-cookie";
import axios from "axios";

export default function TaskBoard({ tasks, setTasks }) {
  const [filters, setFilters] = useState({
    "To Do": "All",
    "In Progress": "All",
    Done: "All",
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    "To Do": false,
    "In Progress": false,
    Done: false,
  });
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (acc[task.status]) {
        acc[task.status].push(task);
      }
      return acc;
    },
    { "To Do": [], "In Progress": [], Done: [] }
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "To Do":
        return "bg-yellow-50";
      case "In Progress":
        return "bg-blue-50";
      case "Done":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  const filterTasks = (tasks, priority) => {
    if (priority === "All") return tasks;
    return tasks.filter((task) => task.priority === priority);
  };

  const toggleDropdown = (status) => {
    setIsDropdownVisible((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const token = Cookies.get("token"); 
      const response = await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        alert("Task deleted successfully.");
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };


  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div
          key={status}
          className="p-4 border rounded shadow-sm flex flex-col"
        >
          <div
            className={`relative flex items-center justify-between p-2 text-lg font-semibold ${getStatusClass(
              status
            )}`}
          >
            <span>{status}</span>
            <button
              onClick={() => toggleDropdown(status)}
              className="px-3 py-1 text-sm bg-gray-200 rounded"
            >
              {filters[status]} ▼
            </button>
            {isDropdownVisible[status] && (
              <Filter
                status={status}
                selected={filters[status]}
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, [status]: value }));
                  toggleDropdown(status);
                }}
              />
            )}
          </div>
          <ul className="mt-2 space-y-2">
            {filterTasks(tasks, filters[status]).map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
