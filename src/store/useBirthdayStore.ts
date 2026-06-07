import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface BirthdayData {
  id: string;
  recipientName: string;
  nickname: string;
  magazineName?: string;
  magazinePhoto?: string;
  dateOfBirth: string;
  currentAge: number;
  relationship: string;
  primaryColorPalette: string[];
  memories: {
    firstMeeting: string;
    bestMemory: string;
    funniestMoment: string;
    biggestAchievement: string;
    whySpecial: string;
  };
  timeline: TimelineEvent[];
  photos: string[];
  letter: string;
  quotes: string[];
}

interface BirthdayStore {
  data: BirthdayData | null;
  setData: (data: BirthdayData) => void;
  clearData: () => void;
}

export const useBirthdayStore = create<BirthdayStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
      clearData: () => set({ data: null }),
    }),
    {
      name: 'birthday-storage',
    }
  )
);
