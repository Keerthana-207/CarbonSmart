export const badges = [
  {
    id: "first_checkin",
    name: "First Step",
    icon: "🌱",
    color: "bg-emerald-100",
    condition: (profile) => Object.keys(profile?.heatmap || {}).length >= 1
  },
  {
    id: "streak_7",
    name: "7-Day Streak",
    icon: "🔥",
    color: "bg-orange-200",
    condition: (profile) => profile?.streak >= 7
  },
  {
    id: "streak_30",
    name: "30-Day Streak",
    icon: "🏆",
    color: "bg-yellow-200",
    condition: (profile) => profile?.streak >= 30
  },
  {
    id: "co2_100",
    name: "100kg Saved",
    icon: "🌍",
    color: "bg-blue-200",
    condition: (profile) =>
      Object.values(profile?.heatmapCo2 || {}).reduce((s, v) => s + v, 0) >= 100
  }
];

