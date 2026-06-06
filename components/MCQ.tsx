"use client";
import { Game, Questions } from "@prisma/client";
import React from "react";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import { BarChart, ChevronRight, Loader2, Timer, Sparkles } from "lucide-react";
import { checkAnswerSchema , endGameSchema } from "@/schemas/Question.schema";
import { formatTimeDelta } from "@/lib/utils";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";

type Props = {
  game: Game & { questions: Pick<Questions, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setStats((s) => ({ ...s, correct_answers: s.correct_answers + 1 }));
          toast.success("Correct! You got it right!" );
        } else {
          setStats((s) => ({ ...s, wrong_answers: s.wrong_answers + 1 }));
          toast.error("Incorrect You got it wrong!");
        }
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setSelectedChoice(0);
        setQuestionIndex((q) => q + 1);
      },
    });
  }, [checkAnswer, questionIndex, game.questions.length, toast, endGame]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "1") setSelectedChoice(0);
      else if (key === "2") setSelectedChoice(1);
      else if (key === "3") setSelectedChoice(2);
      else if (key === "4") setSelectedChoice(3);
      else if (key === "Enter") handleNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  const progress = (questionIndex / game.questions.length) * 100;

  if (hasEnded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 p-10 rounded-[28px] border border-[rgba(139,115,85,0.18)] bg-white/70 backdrop-blur-2xl shadow-[0_24px_60px_rgba(17,24,39,0.08)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(139,115,85,0.2)] to-[rgba(200,182,155,0.3)] flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-[var(--accent)]" />
          </motion.div>

          <div className="text-center">
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--foreground-muted)] mb-1">
              Quiz Complete
            </p>
            <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-sm text-[rgba(122,143,132,0.9)] font-medium">
                ✓ {stats.correct_answers} correct
              </span>
              <span className="text-sm text-[rgba(139,115,85,0.7)] font-medium">
                ✗ {stats.wrong_answers} wrong
              </span>
            </div>
          </div>

          <Link href={`/statistics/${game.id}`} className="mt-2">
            <Button variant="ghost" className="gap-2 rounded-xl px-6 h-11 text-sm">
              View Statistics
              <BarChart className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(139,115,85,0.15)] bg-white/60 backdrop-blur-xl text-sm text-[var(--foreground-secondary)] shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
                Topic
              </span>
              <span className="font-semibold text-[var(--foreground)] tracking-tight">
                {game.topic}
              </span>
            </div>

            <div className="flex items-center gap-2 pl-1 text-[var(--foreground-secondary)]">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(139,115,85,0.08)] border border-[rgba(139,115,85,0.12)]">
                <Timer className="w-3.5 h-3.5 text-[var(--accent)]" />
              </div>
              <span className="text-sm font-mono font-medium tabular-nums tracking-tight">
                {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
              </span>
            </div>
          </div>

          <MCQCounter
            correct_answers={stats.correct_answers}
            wrong_answers={stats.wrong_answers}
          />
        </div>

        <div className="relative w-full h-1 rounded-full bg-[rgba(139,115,85,0.1)] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--accent)] to-[rgba(200,182,155,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[24px] border border-[rgba(139,115,85,0.15)] bg-white/65 backdrop-blur-2xl shadow-[0_12px_40px_rgba(17,24,39,0.06)] p-6 md:p-8"
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] bg-[rgba(200,182,155,0.15)] pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="relative flex flex-row items-start gap-5">
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(139,115,85,0.12)] to-[rgba(200,182,155,0.08)] border border-[rgba(139,115,85,0.15)]">
                <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
                  {questionIndex + 1}
                </span>
                <div className="w-full px-2">
                  <div className="h-px bg-[rgba(139,115,85,0.2)] w-full" />
                </div>
                <span className="text-xs text-[var(--foreground-muted)] font-medium">
                  {game.questions.length}
                </span>
              </div>

              <p className="flex-1 text-[17px] leading-relaxed font-medium text-[var(--foreground)] pt-1">
                {currentQuestion?.question}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setSelectedChoice(index)}
              className={`
                group relative w-full flex items-center gap-4 px-5 py-4 rounded-[18px]
                border text-left transition-all duration-200 cursor-pointer
                ${selectedChoice === index
                  ? "border-[rgba(139,115,85,0.45)] bg-[rgba(139,115,85,0.07)] shadow-[0_8px_24px_rgba(139,115,85,0.12)]"
                  : "border-[rgba(139,115,85,0.12)] bg-white/55 backdrop-blur-xl hover:border-[rgba(139,115,85,0.28)] hover:bg-white/70 shadow-[0_4px_12px_rgba(17,24,39,0.04)]"
                }
              `}
            >
              <div className={`
                flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl
                text-xs font-bold tracking-tight transition-all duration-200
                ${selectedChoice === index
                  ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(139,115,85,0.3)]"
                  : "bg-[rgba(139,115,85,0.08)] border border-[rgba(139,115,85,0.18)] text-[var(--foreground-secondary)]"
                }
              `}>
                {index + 1}
              </div>

              <span className={`
                text-[15px] font-medium leading-snug transition-colors duration-200
                ${selectedChoice === index
                  ? "text-[var(--foreground)]"
                  : "text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)]"
                }
              `}>
                {option}
              </span>

              {selectedChoice === index && (
                <motion.div
                  layoutId="selected-indicator"
                  className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              className="h-11 px-7 rounded-xl text-sm font-semibold gap-2"
              disabled={isChecking || hasEnded}
              onClick={handleNext}
            >
              {isChecking
                ? <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" />
                : null
              }
              {isChecking ? "Checking..." : "Next Question"}
              {!isChecking && <ChevronRight className="w-4 h-4" />}
            </Button>
          </motion.div>

          <p className="text-xs text-[var(--foreground-muted)] tracking-wide">
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded-md border border-[rgba(139,115,85,0.2)] bg-[rgba(139,115,85,0.06)] font-mono text-[11px]">
              1–4
            </kbd>{" "}
            to select ·{" "}
            <kbd className="px-1.5 py-0.5 rounded-md border border-[rgba(139,115,85,0.2)] bg-[rgba(139,115,85,0.06)] font-mono text-[11px]">
              Enter
            </kbd>{" "}
            to continue
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MCQ;