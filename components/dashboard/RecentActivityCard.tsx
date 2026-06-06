import Link from "next/link";
import { History } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent";
import prisma from "@/app/lib/prisma";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const games_count = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="group card-premium relative overflow-hidden col-span-4 lg:col-span-3 p-6 md:p-8">
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none" />

      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[rgba(139,115,85,0.08)] blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Activity
          </p>

          <Link href="/history">
            <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent)]">
              Recent Activity
            </h2>
          </Link>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]">
          <History
            className="h-5 w-5 text-[var(--accent)]"
            strokeWidth={2}
          />
        </div>
      </div>

      <p className="mb-6 text-sm text-[var(--foreground-secondary)]">
        You have played a total of{" "}
        <span className="font-semibold text-[var(--foreground)]">
          {games_count}
        </span>{" "}
        quizzes.
      </p>

      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent" />

      <div className="relative max-h-[580px] overflow-y-auto pr-1">
        <HistoryComponent limit={10} userId={session.user.id} />
      </div>
    </div>
  );
};

export default RecentActivityCard;