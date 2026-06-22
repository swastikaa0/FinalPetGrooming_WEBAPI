"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/app/(auth)/_components/schema";

import { handleRegisterUser } from "@/lib/actions/auth-action";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const result = await handleRegisterUser(data);

        if (result.success) {
          router.push("/login");
        } else {
          setError(result.message || "Registration failed");
        }
      } catch (error: any) {
        setError(error?.message || "Registration failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl">

        {/* LEFT PANEL */}
        <div className="hidden md:flex md:w-[45%] relative flex-col min-h-[580px]">
          <div className="absolute inset-0">
            <img
              src="/Signin.png"
              alt="Professional groomer with dog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4a6741]/90 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-bold mb-1">Join the Family</h2>
            <p className="text-sm text-white/85 leading-snug">
              Create an account to manage your pet's beauty routine with ease.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-10 md:p-14 relative">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Let's get started with your profile
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

            {/* ERROR */}
            {error && (
              <div className="text-red-500 border border-red-500 p-2 rounded text-sm">
                {error}
              </div>
            )}

            {/* FULL NAME */}
<div>
  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
    Full Name
  </label>
  <input
    type="text"
    placeholder="John Doe"
    {...register("fullName")}
    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/20 focus:border-[#4a6741]"
  />
  {errors.fullName && (
    <p className="text-red-500 text-sm">
      {errors.fullName.message}
    </p>
  )}
</div>

            {/* USERNAME */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe"
                {...register("username")}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/20 focus:border-[#4a6741]"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/20 focus:border-[#4a6741]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD + CONFIRM */}
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/20 focus:border-[#4a6741]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                  Confirm
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/20 focus:border-[#4a6741]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#4a6741]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-[#4a6741] font-medium hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#4a6741] font-medium hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full py-3 bg-[#4a6741] text-white text-sm font-semibold rounded-lg hover:bg-[#3d5736] transition-colors disabled:opacity-50"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4a6741] font-semibold hover:underline cursor-pointer"
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}