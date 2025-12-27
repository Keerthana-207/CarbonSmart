import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { FcGoogle } from "react-icons/fc";

const Logo = () => {
  const navigate = useNavigate();
  return (
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
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8Z" />
          <path d="M13 20c0-2.68-1.34-5.34-4-8" />
        </svg>
      </div>
      <span className="text-xl font-black bg-clip-text text-white bg-gradient-to-r from-emerald-700 to-teal-600">
        CarbonSmart
      </span>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, signinUserWithEmailAndPassword, signupWithGoogle } = useFirebase();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen font-sans text-slate-900 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src="/auth-bg.png" alt="Login background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-emerald-900/40" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl p-8 bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Logo />
          </div>

          <h2 className="text-xl font-semibold text-center text-white mb-6">
            Sign in to your account
          </h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await signinUserWithEmailAndPassword(email, password);
                // redirect handled by useEffect
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl px-4 py-3 bg-white/15 text-white border border-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl px-4 py-3 bg-white/15 text-white border border-white/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" 
              className="
                mt-4 rounded-xl px-4 py-3
                font-semibold text-white
                bg-emerald-600
                relative overflow-hidden
                transition-all duration-300

                hover:bg-emerald-500
                hover:shadow-[0_0_30px_rgba(16,185,129,0.9)]
                active:scale-95
              ">
              Sign In
            </button>
          </form>

          <button
            type="button"
            onClick={signupWithGoogle}
            className="mt-4 w-full rounded-xl px-4 py-3 font-semibold bg-white"
          >
            <div className="flex gap-4 justify-center items-center">
              <FcGoogle className="text-2xl" />
              <span className="text-sm">Continue with Google</span>
            </div>
          </button>

          <p className="mt-6 text-center text-sm text-white/80">
            Don’t have an account?{" "}
            <Link to="/register" className="text-emerald-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

