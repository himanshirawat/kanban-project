'use client';
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { IoMdTime } from "react-icons/io";

export default function NavPanel({ userId, tasks, setTasks }) {
  const [currentTime, setCurrentTime] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (currentTime === null) return null; 

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDay = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
  });

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div className="flex gap-2 items-center">
      <IoMdTime size={22}/>
      <div>
        <div className="text-lg font-semibold">{formattedDay}</div>
        <div className="text-sm text-gray-600">
          {formattedDate} | {formattedTime}
        </div>
      </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>

      {isModalOpen && (
        <Modal
          tasks={tasks}
          setTasks={setTasks}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
