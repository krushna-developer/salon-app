// src/components/TopBar.jsx

import React from "react";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-black-500 textborder-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner">
            <img
              src="../src/images/sallon.jpg"
              alt="Salon Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <span className="font-semibold text-lg">SalonBook</span>
        </div>
        <div className="flex items-center gap-3">
          <a className="font-bold text-sm text-gray-700 hover:text-gray-700" href="#">
            Salons
          </a>
          <a className="font-bold text-sm text-gray-700 hover:text-gray-700" href="#">
            About
          </a>
          <a className="font-bold text-sm text-gray-700 hover:text-gray-700" href="#">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}