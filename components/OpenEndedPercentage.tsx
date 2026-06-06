"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

type Props = {
  percentage: number;
};

const OpenEndedPercentage = ({ percentage }: Props) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return "rgba(122,143,132,0.9)";
    if (percentage >= 45) return "rgba(200,182,155,0.9)";
    return "rgba(139,115,85,0.7)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden flex items-center gap-3 px-4 py-3"
    >
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit]" />
      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[rgba(139,115,85,0.08)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
        <svg width="48" height="48" className="-rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="rgba(139,115,85,0.12)"
            strokeWidth="3"
          />
          <motion.circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Target size={14} className="text-[var(--accent)]" strokeWidth={2} />
        </div>
      </div>

      <div className="relative flex flex-col">
        <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
          Accuracy
        </span>
        <div className="flex items-baseline gap-0.5">
          <motion.span
            key={percentage}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-bold tracking-tight text-[var(--foreground)]"
          >
            {Math.round(percentage)}
          </motion.span>
          <span className="text-sm font-medium text-[var(--foreground-secondary)] mb-0.5">
            %
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default OpenEndedPercentage;
