"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore, TimelineState } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

const TABS: TimelineState[] = ['PAST', 'PRESENT', 'FUTURE'];

export default function ChronoTerminal() {
  const router = useRouter();
  const pathname = usePathname();
  const { timelineState, setTimelineState } = useAppStore();
  const [logs, setLogs] = useState<string[]>(['[SYSTEM]: Initializing Chrono-Terminal...']);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep store in sync with current URL
  useEffect(() => {
    if (pathname === '/past') setTimelineState('PAST');
    else if (pathname === '/future') setTimelineState('FUTURE');
    else setTimelineState('PRESENT');
  }, [pathname, setTimelineState]);

  useEffect(() => {
    setLogs(prev => [
      ...prev,
      `[SYSTEM]: Shifting timeline to ${timelineState}...`,
      `[SYSTEM]: Loading Gadget Inventory...`,
    ]);
  }, [timelineState]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleTabClick = (tab: TimelineState) => {
    if (tab === 'PAST') {
      router.push('/past');
    } else if (tab === 'FUTURE') {
      router.push('/future');
    } else {
      // PRESENT lives on the home page
      if (pathname !== '/') router.push('/');
      setTimelineState(tab);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 w-80 z-50 glass-panel rounded-xl overflow-hidden flex flex-col border border-[var(--color-primary-blue)]/30 backdrop-blur-md">
      {/* Header */}
      <div className="bg-[var(--color-primary-blue)]/10 border-b border-[var(--color-glass-border)] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a 
            href="https://github.com/metadore" 
            target="_blank" 
            rel="noreferrer"
            className="text-[var(--color-primary-blue)] hover:text-white transition-colors"
            title="View GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a 
            href="https://youtube.com/@arcoistry?si=d1UbA3-QOio9-MEV" 
            target="_blank" 
            rel="noreferrer"
            className="text-[var(--color-primary-blue)] hover:text-white transition-colors"
            title="View YouTube Channel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
          <span className="text-xs font-mono text-[var(--color-primary-blue)] tracking-wider">CHRONO-TERMINAL v1.0</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary-red)]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-bell-yellow)]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary-blue)]"></div>
        </div>
      </div>

      {/* Tab Controls */}
      <div className="flex bg-black/40">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 py-2 text-xs font-bold font-mono transition-colors relative ${
              timelineState === tab
                ? 'text-[var(--color-bell-yellow)]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
            {timelineState === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary-blue)]"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Console Log */}
      <div className="h-32 p-3 overflow-y-auto font-mono text-[10px] text-[var(--color-primary-blue)] bg-black/60 shadow-inner">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-1"
            >
              {log}
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </AnimatePresence>
      </div>
    </div>
  );
}
