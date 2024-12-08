"use client";
import axios from "axios";
import React, { useState } from "react";
import Filter from "./Filter";
import TaskCard from "./TaskCard";
import Cookies from "js-cookie";
import { IoFilterOutline } from "react-icons/io5";

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

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id);
  };


  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  
    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `/api/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Task status updated in the database");
      } else {
        console.error("Failed to update task in the database");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("An error occurred while updating the task status.");
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div
          key={status}
          className={`p-4 border rounded shadow-sm flex flex-col ${getStatusClass(
            status
          )}`}
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          <div
            className={`relative flex items-center justify-between p-2 text-lg font-semibold`}
          >
            <span>{status}</span>
            <button
              onClick={() => toggleDropdown(status)}
              className="px-3 py-1 text-sm rounded flex items-center gap-2"
            >
              {filters[status]} <IoFilterOutline />
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
                setTasks={setTasks}
                onDragStart={(e) => handleDragStart(e, task)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
