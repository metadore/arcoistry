"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

export default function GadgetManual() {
  const { activeGadgetId, setActiveGadgetId, projects } = useAppStore();
  
  const project = projects.find(p => p.id === activeGadgetId);
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setActiveGadgetId(null)}
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-8 shadow-2xl border-2 border-[var(--color-primary-blue)]/50 bg-[#030712]/90"
      >
        <button 
          onClick={() => setActiveGadgetId(null)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <XIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Visuals / Blueprint aesthetic */}
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl border border-[var(--color-primary-blue)]/30 bg-[var(--color-primary-blue)]/5 flex items-center justify-center relative overflow-hidden">
              {/* Blueprint Grid Background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(0, 174, 239, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 174, 239, 0.2) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              <div className="text-center z-10 relative">
                <span className="terminal-text text-4xl block mb-2">{project.gadgetName}</span>
                <span className="text-xs text-gray-400 tracking-widest uppercase">Blueprint Model - {project.id}</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-[var(--color-bell-yellow)]/30 bg-[#FFD700]/5">
              <p className="text-sm italic text-gray-300">
                <strong className="text-[var(--color-bell-yellow)]">Doraemon says:</strong> "{project.doraemonQuote}"
              </p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary-red)]/20 text-[var(--color-primary-red)] border border-[var(--color-primary-red)]/30 mb-4">
                {project.category} // {project.timeline}
              </div>
              <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-[var(--color-primary-blue)] mb-3">TECHNOLOGY STACK</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" /> Source Code
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary-blue)] text-white font-semibold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(0,174,239,0.4)]"
                >
                  <ExternalLinkIcon className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
