import React, { useState } from "react";

export const HeatmapCell = ({ day }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Colors for activity levels 0-4
  const colors = [
    "bg-slate-100",   // 0 - no activity
    "bg-emerald-100", // 1
    "bg-emerald-300", // 2
    "bg-emerald-500", // 3
    "bg-emerald-700"  // 4 - high activity
  ];

  const level = Math.min(Math.max(day.level ?? 0, 0), 4);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`w-3 h-3 rounded-sm cursor-pointer hover:scale-125 transition ${colors[level]}`}
      />

      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 text-white px-3 py-2 rounded shadow-lg whitespace-nowrap z-10">
          <div className="font-bold">
            {day.co2Saved?.toFixed(1) ?? 0} kg CO₂
          </div>
          <div className="mt-1 text-[10px]">{day.date.toDateString()}</div>
        </div>
      )}
    </div>
  );
};
