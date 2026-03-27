"use client";

import { App } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

interface PreviewModalProps {
    app: App;
    isOpen: boolean;
    onClose: () => void;
}

export default function PreviewModal({ app, isOpen, onClose }: PreviewModalProps) {
    const { purchasedApps } = useAppContext();
    const isPurchased = purchasedApps.some(a => a.id === app.id);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 md:py-20">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-[32px] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out flex flex-col md:flex-row">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left side - Visual Preview */}
                <div className="w-full md:w-[45%] bg-[#f5f5f7] p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #1d1d1f 1px, transparent 0)",
                        backgroundSize: "24px 24px"
                    }} />
                    
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <img 
                            src={app.icon} 
                            alt={app.name} 
                            className="w-32 h-32 md:w-40 md:h-40 rounded-[28px] object-cover shadow-2xl relative z-10"
                        />
                    </div>
                    
                    <div className="mt-8 text-center px-4">
                        <h2 className="text-2xl font-black text-[#1d1d1f] tracking-tight mb-2">{app.name}</h2>
                        <span className="px-3 py-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-widest">{app.category}</span>
                    </div>

                    {/* Simulated "Live" indicator */}
                    <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[12px] font-bold text-gray-600">Simulating Unity WebGL</span>
                    </div>
                </div>

                {/* Right side - Details */}
                <div className="flex-1 p-8 md:p-12">
                    <div className="mb-10">
                        <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-4">Core Features</h3>
                        <div className="space-y-4">
                            {app.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 animate-in slide-in-from-left-4 fade-in duration-500 delay-150" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[15px] font-medium text-[#424245] leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-10">
                        <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                            {app.description}
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-black/[0.03]">
                        <div className="flex-1">
                            <span className="text-[13px] font-bold text-gray-400 block mb-1">Price</span>
                            <span className="text-3xl font-black text-[#1d1d1f] tracking-tighter">₹{app.price}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {isPurchased ? (
                                <Link 
                                    href={`/customize/${app.id}`}
                                    className="flex-1 sm:flex-none px-8 py-3.5 bg-gray-900 border border-transparent text-white rounded-2xl text-[14px] font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl btn-press text-center active:scale-95"
                                >
                                    Customize Now
                                </Link>
                            ) : (
                                <Link 
                                    href={`/apps/${app.id}`}
                                    className="flex-1 sm:flex-none px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[14px] font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 btn-press text-center active:scale-95"
                                >
                                    Get for ₹{app.price}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
