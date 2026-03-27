"use client";

import React, { useState } from "react";

interface CredentialInputProps {
    label: string;
    value: string;
}

export default function CredentialInput({ label, value }: CredentialInputProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                {label}
            </label>
            <div className="relative group">
                <input
                    type="text"
                    readOnly
                    value={value}
                    className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#f5f5f7] border border-transparent text-[15px] font-medium text-gray-700 outline-none group-hover:bg-[#ebebef] transition-all"
                />
                <button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-white transition-all shadow-sm hover:shadow-md border border-transparent hover:border-black/[0.04]"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
