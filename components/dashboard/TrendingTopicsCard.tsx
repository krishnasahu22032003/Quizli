import React from "react";
import WordCloud from "../ui/WordCloud";
import prisma from "@/lib/prisma";
import { Flame, TrendingUp } from "lucide-react";

type Props = {};

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topic_Count.findMany({});
  const formattedTopics = topics.map((topic) => ({
    text: topic.topic,
    value: topic.count,
  }));

  return (
   <div className="group card-premium relative overflow-hidden p-6 md:p-8">
      <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent rounded-[inherit] pointer-events-none" />
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[rgba(139,115,85,0.08)] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-2">
        <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
              <TrendingUp size={11} strokeWidth={2.5} className="text-[var(--foreground-secondary)]" />
              <span className="text-xs font-medium text-[var(--foreground-secondary)]">
                Past Attempts
              </span>
            </div>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-3xl">
            Hot Topics
          </h2>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]">
          <Flame className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
        </div>
      </div>

      <p className="relative text-sm text-[var(--foreground-secondary)] mb-6">
        Click on a topic to start a quiz on it.
      </p>

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent mb-6" />

      <div className="relative">
        <WordCloud formattedTopics={formattedTopics} />
      </div>
    </div>
  );
};

export default HotTopicsCard;