"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoReveal from "./LogoReveal";
import FixtureReveal from "./FixtureReveal";

export default function CeremonyWrapper() {
  const [phase, setPhase] = useState<
    | "initial"
    | "logo"
    | "logo-complete"
    | "fixture"
    | "fixture-complete"
    | "video"
  >("initial");
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Generate particles only on client
    const numParticles = isMobile ? 15 : 30;
    const newParticles = Array.from({ length: numParticles }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [isMobile]);

  // Preload audio on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/clapping-sound-effects-sfx.mp3");
      audio.preload = "auto";
      audio.addEventListener("canplaythrough", () => {
        console.log("Audio loaded successfully");
        setAudioLoaded(true);
      });
      audio.addEventListener("error", (e) => {
        console.error("Audio loading error:", e);
      });
      audioRef.current = audio;
    }
  }, []);

  // Play clap sound using preloaded HTML5 Audio
  const playClapSound = async () => {
    console.log("Attempting to play clap sound, audioLoaded:", audioLoaded);
    if (audioRef.current && audioLoaded) {
      try {
        audioRef.current.currentTime = 0; // Reset to beginning
        await audioRef.current.play();
        console.log("Audio played successfully");
      } catch (e) {
        console.log("Audio playback failed:", e);
      }
    } else {
      console.log("Audio not ready:", {
        audioRef: !!audioRef.current,
        audioLoaded,
      });
    }
  };
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Generate particles only on client
    const numParticles = isMobile ? 15 : 30;
    const newParticles = Array.from({ length: numParticles }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [isMobile]);

  const handleLogoReveal = () => {
    playClapSound();
    setPhase("logo");
  };

  const handleLogoComplete = () => {
    setPhase("logo-complete");
  };

  const handleFixtureReveal = () => {
    playClapSound();
    setPhase("fixture");
  };

  const handleFixtureComplete = () => {
    setPhase("fixture-complete");
    // Auto-transition to video after cooldown
    setTimeout(() => {
      setPhase("video");
    }, 4000); // 4 second cooldown
  };

  const handleVideoStart = () => {
    setPhase("video");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles background */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-8 px-4">
              {/* Title text */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                  11th All India Chief Minister’s Goldcup Football Tournament
                </h1>
                <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
                  Official Logo Reveal
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Click below to begin the ceremony
                </p>
              </motion.div>

              {/* Button with enhanced effects */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative inline-block"
              >
                {/* Button glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"
                />

                <motion.button
                  onClick={handleLogoReveal}
                  className="relative px-12 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-2xl border border-blue-400/50 overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                    style={{ transform: "skewX(-20deg)" }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    Reveal Logo
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>

                  {/* Inner border glow */}
                  <div className="absolute inset-0 rounded-full border border-white/20" />
                </motion.button>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex justify-center gap-2 pt-4"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-400/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LogoReveal isMobile={isMobile} onComplete={handleLogoComplete} />
          </motion.div>
        )}

        {phase === "logo-complete" && (
          <motion.div
            key="logo-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-8 px-4">
              {/* Success message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  ✨
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400">
                  Logo Revealed
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Ready for the next reveal
                </p>
              </motion.div>

              {/* Next button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative inline-block"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-amber-500/30 blur-2xl rounded-full"
                />

                <motion.button
                  onClick={handleFixtureReveal}
                  className="relative px-12 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 font-bold text-lg rounded-full shadow-2xl border border-amber-400/50 overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                    style={{ transform: "skewX(-20deg)" }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    Reveal Fixture
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>

                  <div className="absolute inset-0 rounded-full border border-white/30" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex justify-center gap-2 pt-4"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-amber-400/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "fixture" && (
          <motion.div
            key="fixture"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FixtureReveal
              isMobile={isMobile}
              onComplete={handleFixtureComplete}
            />
          </motion.div>
        )}

        {phase === "fixture-complete" && (
          <motion.div
            key="fixture-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-8 px-4">
              {/* Success message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  🏆
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400">
                  Fixture Revealed
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Get ready for the welcome video...
                </p>
              </motion.div>

              {/* Loading animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex justify-center gap-2 pt-4"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-green-400/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl px-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <video
                  src="/football-welcome.mp4"
                  autoPlay
                  className="w-full h-auto rounded-lg shadow-2xl border border-gray-700"
                  style={{ maxHeight: "70vh" }}
                  onEnded={() => {
                    // Restart the ceremony
                    setPhase("initial");
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner frame decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-blue-400/30" />
          <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-blue-400/30" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-blue-400/30" />
          <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-blue-400/30" />
        </motion.div>
      </div>
    </div>
  );
}
