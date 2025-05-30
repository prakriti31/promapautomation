import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { user, login } = useAuth();
    if (user) return <Navigate to="/" replace />;     // already logged-in

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const u = await login(email, password);
            navigate(u.role === 'ADMIN' ? '/admin' : '/');   // go home for non-admin
        } catch {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-sm space-y-4 p-4">
            <h2 className="text-2xl font-bold">Login</h2>

            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full rounded border p-2"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded border p-2"
            />

            <button type="submit" className="w-full rounded bg-primary-500 py-2 text-white">
                Log&nbsp;In
            </button>

            {/* new line → sign-up link */}
            <p className="text-center text-sm">
                Don&rsquo;t have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:underline">
                    Sign&nbsp;Up
                </Link>
            </p>
        </form>
    );
}
