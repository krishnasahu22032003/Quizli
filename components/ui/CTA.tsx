"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Brain } from "lucide-react";

const floatingCards = [
    { icon: Brain, label: "AI Quiz Generation", sub: "Topic: Quantum Physics", delay: 0 },
    { icon: BookOpen, label: "Smart Revision", sub: "12 concepts reinforced", delay: 0.15 },
    { icon: Sparkles, label: "Adaptive Learning", sub: "Difficulty adjusted", delay: 0.3 },
];

function FloatingCard({
    card,
    position,
}: {
    card: (typeof floatingCards)[0];
    position: "left" | "right";
}) {
    const Icon = card.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: position === "left" ? -30 : 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ delay: 0.5 + card.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            animate={{ y: [0, -8, 0] }}
            style={{
                animationDelay: `${card.delay}s`,
                animationDuration: "4s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
            }}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/80 backdrop-blur-xl px-4 py-3 shadow-[0_12px_32px_rgba(17,24,39,0.07)]"
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--accent-soft)] border border-[rgba(139,115,85,0.14)] flex-shrink-0">
                <Icon size={15} className="text-[var(--accent)]" />
            </div>
            <div>
                <div className="text-xs font-semibold text-[var(--foreground)] tracking-[-0.02em]">
                    {card.label}
                </div>
                <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{card.sub}</div>
            </div>
        </motion.div>
    );
}

export default function CTA() {
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
                    transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-28 -left-16 h-[440px] w-[440px] rounded-full blur-[130px] bg-[rgba(139,115,85,0.09)]"
                />
                <motion.div
                    style={{ y: blobY2 }}
                    animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-80px] -right-16 h-[400px] w-[400px] rounded-full blur-[120px] bg-[rgba(200,182,155,0.10)]"
                />
                <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
                    transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]"
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] border border-[rgba(139,115,85,0.18)] bg-white/60 backdrop-blur-2xl shadow-[0_40px_100px_rgba(139,115,85,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]">

                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,115,85,0.05)] via-[rgba(200,182,155,0.03)] to-[rgba(122,143,132,0.04)] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(247,246,243,0.6)] to-transparent pointer-events-none" />

                    <div
                        className="absolute inset-0 opacity-[0.025] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(139,115,85,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.8) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    <motion.div
                        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full blur-[80px] bg-[rgba(200,182,155,0.18)] pointer-events-none"
                    />
                    <motion.div
                        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
                        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-60px] left-[-40px] w-[240px] h-[240px] rounded-full blur-[70px] bg-[rgba(139,115,85,0.12)] pointer-events-none"
                    />

                    <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                            <div ref={headingRef} className="flex-1 text-center lg:text-left">
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
                                        Start for free today
                                    </span>
                                </motion.div>

                                <div className="mb-2">
                                    <motion.h2
                                        initial={{ y: "108%" }}
                                        animate={headingInView ? { y: "0%" } : {}}
                                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                                        className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] font-bold tracking-[-0.065em] leading-[1.1] text-[var(--foreground)]"
                                    >
                                        Your smartest
                                    </motion.h2>
                                </div>
                                <div className="pb-2 mb-6">
                                    <motion.h2
                                        initial={{ y: "108%" }}
                                        animate={headingInView ? { y: "0%" } : {}}
                                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.17 }}
                                        className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] font-bold tracking-[-0.065em] leading-[1.1] bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent"
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
                                            study session awaits.
                                        </span>

                                    </motion.h2>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                                    className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground-secondary)] max-w-md mx-auto lg:mx-0 mb-9"
                                >
                                    Join 50,000+ learners who stopped re-reading and
                                    started actually remembering. No credit card needed.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
                                    className="flex flex-col gap-3 rounded-[22px] border border-[rgba(17,24,39,0.06)] bg-white/55 p-2 backdrop-blur-xl shadow-[0_14px_30px_rgba(17,24,39,0.04)] sm:flex-row w-fit mx-auto lg:mx-0"
                                >
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-shine cursor-pointer inline-flex items-center justify-center gap-2 rounded-[16px] bg-[var(--accent)] px-7 h-11 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(139,115,85,0.30)] hover:bg-[var(--accent-hover)] transition-colors"
                                    >
                                        Start learning free
                                        <ArrowRight size={14} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        onClick={() => {
                                            document
                                                .getElementById("pricing")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[16px] border border-[var(--border)] bg-white/70 px-7 h-11 text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
                                    >
                                        View pricing
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.56 }}
                                    className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-6"
                                >
                                    {["No credit card", "Free forever plan", "Cancel anytime"].map((text) => (
                                        <div key={text} className="flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-60" />
                                            <span className="text-xs text-[var(--foreground-muted)]">{text}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={headingInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="hidden lg:flex flex-col gap-4 flex-shrink-0 w-[280px]"
                            >
                                {floatingCards.map((card, i) => (
                                    <FloatingCard
                                        key={card.label}
                                        card={card}
                                        position={i % 2 === 0 ? "right" : "left"}
                                    />
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                    className="mt-2 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-xl px-5 py-4 shadow-[0_12px_32px_rgba(17,24,39,0.06)]"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-[var(--foreground)] tracking-[-0.02em]">
                                            Your progress
                                        </span>
                                        <span className="text-xs font-bold text-[var(--accent)]">+24% this week</span>
                                    </div>
                                    <div className="flex items-end gap-1 h-10">
                                        {[30, 52, 45, 68, 58, 80, 72].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scaleY: 0 }}
                                                animate={headingInView ? { scaleY: 1 } : {}}
                                                transition={{ delay: 1.0 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex-1 rounded-sm origin-bottom"
                                                style={{
                                                    height: `${h}%`,
                                                    background:
                                                        i === 6
                                                            ? "var(--accent)"
                                                            : "rgba(139,115,85,0.15)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                            <span
                                                key={`${d}-${i}`}
                                                className="flex-1 text-center text-[9px] text-[var(--foreground-muted)]"
                                            >
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
