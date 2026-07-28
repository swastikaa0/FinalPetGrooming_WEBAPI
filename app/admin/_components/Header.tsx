"use client";


import { useEffect, useState } from "react";
import { handleGetNotifications } from "@/lib/actions/notification-action";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/services", label: "Services" },
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
  const { logout, user } = useAuth();

  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await handleGetNotifications();

      if (response.success) {
        const unread = response.data.filter(
          (notification: any) => !notification.isRead
        ).length;

        setNotificationCount(unread);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  fetchNotifications();

  
  const interval = setInterval(fetchNotifications, 10000);

  return () => clearInterval(interval);
}, []);

  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      style={{
        borderBottom: "1px solid #166534",
        background: "#4F6F52",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1440px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
        }}
      >
        {/* Logo */}
        <Link
          href="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PawIcon />
          </div>

          Pets Co. Admin
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {NAV.map(({ href, label, exact }) => {
            const active = isActive(href, exact);

            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  paddingBottom: "4px",
                  borderBottom: active
                    ? "2px solid white"
                    : "2px solid transparent",
                  transition: "0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}

          {/* Back to User Dashboard */}
          <Link
            href="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            User Dashboard
          </Link>
        </nav>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {user?.username || user?.email}
          </span>

          {/* Notification */}
          <Link
            href="/admin/notification"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,.1)",
              color: "white",
            }}
          >
            <Bell size={19} />

            {notificationCount > 0 && (
  <span
    style={{
      position: "absolute",
      top: "3px",
      right: "3px",
      minWidth: "18px",
      height: "18px",
      borderRadius: "999px",
      background: "#ef4444",
      color: "#fff",
      fontSize: "10px",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #4F6F52",
      padding: "0 4px",
    }}
  >
    {notificationCount > 99 ? "99+" : notificationCount}
  </span>
)}
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,.1)",
              border: "none",
              borderRadius: "10px",
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}