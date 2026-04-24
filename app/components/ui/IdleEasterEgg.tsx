"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdleEasterEgg() {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setIsIdle(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Set 30s idle timer
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 30000);
  };

  useEffect(() => {
    // Initial start
    resetTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-0 right-10 z-[70] pointer-events-none"
        >
          {/* Simple CSS representation of Doraemon popping up */}
          <div className="relative">
            {/* Speech bubble */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-16 -left-32 bg-white text-black px-4 py-2 rounded-2xl rounded-br-none text-sm font-bold shadow-lg w-48 text-center"
            >
              Are you still there? Should I pull out the Time Machine?
            </motion.div>
            
            {/* Doraemon Head outline */}
            <div className="w-32 h-32 bg-[#00AEEF] rounded-t-full relative overflow-hidden border-4 border-black border-b-0 shadow-2xl">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-white rounded-t-full border-2 border-black border-b-0" />
              {/* Eyes */}
              <div className="absolute top-4 left-6 w-8 h-10 bg-white rounded-full border-2 border-black">
                <div className="absolute top-4 right-2 w-2 h-3 bg-black rounded-full" />
              </div>
              <div className="absolute top-4 right-6 w-8 h-10 bg-white rounded-full border-2 border-black">
                <div className="absolute top-4 left-2 w-2 h-3 bg-black rounded-full" />
              </div>
              {/* Nose */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#E60012] rounded-full border-2 border-black shadow-inner" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
