"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Modal({
  onClose,
  userId,
  tasks,
  setTasks,
  taskToEdit,
}) {
  const isEditMode = !!taskToEdit;

  const [formData, setFormData] = useState({
    title: taskToEdit?.title || "",
    description: taskToEdit?.description || "",
    priority: taskToEdit?.priority || "Medium",
    status: taskToEdit?.status || "To Do",
    order: taskToEdit?.order || tasks.length + 1,
    userId: taskToEdit?.userId || userId,
    dueDate: taskToEdit?.dueDate
      ? new Date(taskToEdit.dueDate).toISOString().substring(0, 10)
      : "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
        alert("Due date must be in the future.");
        return;
      }
      console.log(formData.dueDate)
      if (isEditMode) {
        const response = await axios.put(
          `/api/tasks/${taskToEdit._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedTask = response.data;
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        console.log("Task updated:", updatedTask);
      } else {
        const response = await axios.post("/api/tasks", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newTask = response.data;
        setTasks((prevTasks) => [...prevTasks, newTask]);
        console.log("Task created:", newTask);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
