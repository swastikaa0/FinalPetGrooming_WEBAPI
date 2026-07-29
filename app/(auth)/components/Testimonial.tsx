"use client";

import Image from "next/image";

export default function Testimonial() {
  return (
    <section
      style={{
        background: "#EAF3FF",
        padding: "100px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Quote Icon */}
        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 35px",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          💬
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: "34px",
            fontWeight: "600",
            color: "#1E40AF",
            lineHeight: "1.6",
            fontStyle: "italic",
            marginBottom: "50px",
          }}
        >
          "Pets Co has completely changed how I manage Luna's
          health. I never miss a grooming appointment anymore,
          and all her records are always at my fingertips!"
        </p>

        {/* Customer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/avatar2.jpg"
            alt="Sarah Jenkins"
            width={70}
            height={70}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
            }}
          />

          <h3
            style={{
              margin: 0,
              color: "#1F2937",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Sarah Jenkins
          </h3>

          <p
            style={{
              marginTop: "6px",
              color: "#6B7280",
              fontSize: "15px",
            }}
          >
            Pet Parent • Member since 2023
          </p>
        </div>
      </div>
    </section>
  );
}