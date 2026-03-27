"use client";

import { useState, useMemo } from "react";
import AppCard from "@/components/AppCard";
import { apps, categories } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";

export default function AppsPage() {
    const { wishlist } = useAppContext();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showWishlistOnly, setShowWishlistOnly] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    const filtered = useMemo(() => {
        let result = apps.filter((app) => {
            const matchesSearch =
                app.name.toLowerCase().includes(search.toLowerCase()) ||
                app.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
                app.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            
            const matchesCategory =
                category === "All" || app.category === category;
            
            const matchesWishlist = !showWishlistOnly || wishlist.includes(app.id);
            
            return matchesSearch && matchesCategory && matchesWishlist;
        });

        // Sorting logic
        return [...result].sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "newest") {
                return b.id.localeCompare(a.id);
            }
            return 0;
        });
    }, [search, category, sortBy, showWishlistOnly, wishlist]);

    const handleCategoryClick = (cat: string) => {
        setCategory(cat);
        setShowWishlistOnly(false);
    };

    const toggleWishlistFilter = () => {
        setShowWishlistOnly(!showWishlistOnly);
        setCategory("All");
    };

    return (
        <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-[28px] md:text-[34px] font-black text-[#1d1d1f] tracking-tight mb-2">
                        {showWishlistOnly ? "My Wishlist" : "App Marketplace"}
                    </h1>
                    <p className="text-[17px] text-[#86868b] font-medium leading-relaxed">
                        {showWishlistOnly 
                            ? "Your curated collection of saved applications" 
                            : "Discover and customize premium Unity-based SaaS solutions."}
                    </p>
                </div>
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 bg-white border border-black/[0.05] rounded-2xl px-5 py-2.5 shadow-sm group hover:border-black/[0.1] hover:shadow-md transition-all duration-300">
                    <span className="text-[11px] font-black text-[#86868b] uppercase tracking-widest">Sort by</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent text-[14px] font-bold text-[#1d1d1f] outline-none cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                {/* Search */}
                <div className="relative flex-1 group">
                    <svg
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#86868b] group-focus-within:text-indigo-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-white border border-black/[0.05] text-[15px] font-medium text-[#1d1d1f] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all shadow-sm placeholder:text-[#86868b]/60"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-1.5 flex-wrap items-center">
                    {/* Wishlist Toggle Button */}
                    <button
                        onClick={toggleWishlistFilter}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 btn-press border ${showWishlistOnly
                            ? "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
                            : "bg-white text-gray-400 border-black/[0.06] hover:text-rose-500 hover:border-rose-100 shadow-xs"
                            }`}
                    >
                        <svg className={`w-4 h-4 ${showWishlistOnly ? "fill-current" : "fill-none"}`} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                    </button>

                    <div className="w-px h-6 bg-black/[0.06] mx-1 hidden sm:block" />

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 btn-press ${category === cat && !showWishlistOnly
                                ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                                : "bg-white text-gray-500 border border-black/[0.06] hover:bg-gray-50 hover:border-black/[0.1] shadow-xs"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <p className="text-[13px] text-gray-400 mb-6">
                {filtered.length} application{filtered.length !== 1 ? "s" : ""} found
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((app) => (
                        <AppCard key={app.id} app={app} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <span className="text-5xl mb-4 block">🔍</span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No applications found
                    </h3>
                    <p className="text-[14px] text-gray-500">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </div>
    );
}
