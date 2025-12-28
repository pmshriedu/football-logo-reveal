"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Confetti from "react-confetti";

interface LogoRevealProps {
  isMobile: boolean;
  onComplete?: () => void;
}

export default function LogoReveal({ isMobile, onComplete }: LogoRevealProps) {
  const [animationStage, setAnimationStage] = useState(0);
  const [countdown, setCountdown] = useState(12);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = async () => {
      // Trigger confetti immediately when logo reveal starts
      setShowConfetti(true);
      setConfettiOpacity(1);

      // Start fade-out after 3 seconds, over 5 seconds
      setTimeout(() => {
        setConfettiOpacity(0);
        // Hide completely after fade-out
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }, 3000);

      // Stage 1: Spotlight and particles appear
      setAnimationStage(1);
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 300 : 600));

      // Stage 2: Logo entrance with explosion effect
      setAnimationStage(2);
      await controls.start({
        scale: [0, 1.15, 1],
        rotateY: [180, 0],
        opacity: [0, 1],
        transition: {
          duration: isMobile ? 1 : 1.5,
          ease: [0.34, 1.56, 0.64, 1], // Bounce effect
        },
      });

      // Stage 3: Shine sweep
      if (!isMobile) {
        setAnimationStage(3);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Stage 4: Pulse effect
      setAnimationStage(4);
      await new Promise((resolve) =>
        setTimeout(resolve, isMobile ? 500 : 1000)
      );

      // Stage 5: 3D flip show
      await controls.start({
        rotateY: [0, 180],
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      await controls.start({
        rotateY: [180, 360],
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Start countdown instead of immediately completing
      setShowCountdown(true);
    };

    sequence();
  }, [isMobile, controls]);

  // Handle countdown timer
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      // Keep confetti going or trigger more
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000); // 3 seconds for confetti to show
    }
  }, [showCountdown, countdown, onComplete]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Radial gradient spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: animationStage >= 1 ? 0.4 : 0,
            scale: animationStage >= 1 ? 1.5 : 0.5,
          }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-500/30 via-purple-500/10 to-transparent"
        />

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-blue-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-purple-500/10 rounded-full"
        />
      </div>

      {/* Burst particles on logo entrance */}
      {animationStage >= 2 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(isMobile ? 8 : 16)].map((_, i) => {
            const angle = (i / (isMobile ? 8 : 16)) * Math.PI * 2;
            const distance = isMobile ? 100 : 150;
            return (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.8)",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Floating orbs in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(isMobile ? 5 : 12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div
        ref={containerRef}
        className="relative z-10"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          animate={controls}
          initial={{ scale: 0, rotateY: 180, opacity: 0 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Logo card with glassmorphism */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-8 sm:p-12">
            {/* Logo image */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <img
                src="/logo.png"
                alt="All India Chief Minister Gold Cup Logo"
                className="w-full h-full object-contain relative z-10"
              />

              {/* Shine effect overlay */}
              {!isMobile && animationStage === 3 && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    transform: "skewX(-20deg)",
                    filter: "blur(2px)",
                  }}
                />
              )}

              {/* Inner glow */}
              <motion.div
                animate={{
                  opacity: animationStage >= 2 ? [0.3, 0.6, 0.3] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"
              />
            </div>

            {/* Pulse ring effect */}
            {animationStage >= 4 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.3],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute inset-0 border-4 border-blue-400 rounded-3xl"
              />
            )}
          </div>

          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              animate={{
                opacity: animationStage >= 2 ? [0.4, 0.7, 0.4] : 0,
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-2xl"
            />
            <motion.div
              animate={{
                opacity: animationStage >= 2 ? [0.2, 0.4, 0.2] : 0,
                scale: [1.05, 1.15, 1.05],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl scale-110"
            />
          </div>

          {/* Energy rays */}
          {animationStage >= 2 && !isMobile && (
            <div className="absolute inset-0 -z-20">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-blue-400/40 to-transparent origin-bottom"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-blue-400/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-blue-400/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-blue-400/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-blue-400/30" />

      {/* Countdown display */}
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-400/30">
            <div className="text-2xl font-bold text-amber-400 text-center">
              {countdown}
            </div>
            <div className="text-xs text-gray-400 text-center">seconds</div>
          </div>
        </motion.div>
      )}

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
