"use client";

import { motion } from "framer-motion";
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
  },
  {
    icon: Target,
    title: "Gap Detection",
    description:
      "Identify weak concepts automatically before they impact your progress.",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track improvement with detailed insights and learning patterns.",
    size: "small",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description:
      "Every session evolves based on your understanding and performance.",
    size: "large",
  },
  {
    icon: BookOpen,
    title: "Smart Revision",
    description:
      "Revisit concepts at the perfect moment using AI-powered retention techniques.",
    size: "small",
  },
  {
    icon: Layers3,
    title: "Multi-Topic Learning",
    description:
      "Master multiple subjects simultaneously without losing focus.",
    size: "small",
  },
];

export default function Features() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-0
            left-0
            h-[400px]
            w-[400px]
            rounded-full
            blur-[130px]
            bg-[rgba(139,115,85,0.08)]
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-0
            right-0
            h-[350px]
            w-[350px]
            rounded-full
            blur-[120px]
            bg-[rgba(122,143,132,0.08)]
          "
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[var(--border)]
              bg-white/60
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span className="text-sm font-medium text-[var(--foreground-secondary)]">
              Why Quizli Works
            </span>
          </div>

          <h2
            className="
              mt-8
              text-[2.5rem]
              font-bold
              tracking-[-0.06em]
              text-[var(--foreground)]
              sm:text-[3.5rem]
            "
          >
            Learning built around
            <br />
            how your mind grows.
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-[15px]
              leading-relaxed
              text-[var(--foreground-secondary)]
              lg:text-[17px]
            "
          >
            Every interaction is designed to accelerate understanding,
            strengthen retention, and make progress measurable.
          </p>
        </motion.div>

        <div
          className="
            mt-20
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[rgba(17,24,39,0.06)]
                  bg-white/60
                  backdrop-blur-xl
                  shadow-[0_20px_50px_rgba(17,24,39,0.05)]
                  transition-all
                  duration-500
                  ${
                    feature.size === "large"
                      ? "lg:col-span-2 min-h-[320px]"
                      : "min-h-[260px]"
                  }
                `}
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-all
                    duration-700
                    group-hover:opacity-100

                    bg-gradient-to-br
                    from-[rgba(139,115,85,0.08)]
                    via-[rgba(200,182,155,0.04)]
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    blur-3xl
                    opacity-0
                    transition-all
                    duration-700
                    group-hover:opacity-100

                    bg-[rgba(139,115,85,0.10)]
                  "
                />

                <div className="relative flex h-full flex-col p-8">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[rgba(17,24,39,0.06)]
                      bg-white/70
                      backdrop-blur-xl
                    "
                  >
                    <Icon
                      size={24}
                      className="
                        text-[var(--accent)]
                        transition-transform
                        duration-500
                        group-hover:scale-110
                        group-hover:rotate-6
                      "
                    />
                  </div>

                  <div
                    className="
                      absolute
                      right-8
                      top-8

                      text-5xl
                      font-bold
                      tracking-[-0.06em]

                      text-[rgba(17,24,39,0.05)]
                    "
                  >
                    0{index + 1}
                  </div>

                  <h3
                    className="
                      mt-8
                      text-xl
                      font-semibold
                      tracking-[-0.04em]
                      text-[var(--foreground)]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-md
                      leading-relaxed
                      text-[var(--foreground-secondary)]
                    "
                  >
                    {feature.description}
                  </p>

                  <div className="mt-auto pt-10">
                    <div
                      className="
                        h-[2px]
                        w-0
                        bg-[var(--accent)]
                        transition-all
                        duration-700
                        group-hover:w-full
                      "
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}