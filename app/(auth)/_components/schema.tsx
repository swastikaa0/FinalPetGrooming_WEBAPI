import { z } from "zod";

export const registerSchema = z.object({
    email: z.email("Invalid email address"),
    fullName: z.string("Fullname must be string")
        .min(2, "Full name must be at least 2 characters long"),
    username: z.string("Username must be string")
        .min(3, "Username must be at least 3 characters long"),
    password: z.string("Password must be string")
        .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string("Confirm Password must be string")
        .min(6, "Confirm Password must be at least 6 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Password must be string")
        .min(6, "Password must be at least 6 characters long")
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<
    typeof forgotPasswordSchema
>;

export const resetPasswordSchema = z.object({
    password: z.string()
        .min(6, "Password must be at least 6 characters long"),

    confirmPassword: z.string()
        .min(6, "Confirm Password must be at least 6 characters long"),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type ResetPasswordFormData = z.infer<
    typeof resetPasswordSchema
>;