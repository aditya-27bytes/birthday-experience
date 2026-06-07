"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PersonalizedIntroProps {
  data: any;
}

import CountUp from "./CountUp";

export function PersonalizedIntro({ data }: PersonalizedIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Dynamic Aurora Background specific to the user's color palette */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div 
          className="aurora-bg w-[60vw] h-[60vw] top-[-10%] left-[-10%]"
          style={{ background: `linear-gradient(120deg, ${data.primaryColorPalette[0]}40 0%, transparent 100%)` }}
        />
        <div 
          className="aurora-bg w-[50vw] h-[50vw] bottom-[-10%] right-[-10%]"
          style={{ background: `linear-gradient(120deg, ${data.primaryColorPalette[1]}40 0%, transparent 100%)` }}
        />
      </div>

      {/* Floating background photos */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {data.photos.slice(0, 3).map((photo: string, i: number) => (
          <motion.div
            key={i}
            className="absolute opacity-20 mix-blend-luminosity rounded-lg overflow-hidden"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + (i % 2) * 60}%`,
              width: "clamp(150px, 20vw, 300px)",
              height: "clamp(200px, 30vw, 400px)",
              rotate: i % 2 === 0 ? -6 : 8,
              y: i % 2 === 0 ? y1 : y2
            }}
          >
            <img src={photo} alt="Memory" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ opacity }}
      >
        <motion.div 
          className="uppercase tracking-[0.3em] text-sm md:text-base text-brand-light/60 mb-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span>{new Date(data.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>Chapter <CountUp from={0} to={data.currentAge} duration={2} separator="," /></span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-editorial text-7xl md:text-[10rem] leading-[0.8] tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-light/50">
            HAPPY<br/>BIRTHDAY
          </h1>
          <h1 className="text-editorial text-6xl md:text-[8rem] leading-[0.9] text-brand-light italic pr-8">
            {data.recipientName}
          </h1>
        </motion.div>

        <motion.div 
          className="mt-16 max-w-xl glass-panel rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-brand-light/90">
            "Today we celebrate your story."
          </p>
          <div className="w-12 h-[1px] bg-brand-light/30 mx-auto mt-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
