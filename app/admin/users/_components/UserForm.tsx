"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createUserSchema } from "./schema";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

const fieldClass =
    "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-on-dark";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";
const errClass = "mt-1 block text-sm text-m-red";

export default function UserForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        resolver: zodResolver(createUserSchema),
    });

    const onSubmit = (data: any) => {
        setError("");
        startTransition(async () => {
            console.log("Submitting data:", data); // Log the form data for debugging
            try {
                let result = await handleCreateUser({
                    fullName: data.fullName,
                    
                    email: data.email,
                    username: data.username,
                    role: data.role,
                    password: data.password,
                });
                if (!result.success) throw new Error(result.message);
                toast.success("User created successfully");
                router.push("/admin/users");
                router.refresh();
            } catch (err: any) {
                toast.error(err?.message);
                setError(err?.message || "Something went wrong");
            }
        });
    };

    return (
    <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            <div className="mb-5">
                <label className={labelClass}>Email</label>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className={`${fieldClass} ${
                        errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                />
                {errors.email && (
                    <span className="mt-1 block text-sm font-medium text-red-600">
                        {errors.email.message as string}
                    </span>
                )}
            </div>

            <div className="mb-5">
                <label className={labelClass}>Full Name</label>
                <input
                    type="text"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className={`${fieldClass} ${
                        errors.fullName ? "border-red-500 focus:border-red-500" : ""
                    }`}
                />
                {errors.fullName && (
                    <span className="mt-1 block text-sm font-medium text-red-600">
                        {errors.fullName.message as string}
                    </span>
                )}
            </div>

            <div className="mb-5">
                <label className={labelClass}>Username</label>
                <input
                    type="text"
                    {...register("username")}
                    placeholder="johndoe"
                    className={`${fieldClass} ${
                        errors.username ? "border-red-500 focus:border-red-500" : ""
                    }`}
                />
                {errors.username && (
                    <span className="mt-1 block text-sm font-medium text-red-600">
                        {errors.username.message as string}
                    </span>
                )}
            </div>

            <div className="mb-5">
                <label className={labelClass}>Role</label>
                <select
                    {...register("role")}
                    className={`${fieldClass} ${
                        errors.role ? "border-red-500 focus:border-red-500" : ""
                    }`}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && (
                    <span className="mt-1 block text-sm font-medium text-red-600">
                        {errors.role.message as string}
                    </span>
                )}
            </div>

            <div className="mb-6">
                <label className={labelClass}>Password</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`${fieldClass} ${
                        errors.password ? "border-red-500 focus:border-red-500" : ""
                    }`}
                />
                {errors.password && (
                    <span className="mt-1 block text-sm font-medium text-red-600">
                        {errors.password.message as string}
                    </span>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#4F6F52] text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#3f5a42] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? "Creating User..." : "Create User"}
            </button>
        </form>
    </div>
);
}