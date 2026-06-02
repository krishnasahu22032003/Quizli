"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordRules = useMemo(
    () => ({
      length: form.password.length >= 8,
      upper: /[A-Z]/.test(form.password),
      lower: /[a-z]/.test(form.password),
      number: /\d/.test(form.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    }),
    [form.password]
  );

  const passwordValid = Object.values(passwordRules).every(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-8">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            -top-24
            -left-24
            h-[320px]
            w-[320px]
            rounded-full
            blur-[120px]
            bg-[rgba(139,115,85,0.10)]
          "
        />

        <div
          className="
            absolute
            top-[10%]
            -right-24
            h-[280px]
            w-[280px]
            rounded-full
            blur-[120px]
            bg-[rgba(200,182,155,0.10)]
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-1/2
            h-[240px]
            w-[240px]
            -translate-x-1/2
            rounded-full
            blur-[100px]
            bg-[rgba(122,143,132,0.08)]
          "
        />
      </div>

      <div
        className="
          glass-card
          relative
          z-10
          w-full
          max-w-md
          p-6
          md:p-8
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[var(--accent-soft)]
              border
              border-[var(--border)]
            "
          >
            <span className="text-xl font-bold text-[var(--accent)]">
              Q
            </span>
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              tracking-[-0.04em]
              text-[var(--foreground)]
            "
          >
            Create Account
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-[var(--foreground-secondary)]
            "
          >
            Start your learning journey today
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-white/80
                px-4
                outline-none
                transition-all
                focus:border-[var(--accent)]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-white/80
                px-4
                outline-none
                transition-all
                focus:border-[var(--accent)]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-white/80
                  px-4
                  pr-12
                  outline-none
                  transition-all
                  focus:border-[var(--accent)]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--foreground-secondary)]
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border
              border-[var(--border)]
              bg-white/50
              p-3
            "
          >
            <div className="space-y-1.5 text-xs">
              {[
                {
                  label: "8+ characters",
                  valid: passwordRules.length,
                },
                {
                  label: "Uppercase letter",
                  valid: passwordRules.upper,
                },
                {
                  label: "Lowercase letter",
                  valid: passwordRules.lower,
                },
                {
                  label: "One number",
                  valid: passwordRules.number,
                },
                {
                  label: "Special character",
                  valid: passwordRules.special,
                },
              ].map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center gap-2"
                >
                  {rule.valid ? (
                    <CheckCircle2
                      size={14}
                      className="text-green-600"
                    />
                  ) : (
                    <XCircle
                      size={14}
                      className="text-gray-400"
                    />
                  )}

                  <span>{rule.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={!passwordValid}
            className="
              btn-shine
              h-12
              w-full
              rounded-xl
              bg-[var(--accent)]
              font-medium
              text-white
              transition-all
              hover:bg-[var(--accent-hover)]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Create Account
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>

            <div className="relative flex justify-center">
              <span
                className="
                  bg-white
                  px-3
                  text-xs
                  text-[var(--foreground-muted)]
                "
              >
                OR
              </span>
            </div>
          </div>

          <button
            className="
              h-12
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-white
              font-medium
              transition-all
              hover:-translate-y-0.5
            "
          >
            Continue with Google
          </button>

          <p
            className="
              text-center
              text-sm
              text-[var(--foreground-secondary)]
            "
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="
                font-semibold
                text-[var(--accent)]
              "
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}