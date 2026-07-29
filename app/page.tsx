// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/register");
// }
import LandingNavbar from "./(auth)/components/LandingNavbar";
import Hero from "./(auth)/components/Hero";
import Features from "./(auth)/components/Features";
import Testimonial from "./(auth)/components/Testimonial";
import LandingFooter from "./(auth)/components/LandingFooter";


export default function Home() {
  return (
    <main
      style={{
        background: "#ffffff",
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
