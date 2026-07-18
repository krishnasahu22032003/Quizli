import prisma from "@/lib/prisma";
import { Clock, CopyCheck, Edit2, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/statistics/${game.id}`}
          className="group block"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(139,115,85,0.12)] bg-[rgba(255,255,255,0.02)] p-4 transition-all duration-300 hover:border-[rgba(139,115,85,0.25)] hover:bg-[rgba(255,255,255,0.03)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(139,115,85,0.05)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]">
                  {game.gameType === "mcq" ? (
                    <CopyCheck
                      className="h-5 w-5 text-[var(--accent)]"
                      strokeWidth={2}
                    />
                  ) : (
                    <Edit2
                      className="h-5 w-5 text-[var(--accent)]"
                      strokeWidth={2}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {game.topic}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-xl border border-[rgba(139,115,85,0.12)] bg-[rgba(139,115,85,0.06)] px-2.5 py-1 text-xs text-[var(--foreground-secondary)]">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {new Date(
                        game.timeEnded ?? game.timeStarted
                      ).toLocaleDateString()}
                    </span>

                    <span className="text-xs text-[var(--foreground-muted)]">
                      {game.gameType === "mcq"
                        ? "Multiple Choice"
                        : "Open-Ended"}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-[var(--foreground-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HistoryComponent;