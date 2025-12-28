import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import IsForYou from "@/components/landing/IsForYou";
import History from "@/components/landing/History";
import Services from "@/components/landing/Services";
import EducationLevels from "@/components/landing/EducationLevels";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Recognition from "@/components/landing/Recognition";
import Testimonials from "@/components/landing/Testimonials";
import Gallery from "@/components/landing/Gallery";
import Social from "@/components/landing/Social";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";
import MissionVision from "@/components/landing/MissionVision";
import SealsSection from "@/components/landing/SealsSection";
import ValuesSection from "@/components/landing/ValuesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent/30">
      <Navbar />
      <main className="grow bg-linear-to-b">
        <Hero />
        <MissionVision />
        <About />
        <SealsSection />
        <ValuesSection />
        <IsForYou />
        <History />
        <Services />
        <EducationLevels />
        <WhyChooseUs />
        <Recognition />
        <Testimonials />
        <Gallery />
        <Social />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
