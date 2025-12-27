import React from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useFirebase();

  return (
    <nav className="max-w-8xl mx-auto px-6 py-6 flex justify-between items-center">

      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate("/")}
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

      {/* ACTIONS */}
      <div className="flex items-center gap-5">
        {user ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
          >
            Dashboard
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-600 text-slate-600 hover:text-emerald-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
