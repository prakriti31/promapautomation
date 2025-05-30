import React from 'react';
import { Link } from 'react-router-dom';

/* Simple toast-style overlay */
export default function LoginPrompt({ onClose }) {
    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-md border bg-white shadow-lg p-4">
            <p className="mb-3 font-medium">
                Hey! You are not logged in. Please&nbsp;Login.
            </p>

            <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                >
                    Close
                </button>
                <Link
                    to="/login"
                    className="rounded bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
