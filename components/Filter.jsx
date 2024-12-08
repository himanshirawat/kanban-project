import React from "react";

export default function Filter({ status, selected, onChange }) {
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="absolute right-0 z-10 top-10 bg-white border rounded shadow-lg w-32">
      {priorities.map((priority) => (
        <div
          key={priority}
          onClick={() => onChange(priority)}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            selected === priority ? "font-bold text-blue-500" : ""
          }`}
        >
          {priority}
        </div>
      ))}
    </div>
  );
}
