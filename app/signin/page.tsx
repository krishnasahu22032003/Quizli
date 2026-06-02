"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
              border
              border-[var(--border)]
              bg-[var(--accent-soft)]
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
            Welcome Back
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-[var(--foreground-secondary)]
            "
          >
            Sign in to continue learning
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@example.com"
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
                placeholder="Enter your password"
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

  

          <button
            className="
              btn-shine
              h-12
              w-full
              rounded-xl
              bg-[var(--accent)]
              font-medium
              cursor-pointer
              text-white
              transition-all
              hover:bg-[var(--accent-hover)]
            "
          >
            Sign In
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
              cursor-pointer
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
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="
                font-semibold
                text-[var(--accent)]
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}