"use client";

import { Target } from "lucide-react";
import { motion } from "framer-motion";

type Props = { accuracy: number };

const AccuracyCard = ({ accuracy }: Props) => {
  const rounded = Math.round(accuracy * 100) / 100;

  const getColor = () => {
    if (rounded >= 75) return "rgba(122,143,132,0.9)";
    if (rounded >= 45) return "rgba(200,182,155,0.9)";
    return "rgba(180,90,80,0.85)";
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rounded / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden md:col-span-3 p-6"
    >
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit]" />
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[rgba(139,115,85,0.08)] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Average Accuracy
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <motion.span
              key={rounded}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-bold tracking-tight text-[var(--foreground)]"
            >
              {rounded}
            </motion.span>
            <span className="text-lg font-medium text-[var(--foreground-secondary)] mb-1">
              %
            </span>
          </div>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            {rounded >= 75
              ? "Excellent performance"
              : rounded >= 45
              ? "Good progress"
              : "Needs improvement"}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
          <svg width="80" height="80" className="-rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="rgba(139,115,85,0.1)"
              strokeWidth="4"
            />
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={getColor()}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="relative mt-5 h-px w-full bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent" />

      <div className="relative mt-4 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-[rgba(139,115,85,0.1)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: getColor() }}
            initial={{ width: 0 }}
            animate={{ width: `${rounded}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <span className="text-xs font-medium tabular-nums text-[var(--foreground-muted)] w-8 text-right">
          {rounded}%
        </span>
      </div>
    </motion.div>
  );
};

export default AccuracyCard;