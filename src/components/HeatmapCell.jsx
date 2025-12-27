import React, { useState } from "react";

export const HeatmapCell = ({ day }) => {
  const [show, setShow] = useState(false);

  const colors = [
    "bg-slate-100",
    "bg-emerald-100",
    "bg-emerald-300",
    "bg-emerald-500",
    "bg-emerald-700"
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        className={`w-3 h-3 rounded-sm cursor-pointer hover:scale-125 transition ${colors[day.level]}`}
      />

      {show && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 text-white px-3 py-2 rounded shadow-lg whitespace-nowrap z-10">
          <div className="font-bold">{day.co2Saved.toFixed(1)} kg CO₂</div>
          <div className="mt-1 text-[10px]">{day.date.toDateString()}</div>
        </div>
      )}
    </div>
  );
};
