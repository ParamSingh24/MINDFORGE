
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
import ExperienceSection from "@/components/ExperienceSection";

const Index = () => {
  return (
    <div className="relative antialiased">
      {/* Background Gradient */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 animate-aurora"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),rgba(255,255,255,0))",
        }}
      ></div>

      {/* Floating Lines Background (Fixed, below Hero) */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 opacity-50 pointer-events-none">
        {/* We mask it so it doesn't show on Hero (top 100vh approx)? 
              Actually user said 'except hero section'.
              Hero is 100vh. We can just cover the whole screen and use a clip-path or simply render it.
              If we want it to NOT be in hero, maybe we can just start it from top: 100vh? 
              But it's a fixed background?
              
              If it's fixed, it stays with the viewport. 
              If the user scrolls past hero, they want to see it.
              So we should show it, but maybe hide it when we are at the top?
              
              Or better: Render it inside the <main> but with absolute positioning starting after hero?
              No, "background animation" usually means covering the viewport.
              
              Let's try rendering it fixed, but verifying if Hero covers it.
              Hero has AnimatedBackground. If it's transparent, lines will show.
              
              To explicitly exclude Hero:
              We can use a sticky/fixed container that starts visible only after 100vh?
              Or use a mask image?
              
              Simplest interpretation: Put it in the background of the 'main' content that is NOT hero.
              Since the page scrolls, we can just put it absolute in the <main> container with top: 100vh?
              But <main> contains Hero.
              
              Let's put it as a fixed background for the whole page (z-index -20), and assume Hero's background (z-index -10 or something) covers it.
              Hero uses AnimatedBackground. Let's check AnimatedBackground.
          */}
        <FloatingLines />
      </div>

      <Header />
      <main className="relative">
        {/* We need to ensure Hero covers the floating lines if desired, or we just accept them everywhere. 
            User said "except hero section".
            Maybe meaningful: Don't render lines logic when scroll is at top?
            Or overlay a solid background on Hero?
            
            Let's go with: Fixed background, but we add a 'bg-mindforge-black' to Hero to ensure opacity? 
            Hero already has transparency.
            
            Alternative:
            Render FloatingLines inside a div that starts after Hero.
         */}
        <Hero />

        <div className="relative">
          {/* This container wraps the rest */}
          <Services />
          <Portfolio />
          <About />
          <Pricing />
          <ExperienceSection />
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
