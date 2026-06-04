"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

const navItems = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
];

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); 

 return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4">
<div
  className="
    mx-auto
    max-w-7xl

    rounded-[32px]

    backdrop-blur-xl

    border
    border-white/20

    bg-[rgba(255,255,255,0.05)]

    shadow-[0_20px_60px_rgba(17,24,39,0.06)]

    transition-all
    duration-500
  "
>
        <div className="flex h-[64px] items-center justify-between px-5 lg:px-7">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
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
                  h-10
                  w-10
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
                AI Learning Platform
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  px-4
                  py-2.5
                  text-[14px]
                  font-medium
                  text-[var(--foreground-secondary)]
                  transition-all
                  duration-300
                "
              >
                <span className="relative z-10">
                  {item.label}
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    rounded-xl
                    bg-white
                    opacity-0
                    scale-95
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:scale-100
                    shadow-[0_8px_20px_rgba(17,24,39,0.04)]
                  "
                />

                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-[var(--accent)]
                    transition-all
                    duration-300
                    group-hover:w-6
                  "
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              onClick={()=> router.push("/signup")}
              variant="ghost"
              className="text-[14px] cursor-pointer"
            >
              Sign Up
            </Button>

            <Button
            onClick={()=>router.push("/signin")}
              className="
              cursor-pointer
                btn-shine
                h-11
                px-5
                text-[14px]
              "
            >
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-white/70
              backdrop-blur-xl
            "
          >
            <div className="flex flex-col gap-[4px]">
              <span
                className={`
                  h-[2px]
                  w-5
                  bg-[var(--foreground)]
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "translate-y-[6px] rotate-45"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-[2px]
                  w-5
                  bg-[var(--foreground)]
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "opacity-0"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-[2px]
                  w-5
                  bg-[var(--foreground)]
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "-translate-y-[6px] -rotate-45"
                      : ""
                  }
                `}
              />
            </div>
          </button>
        </div>

        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-out
            ${
              menuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="border-t border-[var(--border)] px-5 py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-[var(--foreground-secondary)]
                    transition-all
                    duration-300
                    hover:bg-white
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Button
                variant="ghost"
                className="w-full"
              >
                Sign In
              </Button>

              <Button
                className="
                  btn-shine
                  w-full
                "
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}