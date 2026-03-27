"use client";

import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isCustomizePage = pathname?.startsWith("/customize/");

    return (
        <AppProvider>
            <Navbar />
            <main className={`${isCustomizePage ? "h-[calc(100vh-52px)] overflow-hidden" : "min-h-screen"} pt-[52px]`}>
                {children}
            </main>
            {!isCustomizePage && <Footer />}
        </AppProvider>
    );
}
