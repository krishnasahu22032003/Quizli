"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    tag: "Get started",
    price: { monthly: 0, yearly: 0 },
    description: "Everything you need to try Quizli and start building knowledge.",
    cta: "Start for free",
    ctaVariant: "secondary",
    features: [
      "10 AI quizzes per month",
      "Basic gap detection",
      "3 topics simultaneously",
      "Core performance analytics",
      "Community support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    tag: "Most popular",
    price: { monthly: 12, yearly: 9 },
    description: "Unlimited learning power for serious learners who want real results.",
    cta: "Get Pro",
    ctaVariant: "primary",
    features: [
      "Unlimited AI quizzes",
      "Deep gap detection",
      "Unlimited topics",
      "Advanced analytics & patterns",
      "Smart revision scheduling",
      "Adaptive difficulty engine",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Team",
    tag: "For groups",
    price: { monthly: 29, yearly: 22 },
    description: "Built for teams, classrooms, and organizations learning together.",
    cta: "Get Team",
    ctaVariant: "secondary",
    features: [
      "Everything in Pro",
      "Up to 20 members",
      "Shared topic libraries",
      "Team performance dashboard",
      "Admin controls",
      "Custom branding",
      "Dedicated support",
    ],
    highlight: false,
  },
];

function PricingCard({
  plan,
  index,
  yearly,
}: {
  plan: (typeof plans)[0];
  index: number;
  yearly: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-70px 0px" });
  const price = yearly ? plan.price.yearly : plan.price.monthly;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 52, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: plan.highlight ? -10 : -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className={`group relative overflow-hidden flex flex-col cursor-default ${
        plan.highlight
          ? "rounded-[32px] border border-[var(--accent)] bg-white shadow-[0_30px_80px_rgba(139,115,85,0.18),0_0_0_1px_rgba(139,115,85,0.12)]"
          : "card-premium"
      }`}
    >
      {plan.highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,115,85,0.04)] via-[rgba(200,182,155,0.02)] to-transparent pointer-events-none" />
      )}

      {!plan.highlight && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[rgba(139,115,85,0.06)] via-[rgba(200,182,155,0.03)] to-transparent pointer-events-none" />
      )}

      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl bg-[rgba(139,115,85,0.07)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="absolute top-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-[var(--accent)] via-[var(--champagne)] to-transparent pointer-events-none" />

      <div className="relative flex flex-col h-full p-7 sm:p-8">
        <div className="flex items-center justify-between mb-7">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[var(--accent-soft)] text-[var(--accent)] border border-[rgba(139,115,85,0.14)]">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            {plan.tag}
          </span>
          {plan.highlight && (
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-[var(--accent)] text-white text-[10px] font-semibold tracking-[0.1em] uppercase">
              <Sparkles size={10} />
              Best value
            </div>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)] mb-2">
          {plan.name}
        </h3>

        <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed mb-7">
          {plan.description}
        </p>

        <div className="flex items-end gap-1.5 mb-8">
          <motion.span
            key={`${plan.name}-${yearly}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3rem] sm:text-[3.4rem] font-bold tracking-[-0.05em] leading-none text-[var(--foreground)]"
          >
            {price === 0 ? "Free" : `$${price}`}
          </motion.span>
          {price !== 0 && (
            <span className="text-sm text-[var(--foreground-muted)] mb-2">/ mo</span>
          )}
        </div>

        <button
          className={`btn-shine w-full h-11 cursor-pointer rounded-[16px] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${
            plan.ctaVariant === "primary"
              ? "bg-[var(--accent)] text-white shadow-[0_8px_24px_rgba(139,115,85,0.30)] hover:bg-[var(--accent-hover)]"
              : "border border-[var(--border)] bg-white/70 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]"
          }`}
        >
          {plan.cta}
          <ArrowRight size={14} />
        </button>

        <div className="h-[1px] w-full bg-[var(--border)] mb-7" />

        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent-soft)] border border-[rgba(139,115,85,0.18)]">
                <Check size={9} className="text-[var(--accent)]" strokeWidth={3} />
              </span>
              <span className="text-sm text-[var(--foreground-secondary)] leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <div className="h-[1.5px] w-0 rounded-full group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-[var(--accent)] to-[var(--champagne)]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section id="pricing" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: blobY1 }}
          animate={{ x: [0, 26, 0], y: [0, -16, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 -left-20 h-[420px] w-[420px] rounded-full blur-[130px] bg-[rgba(139,115,85,0.08)]"
        />
        <motion.div
          style={{ y: blobY2 }}
          animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-80px] -right-20 h-[380px] w-[380px] rounded-full blur-[120px] bg-[rgba(200,182,155,0.10)]"
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
          transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full blur-[100px] bg-[rgba(122,143,132,0.06)]"
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
              Simple pricing
            </span>
          </motion.div>

          <div className=" mb-2">
            <motion.h2
              initial={{ y: "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-bold tracking-[-0.065em] leading-[1.1] text-[var(--foreground)]"
            >
              Invest in your
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
                             own intelligence.
                            </span>
            
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="mx-auto mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground-secondary)]"
          >
            Start free and scale as you grow. No hidden fees, no
            commitments — just knowledge at your pace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
            className="mt-9 inline-flex items-center gap-1 rounded-[16px] border border-[var(--border)] bg-white/60 backdrop-blur-xl p-1 shadow-[0_8px_24px_rgba(17,24,39,0.04)]"
          >
            <button
              onClick={() => setYearly(false)}
              className={`relative cursor-pointer px-5 h-9 rounded-[12px] text-sm font-medium transition-all duration-300 ${
                !yearly
                  ? "bg-white text-[var(--foreground)] shadow-[0_2px_8px_rgba(17,24,39,0.08)]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground-secondary)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative cursor-pointer flex items-center gap-2 px-5 h-9 rounded-[12px] text-sm font-medium transition-all duration-300 ${
                yearly
                  ? "bg-white text-[var(--foreground)] shadow-[0_2px_8px_rgba(17,24,39,0.08)]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground-secondary)]"
              }`}
            >
              Yearly
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] border border-[rgba(139,115,85,0.18)] px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--accent)]">
                <Zap size={8} />
                Save 25%
              </span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} yearly={yearly} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          {[
            { icon: Check, text: "No credit card required" },
            { icon: Check, text: "Cancel anytime" },
            { icon: Check, text: "14-day Pro trial included" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent-soft)] border border-[rgba(139,115,85,0.18)]">
                <Check size={9} className="text-[var(--accent)]" strokeWidth={3} />
              </span>
              <span className="text-sm text-[var(--foreground-muted)]">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
