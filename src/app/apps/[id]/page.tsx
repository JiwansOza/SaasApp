"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getAppById } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";
import CheckoutModal from "@/components/marketplace/CheckoutModal";

export default function AppDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { isLoggedIn, purchasedApps } = useAppContext();
    const [purchased, setPurchased] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const app = getAppById(params.id as string);

    if (!app) {
        return (
            <div className="page-transition max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-6xl mb-4 block">404</span>
                <h1 className="text-2xl font-bold mb-2 text-gray-900">Application not found</h1>
                <Link href="/apps" className="text-indigo-600 hover:underline text-[14px]">
                    ← Back to applications
                </Link>
            </div>
        );
    }

    const alreadyPurchased = purchasedApps.some((a) => a.id === app.id);

    const handleBuy = () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        setIsCheckoutOpen(true);
    };

    return (
        <div className="page-transition">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
                    <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/apps" className="hover:text-gray-600 transition-colors">Applications</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600">{app.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Left - Preview */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-black/[0.04] h-72 md:h-96 flex items-center justify-center mb-8 shadow-xs overflow-hidden relative">
                            <div className="absolute inset-0 opacity-[0.02]" style={{
                                backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                                backgroundSize: "32px 32px"
                            }} />
                            <img src={app.icon} alt={app.name} className="w-40 h-40 md:w-48 md:h-48 rounded-[24px] object-cover shadow-xl" />
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                About this application
                            </h2>
                            <p className="text-[15px] text-gray-500 leading-relaxed">{app.description}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {app.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/[0.04] shadow-xs">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[14px] text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Purchase Card */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-20 bg-white rounded-2xl border border-black/[0.04] p-6 shadow-md">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <img src={app.icon} alt={app.name} className="w-14 h-14 rounded-[14px] object-cover shadow-md" />
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">{app.name}</h1>
                                    <p className="text-[13px] text-gray-400">{app.category}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {app.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-[11px] font-medium text-indigo-600/80 bg-indigo-50 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="bg-[#f5f5f7] rounded-xl p-5 mb-6">
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-[32px] font-bold text-gray-900 tracking-tight">₹{app.price}</span>
                                    <span className="text-[13px] text-gray-400">one-time</span>
                                </div>
                                <p className="text-[12px] text-gray-400">Includes lifetime access & customization</p>
                            </div>

                            {/* Buy button */}
                            {alreadyPurchased || purchased ? (
                                <div className="space-y-2.5">
                                    <div className="w-full py-3 rounded-xl text-center text-[14px] font-medium text-green-700 bg-green-50 border border-green-200">
                                        ✓ Purchased
                                    </div>
                                    <Link href={`/customize/${app.id}`} className="block w-full py-3 rounded-xl text-center text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-md">
                                        Customize Application
                                    </Link>
                                </div>
                            ) : (
                                <button onClick={handleBuy} className="w-full py-3.5 rounded-xl text-[15px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-lg shadow-gray-900/10">
                                    Buy Now — ₹{app.price}
                                </button>
                            )}

                            {/* Info */}
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                {[
                                    { label: "Platform", value: "Unity WebGL" },
                                    { label: "License", value: "Single user" },
                                    { label: "Customization", value: "Full UI editor" },
                                    { label: "Support", value: "Email & docs" },
                                ].map((info) => (
                                    <div key={info.label} className="flex justify-between text-[13px]">
                                        <span className="text-gray-400">{info.label}</span>
                                        <span className="text-gray-700 font-medium">{info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Models */}
            <CheckoutModal 
                app={app}
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-[scaleIn_0.3s_ease-out]">
                        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Purchase Successful!</h3>
                        <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                            Demo purchase successful. You now have access to customize this application.
                        </p>
                        <div className="flex gap-2.5">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                            <Link href={`/customize/${app.id}`} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all text-center">
                                Customize Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
