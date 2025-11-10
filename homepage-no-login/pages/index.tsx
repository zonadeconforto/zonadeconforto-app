import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TelaComoFunciona from "../components/TelaComoFunciona";
import CTA from "../components/CTA";
import TelaContato from "../components/TelaContato";
import Footer from "../components/Footer";

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
