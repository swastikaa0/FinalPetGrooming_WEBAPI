"use client";

export default function Features() {
  const features = [
    {
      icon: "🩺",
      title: "Health Tracking",
      description:
        "Keep a digital log of vaccinations, weight, medical history, and prescriptions all in one place.",
    },
    {
      icon: "📊",
      title: "Activity Monitor",
      description:
        "Track your pet's daily exercise, sleep, and activity to ensure they stay happy and healthy.",
    },
    {
      icon: "🐾",
      title: "Pet Community",
      description:
        "Connect with other pet owners, share experiences, and discover useful pet care tips.",
    },
    {
      icon: "📅",
      title: "Appointments",
      description:
        "Book grooming appointments, vet visits, and boarding services quickly and easily.",
    },
  ];

  return (
    <section
      id="features"
      style={{
        background: "#F8FAFC",
        padding: "100px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <h2
            style={{
              fontSize: "46px",
              fontWeight: "700",
              color: "#1F2937",
              marginBottom: "18px",
            }}
          >
            Everything your pet needs.
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#6B7280",
              lineHeight: 1.8,
              fontSize: "17px",
            }}
          >
            Powerful tools designed to help you keep track of every part of your
            pet's life—from grooming appointments and health records to daily
            activities and reminders.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "30px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "0.3s",
                minHeight: "260px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: "#EEF5EC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "28px",
                  marginBottom: "25px",
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "15px",
                  color: "#1F2937",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  color: "#6B7280",
                  lineHeight: 1.8,
                  fontSize: "15px",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}