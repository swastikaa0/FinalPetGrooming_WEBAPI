// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { Eye, EyeOff, ArrowLeft, Lock, ShieldCheck, KeyRound } from "lucide-react";
// import { updateUser } from "@/lib/api/auth";
// import { useRouter } from "next/navigation";
// import { z } from "zod";

// const updatePasswordSchema = z
//   .object({
//     currentPassword: z.string().min(1, "Current password is required"),
//     newPassword: z.string().min(8, "New password must be at least 8 characters"),
//     confirmPassword: z.string().min(1, "Please confirm your new password"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

// export default function UpdatePasswordPage() {
//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<UpdatePasswordFormData>({
//     resolver: zodResolver(updatePasswordSchema),
//   });

//   const newPassword = watch("newPassword", "");

//   // Password strength checker
//   const getStrength = (pwd: string) => {
//     if (!pwd) return { score: 0, label: "", color: "" };
//     let score = 0;
//     if (pwd.length >= 8) score++;
//     if (/[A-Z]/.test(pwd)) score++;
//     if (/[0-9]/.test(pwd)) score++;
//     if (/[^A-Za-z0-9]/.test(pwd)) score++;
//     const map = [
//       { label: "Weak", color: "#ef4444" },
//       { label: "Fair", color: "#f97316" },
//       { label: "Good", color: "#eab308" },
//       { label: "Strong", color: "#22c55e" },
//       { label: "Very strong", color: "#16a34a" },
//     ];
//     return { score, ...map[score] };
//   };

//   const strength = getStrength(newPassword);

//   const onSubmit = async (data: UpdatePasswordFormData) => {
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const formData = new FormData();
//       formData.append("currentPassword", data.currentPassword);
//       formData.append("newPassword", data.newPassword);

//       const response = await updateUser(formData);
//       if (!response.success) throw new Error(response.message || "Password update failed");

//       reset();
//       setSuccessMessage("Password updated successfully");
//       toast.success("Password updated successfully");
//       router.refresh();
//     } catch (error: Error | any) {
//       toast.error(error.message || "Password update failed");
//       setError(error.message || "Password update failed");
//     }
//   };

//   const inputStyle = (hasError: boolean) => ({
//     width: "100%",
//     padding: "11px 44px 11px 14px",
//     borderRadius: "10px",
//     border: `1.5px solid ${hasError ? "#fca5a5" : "#e2e8f0"}`,
//     fontSize: "14px",
//     color: "#0f172a",
//     background: "#fafafa",
//     outline: "none",
//     transition: "border-color 0.15s, box-shadow 0.15s",
//     boxSizing: "border-box" as const,
//   });

//   const eyeBtn = {
//     position: "absolute" as const,
//     right: "14px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     padding: "0",
//     display: "flex",
//     alignItems: "center",
//     color: "#94a3b8",
//   };

//   return (
//     <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 16px" }}>

//       {/* Back button */}
//       <button
//         type="button"
//         onClick={() => router.push("/profile")}
//         style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: "0", marginBottom: "24px", fontWeight: 500, transition: "color 0.15s" }}
//         onMouseEnter={e => (e.currentTarget.style.color = "#0f172a")}
//         onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
//       >
//         <ArrowLeft size={15} />
//         Back to profile
//       </button>

//       {/* Page title */}
//       <div style={{ marginBottom: "24px" }}>
//         <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.4px", margin: 0 }}>
//           Password & security
//         </h1>
//         <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
//           Update your password to keep your account secure.
//         </p>
//       </div>

//       {/* Alerts */}
//       {error && (
//         <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#dc2626", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
//           <ShieldCheck size={14} /> {error}
//         </div>
//       )}
//       {successMessage && (
//         <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#16a34a", marginBottom: "16px" }}>
//           ✓ {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div style={{ background: "#ffffff", borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>

//           {/* Card header */}
//           <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "10px" }}>
//             <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <KeyRound size={15} color="#fff" />
//             </div>
//             <div>
//               <h2 style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a", margin: 0 }}>Change password</h2>
//               <p style={{ fontSize: "12px", color: "#94a3b8", margin: "1px 0 0" }}>Choose a strong password</p>
//             </div>
//           </div>

//           <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>

//             {/* Current Password */}
//             <div>
//               <label htmlFor="currentPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
//                 Current password
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   id="currentPassword"
//                   type={showCurrentPassword ? "text" : "password"}
//                   {...register("currentPassword")}
//                   placeholder="Enter current password"
//                   style={inputStyle(!!errors.currentPassword)}
//                   onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
//                   onBlur={e => { e.target.style.borderColor = errors.currentPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
//                 />
//                 <button type="button" style={eyeBtn} onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
//                   {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.currentPassword && (
//                 <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.currentPassword.message}</p>
//               )}
//             </div>

//             {/* Divider */}
//             <div style={{ height: "1px", background: "#f1f5f9" }} />

//             {/* New Password */}
//             <div>
//               <label htmlFor="newPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
//                 New password
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   id="newPassword"
//                   type={showNewPassword ? "text" : "password"}
//                   {...register("newPassword")}
//                   placeholder="At least 8 characters"
//                   style={inputStyle(!!errors.newPassword)}
//                   onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
//                   onBlur={e => { e.target.style.borderColor = errors.newPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
//                 />
//                 <button type="button" style={eyeBtn} onClick={() => setShowNewPassword(!showNewPassword)}>
//                   {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.newPassword && (
//                 <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.newPassword.message}</p>
//               )}

