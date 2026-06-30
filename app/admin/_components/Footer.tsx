export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #166534",
        background: "#4F6F52",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        {/* Left */}
        <div
          style={{
            fontSize: "13px",
            opacity: 0.9,
          }}
        >
          © {new Date().getFullYear()} <strong>Pets Co. Admin</strong>. All
          rights reserved.
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "13px",
            opacity: 0.9,
          }}
        >
          <span>Admin Dashboard</span>
          <span>|</span>
          <span>Nepal</span>
        </div>
      </div>
    </footer>
  );
}