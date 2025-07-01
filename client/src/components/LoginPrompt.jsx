import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPrompt() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center animate-fadeUp">
                <h2 className="text-xl font-bold mb-3 text-primary-800">Login Required</h2>
                <p className="text-gray-600 mb-4">Please login or sign up to add items to your cart.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-2 rounded border border-primary-500 text-primary-700 hover:bg-primary-100 transition"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
