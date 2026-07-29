"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "60px",
        flexWrap: "wrap",
      }}
    >
      {/* Left Content */}
      <div style={{ flex: 1, minWidth: "350px" }}>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: "1.1",
            color: "#1F2937",
            marginBottom: "24px",
          }}
        >
          Manage your pet's <br />
          life{" "}
          <span style={{ color: "#7A9B6F" }}>
            with ease.
          </span>
        </h1>

        <p
          style={{
            color: "#6B7280",
            fontSize: "18px",
            lineHeight: "1.8",
            maxWidth: "520px",
            marginBottom: "35px",
          }}
        >
          From health tracking to grooming appointments,
          Pets Co is the all-in-one companion for modern pet
          parents who want the very best for their furry
          friends.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            href="/register"
            style={{
              background: "#4F6F52",
              color: "white",
              textDecoration: "none",
              padding: "16px 28px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Get Started Now
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/avatar1.jpg"
              alt=""
              width={36}
              height={36}
              style={{
                borderRadius: "50%",
                marginLeft: "-8px",
                border: "2px solid white",
              }}
            />

            <Image
              src="/avatar2.jpg"
              alt=""
              width={36}
              height={36}
              style={{
                borderRadius: "50%",
                marginLeft: "-8px",
                border: "2px solid white",
              }}
            />

            <Image
              src="/avatar3.png"
              alt=""
              width={36}
              height={36}
              style={{
                borderRadius: "50%",
                marginLeft: "-8px",
                border: "2px solid white",
              }}
            />

            <span
              style={{
                marginLeft: "12px",
                color: "#6B7280",
                fontSize: "14px",
              }}
            >
              Joined by 10k+ pet parents
            </span>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div
        style={{
          flex: 1,
          minWidth: "350px",
          position: "relative",
        }}
      >
        <Image
          src="/Signin.png"
          alt="Pets Co"
          width={620}
          height={450}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0,0,0,.15)",
          }}
        />

        {/* Floating Card */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "20px",
            background: "white",
            borderRadius: "18px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 12px 35px rgba(0,0,0,.12)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#EAF4E5",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
            }}
          >
            
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#1F2937",
              }}
            >
              Oliver's Health
            </div>

            <div
              style={{
                color: "#22C55E",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Perfect Condition
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}