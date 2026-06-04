"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Sparkles,
  BarChart3,
  Target,
  BookOpen,
  Layers3,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Quiz Generation",
    description:
      "Transform any topic into intelligent quizzes tailored to your learning level within seconds.",
    size: "large",
    tag: "Core Engine",
    index: 0,
  },
  {
    icon: Target,
    title: "Gap Detection",
    description:
      "Identify weak concepts automatically before they impact your progress.",
    size: "small",
    tag: "Analytics",
    index: 1,
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track improvement with detailed insights and learning patterns.",
    size: "small",
    tag: "Insights",
    index: 2,
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description:
      "Every session evolves based on your understanding and performance.",
    size: "large",
    tag: "AI Powered",
    index: 3,
  },
  {
    icon: BookOpen,
    title: "Smart Revision",
    description:
      "Revisit concepts at the perfect moment using AI-powered retention techniques.",
    size: "small",
    tag: "Memory",
    index: 4,
  },
  {
    icon: Layers3,
    title: "Multi-Topic Learning",
    description:
      "Master multiple subjects simultaneously without losing focus.",
    size: "small",
    tag: "Structure",
    index: 5,
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const Icon = feature.icon;

  return (
    <motion.div
      id="features"
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: feature.index * 0.09,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className={`
        group card-premium relative overflow-hidden cursor-default
        ${feature.size === "large" ? "lg:col-span-2 min-h-[300px]" : "min-h-[260px]"}
      `}
    >
      <div
        className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          bg-gradient-to-br
          from-[rgba(139,115,85,0.06)]
          via-[rgba(200,182,155,0.03)]
          to-transparent
          pointer-events-none
        "
      />

      {/* Top-right corner glow orb */}
      <div
        className="
          absolute -right-14 -top-14
          h-36 w-36 rounded-full blur-3xl
          bg-[rgba(139,115,85,0.08)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          pointer-events-none
        "
      />

      {/* Shimmer line — top edge on hover */}
      <div
        className="
          absolute top-0 left-0 h-[1.5px] w-0
          group-hover:w-full
          transition-all duration-700 ease-out
          bg-gradient-to-r from-[var(--accent)] via-[var(--champagne)] to-transparent
          pointer-events-none
        "
      />

      <div className="relative flex h-full flex-col p-7 sm:p-8">
        {/* Tag + index row */}
        <div className="flex items-center justify-between mb-7">
          <span
            className="
              inline-flex items-center gap-1.5
              rounded-full px-3 py-1
              text-[10px] font-semibold tracking-[0.14em] uppercase
              bg-[var(--accent-soft)]
              text-[var(--accent)]
              border border-[rgba(139,115,85,0.14)]
            "
          >
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            {feature.tag}
          </span>
          <span
            className="
              text-[11px] font-bold tracking-[0.12em] tabular-nums
              text-[rgba(17,24,39,0.08)]
            "
          >
            {String(feature.index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Icon */}
        <div
          className="
            relative flex items-center justify-center
            w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-6
            border border-[var(--border)]
            bg-white/70 backdrop-blur-xl
            shadow-[0_4px_16px_rgba(17,24,39,0.04)]
          "
        >
          <Icon
            size={22}
            className="
              text-[var(--accent)]
              transition-transform duration-500
              group-hover:scale-110 group-hover:rotate-6
            "
          />

          <div
            className="
              absolute inset-0 rounded-2xl
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              blur-md bg-[rgba(139,115,85,0.18)]
              pointer-events-none
            "
          />
        </div>

        <h3
          className="
            text-[1.05rem] sm:text-xl font-semibold
            tracking-[-0.04em]
            text-[var(--foreground)]
            mb-3
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            text-sm sm:text-[15px] leading-relaxed
            text-[var(--foreground-secondary)]
            max-w-sm
            flex-1
          "
        >
          {feature.description}
        </p>

        <div className="mt-auto pt-7">
          <div
            className="
              h-[1.5px] w-0 rounded-full
              group-hover:w-full
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              bg-gradient-to-r from-[var(--accent)] to-[var(--champagne)]
            "
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
   
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute -top-24 -left-24
            h-[420px] w-[420px] rounded-full blur-[130px]
            bg-[rgba(139,115,85,0.08)]
          "
        />
        <motion.div
          animate={{ x: [0, -22, 0], y: [0, 16, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute top-[20%] -right-24
            h-[380px] w-[380px] rounded-full blur-[120px]
            bg-[rgba(200,182,155,0.10)]
          "
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute bottom-[-80px] left-1/2 -translate-x-1/2
            h-[260px] w-[260px] rounded-full blur-[100px]
            bg-[rgba(122,143,132,0.07)]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading block ───────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">

          {/* Eyebrow — matches hero pattern exactly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="
              inline-flex items-center gap-3
              rounded-full
              border border-[var(--border)]
              bg-white/70 backdrop-blur-xl
              px-4 py-2
              shadow-[0_12px_30px_rgba(17,24,39,0.04)]
              mb-7
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute inline-flex h-full w-full
                  animate-ping rounded-full
                  bg-[var(--accent)] opacity-40
                "
              />
              <span
                className="
                  relative inline-flex h-2 w-2
                  rounded-full bg-[var(--accent)]
                "
              />
            </span>
            <span className="text-sm font-medium text-[var(--foreground-secondary)]">
              Built different
            </span>
          </motion.div>

          {/* Main headline — slide-up reveal per line */}
          <div className=" mb-3">
            <motion.h2
              initial={{ y: "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="
                text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]
                font-bold tracking-[-0.065em] leading-[1.0]
                text-[var(--foreground)]
              "
            >
              Learning, engineered
            </motion.h2>
          </div>
          <div className="">
            <motion.h2
              initial={{ y: "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.17 }}
              className="
                text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]
                font-bold tracking-[-0.065em] leading-[1.0]
                bg-gradient-to-r
                from-[var(--foreground)]
                via-[var(--foreground)]
                to-[var(--accent)]
                bg-clip-text text-transparent
              "
            >
             <span
              className="
                bg-gradient-to-r
                from-[var(--foreground)]
                via-[var(--foreground)]
                to-[var(--accent)]

                bg-clip-text
                text-transparent
              "
            >
                to perfection
                </span>
            </motion.h2>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="
              mx-auto mt-5
              max-w-xl
              text-[15px] sm:text-[16px] leading-relaxed
              text-[var(--foreground-secondary)]
            "
          >
            Every interaction is designed to accelerate understanding,
            strengthen retention, and make progress measurable.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
            className="
              mt-10 sm:mt-12
              inline-flex flex-wrap items-center justify-center
              gap-0
              rounded-[20px]
              border border-[var(--border)]
              bg-white/55 backdrop-blur-xl
              shadow-[0_14px_30px_rgba(17,24,39,0.04)]
              divide-x divide-[var(--border)]
              overflow-hidden
            "
          >
            {[
              { value: "10M+", label: "Questions generated" },
              { value: "96%", label: "Retention accuracy" },
              { value: "3×", label: "Faster mastery" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 sm:px-8 py-4 text-center">
                <div
                  className="
                    text-xl sm:text-2xl font-bold tracking-[-0.04em]
                    text-[var(--foreground)]
                  "
                >
                  {stat.value}
                </div>
                <div className="text-[11px] mt-0.5 text-[var(--foreground-muted)] tracking-[0.04em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Feature grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
