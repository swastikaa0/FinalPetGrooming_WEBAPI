// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [agreedToTerms, setAgreedToTerms] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ fullName, email, password, confirm, agreedToTerms });
//   };

//   return (
//     <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl">
        
//         <div className="hidden md:flex md:w-[45%] relative flex-col min-h-[580px]">
//           <div className="absolute inset-0">
//             <img
//               src="/Signin.png"
//               alt="Professional groomer with dog"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#4a6741]/90 via-transparent to-transparent" />
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//             <h2 className="text-xl font-bold mb-1">Join the Family</h2>
//             <p className="text-sm text-white/85 leading-snug">
//               Create an account to manage your pet's beauty routine with ease.
//             </p>
//           </div>
//         </div>

//         {/* Right Panel - Form */}
//         <div className="flex-1 p-10 md:p-14 relative">
//           <div className="mb-5">
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
//             <p className="text-sm text-gray-500">Let's get started with your profile</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-3.5">
//             <div>
//               <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
//                   Confirm
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   value={confirm}
//                   onChange={(e) => setConfirm(e.target.value)}
//                   className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6741]/30 focus:border-[#4a6741]"
//                 />
//               </div>
//             </div>

//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={agreedToTerms}
//                 onChange={(e) => setAgreedToTerms(e.target.checked)}
//                 className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#4a6741]"
//               />
//               <label htmlFor="terms" className="text-sm text-gray-600">
//                 I agree to the{" "}
//                 <a href="#" className="text-[#4a6741] font-medium hover:underline">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-[#4a6741] font-medium hover:underline">
//                   Privacy Policy
//                 </a>.
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-[#4a6741] text-white text-sm font-semibold rounded-lg hover:bg-[#3d5736] transition-colors"
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-500 mt-8">
//             Already have an account?{" "}
//             <Link href="/login" className="text-[#4a6741] font-semibold hover:underline cursor-pointer">
//               Sign in instead
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import RegisterForm from "@/app/(auth)/_components/RegisterForm";
export default function RegisterPage() {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
}