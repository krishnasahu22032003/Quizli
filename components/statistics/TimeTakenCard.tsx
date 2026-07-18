"use client";

import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "@/app/lib/utils";
import { differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  const totalSeconds = differenceInSeconds(timeEnded, timeStarted);
  const formatted = formatTimeDelta(totalSeconds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden md:col-span-4 p-6"
    >
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit] pointer-events-none" />
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[rgba(139,115,85,0.08)] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Duration
          </p>
          <p className="text-lg font-bold tracking-tight text-[var(--foreground)] mt-0.5">
            Time Taken
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
          className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]"
        >
          <Hourglass className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
        </motion.div>
      </div>

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent mb-5" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-end gap-2"
      >
        <span className="text-4xl font-bold tracking-tight text-[var(--foreground)] font-mono tabular-nums">
          {formatted}
        </span>
      </motion.div>

      <p className="relative text-xs text-[var(--foreground-muted)] mt-2 tracking-wide">
        Total time spent on this quiz
      </p>
    </motion.div>
  );
};

export default TimeTakenCard;