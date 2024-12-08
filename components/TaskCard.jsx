import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
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
    <li
      key={task._id}
      className={`p-4 border rounded-lg shadow-md ${getPriorityClass(task.priority)} transition-transform transform hover:scale-105`}
    >
      <h3 className="font-semibold text-blue-700">{task.title}</h3>
      <p className="text-gray-700 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">Priority: {task.priority}</p>

      <div className="mt-4 flex justify-between space-x-4">
        <button
          onClick={() => onEdit(task)} 
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)} 
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
