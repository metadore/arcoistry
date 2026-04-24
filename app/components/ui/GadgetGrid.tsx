"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { useAppStore } from '@/store/useAppStore';
import { staggerContainer, staggerItem } from '@/lib/animations';
import GadgetManual from './GadgetManual';

const CATEGORIES = ['All', 'Coding', 'Research', 'Chemistry', 'Art / Design', 'Biology', 'Nuclear Science'];

export default function GadgetGrid() {
  const { timelineState, activeGadgetId, setActiveGadgetId } = useAppStore();
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter based on Timeline AND Category
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchTimeline = project.timeline === timelineState;
      const matchCategory = activeCategory === 'All' || project.category === activeCategory;
      return matchTimeline && matchCategory;
    });
  }, [timelineState, activeCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-[var(--color-primary-blue)] text-white shadow-[0_0_15px_rgba(0,174,239,0.6)]' 
                : 'glass-panel text-gray-300 hover:text-white hover:bg-[var(--color-glass-border)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        variants={staggerContainer as any}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              variants={staggerItem as any}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: '0px 0px 20px rgba(0, 174, 239, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveGadgetId(project.id)}
              className="glass-panel rounded-2xl p-6 cursor-pointer relative group overflow-hidden"
            >
              {/* Click Flash Effect layer */}
              <div className="absolute inset-0 bg-[var(--color-bell-yellow)] opacity-0 group-active:opacity-20 transition-opacity duration-100 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-xs font-mono text-[var(--color-primary-blue)] bg-[var(--color-primary-blue)]/10 px-2 py-1 rounded">
                  {project.category}
                </span>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  )}
                  <span className="text-[10px] text-gray-400">{project.timeline}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient-doraemon transition-all relative z-10">
                {project.gadgetName}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-3 mb-4 relative z-10">
                {project.title}
              </p>
              
              {/* Speech Bubble Hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent">
                <div className="bg-white text-black text-xs p-2 rounded-lg rounded-bl-none relative">
                  "{project.doraemonQuote}"
                  <div className="absolute bottom-0 left-0 -ml-2 mb-1 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-mono">
          [SYSTEM]: No gadgets found in this timeline.
        </div>
      )}

      {/* Gadget Manual Modal */}
      <AnimatePresence>
        {activeGadgetId && <GadgetManual />}
      </AnimatePresence>
    </div>
  );
}
