// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import { Camera, LogOut, KeyRound } from "lucide-react";
// import { updateUser } from "@/lib/api/auth";
// import { updateProfileSchema, UpdateProfileFormData } from "./schema";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function UpdateForm({ user }: { user: any }) {
//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<UpdateProfileFormData>({
//     resolver: zodResolver(updateProfileSchema),
//     values: {
//       fullName: user?.fullName || "",
//       username: user?.username || "",
//       email: user?.email || "",
//     },
//   });

//   const handleImageChange = (
//     file: File | undefined,
//     onChange: (file: File | undefined) => void
//   ) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImage(null);
//     }
//     onChange(file);
//   };

//   const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
//     setPreviewImage(null);
//     onChange?.(undefined);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleLogout = () => {
//     // replace with your actual logout logic / action
//     router.push("/logout");
//   };

//   const onSubmit = async (data: UpdateProfileFormData) => {
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const formData = new FormData();
//       if (data.fullName) formData.append("fullName", data.fullName);
//       if (data.username) formData.append("username", data.username);
//       if (data.email) formData.append("email", data.email);
//       if (data.profileImage) formData.append("profileImage", data.profileImage);

//       const response = await updateUser(formData);

//       if (!response.success) {
//         throw new Error(response.message || "Update profile failed");
//       }

//       handleDismissImage();
//       setSuccessMessage("Profile updated successfully");
//       toast.success("Profile updated successfully");
//       router.refresh();
//     } catch (error: Error | any) {
//       toast.error(error.message || "Profile update failed");
//       setError(error.message || "Profile update failed");
//     }
//   };

//   const currentImageSrc = previewImage
//     ? previewImage
//     : user?.profileImage
//     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
//     : null;

//   return (
//     <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

//       {/* ── Sidebar ── */}
//       <div className="space-y-6">
//         <div className="rounded-2xl border bg-white p-6">
//           <div className="flex flex-col items-center">
//             {currentImageSrc ? (
//               <img
//                 src={currentImageSrc}
//                 alt="Profile"
//                 className="h-24 w-24 rounded-full object-cover"
//               />
//             ) : (
//               <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
//                 <span className="text-gray-500 text-sm">No Image</span>
//               </div>
//             )}
//             <h3 className="mt-4 font-semibold">{user?.fullName || "—"}</h3>
//             <p className="text-sm text-gray-500">{user?.email || "—"}</p>
//           </div>

//           <div className="mt-6 space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Total Bookings</span>
//               <span className="font-medium">{user?.totalBookings ?? 0}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Pets Registered</span>
//               <span className="font-medium">{user?.petsRegistered ?? 0}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Upcoming</span>
//               <span className="font-medium">{user?.upcomingBookings ?? 0}</span>
//             </div>
//           </div>

//           {/* ── Sidebar Actions ── */}
//           <div className="mt-6 space-y-2 border-t pt-6">
//             <Link
//               href="/password"
//               className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
//             >
//               <KeyRound size={16} />
//               Update Password
//             </Link>
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Main Content ── */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//         {error && (
//           <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
//             {error}
//           </p>
//         )}
//         {successMessage && (
//           <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
//             {successMessage}
//           </p>
//         )}

//         {/* Photo Upload Card */}
//         <div className="rounded-2xl border bg-white">
//           <div className="border-b px-6 py-4">
//             <h2 className="font-semibold">Profile Photo</h2>
//           </div>

//           <div className="p-6">
//             <div className="grid gap-6 md:grid-cols-[120px_1fr]">

//               <div className="relative h-28 w-28">
//                 {currentImageSrc ? (
//                   <img
//                     src={currentImageSrc}
//                     alt="Current"
//                     className="h-28 w-28 rounded-xl object-cover"
//                   />
//                 ) : (
//                   <div className="h-28 w-28 rounded-xl bg-gray-200 flex items-center justify-center">
//                     <Camera className="h-6 w-6 text-gray-400" />
//                   </div>
//                 )}

