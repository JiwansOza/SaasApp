"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PerformanceCard from "@/components/PerformanceCard";
import CredentialInput from "@/components/CredentialInput";

export default function DashboardPage() {
    const { user, isLoggedIn, purchasedApps, getAppMetadata } = useAppContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get("id");

    const activeApp = selectedId ? purchasedApps.find(a => a.id === selectedId) : null;

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        
        if (selectedId && !activeApp) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router, selectedId, activeApp]);

    const [timeLeft, setTimeLeft] = useState("23:59:43");

    useEffect(() => {
        // Simple countdown logic starting from 24h
        let seconds = 23 * 3600 + 59 * 60 + 43;
        
        const interval = setInterval(() => {
            seconds--;
            if (seconds < 0) {
                clearInterval(interval);
                return;
            }
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isLoggedIn) return null;

    // If an ID is selected, show the detail view
    if (selectedId && activeApp) {
        const metadata = getAppMetadata(activeApp.id);


        return (
            <div className="page-transition max-w-7xl mx-auto px-6 py-12">
                {/* Navigation Header */}
                <div className="mb-8">
                    <Link 
                        href="/dashboard" 
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-black/[0.04] text-[13px] font-bold text-gray-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Services
                    </Link>
                </div>

                {/* App Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-[36px] font-bold text-gray-900 leading-tight mb-2 tracking-tight">
                            {activeApp.name}
                        </h1>
                        <span className="px-3 py-1 rounded-md bg-[#f5f5f7] text-[12px] font-bold text-gray-400 uppercase tracking-wide">
                            AI Mode
                        </span>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-black/[0.04] shadow-xs">
                            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">Status</p>
                                <p className="text-[13px] font-bold text-gray-700 leading-none">Expires in {timeLeft}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-black/[0.04] shadow-xs">
                            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">Created Date</p>
                                <p className="text-[13px] font-bold text-gray-700 leading-none">{metadata?.createdDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Credentials Section */}
                <div className="bg-white rounded-3xl border border-black/[0.04] p-8 shadow-xs mb-10">
                    <h2 className="text-[18px] font-bold text-gray-900 mb-8 border-b border-black/[0.04] pb-6">
                        Service Credentials
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <CredentialInput label="User ID" value={metadata?.userId || ""} />
                        <CredentialInput label="Password" value={metadata?.password || ""} />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-black/[0.04]">
                        <Link
                            href={`/customize/${activeApp.id}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-lg shadow-gray-900/10"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Start Editing
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-gray-600 bg-[#f5f5f7] hover:bg-gray-200 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Downloads & Settings
                        </button>
                    </div>
                </div>

                {/* Performance Snapshot */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
                            Performance Snapshot
                        </h2>
                        <Link href="#" className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            View full analytics →
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PerformanceCard
                            label="Total Participants"
                            value={metadata?.participants || 0}
                            subtext="Registered users / submissions"
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />
                        <PerformanceCard
                            label="Certificates Issued"
                            value={metadata?.certificates || 0}
                            subtext="Downloaded through QR scanning"
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }

    // LIST VIEW (Default when no ID is selected)
    return (
        <div className="page-transition max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight mb-2">My Services</h1>
                    <p className="text-[15px] text-gray-500 font-medium">Manage and customize your active Unity-based applications.</p>
                </div>
                
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="Search your services..."
                        className="pl-11 pr-6 py-3.5 rounded-2xl bg-white border border-black/[0.04] text-[14px] font-medium w-full md:w-[320px] outline-none focus:border-indigo-500/30 transition-all shadow-sm group-hover:shadow-md"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {purchasedApps.map(app => (
                    <div key={app.id} className="group bg-white rounded-3xl border border-black/[0.04] p-2 shadow-xs hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-1">
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-[#f5f5f7] flex items-center justify-center">
                            {/* Subtle background pattern to match AppCard */}
                            <div className="absolute inset-0 opacity-[0.02]" style={{
                                backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
                                backgroundSize: "32px 32px"
                            }} />
                            <img 
                                src={app.icon} 
                                alt={app.name} 
                                className="w-24 h-24 rounded-[22px] object-cover shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" 
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md shadow-sm text-[10px] font-black uppercase tracking-widest text-indigo-600 border border-white/50">
                                    {app.category}
                                </span>
                            </div>
                        </div>

                        <div className="px-5 pb-6">
                            <h3 className="text-[19px] font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                                {app.name}
                            </h3>
                            <p className="text-[14px] text-gray-500 line-clamp-2 leading-relaxed mb-8">
                                {app.shortDescription}
                            </p>

                            <div className="flex gap-2">
                                <Link 
                                    href={`/dashboard?id=${app.id}`}
                                    className="flex-1 text-center py-3 rounded-xl bg-gray-900 text-white text-[13px] font-bold hover:bg-black transition-all btn-press shadow-lg shadow-black/10"
                                >
                                    Manage
                                </Link>
                                <Link 
                                    href={`/customize/${app.id}`}
                                    className="flex items-center justify-center p-3 rounded-xl bg-[#f5f5f7] text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-black/[0.02]"
                                    title="Edit design"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Purchase New Service Card */}
                <Link 
                    href="/apps"
                    className="group border-2 border-dashed border-black/[0.04] rounded-3xl p-8 flex flex-col items-center justify-center hover:border-indigo-200 hover:bg-indigo-50/10 transition-all cursor-pointer min-h-[400px]"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all duration-500 shadow-sm">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="text-[17px] font-bold text-gray-900 mb-1">Add New Service</p>
                    <p className="text-[13px] text-gray-400 font-medium">Explore more Unity applications</p>
                </Link>
            </div>
        </div>
    );
}
