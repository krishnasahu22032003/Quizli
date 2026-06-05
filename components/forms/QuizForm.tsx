"use client";

import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/Quiz.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CopyCheck, BookOpen, ArrowRight, Hash, Type } from "lucide-react";
import LoadingQuestions from "../ui/LoadingQuestion";
import { Resolver } from "react-hook-form";

type Output = z.output<typeof quizCreationSchema>;
type Props = { topic: string };

const QuizCreation = ({ topic: topicParam }: Props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const router = useRouter();

const { mutate: getQuestions, isPending } = useMutation({
  mutationFn: async ({ amount, topic, type }: Output) => {
    const response = await axios.post("/api/game", { amount, topic, type });
    return response.data;
  },
});

const form = useForm<Output>({
  resolver: zodResolver(quizCreationSchema) as Resolver<Output>,
  defaultValues: {
    topic: topicParam,
    type: "mcq",
    amount: 3,
  },
});

  const selectedType = form.watch("type");
  const amount = form.watch("amount");

  async function onSubmit(data: Output) {
    setShowLoader(true);
    getQuestions(data, {
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast.error("Something went wrong. Please try again later.");
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          if (form.getValues("type") === "mcq") {
            router.push(`/play/mcq/${gameId}`);
          } else {
            router.push(`/play/open-ended/${gameId}`);
          }
        }, 2000);
      },
    });
  }

  if (showLoader) {
    return <LoadingQuestions finished={finishedLoading} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="group card-premium relative overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.05)] via-[rgba(200,182,155,0.02)] to-transparent rounded-[inherit]" />

      {/* Ambient blob */}
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[rgba(139,115,85,0.08)] blur-[80px]" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-start justify-between ">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-xs font-medium text-[var(--foreground-secondary)]">
                Quiz Setup
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-3xl">
              Build your{" "}
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
                quiz
              </span>
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground-secondary)]">
              Configure your topic, count, and question style.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">

          {/* Topic Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
              <Type size={14} className="text-[var(--accent)]" />
              Topic
            </label>
            <div className="relative">
              <input
                {...form.register("topic")}
                placeholder="e.g. Quantum Physics, World War II, React Hooks..."
                className="
                  w-full
                  rounded-2xl
                  border border-[var(--border)]
                  bg-white/60
                  px-4 py-3
                  text-sm
                  text-[var(--foreground)]
                  placeholder:text-[var(--foreground-muted)]
                  backdrop-blur-xl
                  shadow-[0_4px_20px_rgba(17,24,39,0.04)]
                  outline-none
                  transition-all duration-200
                  focus:border-[var(--accent)]
                  focus:shadow-[0_0_0_3px_rgba(139,115,85,0.12)]
                  focus:bg-white/80
                "
              />
            </div>
            {form.formState.errors.topic && (
              <p className="text-xs text-red-400 mt-1">
                {form.formState.errors.topic.message}
              </p>
            )}
            <p className="text-xs text-[var(--foreground-muted)]">
              Any subject you want to be quizzed on.
            </p>
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
              <Hash size={14} className="text-[var(--accent)]" />
              Number of Questions
              <span className="ml-auto inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/70 px-2.5 py-0.5 text-xs font-bold text-[var(--accent)]">
                {amount}
              </span>
            </label>
            <input
              type="number"
              min={1}
              max={10}
              {...form.register("amount", { valueAsNumber: true })}
              onChange={(e) =>
                form.setValue("amount", parseInt(e.target.value))
              }
              className="
                w-full
                rounded-2xl
                border border-[var(--border)]
                bg-white/60
                px-4 py-3
                text-sm
                text-[var(--foreground)]
                placeholder:text-[var(--foreground-muted)]
                backdrop-blur-xl
                shadow-[0_4px_20px_rgba(17,24,39,0.04)]
                outline-none
                transition-all duration-200
                focus:border-[var(--accent)]
                focus:shadow-[0_0_0_3px_rgba(139,115,85,0.12)]
                focus:bg-white/80
              "
            />
            {form.formState.errors.amount && (
              <p className="text-xs text-red-400 mt-1">
                {form.formState.errors.amount.message}
              </p>
            )}
            <p className="text-xs text-[var(--foreground-muted)]">
              Choose between 1 and 10 questions.
            </p>
          </div>

          {/* Quiz Type Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--foreground)]">
              Question Type
            </label>
            <div className="relative flex rounded-2xl border border-[var(--border)] bg-white/40 p-1 backdrop-blur-xl shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
              {/* Sliding pill */}
              <motion.div
                layout
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-[0_4px_16px_rgba(17,24,39,0.08)] border border-[var(--border)]"
                style={{
                  left: selectedType === "mcq" ? "4px" : "calc(50%)",
                }}
              />

              <button
                type="button"
                onClick={() => form.setValue("type", "mcq")}
                className="relative z-10 cursor-pointer flex w-1/2 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors duration-200"
              >
                <CopyCheck
                  size={15}
                  className={
                    selectedType === "mcq"
                      ? "text-[var(--accent)]"
                      : "text-[var(--foreground-muted)]"
                  }
                />
                <span
                  className={
                    selectedType === "mcq"
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)]"
                  }
                >
                  Multiple Choice
                </span>
              </button>

              <button
                type="button"
                onClick={() => form.setValue("type", "open_ended")}
                className="relative cursor-pointer z-10 flex w-1/2 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors duration-200"
              >
                <BookOpen
                  size={15}
                  className={
                    selectedType === "open_ended"
                      ? "text-[var(--accent)]"
                      : "text-[var(--foreground-muted)]"
                  }
                />
                <span
                  className={
                    selectedType === "open_ended"
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)]"
                  }
                >
                  Open Ended
                </span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ y: isPending ? 0 : -2 }}
            whileTap={{ scale: isPending ? 1 : 0.97 }}
            transition={{ duration: 0.2 }}
            className="btn-shine cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-current"
                      />
                    ))}
                  </div>
                  Generating...
                </motion.div>
              ) : (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Generate Quiz
                  <ArrowRight size={15} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default QuizCreation;