"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from './store/useAppStore';
import GadgetGrid from './components/ui/GadgetGrid';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen pt-24 pb-32 flex flex-col items-center">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-16 px-4 max-w-4xl"
      >
        <h1 className="mb-4">
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient-doraemon">Arcoistry</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-6">
          Artist • Coder • Creator
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed glass-panel p-6 rounded-2xl mb-8">
          Welcome to my 4D Pocket. I blend chemistry, code, and art into interactive experiences.
          Select a timeline in the Chrono-Terminal to explore my gadgets.
        </p>

        {/* Timeline CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Past */}
          <Link
            href="/past"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base
                       overflow-hidden transition-all duration-300
                       border border-amber-400/40 text-amber-300
                       hover:border-amber-300 hover:text-white
                       hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
            style={{ background: 'rgba(251,191,36,0.08)', backdropFilter: 'blur(12px)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(251,191,36,0.15) 50%, transparent 60%)' }} />
            <span className="text-xl">🕰️</span>
            <span className="relative z-10 tracking-wide">The Archive</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>

          {/* Art */}
          <button
            onClick={() => {
              const { setTransitioning } = useAppStore.getState();
              setTransitioning(true);
              setTimeout(() => {
                router.push('/art');
                setTimeout(() => setTransitioning(false), 1000);
              }, 4500); // 4.5 seconds transition
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base
                       overflow-hidden transition-all duration-300
                       border border-rose-400/40 text-rose-300
                       hover:border-rose-300 hover:text-white
                       hover:shadow-[0_0_30px_rgba(251,113,133,0.4)] cursor-pointer text-left"
            style={{ background: 'rgba(251,113,133,0.08)', backdropFilter: 'blur(12px)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(251,113,133,0.15) 50%, transparent 60%)' }} />
            <span className="text-xl">🎨</span>
            <span className="relative z-10 tracking-wide">The Gallery</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>

          {/* Contact */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base
                       overflow-hidden transition-all duration-300
                       border border-purple-400/40 text-purple-300
                       hover:border-purple-300 hover:text-white
                       hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            style={{ background: 'rgba(168,85,247,0.08)', backdropFilter: 'blur(12px)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(168,85,247,0.15) 50%, transparent 60%)' }} />
            <span className="text-xl">🛸</span>
            <span className="relative z-10 tracking-wide">The Hub</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>

          {/* Future */}
          <Link
            href="/future"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base
                       overflow-hidden transition-all duration-300
                       border border-cyan-400/40 text-cyan-300
                       hover:border-cyan-300 hover:text-white
                       hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            style={{ background: 'rgba(34,211,238,0.08)', backdropFilter: 'blur(12px)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(34,211,238,0.15) 50%, transparent 60%)' }} />
            <span className="text-xl">🚀</span>
            <span className="relative z-10 tracking-wide">The Horizon</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gadget Grid */}
      <div className="w-full relative z-10">
        <GadgetGrid />
      </div>

    </div>
  );
}

