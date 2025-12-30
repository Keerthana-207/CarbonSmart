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
        const key = date.toDateString(); // Use same format as stored in profile

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

  // Calculate streak based on consecutive days with level > 0
  const streak = (() => {
    const allDays = Object.keys(profile?.heatmap || {})
      .map((k) => new Date(k))
      .sort((a, b) => a - b);

    let maxStreak = 0;
    let currentStreak = 0;
    let yesterday = null;

    for (let day of allDays) {
      if (profile.heatmap[day.toDateString()] > 0) {
        if (!yesterday || (day - yesterday === 86400000)) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
      yesterday = day;
    }

    return maxStreak;
  })();

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
          <strong>{totalCO2.toFixed(1)}</strong> kg CO₂ saved
        </span>
        <span>
          <strong>{streak}</strong> day streak
        </span>
      </div>
    </div>
  );
};

