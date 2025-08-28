// src/components/SearchBar.jsx

import React from "react";

export default function SearchBar({ query, setQuery, city, setCity, onlyTopRated, setOnlyTopRated }) {
  return (
    <div className="max-w-6xl mx-auto px-9 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search salons or services..."
          className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City / Area"
          className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center gap-2 px-4 py-3 rounded-2xl border cursor-pointer">
          <input
            type="checkbox"
            checked={!!onlyTopRated}
            onChange={(e) => setOnlyTopRated(e.target.checked)}
          />
          <span className="text-sm">4★ and above</span>
        </label>
      </div>
    </div>
  );
}