import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-black/[0.03] mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
                        {/* Brand Section */}
                        <div className="md:col-span-5">
                            <Link href="/" className="flex items-center gap-3 mb-6 group">
                                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[14px] font-black shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500">
                                    S
                                </span>
                                <span className="text-[18px] font-black text-[#1d1d1f] tracking-tighter">SaaS Marketplace</span>
                            </Link>
                            <p className="text-[15px] text-[#86868b] max-w-sm leading-relaxed font-medium tracking-tight">
                                The world's first premium marketplace for Unity-based SaaS applications. 
                                Empowering creators with high-fidelity, customizable solutions and 
                                seamless deployment.
                            </p>
                        </div>

                        {/* Link Groups */}
                        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-[11px] font-black text-[#1d1d1f] uppercase tracking-[0.2em] mb-6">
                                    Platform
                                </h4>
                                <ul className="space-y-4">
                                    {["Applications", "Pricing", "Features", "Showcase"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-[14px] font-medium text-[#86868b] hover:text-indigo-600 transition-colors duration-200">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-black text-[#1d1d1f] uppercase tracking-[0.2em] mb-6">
                                    Support
                                </h4>
                                <ul className="space-y-4">
                                    {["Documentation", "Help Center", "Community", "API"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-[14px] font-medium text-[#86868b] hover:text-indigo-600 transition-colors duration-200">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <h4 className="text-[11px] font-black text-[#1d1d1f] uppercase tracking-[0.2em] mb-6">
                                    Company
                                </h4>
                                <ul className="space-y-4">
                                    {["About", "Blog", "Contact", "Privacy"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-[14px] font-medium text-[#86868b] hover:text-indigo-600 transition-colors duration-200">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 pb-12 border-t border-black/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <p className="text-[12px] font-medium text-[#86868b]">
                            © 2026 SaaS Marketplace. All rights reserved.
                        </p>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
                        <p className="text-[12px] font-medium text-[#86868b]">
                            For demonstration purposes only.
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[12px] font-bold text-[#1d1d1f] opacity-40">
                            Built with Next.js & Tailwind
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
