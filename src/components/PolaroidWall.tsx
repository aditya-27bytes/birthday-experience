"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface PolaroidWallProps {
  data: any;
}

import CurvedLoop from "./CurvedLoop";

export function PolaroidWall({ data }: PolaroidWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // A deterministic pseudo-random function so it doesn't shift on re-renders
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-editorial text-5xl md:text-7xl text-brand-light"
        >
          Scrapbook
        </motion.h2>
        <p className="text-brand-light/50 mt-4 tracking-widest uppercase text-sm">Pieces of time</p>
      </div>

      <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto px-4 gap-y-16 gap-x-6 md:gap-x-12 pb-32">
        {data.photos.map((photo: string, i: number) => {
          // Generate unique but consistent layout values based on index
          const isPolaroid = pseudoRandom(i) > 0.5;
          const rotation = (pseudoRandom(i + 10) * 30) - 15; // -15 to +15 deg
          const scale = (pseudoRandom(i + 40) * 0.1) + 0.95; // 0.95 to 1.05
          const yOffset = (pseudoRandom(i + 30) * 60) - 30; // -30px to +30px
          const zIndex = Math.floor(pseudoRandom(i + 50) * 10);
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: rotation - 10 }}
              whileInView={{ opacity: 1, y: yOffset, rotate: rotation }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: scale * 1.1, zIndex: 50, rotate: 0 }}
              transition={{ duration: 0.8, delay: (i % 5) * 0.1 }}
              className={`relative cursor-pointer shadow-2xl shrink-0 transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
                isPolaroid 
                  ? 'bg-white p-4 pb-16 rounded-sm' 
                  : 'bg-[#f4f0e6] p-2 rounded-md border border-black/5'
              }`}
              style={{
                width: 'clamp(200px, 25vw, 300px)',
                zIndex
              }}
            >
              <div className="relative overflow-hidden w-full aspect-square">
                <img 
                  src={photo} 
                  alt={`Memory ${i}`} 
                  className="w-full h-full object-cover filter contrast-110 saturate-50 sepia-[.2]" 
                />
                
                {/* Film grain overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />
              </div>
              
              {isPolaroid && (
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <p className="font-['Caveat',cursive] text-2xl text-black/80 -rotate-2">
                    {pseudoRandom(i + 60) > 0.5 ? 'Remember this?' : 'Good times'}
                  </p>
                </div>
              )}
              
              {/* Tape effect for non-polaroids */}
              {!isPolaroid && pseudoRandom(i + 70) > 0.5 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-3 shadow-sm z-10" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Giant Curved Background Marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-10 pointer-events-none z-0">
        <CurvedLoop 
          marqueeText="UNFORGETTABLE MEMORIES ✦ TIMELESS MOMENTS ✦ "
          speed={2} 
          curveAmount={400} 
          direction="left"
          interactive={false}
          className="text-brand-light text-[10rem] md:text-[14rem] font-bold uppercase"
        />
      </div>
    </section>
  );
}
