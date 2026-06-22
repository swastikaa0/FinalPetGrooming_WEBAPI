import Link from "next/link";

import {  Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto text-white" style={{ background: "#4F6F52" }}>
      <div className="w-full py-16">
        <div style={{ borderTop: "1px solid #166534" }}>
          <div className="mx-auto w-full max-w-[1440px] px-6 pt-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs tracking-[0.5px] text-green-200">
                © {new Date().getFullYear()} Pets Co. All rights reserved.
              </p>

              
              <p className="text-xs tracking-[0.5px] text-green-200">
                EN · Global
              </p>

                 

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-green-200">Account</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-green-200">
              <Link href="/profile" className="hover:text-white">My Profile</Link>
              <Link href="/password" className="hover:text-white">Change Password</Link>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/register" className="hover:text-white">Sign Up</Link>
            </nav>
          </div>
             <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-green-200">Explore</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-green-200">
              <Link href="/dashboard" className="hover:text-white">Home</Link>
              <Link href="/bookings" className="hover:text-white">Bookings</Link>
              <Link href="/pets" className="hover:text-white">My Pets</Link>
              <Link href="/services" className="hover:text-white">Services</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-green-200">Contact</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-green-200">
              <a href="mailto:hello@petsco.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={14} /> hello@petsco.com
              </a>
              <a href="tel:+15555555555" className="flex items-center gap-2 hover:text-white">
                <Phone size={14} /> +1 (555) 555-5555
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Kathmandu, Nepal
              </span>
            </div>

            <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-green-200">Legal</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-green-200">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
            </nav>
          </div>
        </div>
            </div>
          </div>
        </div>
      
      
    </footer>
  );
}
