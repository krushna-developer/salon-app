// src/components/ServicePicker.jsx

import React from "react";
import { currency } from "../utils/currency";

export default function ServicePicker({ services, selected, setSelected }) {
  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {(services || []).map((s) => (
        <label
          key={s.id || s.name}
          className="border rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        >
          <div>
            <div className="font-medium">{s.name}</div>
            <div className="text-xs text-gray-500">{s.durationMins || 30} mins</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold">{currency(s.price || 0)}</div>
            <input
              type="checkbox"
              checked={selected.includes(s.id || s.name)}
              onChange={() => toggle(s.id || s.name)}
            />
          </div>
        </label>
      ))}
    </div>
  );
}