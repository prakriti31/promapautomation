import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/* category → array of sub-categories (empty array means none) */
const menu = {
    PLC: ['Siemens PLC', 'ABB PLC', 'Schneider PLC', 'Allen Bradley PLC'],
    Drives: ['Siemens', 'ABB'],
    Motors: ['Nord', 'Siemens'],
    'Power Items': ['MCCB', 'MCB'],
    Cables: [],            // no sub-options
    Sensors: [],           // new category
};

export default function CategoryNavbar() {
    const [desktopOpen, setDesktopOpen] = useState(null); // which cat is open (desktop)
    const [mobileOpen, setMobileOpen]   = useState(false); // burger state (mobile)
    const [mobileCat,  setMobileCat]    = useState(null);  // which cat expanded (mobile)
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
    const linkPath   = (cat, sub = 'All') =>
        `/products/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}`;

    return (
        <div ref={navRef} className="bg-primary-800 text-white">
            <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
                {/* ─── Desktop menu ─────────────────────────────── */}
                <div className="hidden items-center space-x-4 md:flex">
                    {categories.map(cat => {
                        const subs = menu[cat];
                        const hasSub = subs.length > 0;

                        return (
                            <div key={cat} className="relative">
                                {/* main button (toggles dropdown if any) */}
                                <button
                                    onClick={() =>
                                        hasSub
                                            ? setDesktopOpen(desktopOpen === cat ? null : cat)
                                            : null
                                    }
                                    className="inline-flex items-center rounded px-3 py-2 hover:bg-primary-700"
                                >
                                    <span>{cat}</span>
                                    {hasSub && <ChevronDown className="ml-1 h-4 w-4" />}
                                </button>

                                {/* dropdown list */}
                                {hasSub && desktopOpen === cat && (
                                    <div className="absolute left-0 mt-1 rounded bg-white text-black shadow-lg z-30">
                                        {/* “All” link first */}
                                        <Link
                                            to={linkPath(cat)}
                                            onClick={() => setDesktopOpen(null)}
                                            className="block whitespace-nowrap px-4 py-2 hover:bg-gray-100"
                                        >
                                            All {cat}
                                        </Link>
                                        {subs.map(sub => (
                                            <Link
                                                key={sub}
                                                to={linkPath(cat, sub)}
                                                onClick={() => setDesktopOpen(null)}
                                                className="block whitespace-nowrap px-4 py-2 hover:bg-gray-100"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* no-sub cats navigate directly */}
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

                {/* ─── Mobile burger ────────────────────────────── */}
                <button
                    className="flex items-center rounded px-3 py-2 hover:bg-primary-700 md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span>Products</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            </div>

            {/* ─── Mobile dropdown ───────────────────────────── */}
            {mobileOpen && (
                <div className="space-y-2 bg-primary-700 px-4 pb-4 md:hidden">
                    {categories.map(cat => {
                        const subs = menu[cat];
                        const hasSub = subs.length > 0;
                        const expanded = mobileCat === cat;

                        return (
                            <div key={cat} className="relative">
                                <button
                                    onClick={() => {
                                        if (hasSub) setMobileCat(expanded ? null : cat);
                                        else setMobileOpen(false);
                                    }}
                                    className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-primary-600"
                                >
                                    <span>{cat}</span>
                                    {hasSub && <ChevronDown className="h-4 w-4" />}
                                </button>

                                {/* “All” + sub-links */}
                                {hasSub && expanded && (
                                    <div className="space-y-1 pt-1 pl-4">
                                        <Link
                                            to={linkPath(cat)}
                                            onClick={() => {
                                                setMobileOpen(false);
                                                setMobileCat(null);
                                            }}
                                            className="block py-1"
                                        >
                                            All {cat}
                                        </Link>
                                        {subs.map(sub => (
                                            <Link
                                                key={sub}
                                                to={linkPath(cat, sub)}
                                                onClick={() => {
                                                    setMobileOpen(false);
                                                    setMobileCat(null);
                                                }}
                                                className="block py-1"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* no-sub cat direct nav overlay */}
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
