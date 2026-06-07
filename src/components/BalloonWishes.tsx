"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";

interface BalloonWishesProps {
  data: any;
}

const Balloon = ({ 
  message, 
  color, 
  delay,
  xPos 
}: { 
  message: string; 
  color: string; 
  delay: number;
  xPos: number;
}) => {
  const [isPopped, setIsPopped] = useState(false);
  const [popPos, setPopPos] = useState<{ x: number, y: number } | null>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  const pop = () => {
    if (isPopped) return;
    
    if (balloonRef.current) {
      const rect = balloonRef.current.getBoundingClientRect();
      const section = balloonRef.current.closest('section');
      
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        // Calculate position relative to the section
        setPopPos({
          x: rect.left - sectionRect.left + rect.width / 2,
          y: rect.top - sectionRect.top + rect.height / 2
        });
      }

      const cx = (rect.left + rect.width / 2) / window.innerWidth;
      const cy = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: cx, y: cy },
        colors: [color, '#ffffff']
      });
    }
    
    setIsPopped(true);
  };

  return (
    <AnimatePresence>
      {!isPopped ? (
        <motion.div
          ref={balloonRef}
          className="absolute cursor-pointer"
          style={{ left: `${xPos}%`, bottom: '-20%' }}
          initial={{ y: 0 }}
          animate={{ 
            y: ['0vh', '-120vh'],
            x: ['0px', '20px', '-20px', '0px']
          }}
          transition={{ 
            y: { duration: 15, delay, ease: "linear", repeat: Infinity },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={pop}
        >
          {/* Balloon shape */}
          <div 
            className="w-16 h-20 md:w-24 md:h-32 rounded-t-full rounded-b-[40%] relative shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: color }}
          >
            {/* Highlight */}
            <div className="absolute top-2 right-4 w-4 h-8 bg-white/30 rounded-full blur-[2px] -rotate-12" />
            
            {/* Knot */}
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-3 rounded-b-full"
              style={{ backgroundColor: color }}
            />
            
            {/* String */}
            <svg className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-32 overflow-visible">
              <path 
                d="M16 0 C 16 20, 0 40, 16 60 C 32 80, 0 100, 16 128" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </motion.div>
      ) : (
        popPos && (
          <motion.div
            className="absolute text-center px-4 w-64 max-w-[80vw] z-50 pointer-events-none"
            style={{ 
              left: popPos.x, 
              top: popPos.y,
              transform: 'translate(-50%, -50%)' 
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="glass-panel p-4 rounded-xl text-brand-light shadow-2xl bg-black/40 backdrop-blur-md">
              <p className="font-['Caveat',cursive] text-2xl drop-shadow-md">{message}</p>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export function BalloonWishes({ data }: BalloonWishesProps) {
  // Extract all wishes/quotes to map to balloons
  const messages = [
    data.memories.whySpecial,
    ...data.quotes,
    "Make a wish! ✨",
    "Here's to another year of adventures."
  ];

  const colors = [
    data.primaryColorPalette[0],
    data.primaryColorPalette[1],
    '#e0c3fc', // Lilac
    '#f6d365', // Gold
    '#ff9a9e'  // Pink
  ];

  return (
    <section className="relative w-full h-[150vh] bg-transparent overflow-hidden">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none z-10">
        <div className="text-center z-10">
          <h2 className="text-editorial text-4xl md:text-6xl text-brand-light mb-4">
            Pop a Balloon
          </h2>
          <p className="text-brand-light/50 tracking-widest text-sm uppercase">Find your wishes</p>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        {messages.map((msg, i) => (
          <Balloon 
            key={i} 
            message={msg} 
            color={colors[i % colors.length]} 
            delay={i * 2} // Stagger appearance
            xPos={15 + (i * 15) % 70} // Spread across screen horizontally
          />
        ))}
      </div>
    </section>
  );
}