//                 {previewImage && (
//                   <Controller
//                     name="profileImage"
//                     control={control}
//                     render={({ field: { onChange } }) => (
//                       <button
//                         type="button"
//                         onClick={() => handleDismissImage(onChange)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   />
//                 )}
//               </div>

//               <Controller
//                 name="profileImage"
//                 control={control}
//                 render={({ field: { onChange } }) => (
//                   <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed hover:border-green-500 transition-colors">
//                     <Camera className="mb-3 h-6 w-6 text-gray-400" />
//                     <p className="text-sm text-gray-500">Drag and drop your photo here</p>
//                     <span className="mt-3 rounded-full bg-green-700 px-4 py-2 text-sm text-white">
//                       Choose Image
//                     </span>
//                     {errors.profileImage && (
//                       <p className="mt-2 text-xs text-red-500">{errors.profileImage.message}</p>
//                     )}
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       className="hidden"
//                       accept=".jpg,.jpeg,.png,.webp"
//                       onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
//                     />
//                   </label>
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Personal Information Card */}
//         <div className="rounded-2xl border bg-white">
//           <div className="border-b px-6 py-4">
//             <h2 className="font-semibold">Personal Information</h2>
//           </div>

//           <div className="grid gap-4 p-6 md:grid-cols-2">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium mb-1" htmlFor="fullName">
//                 Full Name
//               </label>
//               <input
//                 id="fullName"
//                 {...register("fullName")}
//                 className="mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="username">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 {...register("username")}
//                 className="mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               {errors.username && (
//                 <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="email">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 {...register("email")}
//                 className="mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 px-6 pb-6">
//             <button
//               type="button"
//               onClick={() => reset()}
//               className="rounded-full border px-6 py-2 text-sm hover:bg-gray-50"
//             >
//               Reset Changes
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="rounded-full bg-green-700 px-6 py-2 text-sm text-white hover:bg-green-800 disabled:opacity-50"
//             >
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Camera, LogOut, KeyRound, Upload, X, User, Mail, AtSign, Bell, Shield, Pencil, Check } from "lucide-react";
// import { updateUser } from "@/lib/api/auth";
import { updateProfileSchema, UpdateProfileFormData } from "./schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { handleUpdateUser } from "@/lib/actions/auth-action";

