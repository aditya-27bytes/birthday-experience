"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MemoryJourneyProps {
  data: any;
}

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 py-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Center Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block w-3 h-3 rounded-full bg-brand-primary border-[3px] border-brand-dark z-10 shadow-[0_0_10px_rgba(255,94,98,0.5)]" />

      <motion.div 
        style={{ opacity, y }}
        className="flex-1 w-full relative"
      >
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden glass-panel group">
          <motion.img 
            style={{ scale }}
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Timeline Line Connector */}
        <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-8 h-[1px] bg-brand-light/30 ${isEven ? '-right-8' : '-left-8'}`} />
      </motion.div>

      <motion.div 
        style={{ opacity, y }}
        className="flex-1 text-center md:text-left space-y-6 px-4"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-brand-light/20 bg-brand-light/5 text-sm tracking-widest text-brand-light/70">
          {item.year}
        </div>
        <h3 className="text-editorial text-4xl md:text-5xl text-brand-light">
          {item.title}
        </h3>
        <p className="text-lg text-brand-light/60 font-light leading-relaxed max-w-lg">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
};

export function MemoryJourney({ data }: MemoryJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-editorial text-5xl md:text-7xl mb-6 text-brand-light"
        >
          The Story of {data.recipientName}
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] w-24 bg-brand-light/30 mx-auto"
        />
      </div>

      <div className="relative">
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-brand-light/10 to-transparent hidden md:block" />
        
        <div className="flex flex-col gap-12 md:gap-0">
          {data.timeline.map((item: any, index: number) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
