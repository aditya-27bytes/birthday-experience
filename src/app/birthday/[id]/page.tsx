"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_BIRTHDAY_DATA } from "@/data/mockData";
import { GiftBoxSequence } from "@/components/GiftBoxSequence";
import { ExperienceContainer } from "@/components/ExperienceContainer";
import { AnimatePresence } from "framer-motion";
import { useBirthdayStore } from "@/store/useBirthdayStore";
import Aurora from "@/components/Aurora";

export default function BirthdayExperiencePage() {
  const params = useParams();
  const [isOpened, setIsOpened] = useState(false);
  const { data: storeData } = useBirthdayStore();
  
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (params.id === "custom" && storeData) {
      setData(storeData);
    } else {
      setData(MOCK_BIRTHDAY_DATA);
    }
  }, [params.id, storeData]);

  if (!data) return null;

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-brand-dark text-brand-light">
      {/* Aurora Background Layer */}
      <div className="fixed inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
        <Aurora 
          colorStops={["#ff5e62", "#ff9966", "#3A29FF"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <GiftBoxSequence key="giftbox" onOpen={() => setIsOpened(true)} data={data} />
          ) : (
            <ExperienceContainer key="experience" data={data} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
