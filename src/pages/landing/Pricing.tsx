import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";

const plans = [
  {
    name: "MVP / Audit",
    price: "$100",
    description: "Perfect for technical audits or simple MVPs.",
    features: [
      "Technical Audit & Roadmap",
      "Basic Landing Page or Script",
      "1 Month Support",
    ],
    popular: false,
  },
  {
    name: "Standard Growth",
    price: "$200",
    description: "Serious automation and development for growing businesses.",
    features: [
      "Advanced Agentic Workflow",
      "Full Stack Web App (Next.js)",
      "SEO & Performance Optimization",
    ],
    popular: true,
  },
  {
    name: "Enterprise Scale",
    price: "$350",
    description: "Full-scale digital transformation and dedicated engineering.",
    features: [
      "Custom AI Model Training",
      "Complex SaaS Platform",
      "Dedicated 24/7 Support Channel",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (planName: string) => {
    setHoveredPlan(planName);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setShowTooltip(planName);
    }, 10000); // 10 seconds
  };

  const handleMouseLeave = () => {
    setHoveredPlan(null);
    setShowTooltip(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <section id="pricing" className="py-24 bg-mindforge-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mindforge-black/80 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Find a Plan That's Right For You
          </h2>
          <p className="text-lg text-gray-400 mt-4 h-8">
            {/* Height reserved for layout stability */}
          </p>
        </motion.div>

        {/* Toggle Removed since pricing is flat */}

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => handleMouseEnter(plan.name)}
              onMouseLeave={handleMouseLeave}
              className={`relative p-8 rounded-2xl border ${plan.popular ? "border-mindforge-neon" : "border-white/10"
                } bg-card/50 backdrop-blur-md transition-all duration-300 hover:transform hover:-translate-y-2`}
            >
              <AnimatePresence>
                {showTooltip === plan.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-mindforge-gray border border-mindforge-neon/50 text-white p-4 rounded-xl shadow-2xl z-50 text-sm text-center"
                  >
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-mindforge-gray border-b border-r border-mindforge-neon/50 rotate-45" />
                    <p className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-mindforge-neon flex-shrink-0 mt-0.5" />
                      "Wondering about ROI? Our average client sees a 30% efficiency boost in 3 months."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-mindforge-neon text-black px-4 py-1 text-sm font-bold rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-5xl font-extrabold text-white mb-4">
                {plan.price}
              </p>
              <p className="text-gray-400 mb-6">
                One-time investment
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-mindforge-green mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/5">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
