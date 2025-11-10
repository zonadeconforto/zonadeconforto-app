import CTA from "@/shared/components/CTA";
import Footer from "@/shared/components/Footer";
import Hero from "@/shared/components/Hero";
import Navbar from "@/shared/components/Navbar";
import Stats from "@/shared/components/Stats";
import TelaComoFunciona from "@/shared/components/TelaComoFunciona";
import TelaContato from "@/shared/components/TelaContato";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <TelaComoFunciona />
      <CTA />
      <TelaContato />
      <Footer />
    </>
  );
}
