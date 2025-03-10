import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white font-semibold text-xl">
          <a href="/">Lead Table</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <a 
              href="/" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Lead Table
            </a>
          </li>
          <li>
            <a 
              href="/addlead" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Add Lead
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
