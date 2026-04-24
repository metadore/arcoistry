"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { projectsData, Project } from '@/data/projects';
import GadgetManual from '@/components/ui/GadgetManual';
import { useAppStore } from '@/store/useAppStore';
import { fetchGithubRepos } from '@/lib/github';
import { useEffect } from 'react';

const CATEGORIES = ['All', 'Coding', 'Research', 'Chemistry', 'Art / Design', 'Biology', 'Nuclear Science'];

const CATEGORY_ICONS: Record<string, string> = {
  Coding: '💻',
  Research: '🔬',
  Chemistry: '⚗️',
  'Art / Design': '🎨',
  Biology: '🧬',
  'Nuclear Science': '⚛️',
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ParallaxCard({ project, onClick, activeCategory }: { project: Project, onClick: () => void, activeCategory: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Take-Copter lift: Cards float up slightly as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      layout
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      style={{ y }}
      whileHover={{ y: -7, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(15,10,35,0.55)',
        border: '1px solid rgba(168,85,247,0.18)',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        y // Apply the parallax transform
      }}
    >
      {/* Take-Copter indicator (subtle glow top right) */}
      <div className="absolute -top-1 -right-1 w-12 h-12 bg-purple-500/10 blur-xl group-hover:bg-purple-400/20 transition-colors" />
      
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 2 
        }}
        className="h-full w-full"
      >
        {/* Top colour stripe */}
        <div
          className="absolute top-0 inset-x-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)',
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(168,85,247,0.07), rgba(129,140,248,0.04))',
          }}
        />

        <div className="p-6 relative z-10 h-full flex flex-col">
          {/* Category + Timeline badge */}
          <div className="flex justify-between items-start mb-4">
            <span
              className="text-xs font-mono px-2 py-1 rounded text-purple-300"
              style={{
                background: 'rgba(168,85,247,0.12)',
                border: '1px solid rgba(168,85,247,0.22)',
              }}
            >
              {CATEGORY_ICONS[project.category] ?? '📦'} {project.category}
            </span>
            <span className="text-[10px] text-purple-500/60 font-mono tracking-widest flex items-center gap-1">
              <span className="animate-spin-slow">🚁</span> PAST
            </span>
          </div>

          {/* Gadget name */}
          <h3 className="text-xl font-bold mb-1 text-white group-hover:text-purple-300 transition-colors duration-300">
            {project.gadgetName}
          </h3>

          {/* Project title */}
          <p className="text-sm text-gray-400 line-clamp-3 mb-4 leading-relaxed">
            {project.title}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full font-mono text-purple-300/60"
                style={{
                  background: 'rgba(168,85,247,0.07)',
                  border: '1px solid rgba(168,85,247,0.14)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-[11px] font-mono px-3 py-1 rounded-lg text-purple-300
                           hover:text-white transition-colors"
                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}
              >
                GitHub ↗
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-[11px] font-mono px-3 py-1 rounded-lg text-purple-300
                           hover:text-white transition-colors"
                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}
              >
                Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Doraemon speech bubble on hover */}
        <div
          className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0
                     transition-transform duration-300 ease-out pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10,5,30,0.97) 60%, transparent)',
          }}
        >
          <div
            className="text-black text-xs p-2 rounded-lg rounded-bl-none relative"
            style={{ background: 'rgba(240,230,255,0.95)' }}
          >
            "{project.doraemonQuote}"
            <div
              className="absolute bottom-0 left-0 -ml-2 mb-1 w-0 h-0
                         border-t-[8px] border-t-purple-100
                         border-l-[8px] border-l-transparent"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PastPage() {
  const { setActiveGadgetId, activeGadgetId, projects, setProjects } = useAppStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      setIsLoading(true);
      try {
        const githubRepos = await fetchGithubRepos('metadore');
        
        const currentProjects = useAppStore.getState().projects;
        const existingUrls = new Set(currentProjects.map(p => p.githubUrl?.toLowerCase()).filter(Boolean));
        const newRepos = githubRepos.filter(repo => !existingUrls.has(repo.githubUrl?.toLowerCase()));
        
        if (newRepos.length > 0) {
          setProjects([...currentProjects, ...newRepos]);
        }
      } catch (error) {
        console.error("Failed to sync archives:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadRepos();
  }, [setProjects]);

  const pastProjects = useMemo(() =>
    projects.filter(p => {
      const matchTimeline = p.timeline === 'PAST';
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchTimeline && matchCategory;
    }),
    [activeCategory, projects]
  );

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* ── Tokyo Rainy Night Video Background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-20 w-full h-full object-cover"
        style={{ opacity: 0.75, pointerEvents: 'none' }}
      >
        <source src="/videos/past/bg.mp4" type="video/mp4" />
      </video>

      {/* Deep night-rain overlay — dark blue-purple tint to match the Tokyo mood */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,20,0.55) 0%, rgba(10,5,30,0.35) 50%, rgba(5,5,20,0.6) 100%)',
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Back to Home ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold
                     border border-purple-400/40 bg-black/40 backdrop-blur-md text-purple-300
                     hover:bg-purple-500/20 hover:border-purple-300 transition-all duration-300
                     shadow-[0_0_12px_rgba(168,85,247,0.2)]"
        >
          ← Back to Home
        </Link>
      </motion.div>

      {/* ── Hero ── */}
      <div className="pt-28 pb-12 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          {/* Chrono badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mb-5 px-5 py-1.5 rounded-full text-xs font-mono tracking-widest font-bold
                       border border-purple-400/50 text-purple-300"
            style={{
              background: 'rgba(168,85,247,0.08)',
              boxShadow: '0 0 20px rgba(168,85,247,0.25)',
            }}
          >
            ◈ CHRONO-TERMINAL · PAST TIMELINE
          </motion.span>

          <h1
            className="mb-4 font-extrabold leading-tight"
            style={{ textShadow: '0 0 50px rgba(168,85,247,0.45)' }}
          >
            <span
              style={{
                background: 'linear-gradient(90deg, #c084fc, #a78bfa, #818cf8, #c084fc)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Archive
            </span>
          </h1>

          <p
            className="text-lg text-purple-100/65 max-w-2xl mx-auto leading-relaxed rounded-2xl p-6"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(168,85,247,0.12)',
              backdropFilter: 'blur(14px)',
            }}
          >
            Relics from another era — gadgets forged before the present moment.
            Each entry is a page from Arcoistry's 4D Pocket history, preserved in the rain-soaked
            glow of a Tokyo night.
          </p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 justify-center mt-8 flex-wrap"
          >
            {[
              { label: 'Total Relics', value: projects.filter(p => p.timeline === 'PAST').length },
              { label: 'Categories', value: [...new Set(projects.filter(p => p.timeline === 'PAST').map(p => p.category))].length },
              { label: 'Timeline', value: 'PAST' },
            ].map(stat => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-6 py-3 rounded-xl"
                style={{
                  background: 'rgba(168,85,247,0.08)',
                  border: '1px solid rgba(168,85,247,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="text-2xl font-extrabold text-purple-300">{stat.value}</span>
                <span className="text-xs font-mono text-purple-400/70 mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Category Filter ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center px-6 mb-12"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              activeCategory === cat
                ? 'text-purple-200 shadow-[0_0_14px_rgba(168,85,247,0.45)]'
                : 'text-gray-400 hover:text-purple-200'
            }`}
            style={
              activeCategory === cat
                ? {
                    background: 'rgba(168,85,247,0.18)',
                    borderColor: 'rgba(168,85,247,0.7)',
                    backdropFilter: 'blur(8px)',
                  }
                : {
                    background: 'rgba(0,0,0,0.3)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }
            }
          >
            {cat !== 'All' ? `${CATEGORY_ICONS[cat] ?? '📦'} ` : '🗂️ '}
            {cat}
          </button>
        ))}
      </motion.div>

      {/* ── Project Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-36">
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {pastProjects.map(project => (
              <ParallaxCard 
                key={project.id} 
                project={project} 
                onClick={() => setActiveGadgetId(project.id)} 
                activeCategory={activeCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {pastProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 font-mono text-purple-500/50 text-sm"
          >
            [ARCHIVE]: No relics found in this category. Try another filter.
          </motion.div>
        )}

        {isLoading && pastProjects.length === 0 && (
           <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center py-24 font-mono text-purple-300 text-sm flex flex-col items-center gap-4"
         >
            <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p>Scanning 4D Pocket archives...</p>
         </motion.div>
        )}
      </div>

      {/* ── Gadget Manual Modal ── */}
      <AnimatePresence>
        {activeGadgetId && <GadgetManual />}
      </AnimatePresence>
    </div>
  );
}
