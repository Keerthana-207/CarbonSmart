import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export const ProfileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, logout } = useFirebase();

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8Z" />
                <path d="M13 20c0-2.68-1.34-5.34-4-8" />
              </svg>
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
              CarbonSmart
            </span>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-sm font-bold transition-all ${
                isActive("/dashboard")
                  ? "text-emerald-600 scale-105"
                  : "text-slate-500 hover:text-emerald-500"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className={`text-sm font-bold transition-all ${
                isActive("/profile")
                  ? "text-emerald-600 scale-105"
                  : "text-slate-500 hover:text-emerald-500"
              }`}
            >
              My Impact
            </button>

            <button
              onClick={() => navigate("/daily-checkin")}
              className={`text-sm font-bold transition-all ${
                isActive("/daily-checkin")
                  ? "text-emerald-600 scale-105"
                  : "text-slate-500 hover:text-emerald-500"
              }`}
            >
              Actions
            </button>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>

            {/* AVATAR */}
            <div
              className="w-9 h-9 rounded-xl overflow-hidden border-2 border-slate-200 cursor-pointer hover:border-emerald-500 transition-all"
              onClick={() => navigate("/profile")}
            >
              <img
                src={
                  profile?.avatar ||
                  "https://ui-avatars.com/api/?name=User&background=10b981&color=fff"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
