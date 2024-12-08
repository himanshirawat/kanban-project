"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "./Modal";

const TaskCard = ({ task, setTasks, onDragStart }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState(null);

  const handleEdit = (task) => {
    setModalTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-300";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-green-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className={`p-4 border rounded-lg shadow-md ${getPriorityClass(
        task.priority
      )} transition-transform transform hover:scale-105`}
    >
      <h3 className="font-semibold text-blue-700">{task.title}</h3>
      <p className="text-gray-700 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">Priority: {task.priority}</p>

      <div className="mt-4 flex justify-between space-x-4">
        <button
          onClick={() => handleEdit(task)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setModalTask(null);
          }}
          setTasks={setTasks}
          taskToEdit={modalTask}
        />
      )}
    </div>
  );
};

export default TaskCard;
