import QuizCreation from "@/components/forms/QuizForm";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata = {
  title: "Quiz | Quizli",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: Promise<{ topic?: string }>; 
}
const Quiz = async ({ searchParams }: Props) => {
const { topic } = await searchParams; 
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DashboardHeader />
      <main className="mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {/* Removed backdrop-blur-xl — it creates a stacking context that traps fixed children */}
        <section className="relative rounded-[28px] border border-white/20 bg-[rgba(255,255,255,0.05)] shadow-[0_30px_80px_rgba(17,24,39,0.08)]">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[rgba(139,115,85,0.12)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[rgba(139,115,85,0.07)] blur-3xl" />

          <div className="relative px-6 pb-8 sm:px-10 sm:pb-10 pt-8 sm:pt-10">
            <QuizCreation topic={topic ?? ""} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Quiz;