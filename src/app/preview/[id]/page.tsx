"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { getAppById } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";

export default function PreviewPage() {
    const params = useParams();
    const router = useRouter();
    const { isLoggedIn, getCustomization } = useAppContext();

    const app = getAppById(params.id as string);

    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn, router]);

    if (!app || !isLoggedIn) return null;

    const config = getCustomization(app.id);

    return (
        <div className="page-transition max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link
                    href="/dashboard"
                    className="hover:text-gray-600 transition-colors"
                >
                    Dashboard
                </Link>
                <span>/</span>
                <Link
                    href={`/customize/${app.id}`}
                    className="hover:text-gray-600 transition-colors"
                >
                    Customize
                </Link>
                <span>/</span>
                <span className="text-gray-600">Preview</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {app.name} — Preview
                    </h1>
                    <p className="text-sm text-gray-500">
                        Full preview of your customized Unity application
                    </p>
                </div>
                <Link
                    href={`/customize/${app.id}`}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all btn-press"
                >
                    Edit Customization
                </Link>
            </div>

            {/* Preview Screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Login Screen Preview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Login Screen
                    </h3>
                    <div
                        className="rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col items-center justify-center p-8"
                        style={{ backgroundColor: config.loginBackground }}
                    >
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-5 shadow-lg"
                            style={{ backgroundColor: config.themeColor }}
                        >
                            {config.brandingText.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-lg font-bold text-white mb-1">
                            {config.brandingText}
                        </h2>
                        <p className="text-xs text-white/50 mb-6">Sign in to continue</p>
                        <div className="w-full max-w-xs space-y-3">
                            <div
                                className="w-full px-4 py-2.5 rounded-lg text-xs text-white/30 border"
                                style={{
                                    borderColor: `${config.themeColor}40`,
                                    backgroundColor: `${config.themeColor}15`,
                                }}
                            >
                                Email address
                            </div>
                            <div
                                className="w-full px-4 py-2.5 rounded-lg text-xs text-white/30 border"
                                style={{
                                    borderColor: `${config.themeColor}40`,
                                    backgroundColor: `${config.themeColor}15`,
                                }}
                            >
                                Password
                            </div>
                            <button
                                className="w-full py-2.5 rounded-lg text-xs font-semibold text-white"
                                style={{ backgroundColor: config.buttonColor }}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Screen Preview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        App Dashboard
                    </h3>
                    <div
                        className="rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col"
                        style={{ backgroundColor: config.loginBackground }}
                    >
                        {/* Top nav */}
                        <div
                            className="px-5 py-3 flex items-center justify-between border-b"
                            style={{
                                borderColor: `${config.themeColor}30`,
                                backgroundColor: `${config.themeColor}10`,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                                    style={{ backgroundColor: config.themeColor }}
                                >
                                    {config.brandingText.charAt(0)}
                                </div>
                                <span className="text-white text-xs font-medium">
                                    {config.brandingText}
                                </span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white/10" />
                        </div>

                        {/* Dashboard content */}
                        <div className="p-5 flex-1">
                            <p className="text-white/40 text-xs mb-4">Welcome back</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg p-3 border"
                                        style={{
                                            borderColor: `${config.themeColor}20`,
                                            backgroundColor: `${config.themeColor}10`,
                                        }}
                                    >
                                        <div
                                            className="text-lg font-bold text-white mb-0.5"
                                        >
                                            {Math.floor(Math.random() * 100)}
                                        </div>
                                        <div className="text-white/30 text-[10px]">
                                            Metric {i}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="rounded-lg p-3 border"
                                style={{
                                    borderColor: `${config.themeColor}20`,
                                    backgroundColor: `${config.themeColor}08`,
                                }}
                            >
                                <div className="text-white/40 text-xs mb-3">Activity</div>
                                <div className="flex items-end gap-1 h-16">
                                    {[40, 65, 35, 80, 55, 45, 70, 60, 75, 50].map(
                                        (h, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 rounded-sm transition-all"
                                                style={{
                                                    height: `${h}%`,
                                                    backgroundColor:
                                                        i === 3 ? config.buttonColor : `${config.themeColor}40`,
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Screen Preview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Settings Screen
                    </h3>
                    <div
                        className="rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col"
                        style={{ backgroundColor: config.loginBackground }}
                    >
                        <div
                            className="px-5 py-3 border-b"
                            style={{ borderColor: `${config.themeColor}30` }}
                        >
                            <span className="text-white text-sm font-medium">Settings</span>
                        </div>
                        <div className="p-5 space-y-3 flex-1">
                            {["Profile", "Notifications", "Privacy", "Theme", "Language", "About"].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-between px-4 py-3 rounded-lg border"
                                        style={{
                                            borderColor: `${config.themeColor}20`,
                                            backgroundColor: `${config.themeColor}08`,
                                        }}
                                    >
                                        <span className="text-white/70 text-xs">{item}</span>
                                        <svg
                                            className="w-3 h-3 text-white/30"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Splash Screen Preview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Splash Screen
                    </h3>
                    <div
                        className="rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col items-center justify-center"
                        style={{ backgroundColor: config.loginBackground }}
                    >
                        <div
                            className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-xl animate-pulse"
                            style={{ backgroundColor: config.themeColor }}
                        >
                            {config.brandingText.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {config.brandingText}
                        </h2>
                        <p className="text-xs text-white/40">Loading...</p>
                        <div className="mt-8 w-24 h-1 rounded-full overflow-hidden bg-white/10">
                            <div
                                className="h-full rounded-full w-3/5 animate-pulse"
                                style={{ backgroundColor: config.buttonColor }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-10">
                These previews simulate how your customized Unity application screens
                will appear.
            </p>
        </div>
    );
}
