import { motion, Variants } from 'framer-motion';
import InteractiveText from '../../components/InteractiveText';

const testimonials = [
  {
    name: "Rollerskates USA",
    company: "Retail",
    quote: "MindForge transformed our online presence. Our sales increased significantly after the new website launch! Highly recommended.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Informatica Team",
    company: "Enterprise",
    quote: "An exceptional agency that brings innovative AI solutions to the table. Great contribution to our strategic challenges.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Washington University",
    company: "Education",
    quote: "Outstanding performance in disaster management solutions. Their technical skills are top-notch.",
    avatar: "/placeholder.svg"
  },
];

const cardVariants: Variants = {
  offscreen: { x: -100, opacity: 0 },
  onscreen: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: i * 0.2 }
  })
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white"><InteractiveText text="Loved by" /></h2>
          <p className="text-lg text-gray-400 mt-4"><InteractiveText text={"Don't just take our word for it. Here's what our clients have to say."} /></p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10"
            >
              <p className="text-gray-300 italic mb-6"><InteractiveText text={`"${testimonial.quote}"`} /></p>
              <div className="flex items-center">
                {/* <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" /> */}
                <div>
                  <p className="font-bold text-white"><InteractiveText text={testimonial.name} /></p>
                  {/* <p className="text-sm text-gray-400">{testimonial.company}</p> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
