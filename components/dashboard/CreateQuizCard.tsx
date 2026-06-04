"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function CreateQuizCard() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => router.push("/quiz")}
      className="group card-premium relative overflow-hidden cursor-pointer"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit]" />

      {/* Ambient blob */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[rgba(139,115,85,0.10)] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-xs font-medium text-[var(--foreground-secondary)]">
                AI Powered
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-3xl">
              Quiz me!
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Challenge yourself with a quiz on any topic of your choice.
            </p>
          </div>

          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-xl shadow-[0_8px_20px_rgba(17,24,39,0.06)]"
          >
            <BrainCircuit
              size={22}
              strokeWidth={2}
              className="text-[var(--accent)]"
            />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        {/* Footer CTA */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-[var(--foreground-muted)]">
            Pick any topic · Any difficulty
          </span>

          <motion.button
          onClick={()=>router.push("/quiz")}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="btn-shine cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
          >
            Start Quiz
         

<ArrowRight size={12} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}