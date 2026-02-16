import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import InteractiveText from "@/components/InteractiveText";

const Hero = () => {
  const [headline, setHeadline] = useState({
    title: "We Don't Just Build Websites.",
    subtitle: "We Build Autonomous Growth Engines.",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref === "real_estate") {
      setHeadline({
        title: "Scaling Real Estate Portals",
        subtitle: "with MindForge AI.",
      });
    } else if (ref === "ecommerce") {
      setHeadline({
        title: "Revolutionize Your Store",
        subtitle: "with Conversational Commerce.",
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight mb-6 tracking-tight px-4">
            {headline.title}
          </h1>
          <span className="text-2xl sm:text-3xl md:text-6xl font-bold text-white block mb-8 px-4">
            {headline.subtitle}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light px-4"
        >
          Specializing in{" "}
          <span className="text-white font-medium">Agentic AI</span> and{" "}
          <span className="text-white font-medium">
            Generative Search Optimization
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            className="px-8 py-4 text-lg font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Your Evolution
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("portfolio");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 text-lg font-bold text-white glass rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-md"
          >
            View Transformations
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero
