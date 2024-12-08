"use client";
import React, { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-menu") && showDropdown) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user && (
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User Menu"
          >
            {user.username[0].toUpperCase()}
          </button>

          {showDropdown && (
            <div className="dropdown-menu absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowProfileModal(true)}
              >
                <FiUser className="mr-2" /> User Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div>
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700">
                  Username : {user?.username}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-sm font-medium text-gray-700">
                  Email : {user?.email}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-sm font-medium text-green-700">
                  Verified User
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="mr-4 px-4 py-2 text-gray-600 bg-blue-100 rounded hover:bg-gray-200"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
