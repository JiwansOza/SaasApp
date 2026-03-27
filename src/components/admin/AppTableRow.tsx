"use client";

import React from "react";

interface AdminApp {
    id: string;
    name: string;
    category: string;
    price: number;
    status: "Published" | "Draft";
    icon: string;
}

interface AppTableRowProps {
    app: AdminApp;
    editingId: string | null;
    editName: string;
    editPrice: string;
    setEditName: (name: string) => void;
    setEditPrice: (price: string) => void;
    onEdit: (app: AdminApp) => void;
    onSave: (id: string) => void;
    onCancel: () => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

export const AppTableRow: React.FC<AppTableRowProps> = ({
    app,
    editingId,
    editName,
    editPrice,
    setEditName,
    setEditPrice,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onToggleStatus,
}) => {
    const isEditing = editingId === app.id;

    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-indigo-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
                        autoFocus
                    />
                ) : (
                    <div className="flex items-center gap-3">
                        <img src={app.icon} alt={app.name} className="w-9 h-9 rounded-[10px] object-cover shadow-sm" />
                        <span className="text-[14px] font-medium text-gray-900">{app.name}</span>
                    </div>
                )}
            </td>
            <td className="px-6 py-4">
                <span className="text-[13px] text-gray-500">{app.category}</span>
            </td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-20 px-3 py-1.5 rounded-lg border border-indigo-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
                        type="number"
                    />
                ) : (
                    <span className="text-[14px] font-medium text-gray-900">₹{app.price}</span>
                )}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={() => onToggleStatus(app.id)}
                    className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${app.status === "Published"
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                >
                    {app.status}
                </button>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                    {isEditing ? (
                        <>
                            <button onClick={() => onSave(app.id)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                                Save
                            </button>
                            <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onEdit(app)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                                Edit
                            </button>
                            <button onClick={() => onDelete(app.id)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};
