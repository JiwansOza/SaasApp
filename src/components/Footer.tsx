export default function Footer() {
    return (
        <footer className="bg-[#f5f5f7]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    S
                                </span>
                                <span className="text-[15px] font-semibold text-gray-900 tracking-tight">SaaS Marketplace</span>
                            </div>
                            <p className="text-[13px] text-gray-500 max-w-sm leading-relaxed">
                                A modern marketplace for Unity-based SaaS applications.
                                Browse, purchase, and customize applications to match your brand.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Platform
                            </h4>
                            <ul className="space-y-2">
                                {["Applications", "Pricing", "Documentation", "Support"].map(
                                    (item) => (
                                        <li key={item}>
                                            <span className="text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">
                                                {item}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Resources
                            </h4>
                            <ul className="space-y-2">
                                {["Blog", "Changelog", "Community", "Contact"].map((item) => (
                                    <li key={item}>
                                        <span className="text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent" />

                <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-gray-400">
                        Academic Demo SaaS Marketplace — For demonstration purposes only.
                    </p>
                    <p className="text-[11px] text-gray-400">
                        Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
