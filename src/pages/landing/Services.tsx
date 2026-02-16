import { motion } from "framer-motion";
import { Cpu, Search, Layers, Database, Activity, ArrowRight } from "lucide-react";
import InteractiveText from "@/components/InteractiveText";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const services = [
  {
    icon: Cpu,
    title: "AI & Agentic Engineering",
    description:
      "This is your most profitable vertical. Don't just build chatbots; build autonomous employees.",
    features: [
      "Autonomous AI Agents (LangChain, n8n)",
      "Custom LLM Fine-Tuning",
      "Conversational Commerce",
    ],
  },
  {
    icon: Search,
    title: "The Next Era of SEO: GSO & AEO",
    description:
      "Traditional SEO is dead. MindForge leads the way in the era of Generative Search.",
    features: [
      "Generative Search Optimization (GSO)",
      "Answer Engine Optimization (AEO)",
      "Programmatic SEO Engines",
    ],
  },
  {
    icon: Layers,
    title: "Full Stack Product Engineering",
    description:
      "High performance, scalable builds for startups and enterprises.",
    features: [
      "B2B SaaS Development",
      "Modern Mobile Apps (Swift, Kotlin, Flutter)",
      "Legacy Modernization",
    ],
  },
  {
    icon: Database,
    title: "Web3 & Blockchain Integration",
    description:
      "Bridging the gap between traditional business and decentralized tech.",
    features: [
      "DApp Development (Aptos, Solana)",
      "AI + Blockchain Fusion",
      "Smart Contract Automation",
    ],
  },
  {
    icon: Activity,
    title: "Hyper-Automation & RevOps",
    description:
      "Automating the 'grunt work' to let founders focus on scaling.",
    features: [
      "Automated Sales Funnels",
      "Revenue Operations (RevOps)",
      "Lead Qualifiers Bot",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-mindforge-black/50 pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
            <InteractiveText text="MindForge Service Catalog" />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            <InteractiveText text="Architecting the future with Agentic AI and Spatial Computing." />
          </p>
        </motion.div>

        <ScrollStack>
          {services.map((service, index) => (
            <ScrollStackItem key={service.title} className="glass border border-white/5 hover:border-mindforge-neon/30 h-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-mindforge-neon/10 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-mindforge-neon group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-400 mb-8 leading-relaxed text-sm flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start text-sm">
                      <ArrowRight className="w-4 h-4 text-mindforge-green mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default Services;
