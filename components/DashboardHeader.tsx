"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./Button";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-5">
      <div
        className="
          mx-auto
          max-w-7xl
          rounded-[32px]
          border
          border-white/20
          bg-[rgba(255,255,255,0.05)]
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(17,24,39,0.06)]
          transition-all
          duration-500
        "
      >
        <div className="flex h-[72px] items-center justify-between px-5 lg:px-7">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-[rgba(139,115,85,0.18)]
                  blur-xl
                  opacity-0
                  transition-all
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[16px]
                  border
                  border-[rgba(139,115,85,0.18)]
                  bg-gradient-to-br
                  from-white
                  to-[#f6f4ef]
                  shadow-[0_10px_25px_rgba(17,24,39,0.06)]
                  transition-all
                  duration-500
                  group-hover:-translate-y-[2px]
                  group-hover:scale-[1.02]
                "
              >
                <span
                  className="
                    text-[20px]
                    font-bold
                    text-[var(--accent)]
                  "
                >
                  Q
                </span>
              </div>
            </div>

            <div>
              <h1
                className="
                  text-[17px]
                  font-bold
                  tracking-[-0.04em]
                  text-[var(--foreground)]
                "
              >
                Quizli
              </h1>

              <p
                className="
                  -mt-1
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[var(--foreground-muted)]
                "
              >
                Dashboard
              </p>
            </div>
          </Link>

          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="
              group
              btn-shine
              h-11
              px-4
              sm:px-5
              text-[14px]
              cursor-pointer
              transition-all
              duration-300
              hover:-translate-y-[2px]
            "
          >
            <LogOut
              className="
                mr-2
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:-rotate-12
              "
            />
            <span className="hidden sm:inline">
              Sign Out
            </span>
            <span className="sm:hidden">
              Logout
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}