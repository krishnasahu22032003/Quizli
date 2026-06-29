"use client";
import React from "react";
import { Questions } from "@prisma/client";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

type Props = {
  questions: Questions[];
};

const QuestionsList = ({ questions }: Props) => {
  const isOpenEnded = questions[0]?.questionType === "open_ended";

  const getAccuracyColor = (pct: number | null) => {
    if (pct === null) return "rgba(139,115,85,0.7)";
    if (pct >= 75) return "rgba(122,143,132,0.9)";
    if (pct >= 45) return "rgba(200,182,155,0.9)";
    return "rgba(180,90,80,0.85)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden p-0"
    >
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.04)] via-[rgba(200,182,155,0.02)] to-transparent rounded-[inherit] pointer-events-none" />

      <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-[rgba(139,115,85,0.1)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Results
          </p>
          <p className="text-lg font-bold tracking-tight text-[var(--foreground)] mt-0.5">
            Question Breakdown
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(139,115,85,0.15)] bg-white/60 backdrop-blur-xl">
          <span className="text-xs font-medium text-[var(--foreground-muted)]">
            {questions.length} questions
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[rgba(139,115,85,0.08)]">
              <th className="px-6 py-3 text-left w-12">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                  No.
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                  Question & Answer
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                  Your Answer
                </span>
              </th>
              {isOpenEnded && (
                <th className="px-6 py-3 text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                    Accuracy
                  </span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {questions.map(
              ({ answer, question, userAnswer, percentageCorrect, isCorrect }, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[rgba(139,115,85,0.06)] last:border-0 hover:bg-[rgba(139,115,85,0.03)] transition-colors duration-150"
                >
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[rgba(139,115,85,0.08)] border border-[rgba(139,115,85,0.14)]">
                      <span className="text-xs font-bold text-[var(--foreground-secondary)]">
                        {index + 1}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top max-w-xs">
                    <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                      {question}
                    </p>
                    <p className="text-sm font-semibold text-[var(--foreground)] mt-2 leading-snug">
                      {answer}
                    </p>
                  </td>

                  <td className="px-4 py-4 align-top max-w-xs">
                    {isOpenEnded ? (
                      <p className="text-sm font-medium text-[var(--foreground-secondary)] leading-relaxed">
                        {userAnswer ?? (
                          <span className="flex items-center gap-1 text-[var(--foreground-muted)]">
                            <Minus className="w-3 h-3" /> No answer
                          </span>
                        )}
                      </p>
                    ) : (
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[rgba(122,143,132,0.9)] shrink-0 mt-0.5" strokeWidth={2} />
                        ) : (
                          <XCircle className="w-4 h-4 text-[rgba(180,90,80,0.85)] shrink-0 mt-0.5" strokeWidth={2} />
                        )}
                        <p
                          className="text-sm font-semibold leading-snug"
                          style={{
                            color: isCorrect
                              ? "rgba(122,143,132,0.9)"
                              : "rgba(180,90,80,0.85)",
                          }}
                        >
                          {userAnswer ?? "—"}
                        </p>
                      </div>
                    )}
                  </td>

                  {isOpenEnded && (
                    <td className="px-6 py-4 align-top text-right">
                      {percentageCorrect ? (
                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: getAccuracyColor(percentageCorrect) }}
                          >
                            {percentageCorrect}%
                          </span>
                          <div className="w-16 h-1 rounded-full bg-[rgba(139,115,85,0.1)] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: getAccuracyColor(percentageCorrect) }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentageCorrect}%` }}
                              transition={{ duration: 0.7, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[var(--foreground-muted)]">—</span>
                      )}
                    </td>
                  )}
                </motion.tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-[rgba(139,115,85,0.08)]">
        <p className="text-xs text-center text-[var(--foreground-muted)] tracking-wide">
          End of results
        </p>
      </div>
    </motion.div>
  );
};

export default QuestionsList;