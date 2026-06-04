"use client";

import { motion } from "framer-motion";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const stats = [
    {
      value: "10M+",
      label: "Questions Generated",
    },
    {
      value: "96%",
      label: "Learning Accuracy",
    },
    {
      value: "24/7",
      label: "AI Assistance",
    },
  ];

const router = useRouter();

  return (
    <section id="/" className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-32
            -left-32
            h-[420px]
            w-[420px]
            rounded-full
            blur-[120px]
            bg-[rgba(139,115,85,0.10)]
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-[10%]
            -right-32
            h-[380px]
            w-[380px]
            rounded-full
            blur-[120px]
            bg-[rgba(200,182,155,0.12)]
          "
        />

        <motion.div
          animate={{
            x: [0, 12, 0],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-[-120px]
            left-1/2
            h-[280px]
            w-[280px]
            -translate-x-1/2
            rounded-full
            blur-[100px]
            bg-[rgba(122,143,132,0.08)]
          "
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
    <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              inline-flex
              items-center
              gap-3

              rounded-full

              border
              border-[var(--border)]

              bg-white/70

              px-4
              py-2

              backdrop-blur-xl

              shadow-[0_12px_30px_rgba(17,24,39,0.04)]
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[var(--accent)]
                  opacity-40
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-[var(--accent)]
                "
              />
            </span>

            <span
              className="
                text-sm
                font-medium
                text-[var(--foreground-secondary)]
              "
            >
              Learning, reimagined with AI
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 48,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-4xl

              text-[2.7rem]
              font-bold

              leading-[0.95]
              tracking-[-0.065em]

              text-[var(--foreground)]

              sm:text-[3.6rem]
              lg:text-[4.6rem]
            "
          >
            Master any topic,
            <br />

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
              one insight at a time.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8

              max-w-2xl

              text-[15px]
              leading-relaxed

              text-[var(--foreground-secondary)]

              lg:text-[17px]
            "
          >
            Generate intelligent quizzes, uncover knowledge gaps,
            and build lasting understanding through a learning
            experience designed around how you think.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.3,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-10

              flex
              flex-col
              gap-3

              rounded-[22px]

              border
              border-[rgba(17,24,39,0.06)]

              bg-white/55

              p-2

              backdrop-blur-xl

              shadow-[0_14px_30px_rgba(17,24,39,0.04)]

              sm:flex-row
            "
          >
            <motion.div
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Button
              onClick={()=> router.push("/signin")}
                className="
                cursor-pointer
                  btn-shine
                  h-11
                  px-6
                  text-sm
                "
              >
                Start Learning
              </Button>
            </motion.div>

            <motion.div
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Button
                variant="secondary"
                className="
                cursor-pointer
                  h-11
                  px-6
                  text-sm
                "
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 36,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-14

              grid
              w-full
              max-w-4xl

              grid-cols-1
              gap-4

              md:grid-cols-3
            "
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="
                  group
                  card-premium

                  relative
                  overflow-hidden

                  p-6
                  text-center
                "
              >
                <div
                  className="
                    absolute
                    inset-0

                    opacity-0

                    transition-all
                    duration-500

                    group-hover:opacity-100

                    bg-gradient-to-br
                    from-[rgba(139,115,85,0.04)]
                    via-[rgba(200,182,155,0.02)]
                    to-transparent
                  "
                />

                <div
                  className="
                    relative

                    text-2xl
                    font-bold

                    tracking-[-0.04em]

                    text-[var(--foreground)]
                  "
                >
                  {item.value}
                </div>

                <div
                  className="
                    relative

                    mt-2

                    text-sm

                    text-[var(--foreground-muted)]
                  "
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}