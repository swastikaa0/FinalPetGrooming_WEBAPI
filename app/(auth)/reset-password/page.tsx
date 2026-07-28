"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "../_components/schema";

import { handleResetPassword } from "@/lib/actions/auth-action";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("Current URL:", window.location.href);
  console.log("Token:", token);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // const onSubmit = async (data: ResetPasswordFormData) => {
  //    console.log("Submitted", data);

  //   try {
  //     if (!token) {
  //       toast.error("Invalid or expired reset link.");
  //       return;
  //     }

  //     setLoading(true);

  //     const response = await handleResetPassword(
  //       token,
  //       data.password,
  //       data.confirmPassword
  //     );

  //     if (response.success) {
  //       toast.success(response.message || "Password reset successfully.");

  //       reset();

  //       setTimeout(() => {
  //         router.push("/login");
  //       }, 1500);
  //     } else {
  //       toast.error(response.message || "Failed to reset password.");
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message || "Something went wrong.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data: ResetPasswordFormData) => {
  try {
    if (!token) {
      toast.error("Invalid or expired reset link.");
      return;
    }

    setLoading(true);

    const response = await handleResetPassword(
      token,
      data.password,
      data.confirmPassword
    );

    if (response.success) {
      toast.success("Password has been reset successfully!");

      reset();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(response.message || "Failed to reset password.");
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
      Reset Password
    </h1>

    <p className="text-center text-gray-500 mt-2 mb-8">
      Enter your new password below.
    </p>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          New Password
        </label>

        <input
          type="password"
          {...register("password")}
          placeholder="Enter new password"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30
          focus:border-[#4a6741]"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          Confirm Password
        </label>

        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm new password"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30
          focus:border-[#4a6741]"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
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
        {loading ? "Resetting..." : "Reset Password"}
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
</div>
  );
}