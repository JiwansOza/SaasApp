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
        <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-black/[0.03] shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group active:scale-95 transition-transform"
                >
                    <div className="relative">
                        <span className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white text-[15px] font-black shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-500">
                            S
                        </span>
                        <div className="absolute inset-0 rounded-[14px] bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <span className="hidden sm:inline text-[18px] font-black text-[#1d1d1f] tracking-tighter group-hover:text-indigo-600 transition-colors">
                        SaaS <span className="text-indigo-600 group-hover:text-[#1d1d1f] transition-colors">Marketplace</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 bg-black/[0.03] p-1 rounded-full border border-black/[0.01]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all duration-300 ${pathname === link.href
                                ? "text-indigo-600 bg-white shadow-sm ring-1 ring-black/[0.02] backdrop-blur-md"
                                : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-white/50"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-5">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-black/[0.03] transition-all cursor-pointer group active:scale-95">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-black shadow-md group-hover:scale-110 transition-transform ring-2 ring-white overflow-hidden">
                                    {user?.avatarUrl ? (
                                        <img 
                                            src={user.avatarUrl} 
                                            alt={user.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        user?.name?.charAt(0)?.toUpperCase() || "U"
                                    )}
                                </div>
                                <span className="text-[14px] font-bold text-[#1d1d1f] pr-1">
                                    {user?.name}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-[14px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors px-2"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-[14px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="group relative px-6 py-3 text-[14px] font-black text-white bg-[#1d1d1f] rounded-full hover:bg-black transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <span className="relative z-10">Get Started</span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2.5 rounded-full hover:bg-black/[0.03] transition-colors text-gray-500 active:scale-90"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-black/[0.04] bg-white/98 backdrop-blur-2xl px-6 py-6 space-y-1.5 animate-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-5 py-3 rounded-2xl text-[15px] font-bold transition-all ${pathname === link.href
                                ? "text-indigo-600 bg-indigo-50/80 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-black/[0.04] mt-4">
                        {isLoggedIn ? (
                            <button
                                onClick={() => { logout(); setMobileOpen(false); }}
                                className="w-full text-left px-5 py-3 rounded-2xl text-[15px] font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-2xl text-[14px] font-bold text-[#1d1d1f] bg-gray-100 hover:bg-gray-200 transition-colors">
                                    Sign In
                                </Link>
                                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-2xl text-[14px] font-black text-white bg-[#1d1d1f] hover:bg-black transition-colors">
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
