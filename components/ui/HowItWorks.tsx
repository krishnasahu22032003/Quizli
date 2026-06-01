"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Sparkles, ScanSearch, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Sparkles,
        step: "01",
        title: "Pick your topic",
        subtitle: "Any subject, any depth",
        description:
            "Type any topic — from calculus to ancient history. Quizli instantly understands the scope and tailors the difficulty to where you are right now.",
        tag: "Input",
        detail: "Takes under 5 seconds",
    },
    {
        icon: ScanSearch,
        step: "02",
        title: "AI builds your quiz",
        subtitle: "Precision-crafted questions",
        description:
            "Our model generates high-signal questions that target your exact knowledge gaps — not generic trivia, but the gaps that actually matter.",
        tag: "Generation",
        detail: "Unique every session",
    },
    {
        icon: TrendingUp,
        step: "03",
        title: "Track & improve",
        subtitle: "Progress you can see",
        description:
            "After every session, your performance map updates. Weak areas resurface smarter. Strong areas get reinforced. Every quiz moves you forward.",
        tag: "Growth",
        detail: "Compounding mastery",
    },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-70px 0px" });
    const Icon = step.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 52, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                delay: index * 0.14,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="group card-premium relative overflow-hidden cursor-default flex flex-col"
        >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[rgba(139,115,85,0.06)] via-[rgba(200,182,155,0.03)] to-transparent pointer-events-none" />

            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl bg-[rgba(139,115,85,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="absolute top-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-[var(--accent)] via-[var(--champagne)] to-transparent pointer-events-none" />

            <div className="relative flex flex-col h-full p-7 sm:p-8">

                <div className="flex items-center justify-between mb-7">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--accent-soft)] text-[var(--accent)] border border-[rgba(139,115,85,0.14)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                        {step.tag}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.12em] tabular-nums text-[rgba(17,24,39,0.08)]">
                        {step.step}
                    </span>
                </div>

                <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-6 border border-[var(--border)] bg-white/70 backdrop-blur-xl shadow-[0_4px_16px_rgba(17,24,39,0.04)]">
                    <Icon
                        size={22}
                        className="text-[var(--accent)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-[rgba(139,115,85,0.18)] pointer-events-none" />
                </div>

                <h3 className="text-[1.05rem] sm:text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)] mb-1">
                    {step.title}
                </h3>
                <p className="text-xs font-medium tracking-[0.06em] uppercase text-[var(--accent)] mb-4 opacity-70">
                    {step.subtitle}
                </p>

                <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--foreground-secondary)] flex-1">
                    {step.description}
                </p>

                <div className="mt-7 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--foreground-muted)] tracking-[0.06em]">
                        {step.detail}
                    </span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-[var(--border)] bg-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-[-4px]">
                        <ArrowRight size={12} className="text-[var(--accent)]" />
                    </div>
                </div>

                <div className="mt-4">
                    <div className="h-[1.5px] w-0 rounded-full group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-[var(--accent)] to-[var(--champagne)]" />
                </div>
            </div>
        </motion.div>
    );
}

function ConnectorLine({ index }: { index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

    return (
        <div ref={ref} className="hidden lg:flex items-center justify-center self-center px-1" style={{ marginTop: "-40px" }}>
            <div className="relative w-12 h-[1px] overflow-hidden">
                <div className="absolute inset-0 bg-[var(--border)]" />
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: index * 0.14 + 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--champagne)]"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.14 + 0.75, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0"
            />
        </div>
    );
}

export default function HowItWorks() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section id="how-it-works" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    style={{ y: blobY1 }}
                    animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
                    transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -right-20 h-[440px] w-[440px] rounded-full blur-[130px] bg-[rgba(200,182,155,0.10)]"
                />
                <motion.div
                    style={{ y: blobY2 }}
                    animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
                    transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-80px] -left-20 h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(139,115,85,0.08)]"
                />
                <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
                    transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div ref={headingRef} className="text-center mb-16 sm:mb-20">

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
                            Simple by design
                        </span>
                    </motion.div>

                    <div className="mb-3">
                        <motion.h2
                            initial={{ y: "108%" }}
                            animate={headingInView ? { y: "0%" } : {}}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                            className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-bold tracking-[-0.065em] leading-[1.0] text-[var(--foreground)]"
                        >
                            Three steps to
                        </motion.h2>
                    </div>
                    <div>
                        <motion.h2
                            initial={{ y: "108%" }}
                            animate={headingInView ? { y: "0%" } : {}}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.17 }}
                            className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-bold tracking-[-0.065em] leading-[1.0] bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent"
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
                                mastering anything.
                            </span>

                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                        className="mx-auto mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground-secondary)]"
                    >
                        No complex setup. No guesswork. Just a clear path from
                        knowing nothing to knowing deeply.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0 items-stretch lg:items-start">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.step}>
                            <StepCard step={step} index={i} />
                            {i < steps.length - 1 && <ConnectorLine index={i} />}
                        </React.Fragment>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                </motion.div>
            </div>
        </section>
    );
}
