"use client";

import { Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";

type Props = { accuracy: number };

const tiers = [
  {
    threshold: 75,
    label: "Impressive!",
    sublabel: "> 75% accuracy",
    trophyColor: "rgba(200,182,100,0.95)",
    labelColor: "rgba(180,155,60,0.95)",
    bgFrom: "rgba(200,182,100,0.08)",
    bgTo: "rgba(200,182,100,0.03)",
    ringColor: "rgba(200,182,100,0.2)",
    badgeText: "Gold",
  },
  {
    threshold: 25,
    label: "Good job!",
    sublabel: "> 25% accuracy",
    trophyColor: "rgba(160,165,170,0.95)",
    labelColor: "rgba(130,135,140,0.95)",
    bgFrom: "rgba(160,165,170,0.08)",
    bgTo: "rgba(160,165,170,0.03)",
    ringColor: "rgba(160,165,170,0.2)",
    badgeText: "Silver",
  },
  {
    threshold: -Infinity,
    label: "Nice try!",
    sublabel: "< 25% accuracy",
    trophyColor: "rgba(139,115,85,0.9)",
    labelColor: "rgba(139,115,85,0.85)",
    bgFrom: "rgba(139,115,85,0.08)",
    bgTo: "rgba(139,115,85,0.03)",
    ringColor: "rgba(139,115,85,0.2)",
    badgeText: "Bronze",
  },
];

const ResultsCard = ({ accuracy }: Props) => {
  const tier = tiers.find((t) => accuracy > t.threshold) ?? tiers[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden md:col-span-7 p-6 md:p-8"
    >
      <div
        className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 rounded-[inherit] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${tier.bgFrom}, ${tier.bgTo}, transparent)`,
        }}
      />
      <div
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: tier.bgFrom }}
      />

      <div className="relative flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Performance
          </p>
          <p className="text-lg font-bold tracking-tight text-[var(--foreground)] mt-0.5">
            Results
          </p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]">
          <Award className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-5 py-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 14 }}
          className="relative flex items-center justify-center"
        >
          <div
            className="absolute w-24 h-24 rounded-full blur-[30px] opacity-60"
            style={{ background: tier.trophyColor }}
          />
          <div
            className="relative flex items-center justify-center w-24 h-24 rounded-full border-2"
            style={{
              borderColor: tier.ringColor,
              background: `radial-gradient(circle, ${tier.bgFrom} 0%, transparent 70%)`,
            }}
          >
            <Trophy
              size={44}
              strokeWidth={1.5}
              style={{ color: tier.trophyColor }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide mb-1"
            style={{
              borderColor: tier.ringColor,
              color: tier.labelColor,
              background: tier.bgFrom,
            }}
          >
            <span>{tier.badgeText}</span>
          </div>

          <p
            className="text-3xl font-bold tracking-tight"
            style={{ color: tier.labelColor }}
          >
            {tier.label}
          </p>

          <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
            {tier.sublabel}
          </p>
        </motion.div>

        <div className="relative mt-2 h-px w-2/3 bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-sm font-medium text-[var(--foreground-secondary)]"
        >
          You scored{" "}
          <span className="font-bold text-[var(--foreground)]">
            {Math.round(accuracy * 100) / 100}%
          </span>{" "}
          overall
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ResultsCard;