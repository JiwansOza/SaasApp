"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAppById } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";

export default function CustomizePage() {
    const params = useParams();
    const router = useRouter();
    const { isLoggedIn, getCustomization, updateCustomization } = useAppContext();

    const app = getAppById(params.id as string);
    const initialSettings = app ? getCustomization(app.id) : null;

    const [settings, setSettings] = useState(initialSettings);
    const [currentStep, setCurrentStep] = useState(0); // 0: Global, 1: Start, 2: Reg, 3: Quiz, etc.
    const [saveMsg, setSaveMsg] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadTarget, setUploadTarget] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
        if (initialSettings) setSettings(initialSettings);
    }, [isLoggedIn, router, initialSettings]);

    if (!app || !isLoggedIn || !settings) return null;

    const steps = [
        { id: "global", label: "Branding", title: "Global Identity" },
        { id: "start", label: "Start Screen", title: "Entry Experience" },
        { id: "reg", label: "Registration", title: "User Enrollment" },
        { id: "quiz", label: "Quiz Config", title: "Assessment Logic" },
        { id: "upload", label: "Injection", title: "Data Provisioning" },
        { id: "thanks", label: "Completion", title: "Success Flow" },
        { id: "cert", label: "Certificate", title: "Reward Design" },
    ];

    const updateSetting = (key: string, value: any) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));
    };

    const triggerUpload = (target: string, accept = "image/*") => {
        setUploadTarget(target);
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && uploadTarget) {
            if (uploadTarget === "csvFile") {
                // Mock CSV handling - just save filename
                updateSetting("csvFileName", file.name);
                setUploadTarget(null);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    updateSetting(uploadTarget, reader.result as string);
                    setUploadTarget(null);
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const handleSave = async (shouldRedirect = false) => {
        await updateCustomization(app.id, settings);
        setSaveMsg(true);
        setTimeout(() => {
            setSaveMsg(false);
            if (shouldRedirect) router.push("/dashboard");
        }, 1500);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            handleSave(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="page-transition h-full bg-[#f5f5f7] overflow-hidden">
            {/* Main Layout: Sidebar + Viewport */}
            <div className="flex h-[calc(100vh-52px)]">
                {/* Sidebar Editor */}
                <div className="w-[400px] border-r border-black/[0.03] bg-white flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.01)] z-10 overflow-hidden">
                    {/* Sidebar Header */}
                    <div className="p-8 border-b border-black/[0.03] flex items-center justify-between group bg-white/80 backdrop-blur-2xl shrink-0">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] transition-all hover:bg-gray-100 active:scale-90 border border-black/[0.03]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-[20px] font-black text-[#1d1d1f] tracking-tight leading-tight">
                                    {app.name}
                                </h1>
                                <p className="text-[10px] font-black text-[#86868b] uppercase tracking-[0.2em] mt-1">
                                    Step <span className="text-indigo-600">{currentStep + 1}</span> of {steps.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSave(false)}
                            className="w-12 h-12 rounded-2xl bg-[#1d1d1f] text-white hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center group/save"
                            title="Save progress"
                        >
                            <svg className="w-6 h-6 group-hover/save:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        </button>
                    </div>

                    {/* Save Toast Notification */}
                    {saveMsg && (
                        <div className="absolute top-6 left-[420px] z-50 px-6 py-3 bg-[#1d1d1f] text-white text-[13px] font-bold rounded-2xl shadow-2xl animate-in fade-in slide-in-from-left-8 duration-500 flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px]">✓</span>
                            ✨ Changes saved successfully
                        </div>
                    )}

                    {/* Step-specific Form Panels */}
                    <div className="flex-1 p-8 space-y-10 overflow-y-auto no-scrollbar">
                        {/* GLOBAL STEP */}
                        {currentStep === 0 && (
                            <>
                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Typography</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Global text configurations</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Font family</label>
                                            <div className="relative">
                                                <select
                                                    value={settings.fontFamily}
                                                    onChange={(e) => updateSetting("fontFamily", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all bg-white appearance-none"
                                                >
                                                    <option>Inter</option>
                                                    <option>Roboto</option>
                                                    <option>Outfit</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Font size</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 relative">
                                                        <input
                                                            type="number"
                                                            value={settings.fontSize}
                                                            onChange={(e) => updateSetting("fontSize", Math.min(64, Math.max(12, parseInt(e.target.value) || 12)))}
                                                            className="w-full px-4 py-3 pr-12 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-indigo-500/50 transition-all font-mono"
                                                            min="12" max="64"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 uppercase">PX</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Font color</label>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="color"
                                                        value={settings.fontColor}
                                                        onChange={(e) => updateSetting("fontColor", e.target.value)}
                                                        className="w-11 h-11 rounded-xl border-none cursor-pointer p-0 bg-transparent shrink-0"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={settings.fontColor}
                                                        onChange={(e) => updateSetting("fontColor", e.target.value)}
                                                        className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-indigo-500/50 transition-all uppercase"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Identity</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Logo and branding text</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Branding Text</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={settings.brandingText}
                                                    maxLength={24}
                                                    onChange={(e) => updateSetting("brandingText", e.target.value)}
                                                    placeholder="e.g. My Awesome Quiz"
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-pink-500/50 transition-all"
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-300 font-bold text-right uppercase">{settings.brandingText.length}/24</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Theme Accent Color</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="color"
                                                    value={settings.themeColor}
                                                    onChange={(e) => updateSetting("themeColor", e.target.value)}
                                                    className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent shrink-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.themeColor}
                                                    onChange={(e) => updateSetting("themeColor", e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-pink-500/50 transition-all uppercase"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl border border-black/[0.03] bg-[#fcfcfd]/50 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[12px] font-bold text-gray-600">Show Logo</label>
                                                <button
                                                    onClick={() => updateSetting("logoVisibility", !settings.logoVisibility)}
                                                    className={`w-10 h-6 rounded-full transition-all flex items-center px-1 ${settings.logoVisibility ? "bg-pink-500" : "bg-gray-200"}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.logoVisibility ? "translate-x-4" : ""}`} />
                                                </button>
                                            </div>

                                            {settings.logoVisibility && (
                                                <div className="pt-2 space-y-4">
                                                    <div
                                                        onClick={() => triggerUpload("logoUrl")}
                                                        className="p-4 border-2 border-dashed border-black/[0.08] rounded-xl text-center hover:border-pink-300 hover:bg-pink-50/20 transition-all cursor-pointer group"
                                                    >
                                                        {settings.logoUrl ? (
                                                            <div className="flex items-center justify-center gap-3">
                                                                <img src={settings.logoUrl} alt="Logo preview" className="w-10 h-10 rounded-lg object-contain shadow-sm" />
                                                                <span className="text-[12px] font-bold text-pink-600">Change Logo</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">✨</div>
                                                                <p className="text-[12px] font-bold text-gray-500">Upload Brand Logo</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {settings.logoVisibility && (
                                                <div className="space-y-3 pt-2 border-t border-black/[0.03] animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Logo placement</label>
                                                        <div className="flex gap-1.5 p-1 bg-[#f5f5f7] rounded-xl">
                                                            {["Top left", "Top right"].map((pos) => (
                                                                <button
                                                                    key={pos}
                                                                    onClick={() => updateSetting("logoPlacement", pos)}
                                                                    className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${settings.logoPlacement === pos ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                                                >
                                                                    {pos.split(" ")[1]}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* START STEP */}
                        {currentStep === 1 && (
                            <>
                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Background</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Hero screen background</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl border border-black/[0.04] bg-[#fcfcfd]">
                                        <div
                                            onClick={() => triggerUpload("startBgImage")}
                                            className="border-2 border-dashed border-black/[0.1] rounded-xl p-8 text-center hover:border-orange-200 hover:bg-orange-50/10 transition-all cursor-pointer group relative overflow-hidden"
                                        >
                                            {settings.startBgImage ? (
                                                <>
                                                    <div className="absolute inset-0 opacity-10 blur-[2px]">
                                                        <img src={settings.startBgImage} alt="Bg preview" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                        <p className="text-[13px] font-bold text-orange-600">Replace Hero Image</p>
                                                        <p className="text-[11px] text-gray-400 mt-1">Image selected successfully</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                    <p className="text-[13px] font-bold text-gray-700">Upload Hero Image</p>
                                                    <p className="text-[11px] text-gray-400 mt-1">Recommended: 3840×2160 (4K)</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">CTA Button</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Primary action button</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Button label</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={settings.startButtonText}
                                                    maxLength={16}
                                                    onChange={(e) => updateSetting("startButtonText", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-indigo-500/50 transition-all"
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-300 font-bold text-right uppercase">{settings.startButtonText.length}/16</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Button color</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="color"
                                                    value={settings.startButtonColor}
                                                    onChange={(e) => updateSetting("startButtonColor", e.target.value)}
                                                    className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent shrink-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.startButtonColor}
                                                    onChange={(e) => updateSetting("startButtonColor", e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-indigo-500/50 transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* REGISTRATION STEP */}
                        {currentStep === 2 && (
                            <>
                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                                            <div className="w-4 h-4 border-2 border-current rounded-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Registration Stage</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Form and background configuration</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl border border-black/[0.04] bg-[#fcfcfd]">
                                            <div
                                                onClick={() => triggerUpload("regBgImage")}
                                                className="border-2 border-dashed border-black/[0.1] rounded-xl p-8 text-center hover:border-blue-200 hover:bg-blue-50/10 transition-all cursor-pointer group relative overflow-hidden"
                                            >
                                                {settings.regBgImage ? (
                                                    <>
                                                        <div className="absolute inset-0 opacity-10 blur-[2px]">
                                                            <img src={settings.regBgImage} alt="Bg preview" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="relative z-10">
                                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                            <p className="text-[13px] font-bold text-blue-600">Replace Background</p>
                                                            <p className="text-[11px] text-gray-400 mt-1">Image selected successfully</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                        <p className="text-[13px] font-bold text-gray-700">Upload Background</p>
                                                        <p className="text-[11px] text-gray-400 mt-1">Replaces the default theme</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-2xl border border-black/[0.03] bg-white space-y-4 shadow-sm">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Card background</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.regCardColor}
                                                    onChange={(e) => updateSetting("regCardColor", e.target.value)}
                                                    className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.regCardColor}
                                                    onChange={(e) => updateSetting("regCardColor", e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-blue-500/50 transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm text-sm font-bold">≡</div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Input Fields</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Placeholder text and labels</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name Label</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={settings.regFullNameLabel}
                                                    maxLength={32}
                                                    onChange={(e) => updateSetting("regFullNameLabel", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-purple-500/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number Label</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={settings.regMobileLabel}
                                                    maxLength={32}
                                                    onChange={(e) => updateSetting("regMobileLabel", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-purple-500/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Submit Button</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Form submission action</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Button Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={settings.regSubmitButtonColor}
                                                onChange={(e) => updateSetting("regSubmitButtonColor", e.target.value)}
                                                className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={settings.regSubmitButtonColor}
                                                onChange={(e) => updateSetting("regSubmitButtonColor", e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-indigo-500/50 transition-all uppercase"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* QUIZ STEP */}
                        {currentStep === 3 && (
                            <>
                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Quiz Environment</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Session background config</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl border border-black/[0.04] bg-[#fcfcfd] mb-8">
                                        <div
                                            onClick={() => triggerUpload("quizBgImage")}
                                            className="border-2 border-dashed border-black/[0.1] rounded-xl p-8 text-center hover:border-indigo-200 hover:bg-indigo-50/10 transition-all cursor-pointer group relative overflow-hidden"
                                        >
                                            {settings.quizBgImage ? (
                                                <>
                                                    <div className="absolute inset-0 opacity-10 blur-[2px]">
                                                        <img src={settings.quizBgImage} alt="Bg preview" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                        <p className="text-[13px] font-bold text-indigo-600">Replace Background</p>
                                                        <p className="text-[11px] text-gray-400 mt-1">Image selected successfully</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                                    <p className="text-[13px] font-bold text-gray-700">Upload Background</p>
                                                    <p className="text-[11px] text-gray-400 mt-1">Custom quiz backdrop</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Quiz Logic</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Core session parameters</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Question Count</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={settings.quizQuestionCount}
                                                    onChange={(e) => updateSetting("quizQuestionCount", parseInt(e.target.value) || 0)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-indigo-500/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Button Text</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-black/[0.03] shrink-0">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={settings.quizButtonText}
                                                    maxLength={12}
                                                    onChange={(e) => updateSetting("quizButtonText", e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-indigo-500/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="page-transition">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shadow-sm">
                                            <div className="w-4 h-4 border-2 border-current rounded-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Card Styling</h3>
                                            <p className="text-[11px] text-gray-400 font-medium">Visuals for quiz cards</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Card Color</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.quizCardColor}
                                                    onChange={(e) => updateSetting("quizCardColor", e.target.value)}
                                                    className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.quizCardColor}
                                                    onChange={(e) => updateSetting("quizCardColor", e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-pink-500/50 transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Element Color</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={settings.quizElementColor}
                                                    onChange={(e) => updateSetting("quizElementColor", e.target.value)}
                                                    className="w-11 h-11 rounded-xl border-none cursor-pointer bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.quizElementColor}
                                                    onChange={(e) => updateSetting("quizElementColor", e.target.value)}
                                                    className="flex-1 px-4 py-3 rounded-xl border border-black/[0.06] text-[13px] font-mono outline-none focus:border-pink-500/50 transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* UPLOAD STEP */}
                        {currentStep === 4 && (
                            <section className="page-transition">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-sm text-xs font-bold">↑</div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Data Injection</h3>
                                        <p className="text-[11px] text-gray-400 font-medium">CSV question bank</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div
                                        onClick={() => triggerUpload("csvFile", ".csv")}
                                        className="p-8 border-2 border-dashed border-black/[0.1] rounded-2xl text-center hover:border-gray-900 hover:bg-gray-50 transition-all cursor-pointer group"
                                    >
                                        {settings.csvFileName ? (
                                            <>
                                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✅</div>
                                                <p className="text-[15px] font-bold text-green-600">{settings.csvFileName}</p>
                                                <p className="text-[12px] text-gray-400 mt-1 font-medium">Click to replace file</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📄</div>
                                                <p className="text-[15px] font-bold text-gray-900">Choose CSV File</p>
                                                <p className="text-[12px] text-gray-400 mt-1 font-medium">Max 50MB • .csv format</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100/50 shadow-sm shadow-indigo-500/5">
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">!</div>
                                            <p className="text-[12px] text-indigo-700 font-medium leading-relaxed">
                                                Use our standardized template to ensure correct injection into the Unity environment.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* THANK YOU STEP */}
                        {currentStep === 5 && (
                            <section className="page-transition">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shadow-sm text-xs font-bold">♥</div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Success Flow</h3>
                                        <p className="text-[11px] text-gray-400 font-medium">Thank you screen settings</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Completion Message</label>
                                        <textarea
                                            value={settings.brandingText} // Reusing branding for now or a different key
                                            onChange={(e) => updateSetting("brandingText", e.target.value)}
                                            className="w-full px-4 py-4 rounded-2xl border border-black/[0.06] text-[14px] font-medium outline-none focus:border-green-500/50 transition-all h-32 resize-none shadow-sm"
                                            placeholder="Thank you for participating!"
                                        />
                                    </div>
                                    <div className="p-4 rounded-2xl border border-black/[0.03] bg-[#fcfcfd]/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">𝕏</div>
                                                <span className="text-[13px] font-bold text-gray-700">Twitter Share</span>
                                            </div>
                                            <button className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1 shadow-inner">
                                                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* CERTIFICATE STEP */}
                        {currentStep === 6 && (
                            <section className="page-transition">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm text-xs font-bold">📜</div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Reward Design</h3>
                                        <p className="text-[11px] text-gray-400 font-medium">Certificate templates</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        {["Modern", "Classic", "Playful", "Corporate"].map(t => (
                                            <div key={t} className={`group p-3 rounded-2xl border-2 cursor-pointer transition-all ${t === "Modern" ? "border-amber-500 bg-amber-50/20 shadow-lg shadow-amber-500/5" : "border-black/[0.04] bg-white hover:border-amber-200"}`}>
                                                <div className="aspect-[4/3] bg-gray-100 rounded-xl mb-3 overflow-hidden border border-black/[0.02]">
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 group-hover:scale-105 transition-transform duration-500" />
                                                </div>
                                                <p className="text-[10px] font-extrabold text-center uppercase tracking-widest text-gray-600">{t}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-black/[0.04] space-y-3 shrink-0">
                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="w-full py-4 rounded-xl text-[15px] font-bold text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2"
                            >
                                Save & Continue
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                onClick={() => handleSave(true)}
                                className="w-full py-4 rounded-xl text-[15px] font-bold text-white bg-green-600 hover:bg-green-700 transition-all btn-press shadow-lg shadow-green-600/10 flex items-center justify-center gap-2"
                            >
                                Finish & Publish
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        )}
                        {currentStep > 0 && (
                            <button
                                onClick={prevStep}
                                className="w-full py-3 rounded-xl text-[14px] font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Previous step
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Viewport Content */}
                <div className="flex-1 flex flex-col bg-[#f0f0f2] overflow-hidden relative">
                    {/* Premium Ambient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f7] via-[#e8e8ed] to-[#d2d2d7] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />

                    {/* Stepper Header */}
                    <div className="h-[76px] bg-white/80 backdrop-blur-2xl border-b border-black/[0.04] flex items-center justify-center px-10 shrink-0 z-20 shadow-sm">
                        <div className="flex items-center gap-0 w-full max-w-4xl overflow-x-auto no-scrollbar scroll-smooth py-2">
                            {steps.map((step, idx) => (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => setCurrentStep(idx)}
                                        className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl transition-all duration-500 whitespace-nowrap group/step ${currentStep === idx ? "bg-[#1d1d1f] text-white shadow-2xl shadow-black/10 scale-105" : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]"}`}
                                    >
                                        {/* Step Indicator */}
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-500 ${currentStep === idx ? "bg-white text-[#1d1d1f] border-white" : (currentStep > idx ? "bg-green-500 text-white border-green-500" : "border-black/[0.08] text-transparent group-hover/step:border-black/[0.2]")}`}>
                                            {currentStep > idx ? "✓" : ""}
                                        </div>
                                        <span className={`text-[12px] font-black tracking-[0.1em] uppercase ${currentStep === idx ? "opacity-100" : "opacity-60"}`}>
                                            {step.label}
                                        </span>
                                    </button>
                                    {idx < steps.length - 1 && (
                                        <div className="flex items-center px-2">
                                            <div className={`w-8 h-[2px] rounded-full transition-all duration-700 ${currentStep > idx ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-black/[0.05]"}`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Viewport Area */}
                    <div className="flex-1 p-16 flex flex-col items-center overflow-y-auto z-10 no-scrollbar">
                        <div className="flex items-center gap-4 mb-10 translate-y-2 opacity-80">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-black/[0.1]" />
                            <div className="px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl border border-black/[0.03] shadow-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[10px] font-black text-[#1d1d1f] uppercase tracking-[0.25em]">Ultra-HD Rendering Engine</p>
                            </div>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-black/[0.1]" />
                        </div>

                        {/* THE DEVICE FRAME (MacBook style) */}
                        <div className="w-full max-w-[1100px] relative px-[1.2%] pt-[1.2%] pb-[2.8%] bg-[#0f0f0f] rounded-[40px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] border border-white/10 shrink-0 transform hover:scale-[1.01] transition-transform duration-1000">
                            {/* Inner border / Bezel */}
                            <div className="absolute inset-[1px] rounded-[39px] border border-white/[0.05] pointer-events-none" />

                            {/* MacBook Top Bar / Camera Notch Area */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[32px] bg-[#0f0f0f] rounded-b-[14px] flex items-center justify-center gap-2 border-x border-b border-white/[0.05]">
                                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/[0.05]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#050505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
                            </div>

                            {/* THE PREVIEW CANVAS */}
                            <div className="w-full aspect-video bg-white rounded-[12px] overflow-hidden relative flex flex-col shadow-inner">
                                {/* App Content based on Current Step */}
                                <div
                                    className="flex-1 flex flex-col items-center justify-center relative p-8 lg:p-12 transition-all duration-1000 ease-out"
                                    style={{
                                        backgroundImage: (currentStep === 3 && settings.quizBgImage) ? `url(${settings.quizBgImage})` : 
                                                        (currentStep === 2 && settings.regBgImage) ? `url(${settings.regBgImage})` : 
                                                        (settings.startBgImage) ? `url(${settings.startBgImage})` : 
                                                        `linear-gradient(135deg, ${settings.themeColor} 0%, ${settings.themeColor}aa 100%)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        fontFamily: settings.fontFamily,
                                        color: settings.fontColor
                                    }}
                                >
                                    {/* Floating Background Circles for depth */}
                                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[70%] rounded-full bg-white/10 blur-[120px] animate-pulse" />
                                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-black/5 blur-[120px]" />

                                    {/* Step-specific Previews */}
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                                        {/* GLOBAL / BRANDING PREVIEW */}
                                        {currentStep === 0 && (
                                            <div className="text-center animate-in fade-in zoom-in duration-700">
                                                <div className="w-24 h-1.5 bg-white/30 rounded-full mb-8 mx-auto" />
                                                <h1
                                                    className="font-black tracking-tighter uppercase mb-2"
                                                    style={{ fontSize: `${settings.fontSize}px`, color: settings.fontColor }}
                                                >
                                                    {settings.brandingText || "App Title"}
                                                </h1>
                                                <p className="text-[14px] font-bold opacity-40 tracking-widest uppercase">Visual Preview Engine</p>
                                                <div className="w-12 h-1 bg-white/20 rounded-full mt-6 mx-auto" />
                                            </div>
                                        )}

                                        {/* START STEP PREVIEW */}
                                        {currentStep === 1 && (
                                            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                                                <div className="w-64 h-40 bg-white/10 backdrop-blur-md rounded-3xl mb-12 border border-white/20 shadow-2xl flex items-center justify-center text-4xl">
                                                    🎮
                                                </div>
                                                <button
                                                    className="px-12 py-4 rounded-2xl text-white font-black text-[20px] shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-indigo-500/20"
                                                    style={{ backgroundColor: settings.startButtonColor }}
                                                >
                                                    {settings.startButtonText}
                                                </button>
                                            </div>
                                        )}

                                        {/* REGISTRATION PREVIEW */}
                                        {currentStep === 2 && (
                                            <div
                                                className="w-full max-w-md p-12 rounded-[40px] shadow-2xl transition-all duration-500 border border-black/[0.03] animate-in fade-in zoom-in duration-500"
                                                style={{ backgroundColor: settings.regCardColor }}
                                            >
                                                <div className="space-y-8">
                                                    <div className="text-center mb-4">
                                                        <h2 className="text-xl font-black text-gray-900">Join the Pulse</h2>
                                                        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-1">Registration</p>
                                                    </div>
                                                    <div className="space-y-5">
                                                        <div>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-3 px-1 tracking-widest">Full name</p>
                                                            <div className="px-5 py-4 rounded-2xl bg-gray-50 border border-black/[0.04] text-[13px] font-semibold text-gray-300">
                                                                {settings.regFullNameLabel}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-3 px-1 tracking-widest">Mobile number</p>
                                                            <div className="px-5 py-4 rounded-2xl bg-gray-50 border border-black/[0.04] text-[13px] font-semibold text-gray-300">
                                                                {settings.regMobileLabel}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="w-full py-4.5 rounded-2xl text-white font-black text-[15px] shadow-xl hover:opacity-90 transition-all active:scale-[0.98]"
                                                        style={{ backgroundColor: settings.regSubmitButtonColor }}
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* QUIZ PREVIEW */}
                                        {currentStep === 3 && (
                                            <div
                                                className="w-full max-w-3xl p-8 rounded-[32px] shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-right-8"
                                                style={{ backgroundColor: settings.quizCardColor }}
                                            >
                                                <div className="flex items-center justify-between mb-6">
                                                    <div
                                                        className="px-4 py-2 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-lg"
                                                        style={{ backgroundColor: settings.quizElementColor }}
                                                    >
                                                        Question 1 of {settings.quizQuestionCount}
                                                    </div>
                                                    <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-900 text-[11px] font-black uppercase tracking-widest border border-black/[0.03]">
                                                        Time: 02:00
                                                    </div>
                                                </div>

                                                <h2 className="text-[22px] font-black text-gray-900 mb-6 leading-tight">
                                                    Which of these defines the "SaaS" model?
                                                </h2>

                                                <div className="grid grid-cols-2 gap-3 mb-6">
                                                    {["On-premise", "Cloud-based", "Hybrid", "Local"].map((opt, i) => (
                                                        <div key={opt} className={`px-6 py-3.5 rounded-2xl border-2 text-[13px] font-bold ${i === 1 ? "border-indigo-500 bg-indigo-50/30 text-indigo-600" : "border-gray-100 text-gray-400"}`}>
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-end">
                                                    <button
                                                        className="px-10 py-3 rounded-2xl text-white font-black text-[14px] shadow-xl hover:opacity-90 transition-all"
                                                        style={{ backgroundColor: settings.quizElementColor }}
                                                    >
                                                        {settings.quizButtonText}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* UPLOAD / DATA PREVIEW */}
                                        {currentStep === 4 && (
                                            <div className="flex flex-col items-center max-w-2xl text-center animate-in zoom-in duration-700">
                                                <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-5xl mb-8 border border-white/20 shadow-2xl rotate-3">
                                                    💎
                                                </div>
                                                <h2 className="text-[42px] font-black text-white mb-4 tracking-tighter">Content Initialized</h2>
                                                <p className="text-[18px] text-white/60 font-medium leading-relaxed">
                                                    The Unity engine is now ready to parse your <span className="text-white font-bold">{settings.quizQuestionCount} questions</span>.
                                                    Injection will proceed upon publish.
                                                </p>
                                            </div>
                                        )}

                                        {/* THANK YOU PREVIEW */}
                                        {currentStep === 5 && (
                                            <div className="flex flex-col items-center max-w-xl text-center animate-in fade-in zoom-in duration-1000">
                                                <div className="w-24 h-24 rounded-full bg-white text-green-500 flex items-center justify-center text-4xl mb-10 shadow-2xl shadow-white/20">
                                                    ♥
                                                </div>
                                                <h2 className="text-[48px] font-black text-white mb-6 tracking-tighter">Awesome Job!</h2>
                                                <p className="text-[20px] text-white/80 mb-12 leading-relaxed font-medium">
                                                    {settings.brandingText || "Thank you for participating!"}
                                                </p>
                                                <button className="px-14 py-5 rounded-2xl bg-white text-gray-900 font-black shadow-2xl hover:bg-gray-50 transition-all active:scale-95 text-[16px]">
                                                    View Final Results
                                                </button>
                                            </div>
                                        )}

                                        {/* CERTIFICATE PREVIEW */}
                                        {currentStep === 6 && (
                                            <div className="w-full max-w-3xl aspect-[1.414/1] bg-white rounded-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-20 flex flex-col items-center text-center relative border-[20px] border-black/[0.01] animate-in slide-in-from-bottom-12 duration-1000">
                                                <div className="absolute inset-4 border border-gray-100 pointer-events-none" />
                                                <div className="absolute top-12 left-12 w-16 h-16 border-t-4 border-l-4 border-amber-400/30" />
                                                <div className="absolute bottom-12 right-12 w-16 h-16 border-b-4 border-r-4 border-amber-400/30" />

                                                <h3 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em] mb-12">Official Certificate of Achievement</h3>
                                                <h2 className="text-[48px] font-black text-gray-900 mb-2 font-serif tracking-tight">Alex Sterling</h2>
                                                <div className="w-48 h-[2px] bg-amber-400/20 mb-10" />
                                                <p className="text-[17px] text-gray-400 max-w-sm font-medium leading-relaxed">
                                                    Successfully mastered the <span className="text-gray-900 font-bold">{settings.brandingText || "Pulse Quiz"}</span> with a perfect execution score.
                                                </p>

                                                <div className="mt-auto flex gap-12 text-left w-full justify-center opacity-40">
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Issued Date</p>
                                                        <p className="text-[12px] font-black text-gray-900 uppercase">March 27, 2026</p>
                                                    </div>
                                                    <div className="w-px h-8 bg-gray-100" />
                                                    <div>
                                                        <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Verified ID</p>
                                                        <p className="text-[12px] font-black text-gray-900 uppercase">PQ-5839-A12</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logo Placement Overlay */}
                                    {settings.logoVisibility && currentStep < 6 && (
                                        <div className={`absolute top-12 ${settings.logoPlacement === "Top left" ? "left-12" : "right-12"} animate-in fade-in duration-500`}>
                                            <div
                                                className="w-14 h-14 rounded-2xl backdrop-blur-xl flex items-center justify-center text-white font-black text-xl border border-white/30 shadow-2xl"
                                                style={{ backgroundColor: `${settings.themeColor}33` }}
                                            >
                                                {settings.logoUrl ? (
                                                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-2xl" />
                                                ) : (
                                                    (settings.brandingText || "A").charAt(0).toUpperCase()
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}
