import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileHeader";
import { CircularProgress } from "../components/CircularProgress";
import { HeatmapCell } from "../components/HeatmapCell";
import { useFirebase } from "../context/Firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading, updateProfile, user } = useFirebase();

  const [challengeAccepted, setChallengeAccepted] = useState(false);
  const [miniHeatmapData, setMiniHeatmapData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  const [recentBadge, setRecentBadge] = useState(null);

  const todayKey = new Date().toDateString();
  const alreadyCheckedInToday = (profile?.heatmap?.[todayKey] ?? 0) > 0;

  useEffect(() => {
    if (!loading && profile) {
      const today = new Date();

      // MINI HEATMAP (last 28 days)
      const heatmapData = Array.from({ length: 28 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const key = date.toDateString();

        return {
          date,
          level: profile.heatmap?.[key] ?? 0,
          co2Saved: profile.heatmapCo2?.[key] ?? 0
        };
      });

      setMiniHeatmapData(heatmapData.reverse());

      // STREAK calculation based on consecutive days with activity
      const allKeys = Object.keys(profile.heatmap || {}).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      let currentStreak = 0;
      let lastDate = null;

      allKeys.forEach((key) => {
        if ((profile.heatmap[key] ?? 0) > 0) {
          const date = new Date(key);
          if (!lastDate || (date - lastDate === 86400000)) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
          lastDate = date;
        }
      });

      setStreak(currentStreak);

      // DAILY SCORE
      const todayLevel = profile.heatmap?.[todayKey] ?? 0;
      setDailyScore(Math.min(todayLevel * 20, 100));

      // RECENT BADGE
      if (Array.isArray(profile.badges) && profile.badges.length > 0) {
        const latest = [...profile.badges].sort(
          (a, b) => new Date(b.dateUnlocked) - new Date(a.dateUnlocked)
        )[0];
        setRecentBadge(latest);
      } else {
        setRecentBadge(null);
      }
    }
  }, [loading, profile]);

  if (loading) return null;

  const handleDailyCheckIn = async () => {
    if (!alreadyCheckedInToday) {
      const updatedHeatmap = {
        ...profile.heatmap,
        [todayKey]: 1 // example level
      };
      const updatedCo2 = {
        ...profile.heatmapCo2,
        [todayKey]: 2.5 // example CO2 saved
      };

      await updateProfile(user.uid, {
        heatmap: updatedHeatmap,
        heatmapCo2: updatedCo2
      });
    }
  };

  const greenChallenge = {
    text: "Avoid single-use plastic containers for your lunch today."
  };

  const ecoTip = {
    text: "Using public transport twice this week saved approximately 4.5 kg CO₂."
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ProfileHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">

            {/* MAIN CTA: Start Check-In */}
            <button
              disabled={alreadyCheckedInToday}
              onClick={handleDailyCheckIn}
              className={`group w-full rounded-3xl p-8 sm:p-10 text-left
                ${alreadyCheckedInToday ? "bg-slate-300 cursor-not-allowed" : 'bg-gradient-to-br from-emerald-600 via-teal-500 to-emerald-700'}
                relative overflow-hidden shadow-xl shadow-emerald-200/50
                transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-300/50
                active:scale-[0.99]`}
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              <div className="relative z-10 flex flex-col gap-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live Tracker
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  How Green Was Your Day?
                </h1>
                <p className="text-emerald-50/90 text-base sm:text-lg max-w-xl font-medium">
                  Log today’s habits in under 30 seconds and instantly see your
                  carbon impact, streaks, and rewards.
                </p>
                <div className="flex items-center gap-3 text-base font-bold text-white mt-4">
                  <span className="bg-white text-emerald-700 px-6 py-2.5 rounded-full shadow-lg group-hover:translate-x-1 transition-transform">
                    {alreadyCheckedInToday ? "Today's Check-In Completed ✓" : "Start Check-In →"}
                  </span>
                </div>
              </div>
            </button>

            {/* SCORE + STREAK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Your Daily Score</h3>
                  <p className="text-sm text-slate-500 mt-1">Based on current tracked activities.</p>
                  <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    {dailyScore > 80 ? "Excellent!" : dailyScore > 0 ? "Good" : "No activity yet"}
                  </div>
                </div>
                <CircularProgress score={dailyScore} />
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex items-center gap-6">
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                  <span className="text-4xl">🔥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800">{streak} Days</h3>
                  <p className="text-sm font-medium text-slate-500">Green Streak</p>
                  <p className="text-xs text-orange-600 mt-2 font-bold uppercase tracking-wider">
                    Keep it alive today!
                  </p>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                <button
                  onClick={() => navigate("/profile")}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  View Full Impact →
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid grid-rows-4 grid-flow-col gap-2">
                  {miniHeatmapData.map((day, i) => (
                    <HeatmapCell key={i} day={day} />
                  ))}
                </div>
                <div className="flex-1 text-slate-500 text-sm italic">
                  {profile?.weeklySummary || "No recent activity."}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-8">

            {/* GREEN CHALLENGE */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8" />
              <div className="relative">
                <h3 className="text-lg font-bold text-slate-800">Today's Green Challenge</h3>
                <p className="text-slate-600 text-sm mt-3">{greenChallenge.text}</p>
                <button
                  onClick={() => setChallengeAccepted(!challengeAccepted)}
                  className={`mt-6 w-full py-3 rounded-2xl font-bold transition-all shadow-md active:scale-95 ${
                    challengeAccepted
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {challengeAccepted ? "✓ Challenge Accepted" : "Accept Challenge"}
                </button>
              </div>
            </div>

            {/* ECO TIP */}
            <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Insight of the Day
              </span>
              <p className="mt-4 text-lg font-medium">{ecoTip.text}</p>
              <p className="mt-4 text-xs text-slate-400">Updated {ecoTip.updated || "2h ago"}</p>
            </div>

            {/* RECENT MILESTONE */}
            {recentBadge && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  Recent Milestone
                </h3>
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-5xl">{recentBadge.icon}</span>
                </div>
                <h4 className="mt-6 text-lg font-bold text-slate-800">{recentBadge.name}</h4>
                <p className="text-slate-500 text-xs mt-1">{recentBadge.dateUnlocked}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
