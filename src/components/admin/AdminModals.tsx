"use client";

import React from "react";

interface AddModalProps {
    onClose: () => void;
    onAdd: () => void;
}

export const AddModal: React.FC<AddModalProps> = ({ onClose, onAdd }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Add New Application</h3>
            <p className="text-[14px] text-gray-500 mb-6">This will create a new draft application in the marketplace.</p>
            <div className="flex gap-2.5">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Cancel
                </button>
                <button onClick={onAdd} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all">
                    Add Application
                </button>
            </div>
        </div>
    </div>
);

interface DeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Application?</h3>
            <p className="text-[14px] text-gray-500 text-center mb-6">This action cannot be undone. The application will be removed from the marketplace.</p>
            <div className="flex gap-2.5">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-[14px] font-medium text-white bg-red-500 hover:bg-red-600 transition-colors">
                    Delete
                </button>
            </div>
        </div>
    </div>
);
