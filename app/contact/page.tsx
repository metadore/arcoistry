"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* ── Time Machine Wormhole Background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-20 w-full h-full object-cover"
        style={{ opacity: 0.9, filter: 'hue-rotate(200deg) brightness(0.6)' }}
      >
        <source src="/videos/contact/bg.mp4" type="video/mp4" />
      </video>

      {/* Pulsing Wormhole Overlays */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a051e] via-transparent to-[#0a051e] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,5,30,0.8)_100%)]" />
      </div>

      {/* Floating Particles / Stars effect (CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%', 
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              z: [0, 100]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* ── Back Button ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono font-bold
                     border border-cyan-400/30 bg-black/40 backdrop-blur-xl text-cyan-300
                     hover:bg-cyan-500/20 hover:border-cyan-300 transition-all duration-300
                     shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Exit Wormhole
        </Link>
      </motion.div>

      {/* ── Contact Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
        className="relative z-10 w-full max-w-xl glass-panel rounded-[2rem] p-10 md:p-14 
                   border-2 border-cyan-500/30 bg-[#0a051e]/80 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
      >
        {/* Doraemon Time Machine Hub Header */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20" />
            <div className="relative text-6xl">🛸</div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white">
            CHRONO-<span className="text-cyan-400">CONTACT</span>
          </h1>
          <p className="text-cyan-100/60 font-mono text-sm tracking-widest uppercase">
            Trans-Dimensional Communication Hub
          </p>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          
          {/* Email */}
          <motion.a
            href="mailto:arson79r@gmail.com"
            whileHover={{ x: 10, backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
            className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/5 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <MailIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-cyan-400/50 uppercase tracking-wider mb-0.5">Email</p>
              <p className="text-lg font-bold text-white">arson79r@gmail.com</p>
            </div>
            <Send className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/metadore"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/5 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <GithubIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-0.5">GitHub</p>
              <p className="text-lg font-bold text-white">metadore</p>
            </div>
            <Send className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/artismchemcoder?igsh=bmRwYjcyeDIwOXll"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 10, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
            className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/5 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <InstagramIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-pink-400/50 uppercase tracking-wider mb-0.5">Instagram</p>
              <p className="text-lg font-bold text-white">@artismchemcoder</p>
            </div>
            <Send className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://youtube.com/@arcoistry?si=d1UbA3-QOio9-MEV"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 10, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/5 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <YoutubeIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-red-400/50 uppercase tracking-wider mb-0.5">YouTube</p>
              <p className="text-lg font-bold text-white">@arcoistry</p>
            </div>
            <Send className="w-5 h-5 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

        </div>

        {/* Footer Quote */}
        <div className="mt-12 text-center">
          <div className="inline-block p-4 rounded-2xl bg-cyan-400/10 border border-cyan-400/20">
            <p className="text-sm italic text-cyan-200">
              "Sending a message through the time machine... I hope it reaches you in the right era!"
            </p>
            <p className="text-xs font-bold text-cyan-400 mt-2">— DORAEMON</p>
          </div>
        </div>

      </motion.div>

      {/* Decorative Time Rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-15">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-cyan-500/5 rounded-full"
        />
      </div>

    </div>
  );
}
