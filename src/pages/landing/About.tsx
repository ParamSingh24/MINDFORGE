import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Zap, Shield, Rocket } from "lucide-react";
import InteractiveText from "@/components/InteractiveText";

const comparisonData = [
  {
    feature: "Approach",
    freelancer: "Task based (Orders)",
    agency: "Strategy based (Partnership)",
  },
  {
    feature: "Tech Stack",
    freelancer: "Basic Web/App",
    agency: "Agentic AI + GSO + Full Stack",
  },
  {
    feature: "Delivery",
    freelancer: "Just the code",
    agency: "Production grade, scalable systems",
  },
  {
    feature: "Outcome",
    freelancer: "\"Site looks good\"",
    agency: "\"Revenue increased by 40%\"",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-mindforge-black to-mindforge-gray opacity-50 -z-10" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <InteractiveText text="The MindForge Edge" />
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
            <InteractiveText text="MindForge doesn't start with a quote. We start with a technical audit. We find the bottlenecks in a client's business that they didn't even know existed and solve them with code." />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-4 md:p-12 border border-white/10 shadow-2xl overflow-x-auto"
        >
          <div className="min-w-[300px]">
            <div className="grid grid-cols-3 gap-2 md:gap-8 mb-4 md:mb-8 border-b border-white/10 pb-4 md:pb-6 text-xs md:text-lg font-bold text-white">
              <div className="text-gray-500 uppercase tracking-wider">Feature</div>
              <div className="text-gray-400">Standard Freelancer</div>
              <div className="text-mindforge-neon">MindForge (Premium Freelance Partner)</div>
            </div>

            <div className="space-y-4 md:space-y-6">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="grid grid-cols-3 gap-2 md:gap-8 items-center text-xs md:text-base"
                >
                  <div className="font-medium text-gray-300">{row.feature}</div>
                  <div className="flex items-center text-gray-400">
                    <XCircle className="w-3 h-3 md:w-5 md:h-5 text-red-500 mr-1 md:mr-2 flex-shrink-0" />
                    <span className="truncate">{row.freelancer}</span>
                  </div>
                  <div className="flex items-center text-white font-semibold">
                    <CheckCircle2 className="w-3 h-3 md:w-5 md:h-5 text-mindforge-green mr-1 md:mr-2 flex-shrink-0" />
                    <span>{row.agency}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-mindforge-neon to-mindforge-green">
            <button
              onClick={() => {
                const section = document.getElementById("contact");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-10 py-4 bg-mindforge-black rounded-full text-white font-bold hover:bg-opacity-90 transition-all duration-300 flex items-center mx-auto"
            >
              <Zap className="w-5 h-5 mr-2 text-mindforge-neon" />
              Get a Free 15-Minute Technical Audit
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Limited slots available for this month.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
