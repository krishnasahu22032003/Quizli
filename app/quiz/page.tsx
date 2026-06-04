import QuizCreation from "@/components/forms/QuizForm";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata = {
  title: "Quiz | Quizli",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: { topic?: string };
}

const Quiz = ({ searchParams }: Props) => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/20 bg-[rgba(255,255,255,0.05)] backdrop-blur-xl shadow-[0_30px_80px_rgba(17,24,39,0.08)]">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(139,115,85,0.12)] blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-[rgba(139,115,85,0.06)] blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-sm font-medium text-[var(--foreground-secondary)]">
                AI Quiz Generator
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Create a{" "}
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
                Quiz
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--foreground-secondary)] sm:text-base">
              Choose a topic, set your difficulty, and let AI generate a
              personalized quiz tailored to your learning goals.
            </p>
          </div>
        </section>

        {/* Quiz Creation Form */}
        <div className="mt-8">
          <QuizCreation topic={searchParams.topic ?? ""} />
        </div>
      </main>
    </div>
  );
};

export default Quiz;