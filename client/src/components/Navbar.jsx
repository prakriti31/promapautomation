import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

    return (
        <nav className="bg-primary-200 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo / Home */}
                    <Link to="/" className="text-primary-800 text-xl font-extrabold tracking-wide">
                        PROMAP Automation
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Products dropdown */}
                        <div className="relative group">
                            <button className="hover:text-primary-600 px-2 py-1">
                                Products
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <ul className="py-1">
                                    <li className="px-4 py-2 hover:bg-primary-100">
                                        <Link to="/products/plc" className="block">PLC</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-primary-100">
                                        <Link to="/products/drives" className="block">Drives</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-primary-100">
                                        <Link to="/products/motors" className="block">Motors</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-primary-100">
                                        <Link to="/products/power-items" className="block">Power Items</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-primary-100">
                                        <Link to="/products/cables" className="block">Cables</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Link to="/login" className="hover:text-primary-600">Login</Link>
                        <Link to="/signup" className="hover:text-primary-600">Sign Up</Link>
                        <Link to="/admin" className="bg-primary-500 text-white rounded-lg px-3 py-1 hover:bg-primary-600">
                            Admin
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <button
                        className="md:hidden flex items-center"
                        onClick={() => setOpen(!open)}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    open
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16M4 18h16'
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 bg-primary-100 space-y-1">
                    <button
                        className="w-full text-left py-2 flex justify-between items-center"
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    >
                        Products
                        <span>{mobileProductsOpen ? '▲' : '▼'}</span>
                    </button>
                    {mobileProductsOpen && (
                        <div className="pl-4 space-y-1">
                            <Link to="/products/plc" className="block py-1">PLC</Link>
                            <Link to="/products/drives" className="block py-1">Drives</Link>
                            <Link to="/products/motors" className="block py-1">Motors</Link>
                            <Link to="/products/power-items" className="block py-1">Power Items</Link>
                            <Link to="/products/cables" className="block py-1">Cables</Link>
                        </div>
                    )}

                    <Link to="/login" className="block py-2">Login</Link>
                    <Link to="/signup" className="block py-2">Sign Up</Link>
                    <Link to="/admin" className="block py-2">Admin</Link>
                </div>
            )}
        </nav>
    );
}