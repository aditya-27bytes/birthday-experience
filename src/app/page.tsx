"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Upload, Clock, Share2 } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-brand-primary" />,
      title: "Upload Memories",
      description: "Share your favorite photos and write a heartfelt letter."
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-secondary" />,
      title: "Build a Timeline",
      description: "Document their life journey with major milestones."
    },
    {
      icon: <Share2 className="w-6 h-6 text-brand-light" />,
      title: "Share the Magic",
      description: "Generate a custom link to send them a cinematic experience."
    }
  ];

  return (
    <main className="min-h-screen w-full bg-brand-dark overflow-hidden flex flex-col items-center justify-center relative px-4 py-8">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="relative z-10 text-center max-w-4xl flex flex-col items-center flex-1 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-editorial text-4xl md:text-6xl text-brand-light mb-4 leading-tight">
          Create an unforgettable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary italic">
            digital birthday journey.
          </span>
        </h1>

        <p className="text-brand-light/60 text-base md:text-lg mb-8 max-w-2xl font-light">
          Transform photos, memories, and stories into a premium cinematic experience. Not just a card—a personalized documentary of your favorite person.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/birthday/priya-2026")}
            className="px-8 py-3 bg-brand-light text-brand-dark font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            View Demo Experience <ArrowRight className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create")}
            className="px-8 py-3 bg-white/5 text-brand-light font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            Start Creating
          </motion.button>
        </div>

        {/* Compact Visual Guide */}
        <div className="w-full max-w-4xl border-t border-white/10 pt-12 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-brand-dark text-brand-light/50 text-sm tracking-widest uppercase font-medium">
            How It Works
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-6 left-12 w-[calc(100%-6rem)] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10 flex flex-col items-center text-center px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center mb-4 shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {step.icon}
                </div>
                <h3 className="text-base font-medium text-brand-light mb-2">{step.title}</h3>
                <p className="text-brand-light/50 font-light text-xs leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
