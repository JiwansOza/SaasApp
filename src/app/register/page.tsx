"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { login, signInWithGoogle } = useAppContext();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn } = useAppContext();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            await login(email);
            // In a real app with Magic Link, we'd wait for the email.
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-transition min-h-screen flex items-center justify-center px-6 -mt-16">
            <div className="w-full max-w-[400px]">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-12 h-12 rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white text-lg font-bold mb-5 shadow-lg shadow-indigo-500/20">
                        S
                    </div>
                    <h1 className="text-[24px] font-bold text-gray-900 tracking-tight mb-1">
                        Create your account
                    </h1>
                    <p className="text-[14px] text-gray-500">
                        Get started with the SaaS Marketplace
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl border border-black/[0.04] p-7 shadow-md">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.06] text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-300/50 transition-all shadow-xs"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.06] text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-300/50 transition-all shadow-xs"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.06] text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-300/50 transition-all shadow-xs"
                                required
                            />
                        </div>

                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 mt-0.5" required />
                            <span className="text-[13px] text-gray-500 leading-snug">
                                I agree to the{" "}
                                <span className="text-indigo-600 cursor-pointer font-medium">Terms of Service</span>
                                {" "}and{" "}
                                <span className="text-indigo-600 cursor-pointer font-medium">Privacy Policy</span>
                            </span>
                        </label>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-lg shadow-gray-900/10"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-black/[0.04]"></div>
                        </div>
                        <span className="relative px-3 text-[12px] text-gray-400 bg-white">OR</span>
                    </div>

                    <button
                        onClick={() => signInWithGoogle()}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-black/[0.06] bg-white hover:bg-gray-50 transition-all duration-200 shadow-xs group"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="text-[14px] font-medium text-gray-700">Continue with Google</span>
                    </button>

                    <div className="mt-6 text-center">
                        <span className="text-[13px] text-gray-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                Sign in
                            </Link>
                        </span>
                    </div>
                </div>

                <p className="text-center text-[11px] text-gray-400 mt-6">
                    This is a demo application. No real account is created.
                </p>
            </div>
        </div>
    );
}
