"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  correct_answers: number;
  wrong_answers: number;
};

const MCQCounter = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden flex items-center gap-1 px-2 py-2"
    >
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit]" />
      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[rgba(139,115,85,0.08)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center gap-2 px-3 py-1.5">
        <CheckCircle2 className="w-4 h-4 text-[rgba(122,143,132,0.9)]" strokeWidth={2} />
        <motion.span
          key={correct_answers}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl font-bold tracking-tight text-[rgba(122,143,132,0.9)] tabular-nums"
        >
          {correct_answers}
        </motion.span>
      </div>

      <div className="relative h-6 w-px bg-[rgba(139,115,85,0.18)]" />

      <div className="relative flex items-center gap-2 px-3 py-1.5">
        <motion.span
          key={wrong_answers}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl font-bold tracking-tight text-[rgba(180,90,80,0.85)] tabular-nums"
        >
          {wrong_answers}
        </motion.span>
        <XCircle className="w-4 h-4 text-[rgba(180,90,80,0.85)]" strokeWidth={2} />
      </div>
    </motion.div>
  );
};

export default MCQCounter;