"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../Button";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`
          mx-auto
          max-w-7xl
          transition-all
          duration-500
          ease-out

          ${
            scrolled
              ? `
                rounded-[24px]
                border
                border-[var(--border)]
                bg-white/72
                backdrop-blur-2xl
                shadow-[0_12px_40px_rgba(15,23,42,0.08)]
              `
              : `
                bg-transparent
              `
          }
        `}
      >
        <div className="flex h-[72px] items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl

                bg-gradient-to-br
                from-[#5B5BD6]
                via-[#6D5EF7]
                to-[#7C3AED]

                shadow-[0_12px_30px_rgba(91,91,214,0.30)]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-white/10
                "
              />

              <span className="relative text-lg font-bold text-white">
                Q
              </span>
            </div>

            <div>
              <h1
                className="
                  text-lg
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
                  text-[11px]
                  font-medium
                  tracking-wide
                  text-[var(--foreground-muted)]
                "
              >
                AI LEARNING PLATFORM
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  rounded-xl
                  px-4
                  py-2

                  text-sm
                  font-medium

                  text-[var(--foreground-secondary)]

                  transition-all
                  duration-300

                  hover:bg-white
                  hover:text-[var(--foreground)]
                  hover:shadow-sm
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:flex"
            >
              Sign In
            </Button>

            <Button className="btn-shine">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}