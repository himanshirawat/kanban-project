'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation'; // Import to get the current route

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Check if user is logged in
  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md px-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">Kanban Project</h1>
        </Link>
        <nav className="space-x-4">
          {/* Show Register and Login buttons only on home route and when not logged in */}
          {!isLoggedIn && pathname === '/' && (
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

          {isLoggedIn && pathname === '/' && (
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
