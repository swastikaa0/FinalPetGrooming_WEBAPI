"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Settings,
} from "lucide-react";

export default function LandingFooter() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #E5E7EB",
        padding: "70px 40px 25px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "50px",
          }}
        >
          {/* Logo & Description */}
          <div style={{ maxWidth: "320px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <Image
                src="/Logo 2.png"
                alt="Pets Co Logo"
                width={42}
                height={42}
                style={{
                  borderRadius: "8px",
                }}
              />

              <h2
                style={{
                  margin: 0,
                  color: "#2F4F2F",
                  fontSize: "24px",
                }}
              >
                Pets Co
              </h2>
            </div>

            <p
              style={{
                color: "#6B7280",
                lineHeight: 1.8,
                fontSize: "15px",
                marginBottom: "25px",
              }}
            >
              Making pet care simple, organized, and enjoyable
              for every pet parent around the world.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
              }}
            >
              
            </div>
          </div>

          {/* Footer Links */}
          <div
            style={{
              display: "flex",
              gap: "80px",
              flexWrap: "wrap",
            }}
          >
            {/* Product */}
            <div>
              <h4
                style={{
                  color: "#111827",
                  marginBottom: "20px",
                }}
              >
                PRODUCT
              </h4>

              {["Features", "Mobile App", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#6B7280",
                    marginBottom: "14px",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4
                style={{
                  color: "#111827",
                  marginBottom: "20px",
                }}
              >
                COMPANY
              </h4>

              {["About Us", "Careers", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#6B7280",
                    marginBottom: "14px",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4
                style={{
                  color: "#111827",
                  marginBottom: "20px",
                }}
              >
                LEGAL
              </h4>

              {["Privacy", "Terms", "Security"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#6B7280",
                    marginBottom: "14px",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            marginTop: "60px",
            paddingTop: "20px",
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "14px",
            }}
          >
            © 2025 Pets Co. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "18px",
            }}
          >
            <Bell
              size={20}
              color="#6B7280"
              style={{ cursor: "pointer" }}
            />

            <Settings
              size={20}
              color="#6B7280"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}