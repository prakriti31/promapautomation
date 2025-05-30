import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/* category → array of subcategories (empty array means none) */
const menu = {
    PLC: [
        'Siemens PLC',
        'ABB PLC',
        'Schneider PLC',
        'Allen Bradley PLC',
    ],
    Drives: ['Siemens', 'ABB'],
    Motors: ['Nord', 'Siemens'],
    'Power Items': ['MCCB', 'MCB'],
    Cables: [], // no sub-options
};

export default function CategoryNavbar() {
    const [desktopOpen, setDesktopOpen] = useState(null); // which cat is open (desktop)
    const [mobileOpen, setMobileOpen] = useState(false);  // overall burger open (mobile)
    const [mobileCat, setMobileCat]   = useState(null);   // which cat expanded (mobile)
    const navRef = useRef();

    /* close menus on outside click */
    useEffect(() => {
        function handleClick(e) {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setDesktopOpen(null);
                setMobileCat(null);
                setMobileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const categories = Object.keys(menu);

    /* helper → path for links */
    const linkPath = (cat, sub) =>
        `/products/${encodeURIComponent(cat)}/${encodeURIComponent(sub || 'All')}`;

    return (
        <div className="bg-primary-800 text-white" ref={navRef}>
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
                {/* ─── Desktop menu ─────────────────────────────────────────── */}
                <div className="hidden md:flex items-center space-x-4">
                    {categories.map(cat => {
                        const hasSub = menu[cat].length > 0;
                        return (
                            <div key={cat} className="relative">
                                <button
                                    onClick={() =>
                                        setDesktopOpen(desktopOpen === cat ? null : cat)
                                    }
                                    className="px-3 py-2 hover:bg-primary-700 rounded inline-flex items-center"
                                >
                                    <span>{cat}</span>
                                    {hasSub && <ChevronDown className="ml-1 w-4 h-4" />}
                                </button>

                                {/* dropdown */}
                                {hasSub && desktopOpen === cat && (
                                    <div className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg z-10">
                                        {menu[cat].map(sub => (
                                            <Link
                                                key={sub}
                                                to={linkPath(cat, sub)}
                                                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                                                onClick={() => setDesktopOpen(null)}
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* category with no sub-options navigates directly */}
                                {!hasSub && (
                                    <Link
                                        to={linkPath(cat)}
                                        className="absolute inset-0"
                                        onClick={() => setDesktopOpen(null)}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ─── Mobile burger ──────────────────────────────────────── */}
                <button
                    className="md:hidden px-3 py-2 hover:bg-primary-700 rounded inline-flex items-center"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span>Products</span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                </button>
            </div>

            {/* ─── Mobile dropdown ─────────────────────────────────────── */}
            {mobileOpen && (
                <div className="md:hidden bg-primary-700 px-4 pb-4 space-y-2">
                    {categories.map(cat => {
                        const hasSub = menu[cat].length > 0;
                        const expanded = mobileCat === cat;
                        return (
                            <div key={cat}>
                                <button
                                    onClick={() =>
                                        hasSub
                                            ? setMobileCat(expanded ? null : cat)
                                            : setMobileOpen(false)
                                    }
                                    className="w-full text-left px-3 py-2 hover:bg-primary-600 rounded flex justify-between items-center"
                                >
                                    <span>{cat}</span>
                                    {hasSub && <ChevronDown className="w-4 h-4" />}
                                </button>

                                {hasSub && expanded && (
                                    <div className="pl-4 pt-1 space-y-1">
                                        {menu[cat].map(sub => (
                                            <Link
                                                key={sub}
                                                to={linkPath(cat, sub)}
                                                className="block py-1"
                                                onClick={() => {
                                                    setMobileOpen(false);
                                                    setMobileCat(null);
                                                }}
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {!hasSub && (
                                    <Link
                                        to={linkPath(cat)}
                                        className="absolute inset-0"
                                        onClick={() => setMobileOpen(false)}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
