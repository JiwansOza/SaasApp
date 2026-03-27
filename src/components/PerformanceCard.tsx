"use client";

import React from "react";

interface PerformanceCardProps {
    label: string;
    value: string | number;
    subtext: string;
    icon: React.ReactNode;
}

export default function PerformanceCard({ label, value, subtext, icon }: PerformanceCardProps) {
    return (
        <div className="bg-white p-8 rounded-[26px] border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-500 group cursor-default h-full">
            <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#86868b] group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                    <div className="scale-110">
                        {icon}
                    </div>
                </div>
                <div>
                    <h3 className="text-[34px] font-black text-[#1d1d1f] leading-none mb-2 tracking-tighter">
                        {value}
                    </h3>
                    <p className="text-[15px] font-bold text-[#1d1d1f] mb-1 tracking-tight">
                        {label}
                    </p>
                    <p className="text-[13px] text-[#86868b] font-medium leading-relaxed">
                        {subtext}
                    </p>
                </div>
            </div>
        </div>
    );
}
