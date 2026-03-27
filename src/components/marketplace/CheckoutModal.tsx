"use client";

import { App } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
    app: App;
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ app, isOpen, onClose }: CheckoutModalProps) {
    const { purchaseApp, user } = useAppContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const subtotal = app.price;
    const tax = Math.round(subtotal * 0.18); // 18% GST simulation
    const total = subtotal + tax;

    const handlePayment = async () => {
        setIsProcessing(true);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: total * 100, // Razorpay expects paise
            currency: "INR",
            name: "SaaS Marketplace",
            description: `License for ${app.name}`,
            image: app.icon, // Use app icon for branding
            handler: async function (response: any) {
                try {
                    // Payment successful
                    await purchaseApp(app);
                    onClose();
                    router.push(`/dashboard?id=${app.id}&success=true`);
                } catch (error) {
                    console.error("Purchase failed", error);
                    alert("There was an issue activating your application. Please contact support.");
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: user?.name || "User",
                email: user?.email || "",
                contact: "9999999999",
            },
            theme: {
                color: "#4f46e5",
            },
            modal: {
                ondismiss: function() {
                    setIsProcessing(false);
                }
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={!isProcessing ? onClose : undefined}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-[24px] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-black/[0.03] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
                    {!isProcessing && (
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="p-8">
                    {/* App Summary */}
                    <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-black/[0.02]">
                        <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-[14px] object-cover shadow-md" />
                        <div>
                            <h3 className="font-bold text-gray-900">{app.name}</h3>
                            <p className="text-[13px] text-gray-500">Lifetime License</p>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-[14px]">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-gray-900 font-medium">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                            <span className="text-gray-500">GST (18%)</span>
                            <span className="text-gray-900 font-medium">₹{tax}</span>
                        </div>
                        <div className="pt-4 border-t border-black/[0.03] flex justify-between items-end">
                            <span className="text-[15px] font-bold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-black text-indigo-600 tracking-tight">₹{total}</span>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-xl text-[15px] font-bold text-white transition-all flex items-center justify-center gap-2 ${
                            isProcessing 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 btn-press"
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Securely Redirecting...
                            </>
                        ) : (
                            <>
                                Secure Payment with Razorpay
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                    
                    <p className="mt-4 text-center text-[11px] text-gray-400 font-medium uppercase tracking-widest">
                        🔒 Encrypted & Secure Checkout
                    </p>
                </div>
            </div>
        </div>
    );
}
