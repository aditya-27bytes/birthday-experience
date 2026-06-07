"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBirthdayStore, BirthdayData } from "@/store/useBirthdayStore";
import { Plus, Trash2, ArrowRight, ArrowLeft, Sparkles, Copy, Check, ExternalLink } from "lucide-react";

const STEPS = ["Basics", "Memories", "Timeline", "Photos", "Letter"];

export default function CreateExperience() {
  const router = useRouter();
  const { setData } = useBirthdayStore();
  const [step, setStep] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<Partial<BirthdayData>>({
    id: "custom",
    recipientName: "",
    nickname: "",
    magazineName: "VOUGE",
    dateOfBirth: "",
    currentAge: 18,
    relationship: "",
    primaryColorPalette: ["#ff5e62", "#ff9966"],
    memories: {
      firstMeeting: "",
      bestMemory: "",
      funniestMoment: "",
      biggestAchievement: "",
      whySpecial: "",
    },
    timeline: [],
    photos: [],
    letter: "",
    quotes: ["", ""],
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    const finalData = { ...formData };
    
    // Fallbacks to prevent crashes
    if (!finalData.photos || finalData.photos.length === 0) {
      finalData.photos = [
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1475721025505-111fb5799ae6?q=80&w=800&auto=format&fit=crop"
      ];
    }
    
    setData(finalData as BirthdayData);
    setIsGenerated(true);
  };

  const handleCopy = () => {
    const url = window.location.origin + "/birthday/custom";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (img.width > MAX_WIDTH) {
            newWidth = MAX_WIDTH;
            newHeight = img.height * (MAX_WIDTH / img.width);
          }
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.5)); // Compress heavily for localStorage limit
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = [...(formData.photos || [])];
      for (let i = 0; i < e.target.files.length; i++) {
        if (newPhotos.length >= 10) break; // limit to 10 for local storage
        const resized = await resizeImage(e.target.files[i]);
        newPhotos.push(resized);
      }
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  return (
    <main className="min-h-screen bg-brand-dark text-brand-light flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <h1 className="text-editorial text-4xl md:text-5xl mb-4">Create Experience</h1>
          <div className="flex gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-brand-primary" : "bg-white/10"}`} />
            ))}
          </div>
          <p className="mt-4 text-brand-light/60 uppercase tracking-widest text-sm">Step {step + 1}: {STEPS[step]}</p>
        </div>

        <div className="glass-panel p-8 pb-24 rounded-3xl min-h-[500px] relative flex flex-col justify-center">
          {!isGenerated ? (
            <>
              <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Recipient Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.recipientName} onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Nickname</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.nickname} onChange={(e) => setFormData({ ...formData, nickname: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Date of Birth</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Turning Age</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.currentAge} onChange={(e) => setFormData({ ...formData, currentAge: parseInt(e.target.value) })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2 text-brand-light/70">Magazine Name (Cover Masthead)</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary uppercase"
                      placeholder="e.g. VOUGE, TIME, FORBES"
                      value={formData.magazineName} onChange={(e) => setFormData({ ...formData, magazineName: e.target.value })} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-brand-light/70">How you met</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary h-24"
                    value={formData.memories?.firstMeeting} onChange={(e) => setFormData({ ...formData, memories: { ...formData.memories!, firstMeeting: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-brand-light/70">Funniest Moment</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary h-24"
                    value={formData.memories?.funniestMoment} onChange={(e) => setFormData({ ...formData, memories: { ...formData.memories!, funniestMoment: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-brand-light/70">Why they are special</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary h-24"
                    value={formData.memories?.whySpecial} onChange={(e) => setFormData({ ...formData, memories: { ...formData.memories!, whySpecial: e.target.value } })} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl">Timeline Events</h3>
                  <button onClick={() => setFormData({ ...formData, timeline: [...(formData.timeline || []), { year: "", title: "", description: "", image: "" }] })}
                    className="flex items-center gap-2 text-sm bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full">
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.timeline?.map((event, idx) => (
                    <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4 relative">
                      <button onClick={() => { const newTimeline = [...formData.timeline!]; newTimeline.splice(idx, 1); setFormData({ ...formData, timeline: newTimeline }); }}
                        className="absolute top-4 right-4 text-brand-light/40 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Year (e.g. 2020)" className="bg-white/5 border border-white/10 rounded p-2 text-sm"
                          value={event.year} onChange={(e) => { const nt = [...formData.timeline!]; nt[idx].year = e.target.value; setFormData({ ...formData, timeline: nt }); }} />
                        <input type="text" placeholder="Title" className="bg-white/5 border border-white/10 rounded p-2 text-sm"
                          value={event.title} onChange={(e) => { const nt = [...formData.timeline!]; nt[idx].title = e.target.value; setFormData({ ...formData, timeline: nt }); }} />
                      </div>
                      <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm h-20"
                        value={event.description} onChange={(e) => { const nt = [...formData.timeline!]; nt[idx].description = e.target.value; setFormData({ ...formData, timeline: nt }); }} />
                      <div className="flex items-center gap-4">
                        {event.image ? (
                          <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                            <img src={event.image} alt="Timeline" className="w-full h-full object-cover" />
                            <button onClick={() => { const nt = [...formData.timeline!]; nt[idx].image = ""; setFormData({ ...formData, timeline: nt }); }} className="absolute inset-0 bg-black/50 flex items-center justify-center text-red-400 opacity-0 hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        ) : (
                          <div className="w-full relative">
                            <input type="file" accept="image/*" className="hidden" id={`timeline-photo-${idx}`} onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const resized = await resizeImage(e.target.files[0]);
                                const nt = [...formData.timeline!];
                                nt[idx].image = resized;
                                setFormData({ ...formData, timeline: nt });
                              }
                            }} />
                            <label htmlFor={`timeline-photo-${idx}`} className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 rounded p-3 text-sm hover:bg-white/10 transition-colors text-brand-light/70">
                              <Plus className="w-4 h-4" /> Upload Event Photo
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h3 className="text-xl mb-4 font-editorial">Magazine Cover Photo</h3>
                  {formData.magazinePhoto ? (
                    <div className="relative w-32 md:w-48 aspect-[3/4] rounded-lg overflow-hidden group shadow-xl">
                      <img src={formData.magazinePhoto} alt="Magazine Cover" className="w-full h-full object-cover" />
                      <button onClick={() => setFormData({ ...formData, magazinePhoto: "" })} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400">
                        <Trash2 className="w-8 h-8" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-brand-primary/50 transition-colors max-w-sm">
                      <input type="file" accept="image/*" className="hidden" id="magazine-photo" onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const resized = await resizeImage(e.target.files[0]);
                          setFormData({ ...formData, magazinePhoto: resized });
                        }
                      }} />
                      <label htmlFor="magazine-photo" className="cursor-pointer flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4 text-brand-primary">
                          <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-base">Upload Cover Star Photo</span>
                        <span className="text-xs text-brand-light/50 mt-2">Recommended: A vertical portrait</span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl mb-4 font-editorial">Memory Gallery</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-brand-primary/50 transition-colors">
                    <input type="file" multiple accept="image/*" className="hidden" id="photo-upload" onChange={handlePhotoUpload} />
                    <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4 text-brand-primary">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Click to Upload General Photos</span>
                      <span className="text-sm text-brand-light/50 mt-2">Up to 10 photos (they will be compressed for local preview)</span>
                    </label>
                  </div>
                </div>
                
                {formData.photos && formData.photos.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mt-8">
                    {formData.photos.map((p, i) => (
                      <div key={i} className="aspect-square relative rounded-lg overflow-hidden group">
                        <img src={p} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button onClick={() => {
                            const phts = [...formData.photos!];
                            phts.splice(i, 1);
                            setFormData({ ...formData, photos: phts });
                          }} className="text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-brand-light/70">Personalized Letter</label>
                  <p className="text-xs text-brand-light/40 mb-4">This will be handwritten in the 3D envelope.</p>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-brand-primary h-64 font-serif leading-relaxed"
                    value={formData.letter} onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                    placeholder="Dear Priya..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Quote 1 (For balloons)</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.quotes?.[0]} onChange={(e) => { const q = [...formData.quotes!]; q[0] = e.target.value; setFormData({ ...formData, quotes: q }); }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-brand-light/70">Quote 2</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-brand-primary"
                      value={formData.quotes?.[1]} onChange={(e) => { const q = [...formData.quotes!]; q[1] = e.target.value; setFormData({ ...formData, quotes: q }); }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-8 left-8 right-8 flex justify-between">
            <button onClick={handlePrev} disabled={step === 0} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${step === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"}`}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-brand-light text-brand-dark rounded-full font-medium hover:scale-105 transition-transform">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleFinish} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,94,98,0.3)]">
                Generate Experience <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center w-full min-h-[400px] space-y-6"
            >
              <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mb-4 shadow-[0_0_30px_rgba(255,94,98,0.2)]">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-editorial text-brand-light">Experience Ready!</h2>
              <p className="text-brand-light/60 max-w-md text-lg">
                Your personalized birthday journey has been securely generated. Share this unique link with <span className="text-brand-primary italic">{formData.recipientName || "them"}</span>:
              </p>
              
              <div className="flex items-center gap-2 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-2 mt-4 shadow-inner">
                <input 
                  type="text" 
                  readOnly 
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/birthday/custom`}
                  className="bg-transparent flex-1 outline-none px-4 text-brand-light/80 text-sm md:text-base font-mono"
                />
                <button 
                  onClick={handleCopy}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                  title="Copy link"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => router.push("/birthday/custom")}
                  className="flex items-center gap-2 px-8 py-4 bg-brand-light text-brand-dark rounded-full font-medium hover:scale-105 transition-transform shadow-xl"
                >
                  Preview Experience <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
