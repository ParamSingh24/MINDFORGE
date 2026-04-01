
import { motion } from 'framer-motion'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Premium Services', href: '#pricing' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-wider">
          <a href="#">Premium Services</a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-300 hover:text-white transition-colors duration-300">
              {item.name}
            </a>
          ))}
        </nav>
        <div>
          <button 
            onClick={scrollToContact}
            className="px-6 py-2 text-lg font-bold capitalize text-white rounded-lg hover:bg-white/10 transition-colors duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
