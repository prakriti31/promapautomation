import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-primary-200 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo / home */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-primary-800 text-xl font-extrabold tracking-wide"
                        >
                            PROMAP Automation
                        </Link>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login"  className="hover:text-primary-600">Login</Link>
                        <Link to="/signup" className="hover:text-primary-600">Sign Up</Link>
                        <Link
                            to="/admin"
                            className="bg-primary-500 text-white rounded-lg px-3 py-1 hover:bg-primary-600"
                        >
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
                <div className="md:hidden px-4 pb-4 space-y-1 bg-primary-100">
                    <Link to="/login"  className="block py-2">Login</Link>
                    <Link to="/signup" className="block py-2">Sign Up</Link>
                    <Link to="/admin"  className="block py-2">Admin</Link>
                </div>
            )}
        </nav>
    );
}
