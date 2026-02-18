
// Force TS re-check
import React from "react";
import { motion } from "framer-motion";
import InteractiveText from "@/components/InteractiveText";

const experiences = [
    {
        role: "Founder & AI Systems Engineer",
        organization: "MindForge Agency",
        duration: "2026 — Present",
        description: "Architecting autonomous AI agents, scalable SaaS platforms, and full-stack AI automation systems for global clients.",
        tech: ["React", "Next.js", "LangChain", "Gemini API", "Node.js", "Tailwind", "Vercel"],
    },
    {
        role: "AI Platform Developer",
        organization: "Nexus Builder",
        duration: "2024 — 2025",
        description: "Built an autonomous application generation ecosystem powered by LLM orchestration and system prompt engineering.",
        tech: ["Gemini AI", "Automation Pipelines", "React", "System Prompts"],
    },
    {
        role: "Full Stack Engineer",
        organization: "Independent Projects",
        duration: "2023 — 2024",
        description: "Developed high-performance web applications optimized for scalability, speed, and intelligent UX systems.",
        tech: ["Next.js", "TailwindCSS", "Firebase", "Node.js"],
    },
];

const ExperienceSection = () => {
    return (
        <section id="experience" className="relative py-24 px-6 overflow-hidden">
            {/* Background Elements - Reusing AnimatedBackground implies keeping the same visual language. 
          The user explicitly mentioned "Reuse existing AnimatedBackground if it is used in other sections".
          However, AnimatedBackground is a full-screen canvas component designed for Hero. 
          Assuming it shouldn't be duplicated here as it might be heavy or intended only for Hero.
          The prompt says: "Reuse existing AnimatedBackground if it is used in other sections. Do NOT create a new background system."
          But also "It must feel native to the existing design."
          Given I see Portfolio uses just blobs, I should stick to blobs to match Portfolio EXACTLY.
      */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-mindforge-neon/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-mindforge-green/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        <InteractiveText text="Operational Experience" />
                    </h2>
                    <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
                        <InteractiveText text="Engineering autonomous AI systems, scalable SaaS platforms, and intelligent automation engines." />
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line - Centered on Mobile & Desktop as requested */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-emerald-400 to-transparent opacity-30" />

                    <div className="space-y-12 md:space-y-0">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot - Centered on Mobile & Desktop */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10 mt-6 md:mt-0" />

                                {/* Spacer for Desktop Alignment */}
                                <div className="hidden md:block w-1/2" />

                                {/* Card */}
                                <div className={`w-full md:w-1/2 relative px-4 md:px-0 ${index % 2 === 0 ? "md:pr-12 text-left" : "md:pl-12 text-left"
                                    }`}>
                                    <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-700 ease-out">
                                        <div className="flex flex-col mb-4">
                                            {/* Duration above title for better hierarchy in cards */}
                                            <span className="text-mindforge-green font-mono text-sm mb-2">{exp.duration}</span>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500">
                                                {exp.role}
                                            </h3>
                                            <span className="text-gray-400 text-lg">{exp.organization}</span>
                                        </div>

                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
