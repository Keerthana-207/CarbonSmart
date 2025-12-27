import React, { useMemo } from "react";
import { HeatmapCell } from "./HeatmapCell";
import { useFirebase } from "../context/Firebase";

export const ImpactHeatmap = () => {
  const { profile } = useFirebase();
  const currentYear = new Date().getFullYear();

  const data = useMemo(() => {
    const months = [];
    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    for (let m = 0; m < 12; m++) {
      const days = [];
      const numDays = new Date(currentYear, m + 1, 0).getDate();

      for (let d = 1; d <= numDays; d++) {
        const date = new Date(currentYear, m, d);
        const key = date.toDateString();

        days.push({
          date,
          level: profile?.heatmap?.[key] ?? 0,
          co2Saved: profile?.heatmapCo2?.[key] ?? 0
        });
      }

      months.push({ name: monthNames[m], days });
    }

    return months;
  }, [profile, currentYear]);

  const totalCO2 = Object.values(profile?.heatmapCo2 || {}).reduce(
    (sum, v) => sum + v,
    0
  );

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="font-bold mb-1">Your Carbon Impact Activity</h3>
      <p className="text-xs text-slate-500 mb-6">
        Activity for {currentYear}
      </p>

      <div className="flex overflow-x-auto">
        {data.map((month) => (
          <div key={month.name} className="px-2">
            <span className="text-[10px] text-slate-400">
              {month.name}
            </span>
            <div className="grid grid-rows-7 grid-flow-col gap-1 mt-2">
              {month.days.map((day, i) => (
                <HeatmapCell key={i} day={day} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-6 text-xs text-slate-600">
        <span>
          <strong>{totalCO2.toFixed(1)} kg</strong> CO₂ saved
        </span>
        <span>
          <strong>{profile?.streak ?? 0}</strong> day streak
        </span>
      </div>
    </div>
  );
};
