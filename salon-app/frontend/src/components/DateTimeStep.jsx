// src/components/DateTimeStep.jsx

import React from "react";
import ServicePicker from "./ServicePicker";

export default function DateTimeStep({
  date,
  setDate,
  time,
  setTime,
  services,
  selectedServices,
  setSelectedServices,
}) {
  return (
    <div id="booking" className="max-w-3xl mx-auto px-4 mt-6">
      <div className="bg-green-50 border rounded-2xl p-5 shadow-sm">
        <h4 className="font-semibold text-lg">Select Date & Time</h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="date"
            className="px-3 py-2 rounded-xl border"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="px-3 py-2 rounded-xl border"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <h5 className="font-medium">Select Services</h5>
          <ServicePicker
            services={services}
            selected={selectedServices}
            setSelected={setSelectedServices}
          />
        </div>
      </div>
    </div>
  );
}