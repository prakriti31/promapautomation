import React from 'react';
import CategoryNavbar from '../components/CategoryNavbar';

export default function Home() {
    return (
        <div>
            <CategoryNavbar />
            {/* Homepage content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Welcome to PROMAP Automation</h1>
                <p className="text-lg text-gray-700">
                    Select a product category above to get started.
                </p>
            </div>
        </div>
    );
}