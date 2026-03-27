"use client";

import Link from "next/link";
import AppCard from "@/components/AppCard";
import { apps } from "@/data/apps";

export default function HomeClient() {
    const featuredApps = apps.slice(0, 4);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
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

                <div className="relative max-w-5xl mx-auto px-6">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-xs mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[13px] font-medium text-gray-600">
                                Unity-Powered Applications
                            </span>
                        </div>

                        <h1 className="text-[clamp(2.5rem,8vw,4.8rem)] font-black tracking-tighter leading-[1.02] mb-8 text-[#1d1d1f]">
                            Next-Gen SaaS{" "}
                            <span className="gradient-text">Marketplace</span>
                        </h1>

                        <p className="text-[19px] md:text-[21px] text-[#86868b] leading-relaxed mb-12 max-w-2xl mx-auto font-medium tracking-tight px-4">
                            Discover, purchase, and customize Unity-based SaaS applications.
                            Build your brand with fully customizable themes, colors, and
                            layouts — no coding required.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/apps"
                                className="px-8 py-3.5 text-[15px] font-black text-white bg-[#1d1d1f] rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-black/10 hover:shadow-black/20"
                            >
                                Explore Applications
                            </Link>
                            <Link
                                href="/register"
                                className="px-8 py-3.5 text-[15px] font-black text-[#1d1d1f] bg-white border border-black/[0.08] rounded-full hover:bg-gray-50 hover:border-black/[0.12] transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-sm"
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
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] md:rounded-[26px] object-cover shadow-[0_15px_35px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_rgba(79,70,229,0.2)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 border border-black/[0.03]"
                                        />
                                        {/* Subtle glow underneath */}
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/[0.05] rounded-full blur-md group-hover:bg-indigo-500/15 transition-all duration-700 opacity-60" />
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

            {/* Featured Apps Section */}
            <section className="py-20 md:py-32 bg-[#fbfbfd]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-[32px] md:text-[42px] font-black text-[#1d1d1f] tracking-tighter mb-4">Featured Apps</h2>
                            <p className="text-[17px] md:text-[19px] text-[#86868b] font-medium tracking-tight">Our most popular and highly-rated solutions.</p>
                        </div>
                        <Link
                            href="/apps"
                            className="hidden md:flex items-center gap-1.5 text-[14px] font-black text-indigo-600 hover:text-indigo-700 transition-all group px-4 py-2 rounded-full hover:bg-indigo-50"
                        >
                            View all
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {featuredApps.map((app) => (
                            <AppCard key={app.id} app={app} featured />
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="relative bg-white overflow-hidden border-t border-black/[0.02]">
                {/* Subtle background grid */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle, #e2e8f0 1.2px, transparent 1.2px)",
                    backgroundSize: "40px 40px"
                }} />

                <div className="max-w-7xl mx-auto px-6 py-32 relative">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-[36px] md:text-[42px] font-black text-[#1d1d1f] tracking-tight mb-4 leading-tight">
                            Build Your Brand in Minutes
                        </h2>
                        <p className="text-[18px] text-[#86868b] font-medium max-w-lg mx-auto leading-relaxed">
                            Experience the future of SaaS customization with our seamless three-step workflow.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Connection Line (Desktop only) */}
                        <div className="absolute top-[130px] left-[15%] right-[15%] h-px border-t-2 border-dashed border-indigo-100 hidden md:block" />

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
                        ].map((item, index, steps) => (
                            <div
                                key={item.step}
                                className="relative p-10 rounded-[40px] bg-white border border-black/[0.04] shadow-sm hover:shadow-2xl transition-all duration-700 group overflow-hidden h-full flex flex-col hover:-translate-y-2"
                            >
                                {/* Step card accent */}
                                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${
                                    index === 0 ? "from-indigo-500" : index === 1 ? "from-purple-500" : "from-pink-500"
                                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.02] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/[0.06] transition-colors duration-700" />
                                
                                <div className={`relative h-full glass-card p-7 md:p-10 rounded-[32px] border border-black/[0.03] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden`}>
                                    {/* Connection Line */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-px border-t-2 border-dashed border-gray-200 z-10" />
                                    )}

                                    <div className="relative z-20">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] bg-white shadow-md flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-[22px] md:text-[24px] font-black text-[#1d1d1f] mb-4 tracking-tight leading-tight">{item.title}</h3>
                                        <p className="text-[15px] md:text-[16px] text-[#86868b] leading-relaxed font-medium tracking-tight">{item.desc}</p>
                                    </div>

                                    {/* Large Background Step Number */}
                                    <span className="absolute -bottom-4 -right-2 text-[80px] md:text-[120px] font-black text-black/[0.02] select-none group-hover:text-black/[0.04] group-hover:scale-110 transition-all duration-700">
                                        0{index + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden mb-20">
                <div className="relative rounded-[32px] md:rounded-[60px] bg-[#0a0a0b] p-10 md:p-24 text-center overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(79,70,229,0.15)]">
                    {/* Animated Mesh Gradient Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_40%)] blur-[100px] animate-pulse" />
                        
                        {/* Animated Orbs */}
                        <div className="absolute top-0 right-10 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[100px] animate-blob" style={{ animationDuration: '12s' }} />
                        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full bg-purple-500/15 blur-[100px] animate-blob animation-delay-4000" style={{ animationDuration: '15s' }} />
                    </div>

                    {/* Floating App Icons for Depth */}
                    {apps.slice(0, 4).map((app, i) => (
                        <div 
                            key={app.id}
                            className={`absolute hidden lg:block opacity-[0.2] transition-all duration-1000 group-hover:opacity-[0.4]`}
                            style={{
                                top: i === 0 ? "15%" : i === 1 ? "65%" : i === 2 ? "20%" : "70%",
                                [i < 2 ? 'left' : 'right']: `${6 + (i % 2) * 4}%`,
                                animation: `float ${8 + i * 2}s ease-in-out infinite`,
                                animationDelay: `${i * 1.2}s`,
                                transform: `rotate(${i * 10 - 20}deg) scale(${0.7 + i * 0.1})`
                            }}
                        >
                            <img 
                                src={app.icon} 
                                alt="" 
                                className="w-24 h-24 rounded-[28px] shadow-2xl border border-white/10 ring-1 ring-white/20"
                            />
                        </div>
                    ))}

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-xl animate-in zoom-in duration-1000">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                            <span className="text-[12px] font-black text-indigo-100 uppercase tracking-widest leading-none">
                                Instant Access Available
                            </span>
                        </div>
                        
                        <h2 className="text-[clamp(2rem,7vw,4rem)] md:text-[64px] font-black text-white tracking-tighter mb-8 leading-[1.02]">
                            Ready to Transform Your <br />
                            <span className="gradient-text drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">Brand Experience?</span>
                        </h2>
                        
                        <p className="text-[#a1a1a6] text-[17px] md:text-[22px] mb-14 max-w-xl mx-auto leading-relaxed font-medium tracking-tight">
                            Join thousands of innovators who are building with our 
                            fully customizable, high-performance Unity applications.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/register"
                                className="group relative inline-flex items-center gap-3 px-12 py-4.5 text-[17px] font-black text-[#1d1d1f] bg-white rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <span className="relative z-10">Get Started Free</span>
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            
                            <Link
                                href="/apps"
                                className="text-[16px] font-black text-white px-10 py-4.5 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300 hover:border-white/20 active:scale-95"
                            >
                                View Live Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
