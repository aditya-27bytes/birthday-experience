"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MemorySlideshowProps {
  data: any;
}

export function MemorySlideshow({ data }: MemorySlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.photos.length]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <img 
            src={data.photos[currentIndex]} 
            alt="Memory slide"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-editorial text-4xl md:text-6xl text-white mb-6 tracking-wide drop-shadow-lg">
          Every memory is a piece of art.
        </h2>
        <div className="flex justify-center gap-2 mt-12">
          {data.photos.map((_: any, idx: number) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-1000 ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
