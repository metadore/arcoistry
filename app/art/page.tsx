"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, Info, Sparkles, BookOpen } from 'lucide-react';

interface ArtCard {
  id: number;
  title: string;
  story: string;
  about: string;
  image: string;
  color: string;
}

const ART_STORIES = [
  { 
    story: "Created during a 14-hour coding marathon. I think I was hallucinating by the end.", 
    about: "This piece explores the chaotic intersection of sleep deprivation and creative flow. The brushstrokes mimic the jittery feeling of a fourth espresso." 
  },
  { 
    story: "Inspired by the structural beauty of a C++ class hierarchy. Or maybe it's just a cool shape.", 
    about: "An abstract representation of inheritance and polymorphism. The layers signify how objects evolve from their base forms in a digital ecosystem." 
  },
  { 
    story: "I tried to explain this to my parents. They asked if I was still going to graduate.", 
    about: "A study in non-traditional communication. It challenges the viewer to find meaning in the complex structures, much like a parent reading code." 
  },
  { 
    story: "A visual representation of what my brain feels like when the compiler actually works on the first try.", 
    about: "Captures the rare, euphoric moment of pure logical alignment. The vibrant colors represent the dopamine hit of a successful build." 
  },
  { 
    story: "Ultrasonic sensors and neon paint. This is what happens when you don't have a social life.", 
    about: "Blending hardware aesthetics with traditional art. It celebrates the beauty of electronic components that usually remain hidden inside black boxes." 
  },
  { 
    story: "Chemistry + Code + Desperation = This masterpiece.", 
    about: "The culmination of a multidisciplinary crisis. It visualizes chemical bonds as digital nodes, bridging the gap between two different worlds." 
  },
  { 
    story: "I named this 'Segmentation Fault'. Because like my life, it has no clear boundary.", 
    about: "A deep dive into the fragility of systems. The intentional glitches and bleeding edges represent the points where logic breaks down." 
  },
  { 
    story: "Created while waiting for my model to finish training. It took 3 days. I took 30 naps.", 
    about: "A meditation on patience and time. The swirling patterns reflect the cyclical nature of waiting for algorithms to reach convergence." 
  },
  { 
    story: "The union of molecular structures and digital art. Science has never looked so messy.", 
    about: "Explores the organic geometry of nature through a digital lens. It suggests that even the most 'perfect' science has a chaotic, artistic soul." 
  },
  { 
    story: "A card-carrying nerd's interpretation of a sunset. Mostly binary, but with pretty colors.", 
    about: "Reimagines the natural world through pixelation and data. It asks if our perception of beauty changes when we view the world through code." 
  }
];

const COLORS = [
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-indigo-500 to-violet-500"
];

const ART_CARDS: ArtCard[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Arcoistry Artifact #${i + 1}`,
  story: ART_STORIES[i % ART_STORIES.length].story,
  about: ART_STORIES[i % ART_STORIES.length].about,
  image: `/images/art/art_${i + 1}.jpeg`,
  color: COLORS[i % COLORS.length]
}));

