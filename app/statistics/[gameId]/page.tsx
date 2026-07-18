import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";
import { Button } from "@/components/Button";
type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const Statistics = async ({ params }: Props) => {
  const { gameId } = await params;

  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  console.log("gameId:", gameId);

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true },
  });

  if (!game) {
    return redirect("/");
  }


  let accuracy = 0;
  if (game.gameType === "mcq") {
    const totalCorrect = game.questions.reduce((acc, q) => acc + (q.isCorrect ? 1 : 0), 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    const totalPercentage = game.questions.reduce((acc, q) => acc + (q.percentageCorrect ?? 0), 0);
    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px] bg-[rgba(139,115,85,0.07)]" />
        <div className="absolute top-[10%] -right-32 h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(200,182,155,0.09)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[280px] w-[280px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Quiz Complete
            </p>
            <h1 className="text-3xl font-bold tracking-[-0.05em] text-[var(--foreground)] mt-1">
              Summary
            </h1>
          </div>

          <Link href="/dashboard">
            <Button variant="secondary" className="gap-2 cursor-pointer rounded-xl px-5 h-10 text-sm mt-3 sm:mt-0">
              <LucideLayoutDashboard className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? new Date())}
            timeStarted={new Date(game.timeStarted)}
          />
        </div>

        <div className="mt-6">
          <QuestionsList questions={game.questions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;