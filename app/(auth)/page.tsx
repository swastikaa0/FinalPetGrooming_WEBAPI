import LandingNavbar from "./components/LandingNavbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonial from "./components/Testimonial";
import LandingFooter from "./components/LandingFooter";

export default function LandingPage() {
  return (
    <main
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <LandingNavbar />

      <Hero />

      <Features />

      <Testimonial />

      <LandingFooter />
    </main>
  );
}