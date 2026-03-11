
import Header from "@/components/layout/Header";
import Hero from "@/pages/landing/Hero";
import About from "./landing/About";
import Services from "./landing/Services";
import Portfolio from "./landing/Portfolio";
import Experience from "./landing/Experience";
import Pricing from "./landing/Pricing";
import Testimonials from "./landing/Testimonials";
import Contact from "./landing/Contact";
import Footer from "@/components/layout/Footer";
import FloatingLines from "@/components/ui/FloatingLines";
import ChatBot from "@/components/chat/ChatBot";

const Index = () => {
  return (
    <div className="relative antialiased">

      <div
        className="fixed top-0 left-0 w-full h-full -z-10 animate-aurora"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),rgba(255,255,255,0))",
        }}
      ></div>


      <div className="fixed top-0 left-0 w-full h-full -z-20 opacity-50 pointer-events-none">

        <FloatingLines />
      </div>

      <Header />
      <main className="relative">

        <Hero />

        <div className="relative">

          <Services />
          <Portfolio />
          <About />
          <Pricing />
          <Experience />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
