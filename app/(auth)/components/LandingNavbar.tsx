"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#hero", label: "About" },
  
];

export default function LandingNavbar() {
  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/Logo 2.png"
            alt="Pets Co Logo"
            width={40}
            height={40}
            style={{
              borderRadius: "8px",
            }}
          />

          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#2F4F2F",
            }}
          >
            Pets Co
          </span>
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: 500,
                fontSize: "15px",
                transition: "0.2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Link
            href="/login"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              textDecoration: "none",
              background: "#4F6F52",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}