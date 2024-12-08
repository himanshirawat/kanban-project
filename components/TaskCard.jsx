"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "./Modal";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDateRange, MdOutlineDelete } from "react-icons/md";

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
        return "border-4 border-red-300";
      case "Medium":
        return "border-4 border-yellow-300";
      case "Low":
        return "border-4 border-green-300";
      default:
        return "border-4 border-gray-300";
    }
  };
  console.log(task);
  return (
    <>
      <div
        draggable
        onDragStart={(e) => onDragStart(e, task)}
        className={`p-4 border rounded-lg  bg-white shadow-xl ${getPriorityClass(
          task.priority
        )} transition-transform transform hover:scale-105`}
      >
        <div className="flex justify-between">
          <h3 className="font-semibold text-blue-700">{task.title}</h3>
          <div className="font-semibold text-blue-700 flex items-center">
            {" "}
            <MdOutlineDateRange size={22} />
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </div>
        </div>
        <p className="text-gray-700 mt-2">{task.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 ">Priority: {task.priority}</p>
          <div className=" text-right space-x-4">
            <button onClick={() => handleEdit(task)}>
              <CiEdit size={22} />
            </button>
            <button onClick={() => handleDelete(task._id)}>
              <MdOutlineDelete size={22} />
            </button>
          </div>
        </div>
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
    </>
  );
};

export default TaskCard;
