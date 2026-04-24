"use client";

import { usePathname } from 'next/navigation';

const VIDEO_MAP: Record<string, string> = {
  '/':        '/bg-video.mp4',
  '/past':    '', // past page renders its own background
  '/future':  '', // future page renders its own background
  '/art':     '', // art page renders its own background
};

export default function VideoBackground() {
  const pathname = usePathname();

  // If the current page manages its own background, render nothing here
  const src = VIDEO_MAP[pathname] ?? '/bg-video.mp4';
  if (!src) return null;

  return (
    <>
      <video
        key={src}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-20 w-full h-full object-cover opacity-80"
        style={{ pointerEvents: 'none' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Subtle dark overlay for text readability */}
      <div className="fixed inset-0 -z-10 bg-[var(--color-dark-bg)]/40" />
    </>
  );
}
