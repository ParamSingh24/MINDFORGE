import { motion, Variants } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

const features = [
  { icon: Zap, title: "Blazing Fast", description: "Optimized for speed to deliver a seamless user experience and improve search rankings." },
  { icon: Target, title: "Conversion Focused", description: "Designed with clear calls-to-action and user flows to turn visitors into customers." },
  { icon: ShieldCheck, title: "Modern & Secure", description: "Built with the latest technologies to be secure, reliable, and future-proof." },
];

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants}
      transition={{ delay: index * 0.2 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-primary/50 hover:!scale-105"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-6">
          <feature.icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Why Choose Us?</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We don't just build websites. We build digital experiences that drive results.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
