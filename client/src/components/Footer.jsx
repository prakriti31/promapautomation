import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-primary-800 py-6 text-primary-50">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
                <p className="text-sm">
                    © PROMAP Automations 2024–2025. All rights reserved.
                </p>

                <nav className="flex gap-6 text-sm underline-offset-4">
                    <Link to="/contact" className="hover:underline">
                        Contact Us
                    </Link>
                    <Link to="/terms" className="hover:underline">
                        Terms of Use
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
