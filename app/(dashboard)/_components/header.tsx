
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/bookings", label: "Bookings" },
  { href: "/pets", label: "My Pets" },
  { href: "/profile", label: "Profile" },
];

function PawIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="7" cy="7.5" rx="2.8" ry="3.5" fill="white" fillOpacity="0.9" />
      <ellipse cx="21" cy="7.5" rx="2.8" ry="3.5" fill="white" fillOpacity="0.9" />
      <ellipse cx="10.5" cy="4.5" rx="2.4" ry="3" fill="white" fillOpacity="0.9" />
      <ellipse cx="17.5" cy="4.5" rx="2.4" ry="3" fill="white" fillOpacity="0.9" />
      <ellipse cx="14" cy="18" rx="6.5" ry="7.5" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const notificationCount = 3;

  return (
    <header style={{ borderBottom: "1px solid #166534", background: "#4F6F52", color: "white", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ margin: "0 auto", maxWidth: "1440px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>

        {/* ── Logo ── */}
        <Link
          href="/dashboard"
          style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "20px", fontWeight: 700, color: "white", textDecoration: "none" }}
        >
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PawIcon />
          </div>
          Pets Co.
        </Link>

        {/* ── Navigation ── */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  textDecoration: "none",
                  paddingBottom: "4px",
                  borderBottom: isActive ? "2px solid white" : "2px solid transparent",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right icons ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

          {/* Notification bell */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <Bell size={19} />
            {notificationCount > 0 && (
              <span style={{ position: "absolute", top: "6px", right: "6px", width: "15px", height: "15px", borderRadius: "50%", background: "#ef4444", border: "2px solid #4F6F52", fontSize: "9px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>

          {/* Profile icon */}
          <Link
            href="/profile"
            aria-label="Profile"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <User size={19} />
          </Link>

        </div>
      </div>
    </header>
  );
}