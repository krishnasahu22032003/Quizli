"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Medical Student",
    university: "AIIMS Delhi",
    avatar: "PS",
    rating: 5,
    text: "I used to spend hours making flashcards and still forgetting everything before exams. Quizli replaced all of that. The gap detection found exactly what I kept skipping over without realizing it.",
    stat: { value: "3×", label: "faster retention" },
    tag: "Medicine",
  },
  {
    name: "James Okafor",
    role: "Software Engineer",
    university: "Self-taught",
    avatar: "JO",
    rating: 5,
    text: "I was preparing for system design interviews and needed to fill gaps fast. The adaptive quizzes felt like they were reading my mind — always hitting the exact concepts I was shaky on.",
    stat: { value: "6wk", label: "interview prep" },
    tag: "Engineering",
  },
  {
    name: "Léa Fontaine",
    role: "PhD Researcher",
    university: "Sciences Po Paris",
    avatar: "LF",
    rating: 5,
    text: "As a researcher I need to absorb dense material quickly and actually retain it. Quizli turns my reading notes into active recall sessions in seconds. It has genuinely changed how I study.",
    stat: { value: "40%", label: "more recall" },
    tag: "Research",
  },
  {
    name: "Arjun Mehta",
    role: "CA Aspirant",
    university: "ICAI India",
    avatar: "AM",
    rating: 5,
    text: "CA finals cover an insane amount of material. Quizli helped me build a systematic revision system that actually stuck. I cleared my exams on the first attempt after two previous fails.",
    stat: { value: "1st", label: "attempt clear" },
    tag: "Finance",
  },
  {
    name: "Sofia Reyes",
    role: "High School Teacher",
    university: "Chicago Public Schools",
    avatar: "SR",
    rating: 5,
    text: "I use Quizli to build review quizzes for my students before every unit test. What used to take me two hours now takes five minutes — and the questions are genuinely better than mine.",
    stat: { value: "2hr", label: "saved per week" },
    tag: "Education",
  },
  {
    name: "Daniel Park",
    role: "Bar Exam Candidate",
    university: "Columbia Law",
    avatar: "DP",
    rating: 5,
    text: "Law school teaches you to read. Quizli taught me to remember. The performance analytics showed me I was weak on constitutional law six weeks before the exam — enough time to actually fix it.",
    stat: { value: "6wk", label: "ahead of gaps" },
    tag: "Law",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-[var(--accent)] text-[var(--accent)]" />
      ))}
    </div>
  );
}

function AvatarInitials({ initials, index }: { initials: string; index: number }) {
  const colors = [
    { bg: "rgba(139,115,85,0.12)", text: "var(--accent)" },
    { bg: "rgba(122,143,132,0.12)", text: "var(--sage)" },
    { bg: "rgba(200,182,155,0.18)", text: "var(--bronze)" },
    { bg: "rgba(139,115,85,0.10)", text: "var(--accent)" },
    { bg: "rgba(122,143,132,0.14)", text: "var(--sage)" },
    { bg: "rgba(166,139,104,0.12)", text: "var(--bronze)" },
  ];
  const color = colors[index % colors.length];
  return (
    <div
      className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold tracking-[-0.02em] border border-[var(--border)]"
      style={{ background: color.bg, color: color.text }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ item, index }: { item: (typeof testimonials)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group card-premium relative overflow-hidden flex flex-col cursor-default break-inside-avoid"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[rgba(139,115,85,0.06)] via-[rgba(200,182,155,0.03)] to-transparent pointer-events-none" />
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl bg-[rgba(139,115,85,0.07)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-[var(--accent)] via-[var(--champagne)] to-transparent pointer-events-none" />

      <div className="relative flex flex-col h-full p-7 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <StarRow count={item.rating} />
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--accent-soft)] text-[var(--accent)] border border-[rgba(139,115,85,0.14)]">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            {item.tag}
          </span>
        </div>

        <div className="mb-5">
          <Quote size={18} className="text-[var(--accent)] opacity-40 mb-3" />
          <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--foreground-secondary)] flex-1">
            {item.text}
          </p>
        </div>

        <div className="mt-auto pt-5 border-t border-[var(--border)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AvatarInitials initials={item.avatar} index={index} />
            <div>
              <div className="text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                {item.name}
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                {item.role} · {item.university}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold tracking-[-0.04em] text-[var(--foreground)]">
              {item.stat.value}
            </div>
            <div className="text-[10px] text-[var(--foreground-muted)] tracking-[0.04em]">
              {item.stat.label}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-[1.5px] w-0 rounded-full group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-[var(--accent)] to-[var(--champagne)]" />
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedStat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(num)) { setDisplay(value); return; }
    const controls = animate(0, num, {
      duration: 1.6,
      delay: index * 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${num % 1 !== 0 ? v.toFixed(1) : Math.round(v)}${suffix}`),
    });
    return controls.stop;
  }, [isInView, value, index]);

  return (
    <div ref={ref} className="text-center px-6 sm:px-8 py-4">
      <div className="text-xl sm:text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
        {display}
      </div>
      <div className="text-[11px] mt-0.5 text-[var(--foreground-muted)] tracking-[0.04em]">
        {label}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: blobY1 }}
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 -right-16 h-[420px] w-[420px] rounded-full blur-[130px] bg-[rgba(200,182,155,0.10)]"
        />
        <motion.div
          style={{ y: blobY2 }}
          animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-80px] -left-16 h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(139,115,85,0.08)]"
        />
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 backdrop-blur-xl px-4 py-2 shadow-[0_12px_30px_rgba(17,24,39,0.04)] mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-sm font-medium text-[var(--foreground-secondary)]">
              Loved by learners
            </span>
          </motion.div>

          <div className="mb-2">
            <motion.h2
              initial={{ y: "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-bold tracking-[-0.065em] leading-[1.1] text-[var(--foreground)]"
            >
              Real people,
            </motion.h2>
          </div>
          <div className="pb-2">
            <motion.h2
              initial={{ y: "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.17 }}
              className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-bold tracking-[-0.065em] leading-[1.1] bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent"
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
              real breakthroughs.
            </span>
             
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="mx-auto mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground-secondary)]"
          >
            From students to professionals — see how Quizli is
            transforming the way people learn and retain knowledge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
            className="mt-10 sm:mt-12 inline-flex flex-wrap items-center justify-center rounded-[20px] border border-[var(--border)] bg-white/55 backdrop-blur-xl shadow-[0_14px_30px_rgba(17,24,39,0.04)] divide-x divide-[var(--border)] overflow-hidden"
          >
            {[
              { value: "50000+", label: "Active learners" },
              { value: "4.9", label: "Average rating" },
              { value: "98%", label: "Would recommend" },
            ].map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} index={testimonials.indexOf(item)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex -space-x-2">
            {["PS", "JO", "LF", "AM", "SR"].map((initials, i) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: `rgba(139,115,85,${0.08 + i * 0.03})`,
                  color: "var(--accent)",
                  zIndex: 5 - i,
                }}
              >
                {initials}
              </div>
            ))}
            <div
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-[var(--foreground-muted)]"
              style={{ background: "var(--background-soft)", zIndex: 0 }}
            >
              +50k
            </div>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">
            Join <span className="font-semibold text-[var(--foreground-secondary)]">50,000+</span> learners already using Quizli
          </p>
        </motion.div>
      </div>
    </section>
  );
}
