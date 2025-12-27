import React from "react";

export const CircularProgress = ({
  score,
  size = 120,
  strokeWidth = 10,
  label = "Score"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return "#10b981";
    if (s >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-2xl font-bold text-slate-800">{score}</div>
        <div className="text-[10px] uppercase font-bold text-slate-400">{label}</div>
      </div>
    </div>
  );
};
