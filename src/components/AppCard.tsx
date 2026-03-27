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
        <div className="relative group/card h-full">
            <Link href={isPurchased ? `/customize/${app.id}` : `/apps/${app.id}`} className="block h-full">
                <div
                    className={`bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/[0.03] relative group h-full flex flex-col ${featured ? "p-0" : ""}`}
                >
                    {/* Purchased Badge */}
                    {isPurchased && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[10px] font-black uppercase tracking-widest shadow-xl animate-in fade-in zoom-in duration-500">
                            Purchased
                        </div>
                    )}
                    
                    {/* Actions Overlay */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        {/* Wishlist Button */}
                        {!isPurchased && (
                            <button
                                onClick={handleWishlistClick}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted 
                                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-110" 
                                    : "bg-white/80 backdrop-blur-xl text-gray-400 hover:text-rose-500 hover:scale-110 shadow-sm border border-white/20"
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
                            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl text-gray-400 hover:text-indigo-600 hover:scale-110 shadow-sm flex items-center justify-center transition-all duration-300 border border-white/20"
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
                        className={`${featured ? "h-64" : "h-48"} bg-[#f5f5f7] flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:bg-[#f0f0f2]`}
                    >
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
                            backgroundSize: "24px 24px"
                        }} />
                        
                        {/* Animated gradient blobs - more vibrant */}
                        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[80px] rounded-full animate-pulse group-hover:scale-110 transition-transform duration-1000" />
                        
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 shadow-[inset_0_0_100px_rgba(255,255,255,0.5)] pointer-events-none" 
                             style={{
                                 background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
                                 backgroundSize: "200% 200%",
                                 animation: "shimmer 3s infinite linear"
                             }} />

                        <div className="relative">
                            {/* Reflection effect */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/5 blur-2xl rounded-full scale-y-50 opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                            
                            <img
                                src={app.icon}
                                alt={app.name}
                                className={`${featured ? "w-32 h-32" : "w-24 h-24"} rounded-[26px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(79,70,229,0.25)] transition-all duration-700 group-hover:scale-[1.05] group-hover:-rotate-2 border border-black/[0.03] relative z-10`}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-7 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                            <h3
                                className={`font-black text-[#1d1d1f] tracking-tight group-hover:text-indigo-600 transition-colors duration-300 ${featured ? "text-[19px] md:text-[21px]" : "text-[16px] md:text-[18px]"}`}
                            >
                                {app.name}
                            </h3>
                        </div>

                        <p className="text-[14px] text-[#86868b] leading-relaxed mb-6 line-clamp-2 font-medium tracking-tight">
                            {app.shortDescription}
                        </p>

                        <div className="flex-1" />

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {app.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3.5 py-1.5 text-[10px] font-bold text-[#4b4b4b] bg-black/[0.04] rounded-full uppercase tracking-widest border border-white/50 backdrop-blur-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-5 border-t border-black/[0.05]">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest font-black text-[#86868b] mb-0.5">Starting from</span>
                                <span className="text-2xl font-black text-[#1d1d1f] tracking-tighter">
                                    ₹{app.price}
                                </span>
                            </div>
                            
                            <div className="h-11 px-6 rounded-2xl bg-[#1d1d1f] text-white text-[13px] font-black uppercase tracking-wider hover:bg-black transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-black/10 hover:shadow-black/20 flex items-center gap-2">
                                {isPurchased ? "Customize" : "Details"}
                                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
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
