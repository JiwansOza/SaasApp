"use client";

import Link from "next/link";
import AppCard from "@/components/AppCard";
import { apps } from "@/data/apps";

export default function HomeClient() {
    const featuredApps = apps.slice(0, 4);

    return (
        <div className="page-transition">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration — gradient orbs + dot grid */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Dot grid pattern */}
                    <div className="absolute inset-0 opacity-[0.6]" style={{
                        backgroundImage: "radial-gradient(circle, #a5b4fc 1.2px, transparent 1.2px)",
                        backgroundSize: "24px 24px"
                    }} />

                    {/* Gradient orbs */}
                    <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-200/60 to-indigo-100/20 blur-3xl" />
                    <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-purple-200/50 to-purple-100/10 blur-3xl" />
                    <div className="absolute top-40 right-0 w-[350px] h-[350px] rounded-full bg-gradient-to-l from-pink-100/50 to-rose-50/20 blur-3xl" />
                    <div className="absolute top-60 -left-20 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-100/40 to-sky-50/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-violet-100/30 to-transparent blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-32">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-xs mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[13px] font-medium text-gray-600">
                                Unity-Powered Applications
                            </span>
                        </div>

                        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] mb-6 text-gray-900">
                            SaaS Application{" "}
                            <span className="gradient-text">Marketplace</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
                            Discover, purchase, and customize Unity-based SaaS applications.
                            Build your brand with fully customizable themes, colors, and
                            layouts — no coding required.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/apps"
                                className="px-7 py-3 text-[15px] font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 btn-press shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/15"
                            >
                                Explore Applications
                            </Link>
                            <Link
                                href="/register"
                                className="px-7 py-3 text-[15px] font-medium text-gray-600 bg-white border border-black/[0.08] rounded-full hover:bg-gray-50 hover:border-black/[0.12] transition-all duration-200 btn-press shadow-sm"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>

                    {/* App Icon Showcase */}
                    <div className="mt-16 md:mt-20">
                        <div className="flex items-center justify-center gap-5 md:gap-8 flex-wrap">
                            {apps.slice(0, 6).map((app, i) => (
                                <Link
                                    key={app.id}
                                    href={`/apps/${app.id}`}
                                    className="group relative"
                                    style={{ animationDelay: `${i * 0.4}s` }}
                                >
                                    <div
                                        className="relative"
                                        style={{
                                            animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                                            animationDelay: `${i * 0.3}s`,
                                        }}
                                    >
                                        <img
                                            src={app.icon}
                                            alt={app.name}
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-[18px] md:rounded-[22px] object-cover shadow-lg shadow-gray-900/8 group-hover:shadow-xl group-hover:shadow-indigo-500/15 transition-all duration-500 group-hover:scale-110"
                                        />
                                        {/* Subtle glow underneath */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/[0.04] rounded-full blur-sm group-hover:bg-indigo-500/10 transition-all duration-500" />
                                    </div>
                                    {/* Name tooltip on hover */}
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                                        <span className="text-[11px] font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full shadow-md border border-black/[0.04]">
                                            {app.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <p className="text-center text-[12px] text-gray-400 mt-12">
                            Explore our curated collection of ready-to-customize applications
                        </p>
                    </div>



                </div>
            </section>

            {/* Featured Apps */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-[36px] font-bold text-gray-900 tracking-tight mb-2">
                            Featured Applications
                        </h2>
                        <p className="text-[15px] text-gray-500">
                            Handpicked Unity-based apps ready for customization
                        </p>
                    </div>
                    <Link
                        href="/apps"
                        className="hidden md:flex items-center gap-1 text-[13px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors group"
                    >
                        View all
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featuredApps.map((app) => (
                        <AppCard key={app.id} app={app} featured />
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="bg-[#f5f5f7]">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-[36px] font-bold text-gray-900 tracking-tight mb-3">
                            How It Works
                        </h2>
                        <p className="text-[15px] text-gray-500 max-w-lg mx-auto">
                            Get your customized Unity application in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                icon: "🔍",
                                title: "Browse & Select",
                                desc: "Explore our marketplace of Unity-based SaaS applications and find the perfect fit for your needs.",
                            },
                            {
                                step: "02",
                                icon: "🛒",
                                title: "Purchase",
                                desc: "Securely purchase the application and get instant access to the customization editor.",
                            },
                            {
                                step: "03",
                                icon: "🎨",
                                title: "Customize & Deploy",
                                desc: "Use our visual editor to customize themes, colors, branding, and deploy your unique version.",
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="relative p-8 rounded-2xl bg-white border border-black/[0.04] shadow-xs hover:shadow-lg transition-all duration-400 group"
                            >
                                <span className="absolute top-6 right-6 text-[48px] font-bold text-gray-100 group-hover:text-indigo-50 transition-colors duration-300">
                                    {item.step}
                                </span>
                                <span className="text-4xl mb-5 block">{item.icon}</span>
                                <h3 className="text-[17px] font-semibold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="relative rounded-[28px] bg-gray-900 p-12 md:p-20 text-center overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-3xl" />
                        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-3xl" />
                    </div>
                    <div className="relative">
                        <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight mb-4 leading-tight">
                            Ready to get started?
                        </h2>
                        <p className="text-gray-400 text-[17px] mb-10 max-w-lg mx-auto leading-relaxed">
                            Join thousands of users who are building with our customizable
                            Unity applications.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex px-7 py-3 text-[15px] font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 btn-press shadow-xl"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