export default function UpdateForm({ user }: { user: any }) {
  const router = useRouter();
  const { logout } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLogout = () => logout()

  const onSubmit = async (data: UpdateProfileFormData) => {
    setError(null);
    setSuccessMessage(null);
    try {
      const formData = new FormData();
      if (data.fullName) formData.append("fullName", data.fullName);
      if (data.username) formData.append("username", data.username);
      if (data.email) formData.append("email", data.email);
      if (data.profileImage) formData.append("profileImage", data.profileImage);

      const response = await handleUpdateUser(formData);
      if (!response.success) throw new Error(response.message || "Update profile failed");

      handleDismissImage();
      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error: Error | any) {
      toast.error(error.message || "Profile update failed");
      setError(error.message || "Profile update failed");
    }
  };

  const currentImageSrc = previewImage
    ? previewImage
    : user?.profileImage
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
    : null;

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const inputStyle = (hasError: boolean, disabled: boolean) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: hasError ? "1.5px solid #fca5a5" : "1.5px solid #e2e8f0",
    fontSize: "14px",
    color: disabled ? "#64748b" : "#0f172a",
    background: disabled ? "#f8fafc" : "#ffffff",
    outline: "none",
    transition: "border-color 0.15s, background 0.15s",
    boxSizing: "border-box" as const,
    cursor: disabled ? "default" : "text",
  });

  const sidebarNavItem = (icon: React.ReactNode, label: string, href?: string, danger = false) => {
    const base = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "9px 12px",
      borderRadius: "10px",
      fontSize: "13px",
      color: danger ? "#dc2626" : "#374151",
      fontWeight: 500,
      transition: "background 0.15s",
      textDecoration: "none",
      width: "100%",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left" as const,
    };
    return base;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

      {/* ── Sidebar ── */}
      <div className="space-y-4">
        <div style={{ background: "#ffffff", borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>

          {/* Green band */}
          <div style={{ background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #16a34a 100%)", height: "72px" }} />

          <div className="flex flex-col items-center px-6 pb-6" style={{ marginTop: "-36px" }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              {currentImageSrc ? (
                <img src={currentImageSrc} alt="Profile" style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid #ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} />
              ) : (
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #166534, #16a34a)", border: "3px solid #ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 600, color: "#ffffff" }}>
                  {initials}
                </div>
              )}
            </div>

            <h3 style={{ marginTop: "12px", fontWeight: 600, fontSize: "15px", color: "#0f172a", letterSpacing: "-0.2px" }}>
              {user?.fullName || "—"}
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{user?.email || "—"}</p>

            {/* Stats */}
            <div style={{ marginTop: "20px", width: "100%", background: "#f8fafc", borderRadius: "12px", padding: "4px 0" }}>
              {[
                { label: "Total Bookings", value: user?.totalBookings ?? 0 },
                { label: "Pets Registered", value: user?.petsRegistered ?? 0 },
                { label: "Upcoming", value: user?.upcomingBookings ?? 0 },
              ].map((stat, i, arr) => (
                <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>{stat.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", background: "#e2e8f0", borderRadius: "20px", padding: "1px 10px", minWidth: "28px", textAlign: "center" }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Nav links */}
            <div style={{ marginTop: "12px", width: "100%", display: "flex", flexDirection: "column", gap: "2px" }}>

              {/* Section label */}
              <p style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", padding: "8px 12px 4px" }}>
                Settings
              </p>

              <Link
                href="/notifications"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", fontSize: "13px", color: "#374151", fontWeight: 500, textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <Bell size={15} color="#6b7280" />
                Notifications
              </Link>

              <Link
                href="/privacy"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", fontSize: "13px", color: "#374151", fontWeight: 500, textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <Shield size={15} color="#6b7280" />
                Privacy & security
              </Link>

              <Link
                href="/password"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", fontSize: "13px", color: "#374151", fontWeight: 500, textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <KeyRound size={15} color="#6b7280" />
                Change password
              </Link>

              {/* Divider */}
              <div style={{ height: "1px", background: "#f1f5f9", margin: "6px 12px" }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", fontSize: "13px", color: "#dc2626", fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <LogOut size={15} color="#dc2626" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Alerts */}
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#dc2626", display: "flex", alignItems: "center", gap: "8px" }}>
            <X size={14} /> {error}
          </div>
        )}
        {successMessage && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#16a34a" }}>
            ✓ {successMessage}
          </div>
        )}

        {/* Photo Upload Card */}
        <div style={{ background: "#ffffff", borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "8px" }}>
            <Camera size={15} color="#6b7280" />
            <h2 style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a" }}>Profile photo</h2>
          </div>

          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "20px", alignItems: "center" }}>

              <div style={{ position: "relative", width: "96px", height: "96px" }}>
                {currentImageSrc ? (
                  <img src={currentImageSrc} alt="Current" style={{ width: "96px", height: "96px", borderRadius: "16px", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "96px", height: "96px", borderRadius: "16px", background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Camera size={24} color="#94a3b8" />
                  </div>
                )}
                {previewImage && (
                  <Controller
                    name="profileImage"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <button type="button" onClick={() => handleDismissImage(onChange)}
                        style={{ position: "absolute", top: "-6px", right: "-6px", width: "22px", height: "22px", borderRadius: "50%", background: "#ef4444", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                        <X size={10} color="#fff" />
                      </button>
                    )}
                  />
                )}
              </div>

              <Controller
                name="profileImage"
                control={control}
                render={({ field: { onChange } }) => (
                  <label
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "120px", border: `2px dashed ${isDragging ? "#16a34a" : "#e2e8f0"}`, borderRadius: "14px", cursor: "pointer", background: isDragging ? "#f0fdf4" : "#fafafa", transition: "all 0.2s ease", padding: "20px" }}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={e => { e.preventDefault(); setIsDragging(false); handleImageChange(e.dataTransfer.files?.[0], onChange); }}
                    onMouseEnter={e => { if (!isDragging) e.currentTarget.style.borderColor = "#16a34a"; }}
                    onMouseLeave={e => { if (!isDragging) e.currentTarget.style.borderColor = "#e2e8f0"; }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                      <Upload size={16} color="#16a34a" />
                    </div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "2px" }}>Drop your photo here</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>PNG, JPG, WEBP up to 5MB</p>
                    <span style={{ marginTop: "12px", padding: "7px 16px", borderRadius: "20px", background: "#166534", color: "#fff", fontSize: "12px", fontWeight: 500 }}>
                      Browse files
                    </span>
                    {errors.profileImage && <p style={{ marginTop: "8px", fontSize: "12px", color: "#dc2626" }}>{errors.profileImage.message}</p>}
                    <input ref={fileInputRef} type="file" style={{ display: "none" }} accept=".jpg,.jpeg,.png,.webp" onChange={(e) => handleImageChange(e.target.files?.[0], onChange)} />
                  </label>
                )}
              />
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <div style={{ background: "#ffffff", borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>

          {/* Header with Edit / Save toggle */}
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={15} color="#6b7280" />
              <div>
                <h2 style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a", margin: 0 }}>Personal information</h2>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>Keep your info up-to-date.</p>
              </div>
            </div>

            {/* Edit / Save button — top right like in the screenshot */}
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", border: "1.5px solid #e2e8f0", background: "#ffffff", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#ffffff"; }}
              >
                <Pencil size={13} color="#6b7280" />
                Edit
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => { reset(); setIsEditing(false); }}
                  style={{ padding: "6px 14px", borderRadius: "20px", border: "1.5px solid #e2e8f0", background: "#ffffff", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", border: "none", background: "linear-gradient(135deg, #166534, #16a34a)", fontSize: "13px", fontWeight: 500, color: "#ffffff", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 1px 4px rgba(22,101,52,0.25)", opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <Check size={13} color="#fff" />
                  {isSubmitting ? "Saving…" : "Save"}
                </button>
              </div>
            )}
          </div>

          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Full name
              </label>
              <input
                id="fullName"
                {...register("fullName")}
                disabled={!isEditing}
                placeholder="Jane Doe"
                style={inputStyle(!!errors.fullName, !isEditing)}
                onFocus={e => { if (isEditing) e.target.style.borderColor = "#16a34a"; }}
                onBlur={e => { e.target.style.borderColor = errors.fullName ? "#fca5a5" : "#e2e8f0"; }}
              />
              {errors.fullName && <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.fullName.message}</p>}
            </div>

            {/* Username + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label htmlFor="username" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                  <AtSign size={11} color="#9ca3af" /> Username
                </label>
                <input
                  id="username"
                  {...register("username")}
                  disabled={!isEditing}
                  placeholder="janedoe"
                  style={inputStyle(!!errors.username, !isEditing)}
                  onFocus={e => { if (isEditing) e.target.style.borderColor = "#16a34a"; }}
                  onBlur={e => { e.target.style.borderColor = errors.username ? "#fca5a5" : "#e2e8f0"; }}
                />
                {errors.username && <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.username.message}</p>}
              </div>

              <div>
                <label htmlFor="email" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                  <Mail size={11} color="#9ca3af" /> Email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={!isEditing}
                  placeholder="jane@example.com"
                  style={inputStyle(!!errors.email, !isEditing)}
                  onFocus={e => { if (isEditing) e.target.style.borderColor = "#16a34a"; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? "#fca5a5" : "#e2e8f0"; }}
                />
                {errors.email && <p style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626" }}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Read-only hint */}
            {!isEditing && (
              <p style={{ fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                <Pencil size={11} /> Click <strong style={{ color: "#374151" }}>Edit</strong> to update your information.
              </p>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}