//               {/* Password strength bar */}
//               {newPassword.length > 0 && (
//                 <div style={{ marginTop: "10px" }}>
//                   <div style={{ display: "flex", gap: "4px", marginBottom: "5px" }}>
//                     {[0, 1, 2, 3].map((i) => (
//                       <div
//                         key={i}
//                         style={{
//                           flex: 1,
//                           height: "3px",
//                           borderRadius: "2px",
//                           background: i < strength.score ? strength.color : "#e2e8f0",
//                           transition: "background 0.3s",
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <p style={{ fontSize: "11px", color: strength.color, fontWeight: 500 }}>
//                     {strength.label}
//                     <span style={{ color: "#94a3b8", fontWeight: 400 }}>
//                       {" "}— use uppercase, numbers & symbols for a stronger password
//                     </span>
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
//                 Confirm new password
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   id="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   {...register("confirmPassword")}
//                   placeholder="Re-enter new password"
//                   style={inputStyle(!!errors.confirmPassword)}
//                   onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
//                   onBlur={e => { e.target.style.borderColor = errors.confirmPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
//                 />
//                 <button type="button" style={eyeBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                   {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             {/* Tips */}
//             {/* <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px 14px" }}>
//               <p style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" }}>
//                 Password tips
//               </p>
//               {[
//                 "At least 8 characters",
//                 "Mix uppercase and lowercase letters",
//                 "Include numbers and special characters",
//                 "Avoid using your name or email",
//               ].map((tip) => (
//                 <p key={tip} style={{ fontSize: "12px", color: "#64748b", margin: "3px 0", display: "flex", alignItems: "center", gap: "6px" }}>
//                   <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#cbd5e1", display: "inline-block", flexShrink: 0 }} />
//                   {tip}
//                 </p>
//               ))}
//             </div> */}

//           </div>

//           {/* Footer */}
//           <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", background: "#fafafa", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button
//               type="button"
//               onClick={() => reset()}
//               style={{ padding: "8px 20px", borderRadius: "20px", border: "1.5px solid #e2e8f0", background: "#ffffff", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer", transition: "all 0.15s" }}
//               onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
//               onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 20px", borderRadius: "20px", border: "none", background: isSubmitting ? "#7dd3fc" : "linear-gradient(135deg, #0369a1, #0ea5e9)", fontSize: "13px", fontWeight: 500, color: "#ffffff", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 1px 4px rgba(3,105,161,0.25)", transition: "opacity 0.15s" }}
//               onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.opacity = "0.9"; }}
//               onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
//             >
//               <Lock size={13} color="#fff" />
//               {isSubmitting ? "Updating…" : "Update password"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, ArrowLeft, Lock, ShieldCheck, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdatePasswordFormData, updatePasswordSchema } from "./schema";
import { handleUpdatePassword } from "@/lib/actions/auth-action";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword", "");

  const onSubmit = async (data: UpdatePasswordFormData) => {
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await handleUpdatePassword(data);
      if (!result.success) {
        throw new Error(result.message || "Password update failed");
      }

      reset();
      setSuccessMessage("Password updated successfully");
      toast.success("Password updated successfully");
      router.refresh();
    } catch (error: Error | any) {
      toast.error(error.message || "Password update failed");
      setError(error.message || "Password update failed");
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "11px 44px 11px 14px",
    borderRadius: "10px",
    border: `1.5px solid ${hasError ? "#fca5a5" : "#e2e8f0"}`,
    fontSize: "14px",
    color: "#0f172a",
    background: "#fafafa",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box" as const,
  });

  const eyeBtn = {
    position: "absolute" as const,
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    color: "#94a3b8",
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 16px" }}>

      {/* Back button */}
      <button
        type="button"
        onClick={() => router.push("/profile")}
        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: "0", marginBottom: "24px", fontWeight: 500, transition: "color 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#0f172a")}
        onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
      >
        <ArrowLeft size={15} />
        Back to profile
      </button>

      {/* Page title */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.4px", margin: 0 }}>
          Password & security
        </h1>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#dc2626", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={14} /> {error}
        </div>
      )}
      {successMessage && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#16a34a", marginBottom: "16px" }}>
          ✓ {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ background: "#ffffff", borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>

          {/* Card header */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyRound size={15} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a", margin: 0 }}>Change password</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "1px 0 0" }}>Choose a strong password</p>
            </div>
          </div>

          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Current password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  placeholder="Enter current password"
                  style={inputStyle(!!errors.currentPassword)}
                  onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.currentPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" style={eyeBtn} onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.currentPassword.message}</p>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#f1f5f9" }} />

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                New password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="At least 8 characters"
                  style={inputStyle(!!errors.newPassword)}
                  onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.newPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" style={eyeBtn} onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.newPassword.message}</p>
              )}

              {/* ✅ Only 8 character hint, no strength bar */}
              {newPassword.length > 0 && newPassword.length < 8 && (
                <p style={{ marginTop: "6px", fontSize: "12px", color: "#f97316" }}>
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Confirm new password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Re-enter new password"
                  style={inputStyle(!!errors.confirmPassword)}
                  onFocus={e => { e.target.style.borderColor = "#0ea5e9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.confirmPassword ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" style={eyeBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.confirmPassword.message}</p>
              )}
            </div>

          </div>

          {/* Footer */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", background: "#fafafa", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{ padding: "8px 20px", borderRadius: "20px", border: "1.5px solid #e2e8f0", background: "#ffffff", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 20px", borderRadius: "20px", border: "none", background: isSubmitting ? "#7dd3fc" : "linear-gradient(135deg, #0369a1, #0ea5e9)", fontSize: "13px", fontWeight: 500, color: "#ffffff", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 1px 4px rgba(3,105,161,0.25)", transition: "opacity 0.15s" }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              <Lock size={13} color="#fff" />
              {isSubmitting ? "Updating…" : "Update password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}