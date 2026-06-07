"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

interface GiftBoxSequenceProps {
  onOpen: () => void;
  data: any;
}

export function GiftBoxSequence({ onOpen, data }: GiftBoxSequenceProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    
    // Trigger confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: data.primaryColorPalette
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: data.primaryColorPalette
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Transition to main experience after animation
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-transparent overflow-hidden"
      exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${data.primaryColorPalette[0]}33 0%, transparent 70%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1 
          className="text-editorial text-4xl md:text-6xl text-[#f3e8e0] mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Special Gift Has Arrived For {data.recipientName || "You"}
        </motion.h1>
        
        <motion.p 
          className="text-[#a89f9a] text-lg md:text-xl font-light tracking-wide mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          This gift was prepared with love.
        </motion.p>

        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-medium text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Open Your Gift
          </span>
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
        </motion.button>
      </div>

      {/* Floating Particles/Balloons could go here in a full implementation */}
    </motion.div>
  );
}
