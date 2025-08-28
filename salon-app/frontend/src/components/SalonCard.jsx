// src/components/SalonCard.jsx

import React from "react";
import { motion} from "framer-motion";
export default function SalonCard({ salon, onSelect }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      className="bg-green-50 rounded-2xl shadow-sm hover:shadow-md border overflow-hidden"
    >
      <div className="relative">
        <img src={salon.image} alt={salon.name} className="w-full h-44 object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs shadow">
          ⭐ {salon.rating?.toFixed?.(1) ?? salon.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{salon.name}</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">{salon.location}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(salon.services?.slice?.(0, 3) || []).map((s) => (
            <span key={s.id || s.name} className="text-xs px-2 py-1 rounded-full bg-gray-100">
              {s.name}
            </span>
          ))}
          {salon.services?.length > 3 && (
            <span className="text-xs text-gray-500">+{salon.services.length - 3} more</span>
          )}
        </div>
        <button
          onClick={() => onSelect(salon)}
          className="mt-4 w-full py-2 rounded-xl bg-blue-400 text-white font-medium hover:bg-blue-700"
        >
          Select
        </button>
      </div>
    </motion.div>
  );
}