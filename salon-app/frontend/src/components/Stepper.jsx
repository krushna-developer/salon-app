// src/components/Stepper.jsx

import React from "react";

export default function Stepper({ step }) {
  const items = ["Choose Salon", "Select Date & Time", "Review", "Payment"];
  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-4 gap-2">
        {items.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm ${
                i <= step ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </div>
            <div
              className={`text-xs sm:text-sm ${
                i <= step ? "text-gray-400 font-bold" : "text-gray-400 font-bold"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}