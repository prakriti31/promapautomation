import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
    return (
        <footer className="bg-primary-800 text-primary-100 py-6">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 gap-4">
                <div className="text-sm">&copy; PROMAP Automations&nbsp;2024-2025</div>

                <div className="flex gap-6 text-sm">
                    <Link to="/contact"  className="hover:underline">Contact&nbsp;Us</Link>
                    <Link to="/terms"    className="hover:underline">Terms&nbsp;of&nbsp;Use</Link>
                </div>
            </div>
        </footer>
    );
}
