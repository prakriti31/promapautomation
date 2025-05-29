import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-primary-200 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-primary-800 text-xl font-extrabold tracking-wide">
                        PROMAP Automation
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-4">
                        {!user && (
                            <>
                                <Link to="/login" className="hover:text-primary-600">Login</Link>
                                <Link to="/signup" className="hover:text-primary-600">Sign Up</Link>
                            </>
                        )}

                        {user && user.role === 'ADMIN' && (
                            <>
                                <span className="font-bold text-primary-800">ADMIN</span>
                                <button onClick={handleLogout} className="hover:text-primary-600">
                                    Sign Out
                                </button>
                            </>
                        )}

                        {user && user.role !== 'ADMIN' && (
                            <>
                                <span className="text-primary-800">{user.name || user.email}</span>
                                <Link to="/products" className="hover:text-primary-600">Products</Link>
                                <button onClick={handleLogout} className="hover:text-primary-600">
                                    Sign Out
                                </button>
                            </>
                        )}
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
                    {!user && (
                        <>
                            <Link to="/login" className="block py-2">Login</Link>
                            <Link to="/signup" className="block py-2">Sign Up</Link>
                        </>
                    )}

                    {user && user.role === 'ADMIN' && (
                        <>
                            <span className="block py-2 font-bold">ADMIN</span>
                            <button onClick={handleLogout} className="block py-2 text-left">
                                Sign Out
                            </button>
                        </>
                    )}

                    {user && user.role !== 'ADMIN' && (
                        <>
                            <span className="block py-2">{user.name || user.email}</span>
                            <Link to="/products" className="block py-2">Products</Link>
                            <button onClick={handleLogout} className="block py-2 text-left">
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}