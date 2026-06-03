"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { SignUpUser } from "@/actions/signup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react" ;
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function SignupPage() {

    const session = await getServerSession(authOptions);

    if(session){

        redirect("/dashboard")
    }

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

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

    const passwordMatch = form.password.length > 0 && form.password === form.confirmPassword

    const canSubmit = passwordValid && passwordMatch;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!canSubmit || loading) return;

        if (!form.username || !form.password || !form.email) {

            toast.error("All fields required");
            return
        };

        if (form.password !== form.confirmPassword) {

            toast.error("Password does not match ");
            return;
        };

        const cleandUsername = form.username.trim();
        const cleandEmail = form.email.trim().toLowerCase();

        try {

            setLoading(true);

            const response = await SignUpUser({

                username: cleandUsername,
                email: cleandEmail,
                password: form.password
            });

            toast.success(response?.message || "Account created successfully");
            router.push("/signin");
        } catch (error: any) {
            toast.error(error.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        };

    };

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

<form
    onSubmit={handleSubmit}
    className="mt-6 space-y-4"
>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Full Name
                        </label>

                        <input
                        required
                            type="text"
                            placeholder="John Doe"
                            value={form.username}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username: e.target.value,
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
                        required
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
                            required
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
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        confirmPassword: e.target.value,
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
                        </div>

                        {form.confirmPassword.length > 0 && (
                            <div className="mt-2 flex items-center gap-2 text-xs">
                                {passwordMatch ? (
                                    <>
                                        <CheckCircle2
                                            size={14}
                                            className="text-green-600"
                                        />
                                        <span className="text-green-600">
                                            Passwords match
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle
                                            size={14}
                                            className="text-red-500"
                                        />
                                        <span className="text-red-500">
                                            Passwords do not match
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
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
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="
    btn-shine
    h-12
    w-full
    rounded-xl
    bg-[var(--accent)]
    font-medium
    text-white
    transition-all
    cursor-pointer 
    disabled:opacity-50
    disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  "
                    >
                        {loading && (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}

                        {loading
                            ? "Creating Account..."
                            : canSubmit
                                ? "Create Account"
                                : "Complete Required Fields"}
                    </button>
                   </form>
<div>
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
                    type="button"
                    onClick={()=>signIn("google" , {callbackUrl:"/dashboard"})}
                        className="
              h-12
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-white
              font-medium
              cursor-pointer
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
                            href="/signin"
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