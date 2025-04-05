import About from "@/components/About";
import Appointment from "@/components/Appointment";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <div id="team"><Team /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="appointment"><Appointment /></div>
      <Newsletter />
      <div id="contact"><Footer /></div>
    </>
  )
}
