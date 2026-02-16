import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import InteractiveText from "@/components/InteractiveText";

const Contact = () => {
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", text: "Hi! I'm the MindForge AI Agent. What brings you here today?" },
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const handleOptionClick = (option: string) => {
    const newHistory = [...chatHistory, { type: "user", text: option }];
    setChatHistory(newHistory);
    setShowOptions(false);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      if (option === "I need a high-performance website") {
        botResponse = "Excellent. We specialize in high-performance, agentic web solutions. What is your estimated budget?";
      } else if (option === "I want to automate my business") {
        botResponse = "Automation is our forte. We can deploy autonomous agents to handle workflows. What is your estimated budget?";
      } else {
        botResponse = "For specific inquiries, you can reach our engineering team directly via email or phone below.";
      }

      setChatHistory(prev => [...prev, { type: "bot", text: botResponse }]);

      if (option !== "Just saying hi") {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { type: "bot", text: "Based on your needs, I recommend booking a technical audit." }]);
        }, 1000);
      }
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-mindforge-black/80 -z-20" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <InteractiveText text="Initialize Protocol: Growth" />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            <InteractiveText text="Skip the forms. Interact with our agent or contact direct engineering channels." />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Lead Qualifier Bot */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 min-h-[400px] flex flex-col border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mindforge-neon to-mindforge-green" />
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2 custom-scrollbar">
              <AnimatePresence>
                {chatHistory.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${msg.type === "user"
                          ? "bg-mindforge-neon/20 text-white border border-mindforge-neon/30 rounded-br-none"
                          : "bg-white/10 text-gray-200 border border-white/5 rounded-bl-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {showOptions && (
              <div className="grid gap-3">
                {["I need a high-performance website", "I want to automate my business", "Just saying hi"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="bg-white/5 hover:bg-mindforge-neon/10 border border-white/10 hover:border-mindforge-neon/50 text-left p-3 rounded-xl transition-all duration-300 text-sm md:text-base text-gray-300 hover:text-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {!showOptions && (
              <div className="border-t border-white/10 pt-4 flex gap-2">
                <input type="text" placeholder="Type a message..." disabled className="bg-transparent w-full text-white placeholder-gray-600 focus:outline-none cursor-not-allowed" />
                <button disabled className="text-gray-600"><Send className="w-5 h-5" /></button>
              </div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                <InteractiveText text="Direct Engineering Channels" />
              </h3>

              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-mindforge-neon/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-mindforge-neon" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email Protocol</p>
                    <a href="mailto:codewithparamsingh@gmail.com" className="text-xl text-white font-medium hover:text-mindforge-neon transition-colors break-all">
                      codewithparamsingh@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-mindforge-green/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-mindforge-green" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Secure Line</p>
                    <a href="tel:8932959222" className="text-xl text-white font-medium hover:text-mindforge-green transition-colors">
                      +91 89329-59222
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Available Mon-Fri, 9am - 6pm IST</p>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Base of Operations</p>
                    <p className="text-xl text-white font-medium">Remote / Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Connect on Signal</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, url: "https://github.com/ParamSingh24" },
                  { icon: Linkedin, url: "https://www.linkedin.com/in/param-singh-744a97269/" },
                  { icon: Twitter, url: "https://x.com/DevloperParam" },
                  { icon: Instagram, url: "https://www.instagram.com/developerparam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
