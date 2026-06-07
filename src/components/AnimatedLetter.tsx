"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface AnimatedLetterProps {
  data: any;
}

export function AnimatedLetter({ data }: AnimatedLetterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [isOpen, setIsOpen] = useState(false);

  // When container comes into view, we can auto-open or wait for click. Let's wait for click.
  
  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden perspective-[2000px]">
      
      <div className="text-center mb-24 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-editorial text-5xl md:text-7xl text-brand-light"
        >
          A Letter To You
        </motion.h2>
      </div>

      {/* 3D Envelope Container */}
      <motion.div 
        className="relative w-full max-w-2xl aspect-[3/2] cursor-pointer z-10"
        onClick={() => setIsOpen(true)}
        initial={{ rotateX: 10, y: 50, opacity: 0 }}
        animate={isInView ? { rotateX: 0, y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#e6d5c3] rounded-sm shadow-2xl overflow-hidden">
          {/* Texture */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
        </div>

        {/* Letter Inside */}
        <motion.div 
          className="absolute inset-x-4 top-4 bottom-4 bg-[#fdfbf7] shadow-inner flex flex-col p-8 md:p-12"
          initial={{ y: "100%", opacity: 0 }}
          animate={isOpen ? { y: "-40%", opacity: 1, zIndex: 40 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: isOpen ? 0.8 : 0 }}
          style={{ transformOrigin: "bottom" }}
        >
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
          
          <div className="relative z-10 w-full h-full overflow-y-auto pr-4 custom-scrollbar">
            {isOpen && (
              <motion.p 
                className="font-['Caveat',cursive] text-2xl md:text-3xl text-brand-dark/80 leading-relaxed whitespace-pre-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.5 }}
              >
                {data.letter}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Envelope Flap (Top) */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[60%] origin-top z-30"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backgroundColor: "#d5c2ab",
            backfaceVisibility: "hidden"
          }}
        >
          {/* Wax Seal */}
          <motion.div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-[#8b0000] rounded-full shadow-lg flex items-center justify-center text-[#d4af37] font-editorial text-2xl"
            animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {data.recipientName[0]}
          </motion.div>
        </motion.div>

        {/* Envelope Inside Flap (Revealed when top flap opens) */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[60%] origin-top z-10"
          initial={{ rotateX: -180 }}
          animate={{ rotateX: -180 }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backgroundColor: "#cbb59c",
            backfaceVisibility: "hidden"
          }}
        />

        {/* Envelope Left Flap */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0 0, 50% 50%, 0 100%)",
            backgroundColor: "#e0ccaec0",
          }}
        />

        {/* Envelope Right Flap */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
            backgroundColor: "#dec9abc0",
          }}
        />

        {/* Envelope Bottom Flap */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
            backgroundColor: "#e6d5c3",
          }}
        />

        {!isOpen && (
          <motion.div 
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-brand-light/60 text-sm tracking-widest uppercase"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to open
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
