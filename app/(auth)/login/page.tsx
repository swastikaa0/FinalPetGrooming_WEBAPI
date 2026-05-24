"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl">
        {/* Left Panel - Image */}
        <div className="hidden md:flex md:w-[45%] relative flex-col min-h-[580px]">
          <div className="absolute inset-0">
            <img
              src="/Login.png"
              alt="Happy dogs"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4a6741]/90 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-bold mb-1">Pets Co.</h2>
            <p className="text-sm text-white/85 leading-snug">
              Professional grooming that feels like a warm hug for your best friend.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-10 md:p-14 relative">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-500">Sign in to book your pet's next spa day.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500 hover:text-[#4a6741]">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#4a6741]"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#4a6741] text-white text-sm font-semibold rounded-lg hover:bg-[#3d5736] transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#4a6741] font-semibold hover:underline cursor-pointer">
              Join the family
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}