// src/components/ReviewCard.jsx

import React from "react";
import { currency } from "../utils/currency";

export default function ReviewCard({ salon, date, time, services, selectedServiceIds, userName }) {
  const chosen = (services || []).filter((s) =>
    selectedServiceIds.includes(s.id || s.name)
  );
  const total = chosen.reduce((acc, s) => acc + (s.price || 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 mt-6">
      <div className="bg-green-50 border rounded-2xl p-5 shadow-sm">
        <h4 className="font-semibold text-lg">Review & Confirm</h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Salon</div>
            <div className="font-medium">{salon?.name}</div>
            <div className="text-sm text-gray-600">{salon?.location}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Date & Time</div>
            <div className="font-medium">
              {date || "—"} at {time || "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Customer</div>
            <div className="font-medium">{userName || "Guest"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-semibold">{currency(total)}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-1">Services</div>
          {chosen.length ? (
            <ul className="space-y-2">
              {chosen.map((s) => (
                <li
                  key={s.id || s.name}
                  className="flex items-center justify-between border rounded-xl p-3"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm">{currency(s.price || 0)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-sm">No services selected.</div>
          )}
        </div>
      </div>
    </div>
  );
}