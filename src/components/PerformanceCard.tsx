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
        <div className="bg-white p-8 rounded-2xl border border-black/[0.04] shadow-xs hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {icon}
                </div>
                <div>
                    <h3 className="text-[32px] font-bold text-gray-900 leading-none mb-2">
                        {value}
                    </h3>
                    <p className="text-[15px] font-semibold text-gray-900 mb-1">
                        {label}
                    </p>
                    <p className="text-[13px] text-gray-400">
                        {subtext}
                    </p>
                </div>
            </div>
        </div>
    );
}
