import Link from "next/link";
import { redirect } from "next/navigation";
import { LucideLayoutDashboard, History as HistoryIcon } from "lucide-react";

import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/Button";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px] bg-[rgba(139,115,85,0.07)]" />
        <div className="absolute top-[10%] -right-32 h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(200,182,155,0.09)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[280px] w-[280px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Activity
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Quiz History
            </h1>

            <p className="mt-2 text-sm text-[var(--foreground-secondary)]">
              Browse all quizzes you've completed and revisit their results.
            </p>
          </div>

          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="h-10 rounded-xl px-5 text-sm gap-2"
            >
              <LucideLayoutDashboard className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="group card-premium relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[rgba(139,115,85,0.07)] via-[rgba(200,182,155,0.03)] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none" />

          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[rgba(139,115,85,0.08)] blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

          <div className="relative flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
                Archive
              </p>

              <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[var(--foreground)]">
                Recent Activity
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(139,115,85,0.15)] bg-[rgba(139,115,85,0.06)]">
              <HistoryIcon
                className="h-5 w-5 text-[var(--accent)]"
                strokeWidth={2}
              />
            </div>
          </div>

          <p className="mb-6 text-sm text-[var(--foreground-secondary)]">
            View your complete quiz journey and track your learning progress.
          </p>

          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-[rgba(139,115,85,0.15)] to-transparent" />

          <div className="max-h-[65vh] overflow-y-auto pr-1">
            <HistoryComponent
              limit={100}
              userId={session.user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;