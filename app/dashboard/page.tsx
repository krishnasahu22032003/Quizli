import DashboardHeader from "@/components/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import CreateQuizCard from "@/components/dashboard/CreateQuizCard";
import QuizHistoryCard from "@/components/dashboard/QuizHistoryCard";
import TrendingTopicsCard from "@/components/dashboard/TrendingTopicsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl mt-4 px-4 pb-8 sm:px-6 lg:px-8">
        {/* Hero / Welcome Section */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/20 bg-[rgba(255,255,255,0.05)] backdrop-blur-xl shadow-[0_30px_80px_rgba(17,24,39,0.08)]">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(139,115,85,0.12)] blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-[rgba(139,115,85,0.06)] blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground-secondary)]">
                    Dashboard Overview
                  </span>
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                  Welcome back,
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-3xl font-bold tracking-[-0.05em] text-transparent sm:text-4xl">
                    {session?.user?.name || "Learner"}
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--foreground-secondary)] sm:text-base">
                  Create intelligent quizzes, monitor performance, and deliver
                  engaging learning experiences from a beautifully streamlined
                  workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <div className="mt-8">
          <DashboardOverview name={session?.user?.name || "Learner"} />
        </div>

        {/* Create Quiz + Quiz History */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <CreateQuizCard />
          <QuizHistoryCard />
        </div>

        {/* Trending Topics + Recent Activity */}
<div className="mt-5 grid gap-5 md:grid-cols-2">
  <TrendingTopicsCard />
  <RecentActivityCard />
</div>
      </main>
    </div>
  );
}