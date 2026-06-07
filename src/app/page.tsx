"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="relative z-10 text-center max-w-3xl flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h1 className="text-editorial text-5xl md:text-7xl text-brand-light mb-6 leading-tight">
          Create an unforgettable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary italic">
            digital birthday journey.
          </span>
        </h1>

        <p className="text-brand-light/60 text-lg md:text-xl mb-12 max-w-2xl font-light">
          Transform photos, memories, and stories into a premium cinematic experience. Not just a card—a personalized documentary of your favorite person.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/birthday/priya-2026")}
            className="px-8 py-4 bg-brand-light text-brand-dark font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            View Demo Experience <ArrowRight className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create")}
            className="px-8 py-4 bg-white/5 text-brand-light font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            Start Creating
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
