"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Zap, BookOpen, Stars, Atom, Lightbulb } from "lucide-react";

const loadingTexts = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the ocean of knowledge...",
  "Harnessing the collective wisdom of the cosmos...",
  "Igniting the flame of wonder and exploration...",
  "Curating the perfect challenge for you...",
];

const floatingIcons = [BrainCircuit, Sparkles, Zap, BookOpen, Stars, Atom, Lightbulb];

const steps = [
  { label: "Analyzing topic", duration: 20 },
  { label: "Generating questions", duration: 50 },
  { label: "Validating answers", duration: 80 },
  { label: "Finalizing quiz", duration: 95 },
];

type Props = { finished: boolean };

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev >= 95) return 95;
        const increment = prev < 30 ? 1.2 : prev < 60 ? 0.8 : prev < 85 ? 0.4 : 0.15;
        return Math.min(prev + increment, 95);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [finished]);

  const currentStep = steps.findLast((s) => progress >= s.duration) ?? steps[0];

return (
  <div
    className="fixed inset-0 z-[9999] overflow-hidden"
    style={{ backgroundColor: "var(--background)" }}
  >
    {/* Ambient blobs */}
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{ background: "rgba(139,115,85,0.13)" }}
      />
      <motion.div
        animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-48 -top-24 h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "rgba(200,182,155,0.10)" }}
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "rgba(122,143,132,0.08)" }}
      />
    </div>

    {/* Floating icons */}
    {floatingIcons.map((Icon, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{
          y: [0, i % 2 === 0 ? -18 : -12, 0],
          opacity: [0.07, 0.18, 0.07],
          rotate: [0, i % 2 === 0 ? 12 : -8, 0],
        }}
        transition={{
          duration: 4 + i * 0.9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
        className="absolute pointer-events-none select-none"
        style={{
          top: `${8 + i * 11}%`,
          left: i % 2 === 0 ? `${3 + i * 2.5}%` : undefined,
          right: i % 2 !== 0 ? `${3 + i * 2.5}%` : undefined,
        }}
      >
        <Icon size={28 + i * 4} strokeWidth={1.2} className="text-[var(--accent)]" />
      </motion.div>
    ))}

    {/* ✅ This inner div is what truly centers — separate from the fixed container */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-lg px-8"
      >
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/25 bg-white/60 backdrop-blur-xl shadow-[0_16px_50px_rgba(17,24,39,0.10)]"
        >
          <motion.div
            animate={{ scale: [1, 1.75], opacity: [0.25, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-[32px] border border-[var(--accent)]"
          />
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.15, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            className="absolute inset-0 rounded-[32px] border border-[var(--accent)]"
          />
          <BrainCircuit size={48} strokeWidth={1.6} className="text-[var(--accent)]" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-4 py-1.5 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-[var(--foreground-secondary)] uppercase">
            AI is generating
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 text-5xl font-bold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl leading-tight"
        >
          Crafting your{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
            quiz
          </span>
        </motion.h2>

        {/* Rotating text */}
        <div className="mt-5 w-full flex items-center justify-center" style={{ minHeight: "2rem" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-base text-[var(--foreground-secondary)] text-center"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-14 w-full grid grid-cols-4 gap-3"
        >
          {steps.map((step, i) => {
            const done = progress >= step.duration;
            const active = currentStep.label === step.label;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="h-1 w-full rounded-full transition-all duration-700"
                  style={{
                    background: done
                      ? "var(--accent)"
                      : active
                      ? "rgba(139,115,85,0.4)"
                      : "rgba(139,115,85,0.12)",
                  }}
                />
                <span
                  className="text-[10px] font-medium transition-colors duration-300 hidden sm:block"
                  style={{
                    color: done || active
                      ? "var(--foreground-secondary)"
                      : "var(--foreground-muted)",
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Progress bar */}
        <div className="mt-6 w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[var(--foreground-secondary)]">
              {currentStep.label}
            </span>
            <span className="text-sm font-bold tabular-nums text-[var(--foreground)]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[rgba(139,115,85,0.10)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent), rgba(200,182,155,0.9))",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Pulse dots */}
        <div className="mt-10 flex items-center gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);
};

export default LoadingQuestions;