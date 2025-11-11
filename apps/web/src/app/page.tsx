import CTA from "@/shared/components/CTA";
import Footer from "@/shared/components/Footer";
import Hero from "@/shared/components/Hero";
import Navbar from "@/shared/components/Navbar";
import SectionHowWorks from "@/shared/components/SectionHowWorks";
import SectionContact from "@/shared/components/SectionContact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionHowWorks />
      <CTA />
      <SectionContact />
      <Footer />
    </>
  );
}
