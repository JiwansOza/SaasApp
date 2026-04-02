"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { App, getAppById } from "@/data/apps";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    isAdmin: boolean;
}

interface CustomizationSettings {
    // Global
    fontFamily: string;
    fontSize: string;
    fontColor: string;
    logoUrl: string | null;
    logoPlacement: "Top left" | "Top right";
    logoVisibility: boolean;
    
    // Start Step
    startBgImage: string | null;
    startButtonColor: string;
    startButtonText: string;
    
    // Registration Step
    regBgImage: string | null;
    regCardColor: string;
    regFullNameLabel: string;
    regMobileLabel: string;
    regSubmitButtonColor: string;
    
    // Quiz Step
    quizQuestionCount: number;
    quizDuration: string;
    quizBgImage: string | null;
    quizCardColor: string;
    quizOptionColor: string;
    quizElementColor: string;
    quizButtonText: string;

    // Legacy
    loginBackground: string;
    themeColor: string;
    buttonColor: string;
    brandingText: string;
    csvFileName: string | null;
}

interface AppMetadata {
    id: string;
    userId: string;
    password: string;
    participants: number;
    certificates: number;
    createdDate: string;
}

interface AppContextType {
    user: User | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    purchasedApps: App[];
    customizations: Record<string, CustomizationSettings>;
    appMetadata: Record<string, AppMetadata>;
    wishlist: string[];
    toggleWishlist: (appId: string) => void;
    login: (email: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    purchaseApp: (app: App) => Promise<void>;
    updateCustomization: (appId: string, settings: CustomizationSettings) => Promise<void>;
    getCustomization: (appId: string) => CustomizationSettings;
    getAppMetadata: (appId: string) => AppMetadata;
}

const defaultCustomization: CustomizationSettings = {
    // Global
    fontFamily: "Inter",
    fontSize: "40",
    fontColor: "#334155",
    logoUrl: null,
    logoPlacement: "Top right",
    logoVisibility: true,
    
    // Start Step
    startBgImage: null,
    startButtonColor: "#7C3AED",
    startButtonText: "Get start",
    
    // Registration Step
    regBgImage: null,
    regCardColor: "#FFFFFF",
    regFullNameLabel: "Enter your full name",
    regMobileLabel: "Enter your mobile number",
    regSubmitButtonColor: "#7C3AED",
    
    // Quiz Step
    quizQuestionCount: 10,
    quizDuration: "2 minutes",
    quizBgImage: null,
    quizCardColor: "#FFFFFF",
    quizOptionColor: "#FFFFFF",
    quizElementColor: "#111827",
    quizButtonText: "Next",

    // Legacy
    loginBackground: "#1a1a2e",
    themeColor: "#6366f1",
    buttonColor: "#6366f1",
    brandingText: "My Application",
    csvFileName: null,
};

const defaultMetadata: AppMetadata = {
    id: "",
    userId: "user_3829",
    password: "password_123",
    participants: 0,
    certificates: 0,
    createdDate: "March 27, 2026",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const getURL = () => {
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your main domain in Vercel
        process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel for preview deployments
        (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [purchasedApps, setPurchasedApps] = useState<App[]>([]);
    const [customizations, setCustomizations] = useState<
        Record<string, CustomizationSettings>
    >({});
    const [appMetadata, setAppMetadata] = useState<Record<string, AppMetadata>>({});

    const [wishlist, setWishlist] = useState<string[]>([]);

    // Initialize wishlist from localStorage
    useEffect(() => {
        const storedWishlist = typeof window !== "undefined" ? localStorage.getItem("wishlist") : null;
        if (storedWishlist) {
            try {
                setWishlist(JSON.parse(storedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    const toggleWishlist = (appId: string) => {
        setWishlist((prev) => {
            const newWishlist = prev.includes(appId)
                ? prev.filter((id) => id !== appId)
                : [...prev, appId];
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    // Listen for auth changes
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const isAdmin = session.user.email === "admin@jiwans.com";
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: session.user.user_metadata?.full_name || session.user.email!.split("@")[0],
                    avatarUrl: session.user.user_metadata?.avatar_url,
                    isAdmin: isAdmin
                });
                fetchUserData(session.user);
            } else {
                setUser(null);
                setPurchasedApps([]);
                setCustomizations({});
                setAppMetadata({});
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserData = async (supabaseUser: SupabaseUser) => {
        const userId = supabaseUser.id;

        // Ensure profile exists (Sync for existing users or metadata updates)
        await supabase.from('profiles').upsert({
            id: userId,
            full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email!.split("@")[0],
            avatar_url: supabaseUser.user_metadata?.avatar_url,
            email: supabaseUser.email,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

        // Fetch purchased apps
        const { data: purchases } = await supabase
            .from('purchased_apps')
            .select('app_id')
            .eq('user_id', userId);
        
        if (purchases) {
            const apps = purchases.map(p => getAppById(p.app_id)).filter(Boolean) as App[];
            setPurchasedApps(apps);
        }

        // Fetch customizations
        const { data: custs } = await supabase
            .from('app_customizations')
            .select('app_id, settings')
            .eq('user_id', userId);
        
        if (custs) {
            const custMap: Record<string, CustomizationSettings> = {};
            custs.forEach(c => {
                custMap[c.app_id] = c.settings;
            });
            setCustomizations(custMap);
        }

        // Fetch metadata
        const { data: meta } = await supabase
            .from('app_metadata')
            .select('app_id, metadata')
            .eq('user_id', userId);
        
        if (meta) {
            const metaMap: Record<string, AppMetadata> = {};
            meta.forEach(m => {
                metaMap[m.app_id] = m.metadata;
            });
            setAppMetadata(metaMap);
        }
    };

    const login = async (email: string) => {
        const { error } = await supabase.auth.signInWithOtp({ email: email });
        if (error) throw error;
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${getURL()}dashboard`,
            },
        });
        if (error) throw error;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    const purchaseApp = async (app: App) => {
        if (!user) return;

        if (!purchasedApps.find((a) => a.id === app.id)) {
            // Save purchase
            await supabase.from('purchased_apps').insert({
                user_id: user.id,
                app_id: app.id
            });

            // Initialize mock metadata
            const newMetadata = {
                id: app.id,
                userId: `${app.id.replace(/-/g, "")}_${Math.floor(1000 + Math.random() * 9000)}`,
                password: Math.floor(100000 + Math.random() * 900000).toString(),
                participants: 0,
                certificates: 0,
                createdDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            };

            await supabase.from('app_metadata').upsert({
                user_id: user.id,
                app_id: app.id,
                metadata: newMetadata
            });

            setPurchasedApps((prev) => [...prev, app]);
            setAppMetadata(prev => ({ ...prev, [app.id]: newMetadata }));
        }
    };

    const updateCustomization = async (
        appId: string,
        settings: CustomizationSettings
    ) => {
        if (!user) return;

        await supabase.from('app_customizations').upsert({
            user_id: user.id,
            app_id: appId,
            settings: settings,
            updated_at: new Date().toISOString()
        });

        setCustomizations((prev) => ({ ...prev, [appId]: settings }));
    };

    const getCustomization = (appId: string): CustomizationSettings => {
        return customizations[appId] || defaultCustomization;
    };

    const getAppMetadata = (appId: string): AppMetadata => {
        return appMetadata[appId] || { ...defaultMetadata, id: appId };
    };

    return (
        <AppContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                isAdmin: !!user?.isAdmin,
                purchasedApps,
                customizations,
                appMetadata,
                wishlist,
                toggleWishlist,
                login,
                signInWithGoogle,
                logout,
                purchaseApp,
                updateCustomization,
                getCustomization,
                getAppMetadata,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
}
