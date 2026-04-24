"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function AnywhereDoor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Skip initial mount animation if desired, or play it once
    const playTransition = async () => {
      setIsAnimating(true);
      
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      });

      // Doors close
      tl.to([leftDoorRef.current, rightDoorRef.current], {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });

      // Stay closed for a bit
      tl.to({}, { duration: 0.3 });

      // Doors open
      tl.to(leftDoorRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        ease: "power3.inOut"
      }, "+=0.1");

      tl.to(rightDoorRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.7,
        ease: "power3.inOut"
      }, "<");
    };

    playTransition();
  }, [pathname]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] pointer-events-none flex ${isAnimating ? 'visible' : 'invisible'}`}
    >
      {/* Left Door - Pink Anywhere Door color */}
      <div 
        ref={leftDoorRef}
        className="w-1/2 h-full bg-[#FF69B4] border-r-4 border-black origin-left shadow-2xl"
        style={{ transform: 'scaleX(1)' }} // Starts closed initially before JS kicks in
      >
        {/* Door details */}
        <div className="absolute top-1/2 right-4 w-4 h-16 bg-yellow-400 rounded-sm transform -translate-y-1/2 border-2 border-black" />
      </div>

      {/* Right Door */}
      <div 
        ref={rightDoorRef}
        className="w-1/2 h-full bg-[#FF69B4] border-l-4 border-black origin-right shadow-2xl"
        style={{ transform: 'scaleX(1)' }}
      />
    </div>
  );
}
