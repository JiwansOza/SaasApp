"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const { isLoggedIn, isAdmin, user, logout } = useAppContext();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/apps", label: "Applications" },
        ...(isLoggedIn
            ? [
                { href: "/dashboard", label: "Dashboard" },
                ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
            ]
            : []),
    ];

    return (
        <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-black/[0.03] shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-[52px] flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group active:scale-95 transition-transform"
                >
                    <span className="w-8 h-8 rounded-[11px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[13px] font-black shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-500">
                        S
                    </span>
                    <span className="hidden sm:inline text-[15px] font-bold text-[#1d1d1f] tracking-tight group-hover:text-indigo-600 transition-colors">SaaS Marketplace</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${pathname === link.href
                                ? "text-indigo-600 bg-indigo-50/50 shadow-sm"
                                : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2.5 px-1.5 py-1 rounded-full border border-black/[0.03] bg-black/[0.01] hover:bg-black/[0.03] transition-colors cursor-pointer group">
                                <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm group-hover:scale-105 transition-transform">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <span className="text-[13px] font-semibold text-[#1d1d1f] pr-2">
                                    {user?.name}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="px-3 py-1.5 text-[13px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-3.5 py-1.5 text-[13px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2 text-[13px] font-black text-white bg-[#1d1d1f] rounded-full hover:bg-black transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-full hover:bg-black/[0.03] transition-colors text-gray-500"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-black/[0.04] bg-white/95 backdrop-blur-xl px-6 py-3 space-y-0.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${pathname === link.href
                                ? "text-indigo-600 bg-indigo-50/80"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-black/[0.04] mt-2">
                        {isLoggedIn ? (
                            <button
                                onClick={() => { logout(); setMobileOpen(false); }}
                                className="w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <div className="space-y-1.5 pt-1">
                                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-500 hover:bg-gray-50">
                                    Sign In
                                </Link>
                                <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-[14px] font-medium text-center text-white bg-gray-900">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
