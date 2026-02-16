import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Play, X } from "lucide-react";
import InteractiveText from "@/components/InteractiveText";

const projects = [
  {
    title: "Nexus Builder (App Studio)",
    description: "Autonomous app generation platform powered by Gemini AI. Reduces MVP development time from weeks to minutes.",
    metric: "40% Dev Time Reduction",
    image: "/Appstudio.png",
    tech: ["React", "Gemini AI", "System Prompts"],
    live: "https://appstudioparam.vercel.app/",
  },
  {
    title: "Washington Sentinel",
    description: "AI-driven disease outbreak detection system using Time-Series Analysis for real-time community alerts.",
    metric: "99.9% Uptime During Crises",
    image: "/washington.png",
    tech: ["Time-Series AI", "Next.js", "Geo-Spatial Data"],
    live: "https://washingtonparam.vercel.app/",
  },
  {
    title: "PropTech OS (Real Estate)",
    description: "Next-gen real estate platform featuring virtual tours and AI-driven property recommendations.",
    metric: "2x Lead Conversion Rate",
    image: "/realestate.png",
    tech: ["React", "Virtual DOM", "Tailwind"],
    live: "https://real-estate-phi-ruby.vercel.app/",
  },
  {
    title: "Commerce Core",
    description: "High-performance headless e-commerce architecture designed for maximum conversion and speed.",
    metric: "< 0.8s Page Load Speed",
    image: "/Ecommerce.png",
    tech: ["Next.js", "Stripe", "Redis"],
    live: "https://e-commerce-pied-mu-11.vercel.app/",
  },
  {
    title: "Opportunity Hub",
    description: "Aggregator platform for hackathons and grants, connecting developers with global opportunities.",
    metric: "5k+ Opportunities Indexed",
    image: "/opportunity.png",
    tech: ["React", "Node.js", "Web Scraping"],
    live: "https://opportunity-hub-six.vercel.app/",
  },
  {
    title: "Enterprise Brand Interface",
    description: "Corporate identity platform with dynamic animations and seamless content management.",
    metric: "30% Increase in Retention",
    image: "/business.png",
    tech: ["Framer Motion", "React", "CMS"],
    live: "https://businessparam.vercel.app/",
  },
];

const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 px-6 relative bg-mindforge-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-mindforge-neon/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-mindforge-green/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <InteractiveText text="Selected Transformations" />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            <InteractiveText text="Proof of Impact. We don't just build software; we engineer results." />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl overflow-hidden bg-mindforge-gray border border-white/5 hover:border-mindforge-neon/50 transition-all duration-300 h-[500px] flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mindforge-gray via-transparent to-transparent opacity-90" />

                {/* Metric Badge */}
                <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full border border-white/10 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-mindforge-green animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{project.metric}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col relative z-20 -mt-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-mindforge-neon transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-white/5 hover:bg-mindforge-neon group-hover:text-black text-white font-bold transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-white/10 group-hover:border-transparent"
                >
                  <span>View Live Ecosystem</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
