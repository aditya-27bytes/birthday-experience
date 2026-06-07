"use client";

import { motion } from "framer-motion";
import { PersonalizedIntro } from "./PersonalizedIntro";
import { MemoryJourney } from "./MemoryJourney";
import { PolaroidWall } from "./PolaroidWall";
import { AnimatedLetter } from "./AnimatedLetter";
import { BalloonWishes } from "./BalloonWishes";
import { MagazineCover } from "./MagazineCover";
import { InteractiveCake } from "./InteractiveCake";
import { MemorySlideshow } from "./MemorySlideshow";
import { FinalSurprise } from "./FinalSurprise";

interface ExperienceContainerProps {
  data: any;
}

export function ExperienceContainer({ data }: ExperienceContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="w-full relative"
    >
      <PersonalizedIntro data={data} />
      <MemoryJourney data={data} />
      <PolaroidWall data={data} />
      <AnimatedLetter data={data} />
      <BalloonWishes data={data} />
      <MagazineCover data={data} />
      <InteractiveCake data={data} />
      <MemorySlideshow data={data} />
      <FinalSurprise data={data} />
      
      {/* Bottom padding for scrolling */}
      <div className="h-[20vh]" />
    </motion.div>
  );
}
