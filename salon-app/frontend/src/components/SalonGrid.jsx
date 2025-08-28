// src/components/SalonGrid.jsx

import React from "react";
import SalonCard from "./SalonCard";

export default function SalonGrid({ salons, onSelect }) {
  return (
    <div id="salons" className="max-w-6xl mx-auto px-4 mt-6">
      {salons?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {salons.map((s) => (
            <SalonCard key={s.id} salon={s} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-16">
          No salons found. Adjust filters or check your API.
        </div>
      )}
    </div>
  );
}