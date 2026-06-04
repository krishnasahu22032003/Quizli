"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Zap, BookOpen, Stars } from "lucide-react";

const loadingTexts = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the ocean of knowledge...",
  "Harnessing the collective wisdom of the cosmos...",
  "Igniting the flame of wonder and exploration...",
];

const floatingIcons = [BrainCircuit, Sparkles, Zap, BookOpen, Stars];

type Props = { finished: boolean };

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(10);
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setTextIndex(randomIndex);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) return 0;
        if (Math.random() < 0.1) return prev + 2;
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px] bg-[rgba(139,115,85,0.10)]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 top-[10%] h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(200,182,155,0.12)]"
        />
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full blur-[100px] bg-[rgba(122,143,132,0.08)]"
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((Icon, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="absolute"
          style={{
            top: `${15 + i * 14}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
          }}
        >
          <Icon
            size={18 + i * 2}
            strokeWidth={1.5}
            className="text-[var(--accent)]"
            style={{ opacity: 0.25 }}
          />
        </motion.div>
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="card-premium relative w-[90vw] max-w-md overflow-hidden p-8 sm:p-10"
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,115,85,0.05)] via-transparent to-transparent rounded-[inherit]" />

        <div className="relative flex flex-col items-center text-center">
          {/* Animated brain icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-20 w-20 items-center justify-center rounded-[28px] border border-[var(--border)] bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(17,24,39,0.08)]"
          >
            {/* Ping ring */}
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-[28px] border border-[var(--accent)]"
            />
            <BrainCircuit
              size={36}
              strokeWidth={1.8}
              className="text-[var(--accent)]"
            />
          </motion.div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-medium text-[var(--foreground-secondary)]">
              AI is working
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-3xl">
            Crafting your{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
              quiz
            </span>
          </h2>

          {/* Animated loading text */}
          <div className="mt-3 h-6 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm text-[var(--foreground-secondary)]"
              >
                {loadingText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--foreground-muted)]">
                Progress
              </span>
              <span className="text-xs font-semibold text-[var(--foreground-secondary)]">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(139,115,85,0.12)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[rgba(139,115,85,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Animated dots */}
          <div className="mt-6 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingQuestions;