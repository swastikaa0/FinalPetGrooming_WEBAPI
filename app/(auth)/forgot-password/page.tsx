"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import { handleForgotPassword } from "@/lib/actions/auth-action";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "../_components/schema";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      const response = await handleForgotPassword(data.email);

      if (response.success) {
        toast.success(response.message || "Password reset link sent.");
        reset();
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">

    <h1 className="text-3xl font-bold text-center text-[#4a6741]">
      Forgot Password
    </h1>

    <p className="text-center text-gray-500 mt-2 mb-8">
      Enter your email address and we'll send you a password reset link.
    </p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          Email Address
        </label>

        <input
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30
          focus:border-[#4a6741]"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-[#4a6741]
        hover:bg-[#3d5736]
        text-white font-semibold transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

    </form>

    <div className="mt-8 text-center">
      <Link
        href="/login"
        className="text-[#4a6741] font-semibold hover:underline"
      >
        Back to Login
      </Link>
    </div>

  </div>
</div>)
}