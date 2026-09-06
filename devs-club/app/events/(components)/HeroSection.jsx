import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Adjusted Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto backdrop-blur-sm bg-slate-900/30 p-8 rounded-2xl border border-white/5"
        >
          {/* Glowing Title */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="relative mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
              Our
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 animate-gradient font-extrabold pb-4">
                Events
              </span>
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
          >
            Discover our exciting lineup of tech events, workshops, and
            hackathons. Join us to learn, build, and connect with fellow
            developers in our community.
          </motion.p>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-gray-100 backdrop-blur-md bg-white/10 px-8 py-4 rounded-full border border-white/20 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/20" />
              <span className="font-small">
                Join us for exciting tech events and workshops
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[100px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-blue-950/50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
