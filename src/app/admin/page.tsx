"use client";

import { useState, useEffect, useMemo } from "react";
import { apps as staticApps } from "@/data/apps";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { AppTableRow } from "@/components/admin/AppTableRow";
import { AddModal, DeleteModal } from "@/components/admin/AdminModals";
import { supabase } from "@/lib/supabase";

interface AdminApp {
    id: string;
    name: string;
    category: string;
    price: number;
    status: "Published" | "Draft";
    icon: string;
}

export default function AdminPage() {
    const { isAdmin, isLoggedIn } = useAppContext();
    const router = useRouter();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [adminApps, setAdminApps] = useState<AdminApp[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn || !isAdmin) {
            router.push("/");
            return;
        }
        fetchApps();
    }, [isLoggedIn, isAdmin, router]);

    const fetchApps = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('marketplace_apps')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.warn("Retrying with static data due to error:", error.message);
                // Fallback to static data if table doesn't exist or other error
                setAdminApps(staticApps.map(a => ({
                    id: a.id,
                    name: a.name,
                    category: a.category,
                    price: a.price,
                    status: "Published",
                    icon: a.icon
                })));
            } else if (data && data.length > 0) {
                setAdminApps(data as AdminApp[]);
            } else {
                // If table is empty, seed with static data for demo
                setAdminApps(staticApps.map(a => ({
                    id: a.id,
                    name: a.name,
                    category: a.category,
                    price: a.price,
                    status: "Published",
                    icon: a.icon
                })));
            }
        } catch (e) {
            console.error("Fetch error:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter apps based on search term
    const filteredApps = useMemo(() => {
        return adminApps.filter(app => 
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [adminApps, searchTerm]);

    if (!isLoggedIn || !isAdmin) return null;

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        const { error } = await supabase
            .from('marketplace_apps')
            .delete()
            .eq('id', id);

        if (!error) {
            setAdminApps((prev) => prev.filter((a) => a.id !== id));
        }
        setShowDeleteModal(null);
        setIsLoading(false);
    };

    const handleEdit = (app: AdminApp) => {
        setEditingId(app.id);
        setEditName(app.name);
        setEditPrice(app.price.toString());
    };

    const handleSaveEdit = async (id: string) => {
        if (!editName.trim()) {
            alert("Application name is required");
            return;
        }

        setIsLoading(true);
        const { error } = await supabase
            .from('marketplace_apps')
            .update({ name: editName, price: parseInt(editPrice) })
            .eq('id', id);

        if (!error) {
            setAdminApps((prev) =>
                prev.map((a) =>
                    a.id === id
                        ? { ...a, name: editName, price: parseInt(editPrice) || a.price }
                        : a
                )
            );
            setEditingId(null);
        }
        setIsLoading(false);
    };

    const handleAdd = async () => {
        setIsLoading(true);
        const newApp: AdminApp = {
            id: `app-${Date.now()}`,
            name: "New Application",
            category: "Productivity",
            price: 29,
            status: "Draft",
            icon: "/icon-game-1.png",
        };

        const { error } = await supabase
            .from('marketplace_apps')
            .insert([newApp]);

        if (!error) {
            setAdminApps((prev) => [newApp, ...prev]);
            setShowAddModal(false);
        }
        setIsLoading(false);
    };

    const toggleStatus = async (id: string) => {
        const app = adminApps.find(a => a.id === id);
        if (!app) return;

        const newStatus = app.status === "Published" ? "Draft" : "Published";
        
        setIsLoading(true);
        const { error } = await supabase
            .from('marketplace_apps')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setAdminApps((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: newStatus } : a
                )
            );
        }
        setIsLoading(false);
    };

    return (
        <div className="page-transition max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl md:text-[36px] font-bold text-gray-900 tracking-tight mb-1">Admin Dashboard</h1>
                    <p className="text-[14px] text-gray-500">Manage marketplace applications</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all btn-press shadow-md shadow-gray-900/10 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New App
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Apps", value: adminApps.length, icon: "📦" },
                    { label: "Published", value: adminApps.filter((a) => a.status === "Published").length, icon: "🟢" },
                    { label: "Drafts", value: adminApps.filter((a) => a.status === "Draft").length, icon: "📝" },
                    { label: "Revenue (Demo)", value: `₹${adminApps.reduce((sum, a) => sum + a.price, 0).toLocaleString()}`, icon: "💰" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-black/[0.04] p-5 shadow-xs hover:shadow-md transition-all duration-300">
                        <div className="text-xl mb-1">{stat.icon}</div>
                        <div className="text-[24px] font-bold text-gray-900 tracking-tight">{stat.value}</div>
                        <div className="text-[12px] text-gray-400 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-6 py-3.5 rounded-2xl bg-white border border-black/[0.04] text-[14px] font-medium w-full md:w-[320px] outline-none focus:border-indigo-500/30 transition-all shadow-sm group-hover:shadow-md"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Apps Table */}
            <div className="bg-white rounded-2xl border border-black/[0.04] overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-gray-100/80">
                    <h2 className="text-[15px] font-semibold text-gray-900">Application Management</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Application</th>
                                <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredApps.map((app) => (
                                <AppTableRow 
                                    key={app.id}
                                    app={app}
                                    editingId={editingId}
                                    editName={editName}
                                    editPrice={editPrice}
                                    setEditName={setEditName}
                                    setEditPrice={setEditPrice}
                                    onEdit={handleEdit}
                                    onSave={handleSaveEdit}
                                    onCancel={() => setEditingId(null)}
                                    onDelete={setShowDeleteModal}
                                    onToggleStatus={toggleStatus}
                                />
                            ))}
                            {filteredApps.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-[14px]">
                                        {isLoading ? "Loading applications..." : `No applications found matching "${searchTerm}"`}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-center text-[11px] text-gray-400 mt-8">
                Admin dashboard with persistent data capabilities — Demonstration
            </p>

            {/* Modals */}
            {showAddModal && (
                <AddModal 
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAdd}
                />
            )}

            {showDeleteModal && (
                <DeleteModal 
                    onClose={() => setShowDeleteModal(null)}
                    onConfirm={() => handleDelete(showDeleteModal)}
                />
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
