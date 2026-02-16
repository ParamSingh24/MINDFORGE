const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-mindforge-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-mindforge-neon to-transparent opacity-50" />
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
          MindForge<span className="text-mindforge-neon">.</span>
        </h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Architecting the future with Agentic AI and Spatial Computing.
        </p>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MindForge Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
