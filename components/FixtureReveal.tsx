"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface FixtureRevealProps {
  isMobile: boolean;
  onComplete?: () => void;
}

export default function FixtureReveal({
  isMobile,
  onComplete,
}: FixtureRevealProps) {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  useEffect(() => {
    // Trigger confetti immediately when component mounts
    setShowConfetti(true);
    setConfettiOpacity(1);

    // Start fade-out after 3 seconds, over 5 seconds
    setTimeout(() => {
      setConfettiOpacity(0);
      // Hide completely after fade-out
      setTimeout(() => {
        setShowConfetti(false);
        // Call onComplete after the reveal is finished
        if (onComplete) {
          setTimeout(onComplete, 2000); // 2 second cooldown
        }
      }, 5000);
    }, 3000);

    const timer = setTimeout(() => setHasFlipped(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Radial spotlight effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Stadium lights - enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-400 rounded-full"
            style={{
              top: "5%",
              left: `${15 + i * 14}%`,
              boxShadow:
                "0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Main fixture container */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 md:px-8">
        {/* Reveal animation wrapper */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 -z-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* 3D Card container */}
          <motion.div
            className="relative max-w-md mx-auto w-full"
            style={{ perspective: "1500px" }}
            initial={{ rotateY: -15, scale: 0.9 }}
            animate={{ rotateY: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                rotateY: hasFlipped ? [0, 180, 360] : 0,
              }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Card - A4 portrait aspect ratio (1:1.414) */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{ opacity: [0, 0.3, 0], x: ["-100%", "200%"] }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                {/* Image container - A4 portrait ratio */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1/1.414" }}
                >
                  <img
                    src="/FIXTURE.webp"
                    alt="Official Football Fixture"
                    className="w-full h-full object-contain p-3 sm:p-4 md:p-6"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                </div>

                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
              </div>

              {/* Outer glow layers */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
              <div className="absolute inset-0 -z-20 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl scale-110" />
            </motion.div>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(transparent 50%, rgba(255,255,255,0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Massive confetti effect */}
      {showConfetti && (
        <div
          className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-[5000ms] ease-out"
          style={{ opacity: confettiOpacity }}
        >
          <Confetti
            width={1920}
            height={1080}
            recycle={false}
            numberOfPieces={800}
            gravity={0.3}
            wind={0.1}
            colors={[
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
              "#ffffff",
              "#ffa500",
              "#ff4500",
            ]}
            drawShape={(ctx) => {
              ctx.beginPath();
              ctx.arc(0, 0, 8, 0, 2 * Math.PI);
              ctx.fill();
              return ctx;
            }}
          />
        </div>
      )}
    </div>
  );
}
