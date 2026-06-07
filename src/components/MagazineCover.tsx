"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface MagazineCoverProps {
  data: any;
}

export function MagazineCover({ data }: MagazineCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick a portrait-like photo for the cover, or fallback to the first photo
  const coverPhoto = data.photos[1] || data.photos[0];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#ece6df] text-brand-dark flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden"
    >
      <motion.div 
        className="relative w-full max-w-[800px] aspect-[3/4] bg-white shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cover Photo */}
        <div className="absolute inset-0 p-4 pb-12">
          <img 
            src={coverPhoto} 
            alt="Cover Star" 
            className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.9]"
          />
        </div>

        {/* Masthead (Magazine Name) */}
        <div className="absolute top-8 left-0 right-0 text-center mix-blend-difference text-white pointer-events-none z-10">
          <h2 className="text-editorial text-[15vw] md:text-[12rem] leading-[0.75] tracking-tighter uppercase font-bold">
            VOUGE
          </h2>
          <p className="tracking-[0.4em] text-sm md:text-base mt-2 opacity-90">
            THE {data.recipientName.toUpperCase()} ISSUE
          </p>
        </div>

        {/* Floating Text Elements */}
        <div className="absolute bottom-16 left-8 text-white mix-blend-difference z-20">
          <ul className="space-y-1 font-sans font-bold text-lg md:text-2xl uppercase tracking-wider">
            <li>Dreamer</li>
            <li>Achiever</li>
            <li>Friend</li>
            <li className="text-brand-primary">Inspiration</li>
          </ul>
        </div>

        <div className="absolute bottom-16 right-8 text-right text-white mix-blend-difference z-20 max-w-[200px]">
          <p className="font-serif text-xl md:text-3xl italic leading-tight">
            "A year older, a year bolder."
          </p>
          <p className="font-sans text-xs uppercase tracking-widest mt-4">
            Vol. {data.currentAge} • 2026
          </p>
        </div>

        {/* Barcode / Details */}
        <div className="absolute bottom-4 left-8 right-8 flex justify-between items-end border-t border-black/20 pt-2 z-20 text-black">
          <div className="flex gap-1 h-8 opacity-80">
            {/* Fake barcode */}
            {[1,3,1,2,1,4,1,1,2,1,3,1].map((w, i) => (
              <div key={i} className="bg-black h-full" style={{ width: `${w * 2}px` }} />
            ))}
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Special Edition
          </p>
        </div>
        
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay" />
      </motion.div>
    </section>
  );
}