export default function ArtPage() {
  const [activeCard, setActiveCard] = useState<ArtCard | null>(null);
  const [isDispensing, setIsDispensing] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);

  const dispenseCard = () => {
    if (isDispensing) return;
    setIsDispensing(true);
    setActiveCard(null);
    setShowDetailedInfo(false);
    
    setTimeout(() => {
      const nextCard = ART_CARDS[Math.floor(Math.random() * ART_CARDS.length)];
      setActiveCard(nextCard);
      setIsDispensing(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col items-center justify-center p-6 bg-black/20">
      
      {/* ── Live Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-20 w-full h-full object-cover"
        style={{ opacity: 0.8 }}
      >
        <source src="/videos/art/288657_medium.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="fixed inset-0 -z-10 bg-black/40" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />

      {/* ── Top Navigation ── */}
      <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono font-bold
                     border border-white/10 bg-black/40 backdrop-blur-xl text-white/60
                     hover:bg-white/10 hover:text-white transition-all duration-300 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          The Lab
        </Link>

        <button
          onClick={() => setShowAbout(!showAbout)}
          className="p-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-white/10 transition-all flex items-center gap-2 group shadow-xl"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-[10px] font-black uppercase tracking-widest text-white/50">Bio</span>
          <Info className="w-5 h-5 text-cyan-400" />
        </button>
      </div>

      {/* ── Bio Overlay ── */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-2xl glass-panel p-10 md:p-14 rounded-[3rem] border-2 border-white/10 relative bg-[#0a0a1a]/90 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
                🎒
              </div>
              <h2 className="text-4xl font-black mb-8 text-center tracking-tighter italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">THE ARCOIST</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-medium">
                <p>
                  I’m 19, currently studying Computer Science Engineering, which is just a fancy way of saying 
                  I spend 90% of my time arguing with compilers and the other 10% questioning my life choices.
                </p>
                <p>
                  I created <span className="text-cyan-400 font-bold">Arcoistry</span> because, clearly, simply getting a degree wasn’t enough stress for me. 
                  It’s the unholy union of chemistry, coding, and art—a multidisciplinary mess I’ve curated.
                </p>
                <p className="italic text-gray-400 text-base">
                  "I’m a card-carrying nerd, a professional introvert, and a hermit who prefers the company of 
                  ultrasonic sensors to actual people."
                </p>
              </div>
              <button 
                onClick={() => setShowAbout(false)}
                className="mt-10 w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-xs tracking-[0.3em] hover:bg-white/10 transition-all uppercase"
              >
                Return to Gallery
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10 max-w-7xl w-full">
        
        {/* ── Vending Machine ── */}
        <div className="flex flex-col items-center">
          <div className="relative w-72 h-[450px] bg-[#080812] rounded-[3.5rem] border-[8px] border-[#15152a] shadow-[0_0_100px_rgba(34,211,238,0.1)] flex flex-col overflow-hidden">
            {/* Display Screen */}
            <div className="mt-10 mx-8 h-36 bg-black rounded-3xl border border-cyan-500/10 p-6 flex flex-col items-center justify-center shadow-inner">
              <div className="text-[9px] font-mono text-cyan-400/40 mb-3 tracking-[0.2em] uppercase">Status: Online</div>
              <div className="text-center">
                {isDispensing ? (
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-sm font-black text-yellow-400 tracking-tighter"
                  >
                    FETCHING...
                  </motion.div>
                ) : (
                  <div className="text-xs font-bold text-white/20 tracking-widest uppercase">Select Art</div>
                )}
              </div>
            </div>

            {/* Buttons Grid */}
            <div className="mt-10 grid grid-cols-2 gap-5 px-10">
              {[1, 2, 3, 4].map((num) => (
                <motion.button
                  key={num}
                  whileTap={{ scale: 0.8, backgroundColor: '#0ea5e9' }}
                  onClick={dispenseCard}
                  className="w-full aspect-square rounded-2xl bg-[#15152a] border-b-[6px] border-black/80 flex items-center justify-center text-white text-lg font-black transition-all hover:bg-[#1c1c3a] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  {num}
                </motion.button>
              ))}
            </div>

            {/* Dispense Slot */}
            <div className="mt-auto mb-10 mx-8 h-16 bg-black/40 rounded-2xl border-t-2 border-white/5 flex items-center justify-center">
               <div className="w-1/2 h-1.5 bg-cyan-400/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={isDispensing ? { x: [-100, 100] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-full h-full bg-cyan-400/50"
                  />
               </div>
            </div>
          </div>
          <p className="mt-8 font-mono text-[9px] text-gray-600 tracking-[0.5em] uppercase">Arcoistry Art Matrix</p>
        </div>

        {/* ── Large Flash Card ── */}
        <div className="flex-1 flex items-center justify-center min-h-[650px] w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {activeCard ? (
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, x: -200, rotate: -20, scale: 0.6 }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, rotate: 30, scale: 0.6 }}
                transition={{ type: "spring", damping: 15, stiffness: 80 }}
                className="w-full"
              >
                <div className={`p-2 rounded-[3.5rem] bg-gradient-to-br ${activeCard.color} shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]`}>
                  <div className="bg-[#02020a] rounded-[3.2rem] overflow-hidden p-6 md:p-8">
                    {/* Art Image */}
                    <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-black relative group border-2 border-white/5 shadow-2xl">
                      <img 
                        src={activeCard.image} 
                        alt={activeCard.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-6 left-6">
                        <span className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black tracking-[0.2em] uppercase border border-white/10 text-cyan-400">
                          Relic {activeCard.id}/15
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="pt-10 pb-4 px-4">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-black tracking-tighter">
                          {activeCard.title}
                        </h3>
                        <Sparkles className="w-6 h-6 text-yellow-400 shrink-0" />
                      </div>

                      {/* Content Toggle (Story vs About) */}
                      <div className="space-y-6">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-white font-medium italic text-lg leading-relaxed">
                            "{activeCard.story}"
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-cyan-400 font-black text-xs tracking-widest uppercase">
                            <BookOpen className="w-4 h-4" /> About This Drawing
                          </div>
                          <p className="text-gray-400 text-base leading-relaxed font-medium">
                            {activeCard.about}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex justify-between items-center px-4">
                        <div className="flex gap-2">
                           {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10" />)}
                        </div>
                        <button 
                          onClick={() => setActiveCard(null)}
                          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-white/50 hover:text-white"
                        >
                          Dismiss Artifact
                        </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : !isDispensing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 mx-auto rounded-3xl bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(34,211,238,0.1)] mb-10"
                >
                  🛸
                </motion.div>
                <h2 className="text-2xl font-black text-white/40 tracking-tighter uppercase">Art Dispenser Ready</h2>
                <p className="text-gray-600 font-mono text-xs mt-3 tracking-widest">Select a frequency on the vending machine</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
