"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Kanban Project</h1>
        </Link>
        <nav className="space-x-4">
          {!isLoggedIn && (
            <>
              <Link
                href="/register"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-200"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-200"
              >
                Login
              </Link>
            </>
          )}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-200"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
