"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-transparent
          via-[rgba(139,115,85,0.015)]
          to-[rgba(139,115,85,0.03)]
        "
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-0

          h-[180px]
          w-[180px]

          -translate-x-1/2

          rounded-full

          blur-[80px]

          bg-[rgba(139,115,85,0.08)]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="
            flex
            flex-col
            items-center
            justify-center

            gap-2

            py-6

            text-center

            sm:flex-row
          "
        >
          <span
            className="
              text-[13px]
              font-medium

              tracking-[-0.03em]

              text-[var(--foreground-secondary)]
            "
          >
            © {new Date().getFullYear()} Quizly
          </span>

          <span
            className="
              hidden

              h-1
              w-1

              rounded-full

              bg-[var(--accent)]

              opacity-40

              sm:block
            "
          />

          <div
            className="
              flex
              items-center

              gap-1.5

              text-[13px]

              text-[var(--foreground-secondary)]
            "
          >
            <span>Crafted with</span>

            <Heart
              size={13}
              className="
                fill-[var(--accent)]
                text-[var(--accent)]

                animate-pulse
              "
            />

            <span>
              by{" "}
              <span
                className="
                  font-semibold

                  text-[var(--foreground)]
                "
              >
                Krishna
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}