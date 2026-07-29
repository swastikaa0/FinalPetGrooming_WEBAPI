
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { useEffect, useState } from "react";
import { handleGetNotifications } from "@/lib/actions/notification-action";


const navLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/bookings", label: "Bookings" },
  { href: "/pets", label: "My Pets" },
  { href: "/profile", label: "Profile" },
];

// function PawIcon() {
//   return (
//     <svg
//       width="28"
//       height="28"
//       viewBox="0 0 28 28"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <ellipse cx="7" cy="7.5" rx="2.8" ry="3.5" fill="white" fillOpacity="0.9" />
//       <ellipse cx="21" cy="7.5" rx="2.8" ry="3.5" fill="white" fillOpacity="0.9" />
//       <ellipse cx="10.5" cy="4.5" rx="2.4" ry="3" fill="white" fillOpacity="0.9" />
//       <ellipse cx="17.5" cy="4.5" rx="2.4" ry="3" fill="white" fillOpacity="0.9" />
//       <ellipse cx="14" cy="18" rx="6.5" ry="7.5" fill="white" fillOpacity="0.9" />
//     </svg>
//   );
// }

export default function Header() {
  const pathname = usePathname();
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
}, []);

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
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "20px",
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
          }}
        >
          <div
  style={{
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Image
    src="/Logo 2.png"
    alt="Pets Co Logo"
    width={42}
    height={42}
    priority
    style={{
      borderRadius: "8px", // Rounded corners
      objectFit: "cover",
    }}
  />
</div>

          Pets Co.
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
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
                  borderBottom: isActive
                    ? "2px solid white"
                    : "2px solid transparent",
                  transition: "opacity .2s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Notification */}
          <Link
            href="/notification"
            aria-label="Notifications"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Bell size={20} />

            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  minWidth: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  border: "2px solid #4F6F52",
                }}
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            aria-label="Profile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textDecoration: "none",
            }}
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}