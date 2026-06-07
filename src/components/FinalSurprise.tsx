"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift, Heart } from "lucide-react";

interface FinalSurpriseProps {
  data: any;
}

export function FinalSurprise({ data }: FinalSurpriseProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: data.primaryColorPalette
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: data.primaryColorPalette
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Fireflies / Particles effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div 
            key="gift-box"
            className="z-10 flex flex-col items-center text-center px-4"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-editorial text-4xl md:text-6xl text-brand-light mb-12">
              One Last Surprise
            </h2>
            
            <motion.button
              onClick={handleOpen}
              className="group relative w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Gift className="w-12 h-12 md:w-20 md:h-20 text-white" />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                <span className="text-brand-dark font-bold">Open</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="final-message"
            className="z-10 flex flex-col items-center text-center px-4 max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 1 }}
              className="mb-8 text-brand-primary"
            >
              <Heart className="w-16 h-16 fill-current" />
            </motion.div>

            <h1 className="text-editorial text-5xl md:text-8xl text-brand-light mb-8 leading-tight">
              Thank You <br/>
              <span className="italic text-brand-primary">For Existing.</span>
            </h1>

            <h2 className="text-2xl md:text-4xl font-light text-brand-light/90 mb-12">
              Happy Birthday, {data.recipientName}
            </h2>

            <div className="w-24 h-[1px] bg-brand-light/30 mb-12" />

            <p className="text-lg md:text-xl text-brand-light/60 tracking-wide font-light max-w-2xl">
              "Every memory became a part of this story."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating final memories */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {data.photos.map((photo: string, i: number) => (
            <motion.div
              key={i}
              className="absolute opacity-10 rounded-lg overflow-hidden mix-blend-luminosity"
              style={{
                width: "clamp(100px, 15vw, 200px)",
                height: "clamp(150px, 20vw, 300px)",
                left: `${10 + (i * 20)}%`,
                top: `${80}%`
              }}
              initial={{ y: 0, rotate: i % 2 === 0 ? -10 : 10 }}
              animate={{ 
                y: -1000, 
                rotate: i % 2 === 0 ? [-10, 10, -10] : [10, -10, 10] 
              }}
              transition={{ 
                y: { duration: 20 + i * 5, ease: "linear" },
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
