import Navbar from "@/next/components/Navbar";
import Hero from "@/next/components/Hero";
import About from "@/next/components/About";
import FloorPlans from "@/next/components/FloorPlans";
import Amenities from "@/next/components/Amenities";
import Location from "@/next/components/Location";
import Enquiry from "@/next/components/Enquiry";
import Footer from "@/next/components/Footer";
import WhatsAppFloat from "@/next/components/WhatsAppFloat";

export default function NewHome() {
  return (
    <div className="bg-cream text-charcoal font-sans antialiased min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FloorPlans />
        <Amenities />
        <Location />
        <Enquiry />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
