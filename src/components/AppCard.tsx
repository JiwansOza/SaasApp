import Link from "next/link";
import { App } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";
import PreviewModal from "./marketplace/PreviewModal";
import { useState } from "react";

interface AppCardProps {
    app: App;
    featured?: boolean;
}

export default function AppCard({ app, featured = false }: AppCardProps) {
    const { purchasedApps, wishlist, toggleWishlist } = useAppContext();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const isPurchased = purchasedApps.some(a => a.id === app.id);
    const isWishlisted = wishlist.includes(app.id);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(app.id);
    };

    const handlePreviewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPreviewOpen(true);
    };

    return (
        <div className="relative group/card">
            <Link href={isPurchased ? `/customize/${app.id}` : `/apps/${app.id}`} className="block">
                <div
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/[0.03] relative ${featured ? "p-0" : ""}`}
                >
                    {/* Purchased Badge */}
                    {isPurchased && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[10px] font-black uppercase tracking-widest shadow-xl animate-in fade-in zoom-in duration-500">
                            Purchased
                        </div>
                    )}
                    
                    {/* Actions Overlay */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                        {/* Wishlist Button */}
                        {!isPurchased && (
                            <button
                                onClick={handleWishlistClick}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted 
                                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-110" 
                                    : "bg-white/90 backdrop-blur-md text-gray-400 hover:text-rose-500 hover:scale-110 shadow-sm"
                                }`}
                            >
                                <svg className={`w-5 h-5 ${isWishlisted ? "fill-current" : "fill-none"}`} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        )}
                        
                        {/* Preview Button */}
                        <button
                            onClick={handlePreviewClick}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-gray-400 hover:text-indigo-600 hover:scale-110 shadow-sm flex items-center justify-center transition-all duration-300"
                            title="Interactive Preview"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>

                    {/* Preview area */}
                    <div
                        className={`${featured ? "h-56" : "h-44"} bg-[#f5f5f7] flex items-center justify-center relative overflow-hidden`}
                    >
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
                            backgroundSize: "32px 32px"
                        }} />
                        
                        {/* Animated gradient blob */}
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/5 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/5 blur-[100px] rounded-full animate-pulse delay-700" />

                        <img
                            src={app.icon}
                            alt={app.name}
                            className={`${featured ? "w-28 h-28" : "w-24 h-24"} rounded-[22px] object-cover shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2`}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <h3
                                className={`font-black text-[#1d1d1f] group-hover:text-indigo-600 transition-colors duration-300 tracking-tight ${featured ? "text-[19px]" : "text-[17px]"}`}
                            >
                                {app.name}
                            </h3>
                        </div>

                        <p className="text-[13.5px] text-[#86868b] leading-relaxed mb-5 line-clamp-2 font-medium">
                            {app.shortDescription}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {app.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-[10px] font-bold text-[#1d1d1f] bg-[#f5f5f7] rounded-full uppercase tracking-widest border border-black/[0.02]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-black/[0.03]">
                            <span className="text-xl font-black text-[#1d1d1f] tracking-tighter">
                                ₹{app.price}
                            </span>
                            <span className="text-[13px] font-black text-indigo-600 group-hover:text-indigo-700 transition-all flex items-center gap-1.5 uppercase tracking-wider">
                                {isPurchased ? "Customize" : "Details"}
                                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <PreviewModal 
                app={app}
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />
        </div>
    );
}
